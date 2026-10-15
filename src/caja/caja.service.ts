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

    // Determinar la fecha de corte anterior para calcular solo las ventas del turno actual
    const ultimoCorte = await this.prisma.corteCaja.findFirst({
      where: { terminalId },
      orderBy: { fecha: 'desc' },
    });

    const inicioTurno = ultimoCorte?.fecha
      ? ultimoCorte.fecha
      : new Date(new Date().setHours(0, 0, 0, 0));

    // Calcular ventas en efectivo de la terminal para el turno actual
    const ventasEfectivo = await this.prisma.venta.aggregate({
      where: {
        terminalId,
        metodoPago: 'Efectivo',
        estado: 'PAGADO',
        createdAt: { gte: inicioTurno },
      },
      _sum: { total: true },
    });

    const ventasTarjeta = await this.prisma.venta.aggregate({
      where: {
        terminalId,
        metodoPago: 'Tarjeta',
        estado: 'PAGADO',
        createdAt: { gte: inicioTurno },
      },
      _sum: { total: true },
    });

    const ventasTransferencia = await this.prisma.venta.aggregate({
      where: {
        terminalId,
        metodoPago: { in: ['Transferencia', 'Otro'] },
        estado: 'PAGADO',
        createdAt: { gte: inicioTurno },
      },
      _sum: { total: true },
    });

    const totalEfectivo = Number(ventasEfectivo._sum.total || 0);
    const totalTarjeta = Number(ventasTarjeta._sum.total || 0);
    const totalTransferencia = Number(ventasTransferencia._sum.total || 0);

    return {
      terminalId: terminal.id,
      nombreTerminal: terminal.nombre,
      estado: terminal.estado,
      sucursal: terminal.sucursal.nombre,
      ventasEfectivo: totalEfectivo,
      ventasTarjeta: totalTarjeta,
      ventasTransferencia: totalTransferencia,
      totalVentas: totalEfectivo + totalTarjeta + totalTransferencia,
      inicioTurno,
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

    // Auto-registrar corte en la base de datos si terminal tiene sucursal / organizacion
    let corteCreado: any = null;
    const termCompleta = await this.prisma.terminal.findUnique({
      where: { id: terminalId },
      include: { sucursal: true },
    });

    if (termCompleta?.sucursal?.organizacionId) {
      corteCreado = await this.prisma.corteCaja.create({
        data: {
          organizacionId: termCompleta.sucursal.organizacionId,
          sucursalId: termCompleta.sucursalId,
          terminalId: termCompleta.id,
          nombreTerminal: termCompleta.nombre,
          tipo: 'FINAL',
          ventasEfectivo: estado.ventasEfectivo,
          ventasTarjeta: estado.ventasTarjeta,
          ventasTransferencia: estado.ventasTransferencia,
          totalVentas: estado.totalVentas,
          efectivoEsperado: estado.ventasEfectivo,
          efectivoContado: efectivoMano,
          diferencia,
          notas: notas || null,
        },
      });
    }

    return {
      mensaje: 'Corte de caja realizado con éxito',
      terminal,
      corte: corteCreado,
      efectivoEsperado: estado.ventasEfectivo,
      efectivoContado: efectivoMano,
      diferencia,
      notas,
    };
  }

  /**
   * Registra manualmente o sincroniza un corte de caja
   */
  async registrarCorte(data: {
    organizacionId: string;
    sucursalId?: string;
    terminalId?: string;
    nombreTerminal?: string;
    usuarioId?: string;
    nombreUsuario?: string;
    tipo?: string;
    fondoInicial?: number;
    ventasEfectivo?: number;
    ventasTarjeta?: number;
    ventasTransferencia?: number;
    totalVentas?: number;
    entradasEfectivo?: number;
    retirosEfectivo?: number;
    efectivoEsperado?: number;
    efectivoContado?: number;
    diferencia?: number;
    totalTickets?: number;
    notas?: string;
    fecha?: string | Date;
  }) {
    let org = await this.prisma.organizacion.findUnique({ where: { id: data.organizacionId } });
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    if (!org) throw new NotFoundException('Organización no encontrada');

    const corte = await this.prisma.corteCaja.create({
      data: {
        organizacionId: org.id,
        sucursalId: data.sucursalId || null,
        terminalId: data.terminalId || null,
        nombreTerminal: data.nombreTerminal || 'Caja Principal',
        usuarioId: data.usuarioId || null,
        nombreUsuario: data.nombreUsuario || 'Cajero',
        tipo: data.tipo || 'PARCIAL',
        fondoInicial: data.fondoInicial || 0,
        ventasEfectivo: data.ventasEfectivo || 0,
        ventasTarjeta: data.ventasTarjeta || 0,
        ventasTransferencia: data.ventasTransferencia || 0,
        totalVentas: data.totalVentas || 0,
        entradasEfectivo: data.entradasEfectivo || 0,
        retirosEfectivo: data.retirosEfectivo || 0,
        efectivoEsperado: data.efectivoEsperado || 0,
        efectivoContado: data.efectivoContado || 0,
        diferencia: data.diferencia || 0,
        totalTickets: data.totalTickets || 0,
        notas: data.notas || null,
        fecha: data.fecha ? new Date(data.fecha) : new Date(),
      },
    });

    return corte;
  }

  /**
   * Obtiene los cortes de caja de una organización
   */
  async obtenerCortes(organizacionId: string, limit = 50) {
    let org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    if (!org) return [];

    return this.prisma.corteCaja.findMany({
      where: { organizacionId: org.id },
      orderBy: { fecha: 'desc' },
      take: limit,
    });
  }

  /**
   * Resumen integrado de ventas del día por horas y cortes de caja realizados
   */
  async obtenerResumenCortesYVentasDia(organizacionId: string, fechaStr?: string) {
    let org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    if (!org) return null;

    // Determinar rango de hoy
    const targetDate = fechaStr ? new Date(`${fechaStr}T12:00:00`) : new Date();
    const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 23, 59, 59, 999);

    // 1. Obtener todas las ventas del día
    const ventas = await this.prisma.venta.findMany({
      where: {
        organizacionId: org.id,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        id: true,
        folio: true,
        total: true,
        metodoPago: true,
        createdAt: true,
        usuario: { select: { nombre: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    // 2. Obtener cortes de caja realizados hoy
    const cortes = await this.prisma.corteCaja.findMany({
      where: {
        organizacionId: org.id,
        fecha: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { fecha: 'asc' },
    });

    // 3. Agrupar ventas por hora (0 a 23)
    const ventasPorHoraMap: Record<number, { total: number; tickets: number }> = {};
    for (let h = 0; h < 24; h++) {
      ventasPorHoraMap[h] = { total: 0, tickets: 0 };
    }

    let totalDia = 0;
    let totalEfectivo = 0;
    let totalTarjeta = 0;
    let totalTransferencia = 0;

    ventas.forEach((v) => {
      const hora = new Date(v.createdAt).getHours();
      const monto = Number(v.total || 0);
      ventasPorHoraMap[hora].total += monto;
      ventasPorHoraMap[hora].tickets += 1;
      totalDia += monto;

      const metodo = (v.metodoPago || '').toLowerCase();
      if (metodo.includes('efectivo')) {
        totalEfectivo += monto;
      } else if (metodo.includes('tarjeta')) {
        totalTarjeta += monto;
      } else if (metodo.includes('transferencia')) {
        totalTransferencia += monto;
      }
    });

    // Convertir a array de horas activas (ej. de 7:00 a 22:00 o según ventas)
    const currentHour = new Date().getHours();
    const minHour = 7;
    const maxHour = Math.max(21, currentHour);

    const timelineHoras = [];
    let acumuladoVentas = 0;

    for (let h = minHour; h <= maxHour; h++) {
      const slot = ventasPorHoraMap[h] || { total: 0, tickets: 0 };
      acumuladoVentas += slot.total;

      // Buscar si hubo cortes en esta hora
      const cortesEnHora = cortes.filter((c) => {
        const cHour = new Date(c.fecha).getHours();
        return cHour === h;
      });

      timelineHoras.push({
        hora: h,
        label: `${h.toString().padStart(2, '0')}:00`,
        ventas: slot.total,
        tickets: slot.tickets,
        acumulado: acumuladoVentas,
        tieneCorte: cortesEnHora.length > 0,
        cortes: cortesEnHora.map((c) => ({
          id: c.id,
          tipo: c.tipo,
          hora: new Date(c.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          terminal: c.nombreTerminal || 'Caja',
          usuario: c.nombreUsuario || 'Cajero',
          totalVentas: Number(c.totalVentas),
          efectivoEsperado: Number(c.efectivoEsperado),
          efectivoContado: Number(c.efectivoContado),
          diferencia: Number(c.diferencia),
        })),
      });
    }

    const totalCortado = cortes.reduce((acc, c) => acc + Number(c.totalVentas || 0), 0);

    return {
      fecha: startOfDay.toISOString().split('T')[0],
      totalDia,
      ticketsDia: ventas.length,
      ticketPromedio: ventas.length > 0 ? totalDia / ventas.length : 0,
      totalCortado,
      metodosPago: {
        efectivo: totalEfectivo,
        tarjeta: totalTarjeta,
        transferencia: totalTransferencia,
        otros: totalDia - (totalEfectivo + totalTarjeta + totalTransferencia),
      },
      timelineHoras,
      cortes: cortes.map((c) => ({
        id: c.id,
        tipo: c.tipo,
        hora: new Date(c.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fecha: c.fecha,
        nombreTerminal: c.nombreTerminal || 'Caja',
        nombreUsuario: c.nombreUsuario || 'Cajero',
        totalVentas: Number(c.totalVentas),
        ventasEfectivo: Number(c.ventasEfectivo),
        ventasTarjeta: Number(c.ventasTarjeta),
        efectivoEsperado: Number(c.efectivoEsperado),
        efectivoContado: Number(c.efectivoContado),
        diferencia: Number(c.diferencia),
        totalTickets: c.totalTickets,
        notas: c.notas,
      })),
    };
  }
}
