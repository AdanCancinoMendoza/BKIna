import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(organizacionId?: string, search?: string, localidad?: string) {
    const where: any = {};

    if (organizacionId) {
      where.organizacionId = organizacionId;
    }

    if (localidad && localidad !== 'Todas las localidades') {
      where.localidad = { contains: localidad, mode: 'insensitive' };
    }

    if (search) {
      const q = search.trim();
      where.OR = [
        { nombre: { contains: q, mode: 'insensitive' } },
        { telefono: { contains: q, mode: 'insensitive' } },
        { rfc: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
      ];
    }

    const clientes = await this.prisma.cliente.findMany({
      where,
      include: {
        _count: { select: { ventas: true } },
        ventas: {
          select: { total: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return clientes.map((c) => {
      const totalGastado = c.ventas.reduce((acc, v) => acc + Number(v.total || 0), 0);
      const comprasCount = c._count.ventas;
      const ticketPromedio = comprasCount > 0 ? Number((totalGastado / comprasCount).toFixed(2)) : 0;

      return {
        id: c.id,
        organizacionId: c.organizacionId,
        nombre: c.nombre,
        telefono: c.telefono,
        email: c.email,
        rfc: c.rfc,
        localidad: c.localidad,
        puntos: c.puntos,
        saldo: Number(c.saldo),
        descuento: Number(c.descuento),
        comprasCount,
        totalGastado: Number(totalGastado.toFixed(2)),
        ticketPromedio,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      };
    });
  }

  async findOne(id: string) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
      include: {
        ventas: {
          orderBy: { createdAt: 'desc' },
          include: {
            detalles: {
              include: {
                articulo: {
                  select: {
                    id: true,
                    codigo: true,
                    nombre: true,
                    unidad: true,
                    precioVenta: true,
                  },
                },
              },
            },
            sucursal: {
              select: { id: true, nombre: true },
            },
            terminal: {
              select: { id: true, nombre: true },
            },
            usuario: {
              select: { id: true, nombre: true, email: true },
            },
          },
        },
      },
    });

    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const totalGastado = cliente.ventas.reduce((acc, v) => acc + Number(v.total || 0), 0);
    const comprasCount = cliente.ventas.length;
    const ticketPromedio = comprasCount > 0 ? Number((totalGastado / comprasCount).toFixed(2)) : 0;

    return {
      id: cliente.id,
      organizacionId: cliente.organizacionId,
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      email: cliente.email,
      rfc: cliente.rfc,
      localidad: cliente.localidad,
      puntos: cliente.puntos,
      saldo: Number(cliente.saldo),
      descuento: Number(cliente.descuento),
      totalGastado: Number(totalGastado.toFixed(2)),
      comprasCount,
      ticketPromedio,
      createdAt: cliente.createdAt,
      updatedAt: cliente.updatedAt,
      ventas: cliente.ventas.map((v) => ({
        id: v.id,
        folio: v.folio,
        fecha: v.createdAt,
        subtotal: Number(v.subtotal),
        descuento: Number(v.descuento),
        impuesto: Number(v.impuesto),
        total: Number(v.total),
        metodoPago: v.metodoPago,
        estado: v.estado,
        sucursal: v.sucursal?.nombre || 'General',
        terminal: v.terminal?.nombre || 'Caja',
        vendedor: v.usuario?.nombre || 'Vendedor',
        detallesCount: v.detalles.length,
        detalles: v.detalles.map((d) => ({
          id: d.id,
          articuloId: d.articuloId,
          codigo: d.articulo?.codigo || '',
          nombre: d.articulo?.nombre || 'Artículo',
          cantidad: d.cantidad,
          precioUnitario: Number(d.precioUnitario),
          subtotal: Number(d.subtotal),
        })),
      })),
    };
  }

  async create(data: {
    organizacionId: string;
    nombre: string;
    telefono?: string;
    email?: string;
    rfc?: string;
    localidad?: string;
    puntos?: number;
    saldo?: number;
    descuento?: number;
  }) {
    return this.prisma.cliente.create({
      data: {
        organizacionId: data.organizacionId,
        nombre: data.nombre.trim(),
        telefono: data.telefono?.trim() || null,
        email: data.email?.toLowerCase().trim() || null,
        rfc: data.rfc?.toUpperCase().trim() || null,
        localidad: data.localidad?.trim() || null,
        puntos: data.puntos ?? 0,
        saldo: data.saldo ?? 0,
        descuento: data.descuento ?? 0,
      },
    });
  }

  async update(
    id: string,
    data: {
      nombre?: string;
      telefono?: string;
      email?: string;
      rfc?: string;
      localidad?: string;
      puntos?: number;
      saldo?: number;
      descuento?: number;
    },
  ) {
    const updateData: any = {};
    if (data.nombre !== undefined) updateData.nombre = data.nombre.trim();
    if (data.telefono !== undefined) updateData.telefono = data.telefono?.trim() || null;
    if (data.email !== undefined) updateData.email = data.email?.toLowerCase().trim() || null;
    if (data.rfc !== undefined) updateData.rfc = data.rfc?.toUpperCase().trim() || null;
    if (data.localidad !== undefined) updateData.localidad = data.localidad?.trim() || null;
    if (data.puntos !== undefined) updateData.puntos = data.puntos;
    if (data.saldo !== undefined) updateData.saldo = data.saldo;
    if (data.descuento !== undefined) updateData.descuento = data.descuento;

    return this.prisma.cliente.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.cliente.delete({ where: { id } });
  }
}
