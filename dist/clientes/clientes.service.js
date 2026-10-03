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
let ClientesService = class ClientesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(organizacionId, search, localidad) {
        const where = {};
        if (organizacionId) {
            where.organizacionId = organizacionId;
        }
        if (localidad && localidad !== 'Todas las localidades') {
            where.localidad = { contains: localidad, mode: 'insensitive' };
        }
        if (search) {
            where.OR = [
                { nombre: { contains: search, mode: 'insensitive' } },
                { telefono: { contains: search, mode: 'insensitive' } },
                { rfc: { contains: search, mode: 'insensitive' } },
            ];
        }
        return this.prisma.cliente.findMany({
            where,
            include: {
                _count: { select: { ventas: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id },
            include: {
                ventas: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                    include: { detalles: { include: { articulo: true } } },
                },
            },
        });
        if (!cliente)
            throw new NotFoundException('Cliente no encontrado');
        return cliente;
    }
    async create(data) {
        return this.prisma.cliente.create({ data });
    }
    async update(id, data) {
        return this.prisma.cliente.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.cliente.delete({ where: { id } });
    }
};
ClientesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ClientesService);
export { ClientesService };
//# sourceMappingURL=clientes.service.js.map