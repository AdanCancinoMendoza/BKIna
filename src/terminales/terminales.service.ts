import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TerminalesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(sucursalId?: string) {
    const where: any = {};
    if (sucursalId) where.sucursalId = sucursalId;

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

  async create(data: { sucursalId: string; nombre: string }) {
    return this.prisma.terminal.create({
      data: {
        sucursalId: data.sucursalId,
        nombre: data.nombre.trim(),
        estado: 'Cerrada',
      },
    });
  }

  async updateEstado(id: string, estado: 'Abierta' | 'Cerrada') {
    return this.prisma.terminal.update({
      where: { id },
      data: { estado },
    });
  }
}
