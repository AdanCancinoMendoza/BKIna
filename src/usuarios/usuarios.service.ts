import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto, LoginPerfilDto } from './dto/login.dto.js';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/create-usuario.dto.js';
import { SessionAnalyticsService } from '../common/services/session-analytics.service.js';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase().trim();
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
      include: {
        organizacion: {
          select: {
            id: true,
            nombre: true,
            email: true,
            logo: true,
          },
        },
        sucursal: {
          select: {
            id: true,
            nombre: true,
          },
        },
        perfil: {
          select: {
            id: true,
            nombre: true,
            esAdmin: true,
            permisos: true,
            activo: true,
          },
        },
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!usuario.activo) {
      throw new UnauthorizedException('El usuario se encuentra inactivo');
    }

    let passwordValida = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordValida && usuario.pin) {
      const pinComparado = await bcrypt.compare(dto.password, usuario.pin).catch(() => false);
      if (pinComparado) {
        passwordValida = true;
      } else if (dto.password === usuario.pin) {
        passwordValida = true;
        const hashedPin = await bcrypt.hash(dto.password, 10);
        await this.prisma.usuario.update({
          where: { id: usuario.id },
          data: { pin: hashedPin },
        }).catch(() => null);
      }
    }

    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    SessionAnalyticsService.registrarLogin({
      organizacionId: usuario.organizacionId,
      usuarioId: usuario.id,
      usuarioEmail: usuario.email,
    });

    return {
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        perfilId: usuario.perfilId,
        perfil: usuario.perfil,
        organizacionId: usuario.organizacionId,
        sucursalId: usuario.sucursalId,
        organizacion: usuario.organizacion,
        sucursal: usuario.sucursal,
      },
    };
  }

  async loginPerfil(dto: LoginPerfilDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: dto.usuarioId },
      include: {
        organizacion: {
          select: {
            id: true,
            nombre: true,
            logo: true,
          },
        },
        sucursal: {
          select: {
            id: true,
            nombre: true,
          },
        },
        perfil: {
          select: {
            id: true,
            nombre: true,
            esAdmin: true,
            permisos: true,
            activo: true,
          },
        },
      },
    });

    if (!usuario) {
      throw new NotFoundException('Perfil de usuario no encontrado');
    }

    if (!usuario.activo) {
      throw new UnauthorizedException('El usuario está inactivo');
    }

    let credencialValida = await bcrypt.compare(dto.password, usuario.password);

    if (!credencialValida && usuario.pin) {
      const pinComparado = await bcrypt.compare(dto.password, usuario.pin).catch(() => false);
      if (pinComparado) {
        credencialValida = true;
      } else if (dto.password === usuario.pin) {
        // Migración transparente si el PIN estaba en texto plano: hashearlo con bcrypt
        credencialValida = true;
        const hashedPin = await bcrypt.hash(dto.password, 10);
        await this.prisma.usuario.update({
          where: { id: usuario.id },
          data: { pin: hashedPin },
        }).catch(() => null);
      }
    }

    if (!credencialValida) {
      throw new UnauthorizedException('Contraseña o PIN incorrecto');
    }

    SessionAnalyticsService.registrarLogin({
      organizacionId: usuario.organizacionId,
      usuarioId: usuario.id,
      usuarioEmail: usuario.email,
    });

    return {
      mensaje: 'Acceso de perfil correcto',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        perfilId: usuario.perfilId,
        perfil: usuario.perfil,
        organizacionId: usuario.organizacionId,
        sucursalId: usuario.sucursalId,
        organizacion: usuario.organizacion,
        sucursal: usuario.sucursal,
      },
    };
  }

  async findByOrganizacion(organizacionId: string, search?: string) {
    const where: any = {
      organizacionId,
    };

    if (search) {
      const q = search.trim();
      where.OR = [
        { nombre: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { telefono: { contains: q, mode: 'insensitive' } },
      ];
    }

    return this.prisma.usuario.findMany({
      where,
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        activo: true,
        sucursalId: true,
        perfilId: true,
        createdAt: true,
        updatedAt: true,
        perfil: {
          select: {
            id: true,
            nombre: true,
            esAdmin: true,
            permisos: true,
          },
        },
        sucursal: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        activo: true,
        organizacionId: true,
        sucursalId: true,
        perfilId: true,
        createdAt: true,
        updatedAt: true,
        organizacion: {
          select: {
            id: true,
            nombre: true,
            email: true,
            telefono: true,
            rfc: true,
            direccion: true,
            logo: true,
            temaId: true,
            colorPrimario: true,
            colorSecundario: true,
          },
        },
        sucursal: true,
        perfil: true,
      },
    });

    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async create(dto: CreateUsuarioDto) {
    const email = dto.email.toLowerCase().trim();

    const existente = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (existente) {
      throw new ConflictException(`El correo electrónico ${email} ya está registrado`);
    }

    const perfil = await this.prisma.perfil.findUnique({
      where: { id: dto.perfilId },
    });

    if (!perfil) {
      throw new BadRequestException('El perfil seleccionado no existe');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const hashedPin = dto.pin && dto.pin.trim() ? await bcrypt.hash(dto.pin.trim(), 10) : null;

    const usuario = await this.prisma.usuario.create({
      data: {
        organizacionId: dto.organizacionId,
        nombre: dto.nombre.trim(),
        email,
        telefono: dto.telefono ? dto.telefono.trim() : null,
        password: hashedPassword,
        pin: hashedPin,
        perfilId: dto.perfilId,
        sucursalId: dto.sucursalId || null,
        activo: dto.activo !== undefined ? dto.activo : true,
      },
      include: {
        perfil: {
          select: {
            id: true,
            nombre: true,
            esAdmin: true,
            permisos: true,
          },
        },
        sucursal: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      perfilId: usuario.perfilId,
      perfil: usuario.perfil,
      sucursalId: usuario.sucursalId,
      sucursal: usuario.sucursal,
      activo: usuario.activo,
      createdAt: usuario.createdAt,
    };
  }

  async update(id: string, dto: UpdateUsuarioDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const data: any = {};

    if (dto.email && dto.email.toLowerCase().trim() !== usuario.email) {
      const email = dto.email.toLowerCase().trim();
      const conflict = await this.prisma.usuario.findUnique({
        where: { email },
      });
      if (conflict) {
        throw new ConflictException(`El correo ${email} ya está en uso por otro usuario`);
      }
      data.email = email;
    }

    if (dto.nombre) data.nombre = dto.nombre.trim();
    if (dto.telefono !== undefined) data.telefono = dto.telefono ? dto.telefono.trim() : null;
    if (dto.sucursalId !== undefined) data.sucursalId = dto.sucursalId || null;
    if (dto.perfilId !== undefined) data.perfilId = dto.perfilId;
    if (dto.activo !== undefined) data.activo = dto.activo;

    if (dto.password && dto.password.trim().length >= 6) {
      data.password = await bcrypt.hash(dto.password.trim(), 10);
    }

    if (dto.pin !== undefined) {
      data.pin = dto.pin && dto.pin.trim() ? await bcrypt.hash(dto.pin.trim(), 10) : null;
    }

    const actualizado = await this.prisma.usuario.update({
      where: { id },
      data,
      include: {
        perfil: {
          select: {
            id: true,
            nombre: true,
            esAdmin: true,
            permisos: true,
          },
        },
        sucursal: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    return {
      id: actualizado.id,
      nombre: actualizado.nombre,
      email: actualizado.email,
      telefono: actualizado.telefono,
      perfilId: actualizado.perfilId,
      perfil: actualizado.perfil,
      sucursalId: actualizado.sucursalId,
      sucursal: actualizado.sucursal,
      activo: actualizado.activo,
      updatedAt: actualizado.updatedAt,
    };
  }

  async remove(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            ventas: true,
            movimientosStock: true,
          },
        },
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Si tiene ventas o movimientos asociados, hacemos soft delete (activo = false) para integridad referencial
    if (usuario._count.ventas > 0 || usuario._count.movimientosStock > 0) {
      await this.prisma.usuario.update({
        where: { id },
        data: { activo: false },
      });
      return { mensaje: 'Usuario desactivado correctamente debido a historial de operaciones', softDeleted: true };
    }

    await this.prisma.usuario.delete({
      where: { id },
    });

    return { mensaje: 'Usuario eliminado permanentemente', softDeleted: false };
  }
}
