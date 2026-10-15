import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TerminalesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(sucursalId?: string, organizacionId?: string) {
    const where: any = {};
    if (sucursalId) where.sucursalId = sucursalId;
    if (organizacionId) {
      where.sucursal = { organizacionId };
    }

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

  async findOne(id: string) {
    const terminal = await this.prisma.terminal.findUnique({
      where: { id },
      include: {
        sucursal: true,
      },
    });

    if (!terminal) throw new NotFoundException('Terminal no encontrada');
    return terminal;
  }

  async create(data: {
    sucursalId: string;
    nombre: string;
    estado?: string;
    perfilesPermitidos?: any;
    usuarioEncargadoId?: string;
  }) {
    return this.prisma.terminal.create({
      data: {
        sucursalId: data.sucursalId,
        nombre: data.nombre.trim(),
        estado: data.estado || 'Cerrada',
        perfilesPermitidos: data.perfilesPermitidos ?? undefined,
        usuarioEncargadoId: data.usuarioEncargadoId ?? undefined,
      },
      include: {
        sucursal: {
          select: {
            id: true,
            nombre: true,
            organizacionId: true,
          },
        },
      },
    });
  }

  async update(id: string, data: any) {
    const updateData: any = {};
    if (data.nombre !== undefined) updateData.nombre = data.nombre.trim();
    if (data.estado !== undefined) updateData.estado = data.estado;
    if (data.perfilesPermitidos !== undefined) updateData.perfilesPermitidos = data.perfilesPermitidos;
    if (data.usuarioEncargadoId !== undefined) updateData.usuarioEncargadoId = data.usuarioEncargadoId;
    if (data.sucursalId !== undefined) updateData.sucursalId = data.sucursalId;

    return this.prisma.terminal.update({
      where: { id },
      data: updateData,
      include: {
        sucursal: {
          select: {
            id: true,
            nombre: true,
            organizacionId: true,
          },
        },
      },
    });
  }

  async updateEstado(id: string, estado: 'Abierta' | 'Cerrada') {
    return this.prisma.terminal.update({
      where: { id },
      data: { estado },
    });
  }

  async remove(id: string) {
    return this.prisma.terminal.delete({
      where: { id },
    });
  }
}
