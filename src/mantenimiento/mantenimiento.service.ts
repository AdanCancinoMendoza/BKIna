import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { MantenimientoAuthDto } from './mantenimiento.dto.js';
import { SecurityTelemetryService } from '../common/services/security-telemetry.service.js';
import bcrypt from 'bcryptjs';

@Injectable()
export class MantenimientoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  /**
   * Valida la contraseña o PIN de un administrador de la organización
   */
  async validarClaveAdministrador(
    organizacionId: string,
    claveAdmin: string,
    usuarioId?: string,
  ): Promise<boolean> {
    if (!claveAdmin || !claveAdmin.trim()) {
      throw new BadRequestException(
        'Se requiere la clave del administrador para autorizar esta acción.',
      );
    }

    const trimmed = claveAdmin.trim();

    // 1. Si se envía usuarioId, verificar si ese usuario es admin y su clave coincide
    if (usuarioId) {
      const usuario = await this.prisma.usuario.findFirst({
        where: { id: usuarioId, organizacionId, activo: true },
        include: { perfil: true },
      });

      if (
        usuario &&
        (usuario.perfil?.esAdmin ||
          usuario.perfil?.nombre?.toLowerCase().includes('admin'))
      ) {
        let esValida = await bcrypt.compare(trimmed, usuario.password);
        if (!esValida && usuario.pin) {
          esValida = await bcrypt.compare(trimmed, usuario.pin).catch(() => false);
        }
        if (esValida) return true;
      }
    }

    // 2. Buscar usuarios con perfil de Administrador en la organización
    const admins = await this.prisma.usuario.findMany({
      where: {
        organizacionId,
        activo: true,
        OR: [
          { perfil: { esAdmin: true } },
          { perfil: { nombre: { contains: 'Admin', mode: 'insensitive' } } },
        ],
      },
    });

    for (const admin of admins) {
      let esValida = await bcrypt.compare(trimmed, admin.password);
      if (!esValida && admin.pin) {
        esValida = await bcrypt.compare(trimmed, admin.pin).catch(() => false);
      }
      if (esValida) return true;
    }

    // 3. Si no hay perfiles explícitos de admin, revisar cualquier usuario activo de la organización
    const todosUsuarios = await this.prisma.usuario.findMany({
      where: { organizacionId, activo: true },
    });
    for (const u of todosUsuarios) {
      let esValida = await bcrypt.compare(trimmed, u.password);
      if (!esValida && u.pin) {
        esValida = await bcrypt.compare(trimmed, u.pin).catch(() => false);
      }
      if (esValida) return true;
    }

    SecurityTelemetryService.registrarIncidente({
      id: randomUUID(),
      ip: 'anónimo',
      tipo: 'INTENTO_DESTRUCCION',
      ruta: '/inagerlis/mantenimiento',
      detalles: `Intento de borrado/destrucción con clave no autorizada para organización [${organizacionId}]`,
      timestamp: new Date().toISOString(),
      intentos: 1,
      bloqueada: false,
      nivelRiesgo: 'CRITICO',
    });

    throw new UnauthorizedException(
      'Clave de administrador incorrecta. Operación no autorizada.',
    );
  }

  /**
   * 1. Elimina todos los artículos e inventarios de la organización
   */
  async eliminarProductos(dto: MantenimientoAuthDto) {
    await this.validarClaveAdministrador(
      dto.organizacionId,
      dto.claveAdmin,
      dto.usuarioId,
    );

    const total = await this.prisma.articulo.count({
      where: { organizacionId: dto.organizacionId },
    });

    if (total === 0) {
      return {
        success: true,
        mensaje: 'No hay productos registrados para eliminar.',
        eliminados: 0,
      };
    }

    const res = await this.prisma.articulo.deleteMany({
      where: { organizacionId: dto.organizacionId },
    });

    if (this.eventsGateway.server) {
      this.eventsGateway.server
        .to(`org_${dto.organizacionId}`)
        .emit('articulo:actualizado');
    }

    return {
      success: true,
      mensaje: `Se han eliminado correctamente ${res.count} artículos del catálogo.`,
      eliminados: res.count,
    };
  }

  /**
   * 2. Elimina todas las subfamilias y familias de la organización
   */
  async eliminarFamilias(dto: MantenimientoAuthDto) {
    await this.validarClaveAdministrador(
      dto.organizacionId,
      dto.claveAdmin,
      dto.usuarioId,
    );

    // Desasociar familias y subfamilias de artículos
    await this.prisma.articulo.updateMany({
      where: { organizacionId: dto.organizacionId },
      data: {
        familiaId: null,
        subfamiliaId: null,
      },
    });

    // Eliminar subfamilias
    const subfamiliasRes = await this.prisma.subfamilia.deleteMany({
      where: {
        familia: { organizacionId: dto.organizacionId },
      },
    });

    // Eliminar familias
    const familiasRes = await this.prisma.familia.deleteMany({
      where: { organizacionId: dto.organizacionId },
    });

    if (this.eventsGateway.server) {
      this.eventsGateway.server
        .to(`org_${dto.organizacionId}`)
        .emit('articulo:actualizado');
      this.eventsGateway.server
        .to(`org_${dto.organizacionId}`)
        .emit('familia:actualizado');
    }

    return {
      success: true,
      mensaje: `Se eliminaron ${familiasRes.count} familias y ${subfamiliasRes.count} subfamilias.`,
      familiasEliminadas: familiasRes.count,
      subfamiliasEliminadas: subfamiliasRes.count,
    };
  }

  /**
   * 3. Elimina todos los clientes de la organización
   */
  async eliminarClientes(dto: MantenimientoAuthDto) {
    await this.validarClaveAdministrador(
      dto.organizacionId,
      dto.claveAdmin,
      dto.usuarioId,
    );

    const total = await this.prisma.cliente.count({
      where: { organizacionId: dto.organizacionId },
    });

    if (total === 0) {
      return {
        success: true,
        mensaje: 'No hay clientes registrados para eliminar.',
        eliminados: 0,
      };
    }

    // Desasociar ventas de clientes
    await this.prisma.venta.updateMany({
      where: { organizacionId: dto.organizacionId },
      data: { clienteId: null },
    });

    const res = await this.prisma.cliente.deleteMany({
      where: { organizacionId: dto.organizacionId },
    });

    if (this.eventsGateway.server) {
      this.eventsGateway.server
        .to(`org_${dto.organizacionId}`)
        .emit('cliente:actualizado');
    }

    return {
      success: true,
      mensaje: `Se han eliminado correctamente ${res.count} clientes del directorio.`,
      eliminados: res.count,
    };
  }

  /**
   * 4. Elimina todas las ventas, tickets e historial de ventas
   */
  async eliminarVentas(dto: MantenimientoAuthDto) {
    await this.validarClaveAdministrador(
      dto.organizacionId,
      dto.claveAdmin,
      dto.usuarioId,
    );

    const total = await this.prisma.venta.count({
      where: { organizacionId: dto.organizacionId },
    });

    if (total === 0) {
      return {
        success: true,
        mensaje: 'No hay ventas ni tickets registrados para eliminar.',
        eliminados: 0,
      };
    }

    // Eliminar movimientos de stock generados por ventas
    await this.prisma.movimientoStock.deleteMany({
      where: {
        tipo: 'VENTA',
        sucursal: { organizacionId: dto.organizacionId },
      },
    });

    // DetalleVenta se elimina en cascada automáticamente al eliminar Venta
    const res = await this.prisma.venta.deleteMany({
      where: { organizacionId: dto.organizacionId },
    });

    if (this.eventsGateway.server) {
      this.eventsGateway.server
        .to(`org_${dto.organizacionId}`)
        .emit('venta:actualizada');
      this.eventsGateway.server
        .to(`org_${dto.organizacionId}`)
        .emit('caja:actualizada');
    }

    return {
      success: true,
      mensaje: `Se han eliminado correctamente ${res.count} ventas y todo su historial de tickets.`,
      eliminados: res.count,
    };
  }

  /**
   * 5. Reset Total / Limpieza completa del sistema
   */
  async resetTotal(dto: MantenimientoAuthDto) {
    await this.validarClaveAdministrador(
      dto.organizacionId,
      dto.claveAdmin,
      dto.usuarioId,
    );

    // 1. Movimientos de stock y ventas
    await this.prisma.movimientoStock.deleteMany({
      where: {
        sucursal: { organizacionId: dto.organizacionId },
      },
    });
    const ventasDel = await this.prisma.venta.deleteMany({
      where: { organizacionId: dto.organizacionId },
    });

    // 2. Artículos e inventarios
    const articulosDel = await this.prisma.articulo.deleteMany({
      where: { organizacionId: dto.organizacionId },
    });

    // 3. Subfamilias y familias
    const subfamiliasDel = await this.prisma.subfamilia.deleteMany({
      where: { familia: { organizacionId: dto.organizacionId } },
    });
    const familiasDel = await this.prisma.familia.deleteMany({
      where: { organizacionId: dto.organizacionId },
    });

    // 4. Clientes
    const clientesDel = await this.prisma.cliente.deleteMany({
      where: { organizacionId: dto.organizacionId },
    });

    if (this.eventsGateway.server) {
      this.eventsGateway.server
        .to(`org_${dto.organizacionId}`)
        .emit('articulo:actualizado');
      this.eventsGateway.server
        .to(`org_${dto.organizacionId}`)
        .emit('familia:actualizado');
      this.eventsGateway.server
        .to(`org_${dto.organizacionId}`)
        .emit('cliente:actualizado');
      this.eventsGateway.server
        .to(`org_${dto.organizacionId}`)
        .emit('venta:actualizada');
    }

    return {
      success: true,
      mensaje: `Limpieza total completada: ${articulosDel.count} artículos, ${familiasDel.count} familias, ${clientesDel.count} clientes y ${ventasDel.count} ventas eliminadas.`,
      articulos: articulosDel.count,
      familias: familiasDel.count,
      clientes: clientesDel.count,
      ventas: ventasDel.count,
    };
  }
}
