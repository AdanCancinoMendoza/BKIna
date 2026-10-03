import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';

@Injectable()
export class CajaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async obtenerEstadoCaja(terminalId: string) {
    const terminal = await this.prisma.terminal.findUnique({
      where: { id: terminalId },
      include: { sucursal: true },
    });

    if (!terminal) throw new NotFoundException('Terminal no encontrada');

    // Calcular ventas en efectivo de la terminal
    const ventasEfectivo = await this.prisma.venta.aggregate({
      where: {
        terminalId,
        metodoPago: 'Efectivo',
        estado: 'PAGADO',
      },
      _sum: { total: true },
    });

    const ventasTarjeta = await this.prisma.venta.aggregate({
      where: {
        terminalId,
        metodoPago: 'Tarjeta',
        estado: 'PAGADO',
      },
      _sum: { total: true },
    });

    const totalEfectivo = Number(ventasEfectivo._sum.total || 0);
    const totalTarjeta = Number(ventasTarjeta._sum.total || 0);

    return {
      terminalId: terminal.id,
      nombreTerminal: terminal.nombre,
      estado: terminal.estado,
      sucursal: terminal.sucursal.nombre,
      ventasEfectivo: totalEfectivo,
      ventasTarjeta: totalTarjeta,
      totalVentas: totalEfectivo + totalTarjeta,
    };
  }

  async abrirCaja(terminalId: string, fondoInicial: number) {
    const terminal = await this.prisma.terminal.update({
      where: { id: terminalId },
      data: { estado: 'Abierta' },
    });

    this.eventsGateway.emitirEstadoTerminal({
      terminalId: terminal.id,
      estado: 'Abierta',
    });

    return { mensaje: 'Caja abierta correctamente', terminal, fondoInicial };
  }

  async cerrarCaja(terminalId: string, efectivoMano: number, notas?: string) {
    const estado = await this.obtenerEstadoCaja(terminalId);

    const terminal = await this.prisma.terminal.update({
      where: { id: terminalId },
      data: { estado: 'Cerrada' },
    });

    const diferencia = efectivoMano - estado.ventasEfectivo;

    this.eventsGateway.emitirEstadoTerminal({
      terminalId: terminal.id,
      estado: 'Cerrada',
    });

    return {
      mensaje: 'Corte de caja realizado con éxito',
      terminal,
      efectivoEsperado: estado.ventasEfectivo,
      efectivoContado: efectivoMano,
      diferencia,
      notas,
    };
  }
}
