var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
let CajaService = class CajaService {
    prisma;
    eventsGateway;
    constructor(prisma, eventsGateway) {
        this.prisma = prisma;
        this.eventsGateway = eventsGateway;
    }
    async obtenerEstadoCaja(terminalId) {
        const terminal = await this.prisma.terminal.findUnique({
            where: { id: terminalId },
            include: { sucursal: true },
        });
        if (!terminal)
            throw new NotFoundException('Terminal no encontrada');
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
    async abrirCaja(terminalId, fondoInicial) {
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
    async cerrarCaja(terminalId, efectivoMano, notas) {
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
};
CajaService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        EventsGateway])
], CajaService);
export { CajaService };
//# sourceMappingURL=caja.service.js.map