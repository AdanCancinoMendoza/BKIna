var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
let VentasService = class VentasService {
    prisma;
    eventsGateway;
    constructor(prisma, eventsGateway) {
        this.prisma = prisma;
        this.eventsGateway = eventsGateway;
    }
    async registrarVenta(data) {
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
                this.eventsGateway.emitirStockActualizado({
                    articuloId: item.articuloId,
                    sucursalId: data.sucursalId,
                    nuevoStock: inv.stockActual,
                }, `org_${data.organizacionId}`);
            }
            return venta;
        });
        this.eventsGateway.emitirVentaCreada(nuevaVenta, `org_${data.organizacionId}`);
        return nuevaVenta;
    }
    async obtenerVentas(organizacionId) {
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
};
VentasService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        EventsGateway])
], VentasService);
export { VentasService };
//# sourceMappingURL=ventas.service.js.map