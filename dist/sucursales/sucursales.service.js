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
let SucursalesService = class SucursalesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(organizacionId) {
        const where = {};
        if (organizacionId)
            where.organizacionId = organizacionId;
        return this.prisma.sucursal.findMany({
            where,
            include: {
                terminales: true,
                _count: {
                    select: {
                        usuarios: true,
                        ventas: true,
                        inventarios: true,
                    },
                },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async findOne(id) {
        const sucursal = await this.prisma.sucursal.findUnique({
            where: { id },
            include: {
                terminales: true,
                usuarios: {
                    select: {
                        id: true,
                        nombre: true,
                        email: true,
                        rol: true,
                        activo: true,
                    },
                },
            },
        });
        if (!sucursal)
            throw new NotFoundException('Sucursal no encontrada');
        return sucursal;
    }
    async create(data) {
        return this.prisma.sucursal.create({
            data: {
                organizacionId: data.organizacionId,
                nombre: data.nombre.trim(),
                direccion: data.direccion?.trim(),
                telefono: data.telefono?.trim(),
            },
        });
    }
};
SucursalesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], SucursalesService);
export { SucursalesService };
//# sourceMappingURL=sucursales.service.js.map