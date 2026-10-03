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
let TicketsService = class TicketsService {
    prisma;
    eventsGateway;
    constructor(prisma, eventsGateway) {
        this.prisma = prisma;
        this.eventsGateway = eventsGateway;
    }
    async findAll(organizacionId, search, estado, sucursalId) {
        const where = {};
        if (organizacionId)
            where.organizacionId = organizacionId;
        if (sucursalId && sucursalId !== 'Todas')
            where.sucursalId = sucursalId;
        if (estado && estado !== 'Todos')
            where.estado = estado;
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
    async findOne(id) {
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
        if (!ticket)
            throw new NotFoundException('Ticket no encontrado');
        return ticket;
    }
    async cambiarEstado(id, nuevoEstado, motivo) {
        const venta = await this.prisma.venta.findUnique({
            where: { id },
            include: { detalles: true },
        });
        if (!venta)
            throw new NotFoundException('Ticket no encontrado');
        const ventaActualizada = await this.prisma.$transaction(async (tx) => {
            const v = await tx.venta.update({
                where: { id },
                data: { estado: nuevoEstado },
                include: { detalles: { include: { articulo: true } }, cliente: true },
            });
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
        this.eventsGateway.emitirVentaCreada(ventaActualizada, `org_${ventaActualizada.organizacionId}`);
        return ventaActualizada;
    }
};
TicketsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        EventsGateway])
], TicketsService);
export { TicketsService };
//# sourceMappingURL=tickets.service.js.map