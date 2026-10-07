import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';

@Injectable()
export class VentasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async registrarVenta(data: {
    organizacionId: string;
    sucursalId: string;
    terminalId?: string;
    clienteId?: string;
    usuarioId?: string;
    subtotal: number;
    descuento?: number;
    impuesto: number;
    total: number;
    metodoPago: string;
    puntosCanjeados?: number;
    detalles: Array<{ articuloId: string; cantidad: number; precioUnitario: number; subtotal: number }>;
  }) {
    const nuevaVenta = await this.prisma.$transaction(async (tx: any) => {
      const count = await tx.venta.count({ where: { organizacionId: data.organizacionId } });
      const folio = `T-${(count + 1).toString().padStart(6, '0')}`;

      // Resolver sucursalId si no viene especificada
      let resolvedSucursalId = data.sucursalId;
      if (!resolvedSucursalId) {
        const suc = await tx.sucursal.findFirst({
          where: { organizacionId: data.organizacionId },
        });
        if (suc) {
          resolvedSucursalId = suc.id;
        } else {
          const nuevaSuc = await tx.sucursal.create({
            data: {
              nombre: 'Sucursal Principal',
              organizacionId: data.organizacionId,
            },
          });
          resolvedSucursalId = nuevaSuc.id;
        }
      }

      // Asegurar que los artículos existan y verificar disponibilidad de existencias
      const processedDetalles: Array<{ articuloId: string; cantidad: number; precioUnitario: number; subtotal: number }> = [];
      for (const d of data.detalles) {
        let artId = String(d.articuloId);
        let art = await tx.articulo.findUnique({
          where: { id: artId },
          include: { inventarios: { where: { sucursalId: resolvedSucursalId } } },
        });

        if (!art) {
          art = await tx.articulo.findFirst({
            where: { organizacionId: data.organizacionId, codigo: artId },
            include: { inventarios: { where: { sucursalId: resolvedSucursalId } } },
          });
          if (art) {
            artId = art.id;
          } else {
            const nuevoArt = await tx.articulo.create({
              data: {
                organizacionId: data.organizacionId,
                codigo: `ART-${Date.now().toString().slice(-6)}`,
                nombre: (d as any).nombre || `Artículo ${artId}`,
                precioVenta: d.precioUnitario,
                precioCompra: 0,
                unidad: 'Pieza',
                stockIlimitado: true, // Venta rápida por defecto
              },
            });
            artId = nuevoArt.id;
            art = nuevoArt;
          }
        }

        // Validación estricta: Si el artículo no es ilimitado, verificar existencias reales
        if (art && !art.stockIlimitado) {
          const invSucursal = art.inventarios?.[0];
          const stockActual = invSucursal?.stockActual ?? 0;
          if (stockActual <= 0) {
            throw new BadRequestException(
              `El producto "${art.nombre}" está agotado (0 existencias). No es posible venderlo.`
            );
          }
          if (stockActual < Number(d.cantidad)) {
            throw new BadRequestException(
              `Existencias insuficientes para "${art.nombre}". Stock disponible: ${stockActual}, solicitado: ${d.cantidad}.`
            );
          }
        }

        processedDetalles.push({
          articuloId: artId,
          cantidad: Number(d.cantidad),
          precioUnitario: Number(d.precioUnitario),
          subtotal: Number(d.subtotal),
        });
      }

      const venta = await tx.venta.create({
        data: {
          folio,
          organizacionId: data.organizacionId,
          sucursalId: resolvedSucursalId,
          terminalId: data.terminalId || null,
          clienteId: data.clienteId || null,
          usuarioId: data.usuarioId || null,
          subtotal: data.subtotal,
          descuento: data.descuento || 0,
          impuesto: data.impuesto,
          total: data.total,
          metodoPago: data.metodoPago,
          detalles: {
            create: processedDetalles.map((d) => ({
              articuloId: d.articuloId,
              cantidad: d.cantidad,
              precioUnitario: d.precioUnitario,
              subtotal: d.subtotal,
            })),
          },
        },
        include: {
          detalles: {
            include: { articulo: true },
          },
          cliente: true,
          sucursal: true,
        },
      });

      // Si la venta está vinculada a un cliente, acumular puntos de fidelidad
      if (data.clienteId) {
        const puntosGanados = Math.floor(Number(data.total) / 10); // 1 punto por cada $10
        const puntosAjuste = puntosGanados - (data.puntosCanjeados || 0);

        if (puntosAjuste !== 0) {
          await tx.cliente.update({
            where: { id: data.clienteId },
            data: {
              puntos: {
                increment: puntosAjuste,
              },
            },
          });
        }
      }

      // Actualizar inventario de cada artículo vendido (solo si no es stock ilimitado)
      for (const item of processedDetalles) {
        const art = await tx.articulo.findUnique({ where: { id: item.articuloId } });
        if (art?.stockIlimitado) {
          // Producto con existencias ilimitadas para ventas rápidas: omitir descuento
          continue;
        }

        const inv = await tx.inventario.upsert({
          where: {
            sucursalId_articuloId: {
              sucursalId: resolvedSucursalId,
              articuloId: item.articuloId,
            },
          },
          update: {
            stockActual: { decrement: item.cantidad },
          },
          create: {
            sucursalId: resolvedSucursalId,
            articuloId: item.articuloId,
            stockActual: 0 - item.cantidad,
          },
        });

        await tx.movimientoStock.create({
          data: {
            articuloId: item.articuloId,
            sucursalId: resolvedSucursalId,
            usuarioId: data.usuarioId,
            tipo: 'VENTA',
            cantidad: item.cantidad,
            motivo: `Venta folio ${folio}`,
          },
        });

        // Emitir actualización de stock vía WebSocket
        this.eventsGateway.emitirStockActualizado(
          {
            articuloId: item.articuloId,
            sucursalId: resolvedSucursalId,
            nuevoStock: inv.stockActual,
          },
          `org_${data.organizacionId}`,
        );
      }

      return venta;
    });

    // Emitir evento WebSocket de venta creada
    this.eventsGateway.emitirVentaCreada(nuevaVenta, `org_${data.organizacionId}`);

    return nuevaVenta;
  }

  async obtenerVentas(organizacionId: string) {
    return this.prisma.venta.findMany({
      where: { organizacionId },
      include: {
        detalles: { include: { articulo: true } },
        cliente: true,
        usuario: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
