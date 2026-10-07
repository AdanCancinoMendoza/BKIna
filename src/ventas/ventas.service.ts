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
    let org = null;
    if (organizacionId && organizacionId !== 'default') {
      org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || organizacionId;

    return this.prisma.venta.findMany({
      where: { organizacionId: resolvedOrgId },
      include: {
        detalles: { include: { articulo: true } },
        cliente: true,
        usuario: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async obtenerResumenVentas(organizacionId: string) {
    let org = null;
    if (organizacionId && organizacionId !== 'default') {
      org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || organizacionId;

    const ventas = await this.prisma.venta.findMany({
      where: { organizacionId: resolvedOrgId },
      include: {
        detalles: { include: { articulo: true } },
        cliente: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalIngresos = ventas.reduce((acc, v) => acc + Number(v.total), 0);
    const totalTickets = ventas.length;
    const ticketPromedio = totalTickets > 0 ? totalIngresos / totalTickets : 0;

    const clientesMap = new Set<string>();
    ventas.forEach((v) => {
      if (v.clienteId) clientesMap.add(v.clienteId);
    });

    // Ventas agrupadas por método de pago
    const metodosPagoMap: Record<string, number> = {};
    ventas.forEach((v) => {
      const m = v.metodoPago || 'Efectivo';
      metodosPagoMap[m] = (metodosPagoMap[m] || 0) + Number(v.total);
    });

    // Ventas agrupadas por día (últimos 7 días)
    const ventasPorDiaMap: Record<string, { fecha: string; total: number; tickets: number }> = {};
    const hoy = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(hoy.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const diaSemana = d.toLocaleDateString('es-MX', { weekday: 'short' });
      ventasPorDiaMap[key] = { fecha: diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1), total: 0, tickets: 0 };
    }

    ventas.forEach((v) => {
      const key = new Date(v.createdAt).toISOString().split('T')[0];
      if (ventasPorDiaMap[key]) {
        ventasPorDiaMap[key].total += Number(v.total);
        ventasPorDiaMap[key].tickets += 1;
      }
    });

    // Artículos más vendidos
    const articulosCountMap: Record<string, { nombre: string; unidades: number; totalVendido: number }> = {};
    ventas.forEach((v) => {
      v.detalles.forEach((d) => {
        const artNombre = d.articulo?.nombre || 'Artículo';
        if (!articulosCountMap[artNombre]) {
          articulosCountMap[artNombre] = { nombre: artNombre, unidades: 0, totalVendido: 0 };
        }
        articulosCountMap[artNombre].unidades += d.cantidad;
        articulosCountMap[artNombre].totalVendido += Number(d.subtotal);
      });
    });

    const topArticulos = Object.values(articulosCountMap)
      .sort((a, b) => b.unidades - a.unidades)
      .slice(0, 8);

    return {
      totalIngresos,
      totalTickets,
      ticketPromedio,
      clientesAtendidos: clientesMap.size,
      metodosPago: Object.entries(metodosPagoMap).map(([metodo, total]) => ({ metodo, total })),
      ventasPorDia: Object.values(ventasPorDiaMap),
      topArticulos,
      ultimasVentas: ventas.slice(0, 50),
    };
  }

  async crearCampana(data: { organizacionId: string; nombre: string; canal?: string; mensaje: string; estado?: string }) {
    let org = null;
    if (data.organizacionId && data.organizacionId !== 'default') {
      org = await this.prisma.organizacion.findUnique({ where: { id: data.organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || data.organizacionId;

    return this.prisma.campana.create({
      data: {
        organizacionId: resolvedOrgId,
        nombre: data.nombre.trim(),
        canal: data.canal || 'WHATSAPP',
        mensaje: data.mensaje.trim(),
        estado: data.estado || 'BORRADOR',
      },
    });
  }

  async obtenerCampanas(organizacionId: string) {
    let org = null;
    if (organizacionId && organizacionId !== 'default') {
      org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || organizacionId;

    return this.prisma.campana.findMany({
      where: { organizacionId: resolvedOrgId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async enviarCampana(data: {
    campanaId?: string;
    organizacionId: string;
    clientesIds?: string[];
    mensaje: string;
    nombreCampana?: string;
  }) {
    let org = null;
    if (data.organizacionId && data.organizacionId !== 'default') {
      org = await this.prisma.organizacion.findUnique({ where: { id: data.organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || data.organizacionId;

    const whereClause: any = {
      organizacionId: resolvedOrgId,
      telefono: { not: null },
    };

    if (data.clientesIds && data.clientesIds.length > 0) {
      whereClause.id = { in: data.clientesIds };
    }

    const clientes = await this.prisma.cliente.findMany({
      where: whereClause,
      select: {
        id: true,
        nombre: true,
        telefono: true,
        puntos: true,
        descuento: true,
      },
    });

    const orgNombre = org?.nombre || 'Nuestro Negocio';
    const orgWhatsapp = org?.whatsapp || org?.telefono || '';

    const resultados = clientes.map((c) => {
      let texto = data.mensaje
        .replace(/{cliente}/g, c.nombre)
        .replace(/{organizacion}/g, orgNombre)
        .replace(/{telefono_org}/g, orgWhatsapp)
        .replace(/{puntos}/g, String(c.puntos || 0))
        .replace(/{descuento}/g, `${Number(c.descuento || 0)}%`)
        .replace(/{articulo}/g, (data as any).articuloNombre || '')
        .replace(/{precio}/g, (data as any).articuloPrecio ? `$${(data as any).articuloPrecio}` : '');

      let rawPhone = (c.telefono || '').replace(/\D/g, '');
      if (rawPhone.length === 10) {
        rawPhone = `52${rawPhone}`;
      }

      const whatsappUrl = `https://api.whatsapp.com/send?phone=${rawPhone}&text=${encodeURIComponent(texto)}`;

      return {
        clienteId: c.id,
        nombre: c.nombre,
        telefono: c.telefono,
        telefonoFormato: rawPhone,
        mensajePersonalizado: texto,
        whatsappUrl,
        estado: 'PREPARADO',
      };
    });

    let campanaActualizada = null;
    if (data.campanaId) {
      campanaActualizada = await this.prisma.campana.update({
        where: { id: data.campanaId },
        data: {
          estado: 'ENVIADA',
          fechaEnvio: new Date(),
          totalDestinatarios: clientes.length,
          enviados: resultados.length,
        },
      });
    } else if (data.nombreCampana) {
      campanaActualizada = await this.prisma.campana.create({
        data: {
          organizacionId: resolvedOrgId,
          nombre: data.nombreCampana,
          canal: 'WHATSAPP',
          mensaje: data.mensaje,
          estado: 'ENVIADA',
          fechaEnvio: new Date(),
          totalDestinatarios: clientes.length,
          enviados: resultados.length,
        },
      });
    }

    return {
      exito: true,
      totalClientes: clientes.length,
      destinatarios: resultados,
      organizacionWhatsapp: orgWhatsapp,
      campana: campanaActualizada,
    };
  }
}
