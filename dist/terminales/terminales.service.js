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
let TerminalesService = class TerminalesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(sucursalId) {
        const where = {};
        if (sucursalId)
            where.sucursalId = sucursalId;
        return this.prisma.terminal.findMany({
            where,
            include: {
                sucursal: {
                    select: {
                        id: true,
                        nombre: true,
                        organizacionId: true,
                    },
                },
            },
            orderBy: { nombre: 'asc' },
        });
    }
    async findOne(id) {
        const terminal = await this.prisma.terminal.findUnique({
            where: { id },
            include: {
                sucursal: true,
            },
        });
        if (!terminal)
            throw new NotFoundException('Terminal no encontrada');
        return terminal;
    }
    async create(data) {
        return this.prisma.terminal.create({
            data: {
                sucursalId: data.sucursalId,
                nombre: data.nombre.trim(),
                estado: 'Cerrada',
            },
        });
    }
    async updateEstado(id, estado) {
        return this.prisma.terminal.update({
            where: { id },
            data: { estado },
        });
    }
};
TerminalesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TerminalesService);
export { TerminalesService };
//# sourceMappingURL=terminales.service.js.map