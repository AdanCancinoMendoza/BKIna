import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePerfilDto, UpdatePerfilDto } from './dto/create-perfil.dto.js';
import {
  PERMISOS_ADMINISTRADOR,
  PERMISOS_CAJERO,
  PERMISOS_VENDEDOR,
  PLANTILLA_PERMISOS_DEFAULT,
} from './data/permisos-default.js';

@Injectable()
export class PerfilesService {
  constructor(private readonly prisma: PrismaService) {}

  getPlantilla() {
    return {
      plantilla: PLANTILLA_PERMISOS_DEFAULT,
      admin: PERMISOS_ADMINISTRADOR,
      cajero: PERMISOS_CAJERO,
      vendedor: PERMISOS_VENDEDOR,
    };
  }

  async asegurarPerfilesDefault(organizacionId: string) {
    const existentes = await this.prisma.perfil.findMany({
      where: { organizacionId },
      select: { nombre: true },
    });

    const nombresExistentes = new Set(existentes.map((p) => p.nombre.toLowerCase().trim()));

    if (!nombresExistentes.has('administrador')) {
      await this.prisma.perfil.create({
        data: {
          organizacionId,
          nombre: 'Administrador',
          descripcion: 'Control total de todos los módulos del sistema y punto de venta.',
          esAdmin: true,
          activo: true,
          permisos: PERMISOS_ADMINISTRADOR as any,
        },
      });
    }

    if (!nombresExistentes.has('cajero')) {
      await this.prisma.perfil.create({
        data: {
          organizacionId,
          nombre: 'Cajero',
          descripcion: 'Operación en Punto de Venta, cobros y corte de caja.',
          esAdmin: false,
          activo: true,
          permisos: PERMISOS_CAJERO as any,
        },
      });
    }

    if (!nombresExistentes.has('vendedor')) {
      await this.prisma.perfil.create({
        data: {
          organizacionId,
          nombre: 'Vendedor',
          descripcion: 'Atención a clientes, consultas de catálogo y ventas.',
          esAdmin: false,
          activo: true,
          permisos: PERMISOS_VENDEDOR as any,
        },
      });
    }
  }

  async findByOrganizacion(organizacionId: string) {
    if (!organizacionId) {
      throw new BadRequestException('El ID de organización es requerido');
    }

    // Asegurar que la organización tenga al menos los perfiles básicos
    await this.asegurarPerfilesDefault(organizacionId);

    const perfiles = await this.prisma.perfil.findMany({
      where: { organizacionId },
      include: {
        _count: {
          select: {
            usuarios: {
              where: { activo: true },
            },
          },
        },
      },
      orderBy: [{ esAdmin: 'desc' }, { nombre: 'asc' }],
    });

    return perfiles.map((p) => ({
      id: p.id,
      organizacionId: p.organizacionId,
      nombre: p.nombre,
      descripcion: p.descripcion,
      esAdmin: p.esAdmin,
      activo: p.activo,
      permisos: p.permisos,
      usuariosCount: p._count.usuarios,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));
  }

  async findOne(id: string) {
    const perfil = await this.prisma.perfil.findUnique({
      where: { id },
      include: {
        usuarios: {
          where: { activo: true },
          select: {
            id: true,
            nombre: true,
            email: true,
            activo: true,
            sucursal: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
      },
    });

    if (!perfil) {
      throw new NotFoundException('Perfil no encontrado');
    }

    return perfil;
  }

  async create(dto: CreatePerfilDto) {
    const nombreNormalizado = dto.nombre.trim();

    const existe = await this.prisma.perfil.findFirst({
      where: {
        organizacionId: dto.organizacionId,
        nombre: { equals: nombreNormalizado, mode: 'insensitive' },
      },
    });

    if (existe) {
      throw new ConflictException(
        `Ya existe un perfil con el nombre "${nombreNormalizado}" en esta organización`,
      );
    }

    return this.prisma.perfil.create({
      data: {
        organizacionId: dto.organizacionId,
        nombre: nombreNormalizado,
        descripcion: dto.descripcion?.trim() || null,
        esAdmin: Boolean(dto.esAdmin),
        activo: dto.activo !== undefined ? dto.activo : true,
        permisos: dto.permisos,
      },
    });
  }

  async update(id: string, dto: UpdatePerfilDto) {
    const perfilActual = await this.prisma.perfil.findUnique({
      where: { id },
    });

    if (!perfilActual) {
      throw new NotFoundException('Perfil no encontrado');
    }

    const data: any = {};

    if (dto.nombre && dto.nombre.trim() !== perfilActual.nombre) {
      const nuevoNombre = dto.nombre.trim();
      const duplicado = await this.prisma.perfil.findFirst({
        where: {
          organizacionId: perfilActual.organizacionId,
          nombre: { equals: nuevoNombre, mode: 'insensitive' },
          id: { not: id },
        },
      });

      if (duplicado) {
        throw new ConflictException(
          `Ya existe otro perfil llamado "${nuevoNombre}" en esta organización`,
        );
      }
      data.nombre = nuevoNombre;
    }

    if (dto.descripcion !== undefined) {
      data.descripcion = dto.descripcion?.trim() || null;
    }

    if (dto.esAdmin !== undefined) {
      data.esAdmin = Boolean(dto.esAdmin);
    }

    if (dto.activo !== undefined) {
      data.activo = Boolean(dto.activo);
    }

    if (dto.permisos !== undefined) {
      data.permisos = dto.permisos;
    }

    return this.prisma.perfil.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const perfil = await this.prisma.perfil.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            usuarios: {
              where: { activo: true },
            },
          },
        },
      },
    });

    if (!perfil) {
      throw new NotFoundException('Perfil no encontrado');
    }

    if (perfil.esAdmin) {
      throw new BadRequestException('No se puede eliminar el perfil de Administrador principal');
    }

    if (perfil._count.usuarios > 0) {
      throw new BadRequestException(
        `No se puede eliminar el perfil "${perfil.nombre}" porque tiene ${perfil._count.usuarios} usuario(s) asignado(s). Reasigna los usuarios antes de eliminarlo.`,
      );
    }

    return this.prisma.perfil.delete({
      where: { id },
    });
  }
}
