var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { getCatalogoSemilla } from './data/catalogos-semilla.js';
let OrganizacionesService = class OrganizacionesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registrarEmpresa(dto) {
        const adminExistente = await this.prisma.usuario.findUnique({
            where: { email: dto.adminCorreo.toLowerCase().trim() },
        });
        if (adminExistente) {
            throw new ConflictException(`El correo ${dto.adminCorreo} ya está registrado para otro usuario.`);
        }
        if (dto.vendedorCorreo) {
            const vendEmail = dto.vendedorCorreo.toLowerCase().trim();
            if (vendEmail === dto.adminCorreo.toLowerCase().trim()) {
                throw new BadRequestException('El correo del vendedor debe ser diferente al del administrador.');
            }
            const vendedorExistente = await this.prisma.usuario.findUnique({
                where: { email: vendEmail },
            });
            if (vendedorExistente) {
                throw new ConflictException(`El correo del vendedor ${dto.vendedorCorreo} ya está registrado.`);
            }
        }
        const hashedAdminPassword = await bcrypt.hash(dto.adminPassword, 10);
        const hashedVendedorPassword = dto.vendedorPassword
            ? await bcrypt.hash(dto.vendedorPassword, 10)
            : null;
        const fechaInicio = new Date();
        let fechaFin = dto.fechaFin ? new Date(dto.fechaFin) : null;
        if (!fechaFin || isNaN(fechaFin.getTime())) {
            fechaFin = new Date(fechaInicio.getTime() + 30 * 24 * 60 * 60 * 1000);
        }
        return this.prisma.$transaction(async (tx) => {
            const organizacion = await tx.organizacion.create({
                data: {
                    nombre: dto.nombre.trim(),
                    email: dto.correo ? dto.correo.toLowerCase().trim() : null,
                    telefono: dto.telefono ? dto.telefono.trim() : null,
                    pais: dto.pais ? dto.pais.trim() : 'México',
                    estado: dto.estado ? dto.estado.trim() : null,
                    municipio: dto.municipio ? dto.municipio.trim() : null,
                    codigoPostal: dto.codigoPostal ? dto.codigoPostal.trim() : null,
                    direccion: dto.direccion ? dto.direccion.trim() : null,
                },
            });
            const sucursal = await tx.sucursal.create({
                data: {
                    organizacionId: organizacion.id,
                    nombre: dto.sucursalNombre.trim(),
                    telefono: dto.sucursalTelefono ? dto.sucursalTelefono.trim() : null,
                    direccion: dto.sucursalDireccion ? dto.sucursalDireccion.trim() : null,
                    activo: true,
                },
            });
            const terminal = await tx.terminal.create({
                data: {
                    sucursalId: sucursal.id,
                    nombre: 'Caja 01',
                    estado: 'Cerrada',
                },
            });
            const admin = await tx.usuario.create({
                data: {
                    organizacionId: organizacion.id,
                    sucursalId: sucursal.id,
                    nombre: dto.adminNombre.trim(),
                    email: dto.adminCorreo.toLowerCase().trim(),
                    telefono: dto.adminTelefono ? dto.adminTelefono.trim() : null,
                    password: hashedAdminPassword,
                    rol: 'ADMIN',
                    activo: true,
                },
            });
            let vendedor = null;
            if (dto.vendedorNombre &&
                dto.vendedorCorreo &&
                hashedVendedorPassword) {
                vendedor = await tx.usuario.create({
                    data: {
                        organizacionId: organizacion.id,
                        sucursalId: sucursal.id,
                        nombre: dto.vendedorNombre.trim(),
                        email: dto.vendedorCorreo.toLowerCase().trim(),
                        telefono: dto.vendedorTelefono ? dto.vendedorTelefono.trim() : null,
                        password: hashedVendedorPassword,
                        rol: 'VENDEDOR',
                        activo: true,
                    },
                });
            }
            const suscripcion = await tx.suscripcion.create({
                data: {
                    organizacionId: organizacion.id,
                    plan: dto.plan ? dto.plan.trim() : 'BASICO',
                    estado: 'Activa',
                    fechaInicio,
                    fechaFin,
                },
            });
            let articulosPrecargadosCount = 0;
            if (dto.precargarArticulos) {
                const catalogo = getCatalogoSemilla(dto.pais || organizacion.pais || 'México', dto.giroComercial);
                for (const fam of catalogo) {
                    const familiaCreada = await tx.familia.create({
                        data: {
                            organizacionId: organizacion.id,
                            nombre: fam.nombre,
                            descripcion: fam.descripcion,
                        },
                    });
                    for (const art of fam.articulos) {
                        const articuloCreado = await tx.articulo.create({
                            data: {
                                organizacionId: organizacion.id,
                                familiaId: familiaCreada.id,
                                codigo: art.codigo,
                                nombre: art.nombre,
                                descripcion: art.descripcion || null,
                                precioCompra: art.precioCompra,
                                precioVenta: art.precioVenta,
                                unidad: art.unidad || 'Pieza',
                                activo: true,
                            },
                        });
                        await tx.inventario.create({
                            data: {
                                sucursalId: sucursal.id,
                                articuloId: articuloCreado.id,
                                stockActual: art.stockInicial || 20,
                                stockMinimo: 5,
                                stockMaximo: 100,
                            },
                        });
                        articulosPrecargadosCount++;
                    }
                }
            }
            return {
                mensaje: 'Organización registrada exitosamente',
                organizacion: {
                    id: organizacion.id,
                    nombre: organizacion.nombre,
                    email: organizacion.email,
                    telefono: organizacion.telefono,
                    direccion: organizacion.direccion,
                    pais: organizacion.pais,
                    estado: organizacion.estado,
                    municipio: organizacion.municipio,
                    codigoPostal: organizacion.codigoPostal,
                    createdAt: organizacion.createdAt,
                },
                sucursal: {
                    id: sucursal.id,
                    nombre: sucursal.nombre,
                    direccion: sucursal.direccion,
                    telefono: sucursal.telefono,
                    terminalInicial: {
                        id: terminal.id,
                        nombre: terminal.nombre,
                    },
                },
                admin: {
                    id: admin.id,
                    nombre: admin.nombre,
                    email: admin.email,
                    telefono: admin.telefono,
                    rol: admin.rol,
                },
                vendedor: vendedor
                    ? {
                        id: vendedor.id,
                        nombre: vendedor.nombre,
                        email: vendedor.email,
                        telefono: vendedor.telefono,
                        rol: vendedor.rol,
                    }
                    : null,
                suscripcion: {
                    id: suscripcion.id,
                    plan: suscripcion.plan,
                    estado: suscripcion.estado,
                    fechaInicio: suscripcion.fechaInicio,
                    fechaFin: suscripcion.fechaFin,
                },
            };
        });
    }
    async findAll() {
        return this.prisma.organizacion.findMany({
            include: {
                _count: {
                    select: {
                        sucursales: true,
                        usuarios: true,
                        clientes: true,
                        ventas: true,
                    },
                },
                suscripciones: {
                    take: 1,
                    orderBy: { createdAt: 'desc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const organizacion = await this.prisma.organizacion.findUnique({
            where: { id },
            include: {
                sucursales: {
                    include: {
                        terminales: true,
                        _count: { select: { usuarios: true, ventas: true } },
                    },
                },
                usuarios: {
                    select: {
                        id: true,
                        nombre: true,
                        email: true,
                        telefono: true,
                        rol: true,
                        activo: true,
                        sucursalId: true,
                        createdAt: true,
                    },
                },
                suscripciones: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!organizacion) {
            throw new NotFoundException('Organización no encontrada');
        }
        return organizacion;
    }
};
OrganizacionesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], OrganizacionesService);
export { OrganizacionesService };
//# sourceMappingURL=organizaciones.service.js.map