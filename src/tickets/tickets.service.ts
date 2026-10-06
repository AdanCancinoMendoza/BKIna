import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async findAll(
    organizacionId?: string,
    search?: string,
    estado?: string,
    sucursalId?: string,
  ) {
    const where: any = {};

    if (organizacionId) where.organizacionId = organizacionId;
    if (sucursalId && sucursalId !== 'Todas') where.sucursalId = sucursalId;
    if (estado && estado !== 'Todos') where.estado = estado;

    if (search) {
      where.OR = [
        { folio: { contains: search, mode: 'insensitive' } },
        { cliente: { nombre: { contains: search, mode: 'insensitive' } } },
      ];
    }

    return this.prisma.venta.findMany({
      where,
      include: {
        detalles: {
          include: { articulo: true },
        },
        cliente: true,
        sucursal: true,
        terminal: true,
        usuario: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const ticket = await this.prisma.venta.findUnique({
      where: { id },
      include: {
        detalles: {
          include: { articulo: true },
        },
        cliente: true,
        sucursal: true,
        terminal: true,
        usuario: true,
      },
    });

    if (!ticket) throw new NotFoundException('Ticket no encontrado');
    return ticket;
  }

  async cambiarEstado(id: string, nuevoEstado: 'DEVUELTO' | 'CANCELADO', motivo?: string) {
    const venta = await this.prisma.venta.findUnique({
      where: { id },
      include: { detalles: true },
    });

    if (!venta) throw new NotFoundException('Ticket no encontrado');

    const ventaActualizada = await this.prisma.$transaction(async (tx: any) => {
      // 1. Cambiar estado del ticket
      const v = await tx.venta.update({
        where: { id },
        data: { estado: nuevoEstado },
        include: { detalles: { include: { articulo: true } }, cliente: true },
      });

      // 2. Reintegrar stock a la sucursal si se devuelve/cancela
      for (const d of venta.detalles) {
        await tx.inventario.update({
          where: {
            sucursalId_articuloId: {
              sucursalId: venta.sucursalId,
              articuloId: d.articuloId,
            },
          },
          data: {
            stockActual: { increment: d.cantidad },
          },
        });

        await tx.movimientoStock.create({
          data: {
            articuloId: d.articuloId,
            sucursalId: venta.sucursalId,
            tipo: nuevoEstado === 'DEVUELTO' ? 'ENTRADA' : 'AJUSTE',
            cantidad: d.cantidad,
            motivo: motivo || `Ticket ${venta.folio} ${nuevoEstado.toLowerCase()}`,
          },
        });
      }

      return v;
    });

    // 3. Emitir evento WebSocket
    this.eventsGateway.emitirVentaCreada(ventaActualizada, `org_${ventaActualizada.organizacionId}`);

    return ventaActualizada;
  }
}
