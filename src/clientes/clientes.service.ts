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

  async findOne(id: string) {
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

    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  async create(data: {
    organizacionId: string;
    nombre: string;
    telefono?: string;
    email?: string;
    rfc?: string;
    localidad?: string;
  }) {
    return this.prisma.cliente.create({ data });
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
    },
  ) {
    return this.prisma.cliente.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.cliente.delete({ where: { id } });
  }
}
