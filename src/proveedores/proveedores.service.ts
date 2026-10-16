import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { CreateProveedorDto } from './dto/create-proveedor.dto.js';
import { UpdateProveedorDto } from './dto/update-proveedor.dto.js';

@Injectable()
export class ProveedoresService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async findAll(organizacionId?: string, search?: string, categoria?: string, activo?: string) {
    const where: any = {};

    if (organizacionId) {
      where.organizacionId = organizacionId;
    }

    if (activo !== undefined && activo !== '') {
      where.activo = activo === 'true';
    }

    if (categoria && categoria !== 'Todas') {
      where.categoria = { contains: categoria, mode: 'insensitive' };
    }

    if (search) {
      const q = search.trim();
      where.OR = [
        { nombre: { contains: q, mode: 'insensitive' } },
        { contacto: { contains: q, mode: 'insensitive' } },
        { rfc: { contains: q, mode: 'insensitive' } },
        { telefono: { contains: q, mode: 'insensitive' } },
        { whatsapp: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { ciudad: { contains: q, mode: 'insensitive' } },
      ];
    }

    const proveedores = await this.prisma.proveedor.findMany({
      where,
      include: {
        _count: {
          select: { articulos: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });

    return proveedores.map((p) => ({
      ...p,
      limiteCredito: Number(p.limiteCredito || 0),
      saldoPendiente: Number(p.saldoPendiente || 0),
      articulosCount: p._count?.articulos || 0,
    }));
  }

  async getEstadisticas(organizacionId: string) {
    const proveedores = await this.prisma.proveedor.findMany({
      where: { organizacionId },
      select: {
        id: true,
        activo: true,
        categoria: true,
        diasCredito: true,
        limiteCredito: true,
        saldoPendiente: true,
      },
    });

    const total = proveedores.length;
    const activos = proveedores.filter((p) => p.activo).length;
    const conCredito = proveedores.filter((p) => (p.diasCredito || 0) > 0).length;
    const totalSaldoPendiente = proveedores.reduce(
      (sum, p) => sum + Number(p.saldoPendiente || 0),
      0,
    );
    const categorias = Array.from(
      new Set(proveedores.map((p) => p.categoria).filter(Boolean)),
    ) as string[];

    return {
      total,
      activos,
      conCredito,
      totalSaldoPendiente: Number(totalSaldoPendiente.toFixed(2)),
      categoriasCount: categorias.length,
      categorias,
    };
  }

  async findOne(id: string) {
    const proveedor = await this.prisma.proveedor.findUnique({
      where: { id },
      include: {
        articulos: {
          select: {
            id: true,
            codigo: true,
            nombre: true,
            precioCompra: true,
            precioVenta: true,
            unidad: true,
            activo: true,
          },
          take: 50,
        },
        _count: {
          select: { articulos: true },
        },
      },
    });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID "${id}" no encontrado`);
    }

    return {
      ...proveedor,
      limiteCredito: Number(proveedor.limiteCredito || 0),
      saldoPendiente: Number(proveedor.saldoPendiente || 0),
      articulosCount: proveedor._count?.articulos || 0,
      articulos: proveedor.articulos.map((a) => ({
        ...a,
        precioCompra: Number(a.precioCompra || 0),
        precioVenta: Number(a.precioVenta || 0),
      })),
    };
  }

  async create(data: CreateProveedorDto) {
    const { organizacionId, nombre, ...rest } = data;

    if (!organizacionId) {
      throw new BadRequestException('El ID de organización es requerido');
    }

    const nuevoProveedor = await this.prisma.proveedor.create({
      data: {
        organizacionId,
        nombre: nombre.trim(),
        ...rest,
      },
    });

    const formatted = {
      ...nuevoProveedor,
      limiteCredito: Number(nuevoProveedor.limiteCredito || 0),
      saldoPendiente: Number(nuevoProveedor.saldoPendiente || 0),
      articulosCount: 0,
    };

    // Emitir evento por socket
    try {
      this.eventsGateway.server?.to(`org_${organizacionId}`).emit('proveedor:creado', formatted);
    } catch {}

    return formatted;
  }

  async update(id: string, data: UpdateProveedorDto) {
    const existente = await this.prisma.proveedor.findUnique({ where: { id } });
    if (!existente) {
      throw new NotFoundException(`Proveedor con ID "${id}" no encontrado`);
    }

    const proveedorActualizado = await this.prisma.proveedor.update({
      where: { id },
      data: {
        ...data,
        ...(data.nombre ? { nombre: data.nombre.trim() } : {}),
      },
      include: {
        _count: { select: { articulos: true } },
      },
    });

    const formatted = {
      ...proveedorActualizado,
      limiteCredito: Number(proveedorActualizado.limiteCredito || 0),
      saldoPendiente: Number(proveedorActualizado.saldoPendiente || 0),
      articulosCount: proveedorActualizado._count?.articulos || 0,
    };

    // Emitir evento por socket
    try {
      this.eventsGateway.server
        ?.to(`org_${proveedorActualizado.organizacionId}`)
        .emit('proveedor:actualizado', formatted);
    } catch {}

    return formatted;
  }

  async remove(id: string) {
    const existente = await this.prisma.proveedor.findUnique({
      where: { id },
      include: { _count: { select: { articulos: true } } },
    });

    if (!existente) {
      throw new NotFoundException(`Proveedor con ID "${id}" no encontrado`);
    }

    // Desasociar artículos vinculados en lugar de eliminarlos
    if (existente._count.articulos > 0) {
      await this.prisma.articulo.updateMany({
        where: { proveedorId: id },
        data: { proveedorId: null },
      });
    }

    await this.prisma.proveedor.delete({
      where: { id },
    });

    try {
      this.eventsGateway.server
        ?.to(`org_${existente.organizacionId}`)
        .emit('proveedor:eliminado', { id });
    } catch {}

    return { success: true, message: 'Proveedor eliminado correctamente' };
  }
}
