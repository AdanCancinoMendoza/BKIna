import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ArticulosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    organizacionId?: string,
    search?: string,
    familiaId?: string,
    sucursalId?: string,
  ) {
    const where: any = {};

    if (organizacionId) where.organizacionId = organizacionId;
    if (familiaId && familiaId !== 'Todas') where.familiaId = familiaId;

    if (search) {
      where.OR = [
        { nombre: { contains: search, mode: 'insensitive' } },
        { codigo: { contains: search, mode: 'insensitive' } },
        { descripcion: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.articulo.findMany({
      where,
      include: {
        familia: true,
        subfamilia: true,
        inventarios: sucursalId ? { where: { sucursalId } } : true,
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async findByCodigo(codigo: string, organizacionId: string) {
    const articulo = await this.prisma.articulo.findFirst({
      where: {
        codigo: codigo.trim(),
        organizacionId,
      },
      include: {
        familia: true,
        subfamilia: true,
        inventarios: true,
      },
    });

    if (!articulo) {
      throw new NotFoundException(`Artículo con código ${codigo} no encontrado`);
    }

    return articulo;
  }

  async findOne(id: string) {
    const articulo = await this.prisma.articulo.findUnique({
      where: { id },
      include: {
        familia: true,
        subfamilia: true,
        inventarios: true,
      },
    });

    if (!articulo) {
      throw new NotFoundException('Artículo no encontrado');
    }

    return articulo;
  }

  async create(data: {
    organizacionId: string;
    codigo: string;
    nombre: string;
    descripcion?: string;
    precioCompra: number;
    precioVenta: number;
    unidad?: string;
    imagen?: string;
    familiaId?: string;
    subfamiliaId?: string;
    stockInicial?: number;
    sucursalId?: string;
  }) {
    const existe = await this.prisma.articulo.findFirst({
      where: {
        organizacionId: data.organizacionId,
        codigo: data.codigo.trim(),
      },
    });

    if (existe) {
      throw new ConflictException(
        `Ya existe un artículo con el código ${data.codigo}`,
      );
    }

    return this.prisma.$transaction(async (tx: any) => {
      const articulo = await tx.articulo.create({
        data: {
          organizacionId: data.organizacionId,
          codigo: data.codigo.trim(),
          nombre: data.nombre.trim(),
          descripcion: data.descripcion?.trim(),
          precioCompra: data.precioCompra,
          precioVenta: data.precioVenta,
          unidad: data.unidad || 'Pieza',
          imagen: data.imagen,
          familiaId: data.familiaId,
          subfamiliaId: data.subfamiliaId,
        },
      });

      if (data.sucursalId && data.stockInicial !== undefined) {
        await tx.inventario.create({
          data: {
            sucursalId: data.sucursalId,
            articuloId: articulo.id,
            stockActual: data.stockInicial,
            stockMinimo: 5,
            stockMaximo: 100,
          },
        });

        if (data.stockInicial > 0) {
          await tx.movimientoStock.create({
            data: {
              articuloId: articulo.id,
              sucursalId: data.sucursalId,
              tipo: 'ENTRADA',
              cantidad: data.stockInicial,
              motivo: 'Inventario inicial',
            },
          });
        }
      }

      return articulo;
    });
  }

  async update(id: string, data: any) {
    return this.prisma.articulo.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.articulo.delete({
      where: { id },
    });
  }
}
