import { Injectable } from '@nestjs/common';
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
    impuesto: number;
    total: number;
    metodoPago: string;
    detalles: Array<{ articuloId: string; cantidad: number; precioUnitario: number; subtotal: number }>;
  }) {
    const nuevaVenta = await this.prisma.$transaction(async (tx) => {
      const count = await tx.venta.count({ where: { organizacionId: data.organizacionId } });
      const folio = `T-${(count + 1).toString().padStart(6, '0')}`;

      const venta = await tx.venta.create({
        data: {
          folio,
          organizacionId: data.organizacionId,
          sucursalId: data.sucursalId,
          terminalId: data.terminalId,
          clienteId: data.clienteId,
          usuarioId: data.usuarioId,
          subtotal: data.subtotal,
          impuesto: data.impuesto,
          total: data.total,
          metodoPago: data.metodoPago,
          detalles: {
            create: data.detalles.map((d) => ({
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

      for (const item of data.detalles) {
        const inv = await tx.inventario.upsert({
          where: {
            sucursalId_articuloId: {
              sucursalId: data.sucursalId,
              articuloId: item.articuloId,
            },
          },
          update: {
            stockActual: { decrement: item.cantidad },
          },
          create: {
            sucursalId: data.sucursalId,
            articuloId: item.articuloId,
            stockActual: 0 - item.cantidad,
          },
        });

        await tx.movimientoStock.create({
          data: {
            articuloId: item.articuloId,
            sucursalId: data.sucursalId,
            usuarioId: data.usuarioId,
            tipo: 'VENTA',
            cantidad: item.cantidad,
            motivo: `Venta folio ${folio}`,
          },
        });

        // Emitir actualización de stock vía WebSocket
        this.eventsGateway.emitirStockActualizado({
          articuloId: item.articuloId,
          sucursalId: data.sucursalId,
          nuevoStock: inv.stockActual,
        }, `org_${data.organizacionId}`);
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
