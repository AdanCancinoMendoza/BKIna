import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SucursalesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(organizacionId?: string) {
    const where: any = {};
    if (organizacionId) where.organizacionId = organizacionId;

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

  async findOne(id: string) {
    const sucursal = await this.prisma.sucursal.findUnique({
      where: { id },
      include: {
        terminales: true,
        usuarios: {
          select: {
            id: true,
            nombre: true,
            email: true,
            perfil: {
              select: {
                id: true,
                nombre: true,
              },
            },
            activo: true,
          },
        },
      },
    });

    if (!sucursal) throw new NotFoundException('Sucursal no encontrada');
    return sucursal;
  }

  async create(data: {
    organizacionId: string;
    nombre: string;
    direccion?: string;
    telefono?: string;
  }) {
    return this.prisma.sucursal.create({
      data: {
        organizacionId: data.organizacionId,
        nombre: data.nombre.trim(),
        direccion: data.direccion?.trim(),
        telefono: data.telefono?.trim(),
      },
    });
  }
}
