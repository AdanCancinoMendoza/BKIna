import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegistroOrganizacionDto } from './dto/registro-organizacion.dto.js';

@Injectable()
export class OrganizacionesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Registro integral de una Organización / Cuenta de Empresa:
   * 1. Valida unicidad de correos de usuarios.
   * 2. Encripta contraseñas.
   * 3. Crea Organización, Sucursal inicial, Administrador, Vendedor (opcional) y Suscripción en una transacción.
   */
  async registrarEmpresa(dto: RegistroOrganizacionDto) {
    // 1. Validar que el correo del admin no esté registrado
    const adminExistente = await this.prisma.usuario.findUnique({
      where: { email: dto.adminCorreo.toLowerCase().trim() },
    });

    if (adminExistente) {
      throw new ConflictException(
        `El correo ${dto.adminCorreo} ya está registrado para otro usuario.`,
      );
    }

    // 2. Si viene correo de vendedor, validar que sea distinto al del admin y no exista
    if (dto.vendedorCorreo) {
      const vendEmail = dto.vendedorCorreo.toLowerCase().trim();
      if (vendEmail === dto.adminCorreo.toLowerCase().trim()) {
        throw new BadRequestException(
          'El correo del vendedor debe ser diferente al del administrador.',
        );
      }

      const vendedorExistente = await this.prisma.usuario.findUnique({
        where: { email: vendEmail },
      });

      if (vendedorExistente) {
        throw new ConflictException(
          `El correo del vendedor ${dto.vendedorCorreo} ya está registrado.`,
        );
      }
    }

    // 3. Hashear contraseñas
    const hashedAdminPassword = await bcrypt.hash(dto.adminPassword, 10);
    const hashedVendedorPassword = dto.vendedorPassword
      ? await bcrypt.hash(dto.vendedorPassword, 10)
      : null;

    // 4. Fechas de suscripción
    const fechaInicio = new Date();
    let fechaFin = dto.fechaFin ? new Date(dto.fechaFin) : null;
    if (!fechaFin || isNaN(fechaFin.getTime())) {
      // 30 días de periodo por defecto
      fechaFin = new Date(fechaInicio.getTime() + 30 * 24 * 60 * 60 * 1000);
    }

    // 5. Transacción Prisma para garantizar integridad atómica
    return this.prisma.$transaction(async (tx) => {
      // A) Crear la Organización
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

      // B) Crear la Sucursal inicial
      const sucursal = await tx.sucursal.create({
        data: {
          organizacionId: organizacion.id,
          nombre: dto.sucursalNombre.trim(),
          telefono: dto.sucursalTelefono ? dto.sucursalTelefono.trim() : null,
          direccion: dto.sucursalDireccion ? dto.sucursalDireccion.trim() : null,
          activo: true,
        },
      });

      // C) Crear Terminal por defecto para la sucursal (ej. "Caja 01")
      const terminal = await tx.terminal.create({
        data: {
          sucursalId: sucursal.id,
          nombre: 'Caja 01',
          estado: 'Cerrada',
        },
      });

      // D) Crear Usuario Administrador
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

      // E) Crear Usuario Vendedor (si se proporcionaron datos)
      let vendedor: any = null;
      if (
        dto.vendedorNombre &&
        dto.vendedorCorreo &&
        hashedVendedorPassword
      ) {
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

      // F) Crear Suscripción
      const suscripcion = await tx.suscripcion.create({
        data: {
          organizacionId: organizacion.id,
          plan: dto.plan ? dto.plan.trim() : 'BASICO',
          estado: 'Activa',
          fechaInicio,
          fechaFin,
        },
      });

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

  async findOne(id: string) {
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
}
