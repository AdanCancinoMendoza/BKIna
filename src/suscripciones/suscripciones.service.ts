import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SuscripcionesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene la suscripción actual de una organización, creando una por defecto si no existe
   */
  async obtenerSuscripcion(organizacionId: string) {
    if (!organizacionId || organizacionId === 'default') {
      throw new BadRequestException('El ID de organización es requerido');
    }

    const org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    if (!org) {
      throw new NotFoundException('Organización no encontrada');
    }

    let suscripcion = await this.prisma.suscripcion.findFirst({
      where: { organizacionId: org.id },
      orderBy: { createdAt: 'desc' },
    });

    if (!suscripcion) {
      const hoy = new Date();
      const fin = new Date();
      fin.setFullYear(fin.getFullYear() + 1); // 1 año de gracia por defecto

      suscripcion = await this.prisma.suscripcion.create({
        data: {
          organizacionId: org.id,
          plan: 'Pro',
          estado: 'Activa',
          fechaInicio: hoy,
          fechaFin: fin,
        },
      });
    }

    return {
      ...suscripcion,
      organizacion: {
        id: org.id,
        nombre: org.nombre,
      },
      diasRestantes: Math.max(
        0,
        Math.ceil((new Date(suscripcion.fechaFin).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      ),
    };
  }

  /**
   * Actualiza el plan o estado de la suscripción
   */
  async actualizarSuscripcion(
    organizacionId: string,
    data: { plan?: string; estado?: string; fechaFin?: Date | string },
  ) {
    const suscripcion = await this.obtenerSuscripcion(organizacionId);

    return this.prisma.suscripcion.update({
      where: { id: suscripcion.id },
      data: {
        plan: data.plan || undefined,
        estado: data.estado || undefined,
        fechaFin: data.fechaFin ? new Date(data.fechaFin) : undefined,
      },
    });
  }

  /**
   * Cambia el plan y extiende el periodo
   */
  async cambiarPlan(
    organizacionId: string,
    plan: string,
    periodo: 'mensual' | 'anual' = 'mensual',
  ) {
    const planesPermitidos: Record<string, string> = {
      basico: 'Básico',
      básico: 'Básico',
      pro: 'Pro',
      enterprise: 'Enterprise',
      empresarial: 'Enterprise',
    };
    const planKey = (plan || '').trim().toLowerCase();
    const planValido = planesPermitidos[planKey];
    if (!planValido) {
      throw new BadRequestException(`El plan "${plan}" no es válido. Opciones: Básico, Pro, Enterprise.`);
    }

    const suscripcion = await this.obtenerSuscripcion(organizacionId);
    const ahora = new Date();
    const nuevaFechaFin = new Date();

    if (periodo === 'anual') {
      nuevaFechaFin.setFullYear(nuevaFechaFin.getFullYear() + 1);
    } else {
      nuevaFechaFin.setMonth(nuevaFechaFin.getMonth() + 1);
    }

    return this.prisma.suscripcion.update({
      where: { id: suscripcion.id },
      data: {
        plan: planValido,
        estado: 'Activa',
        fechaInicio: ahora,
        fechaFin: nuevaFechaFin,
      },
    });
  }

  /**
   * Planes disponibles en el ecosistema Inagerlis
   */
  obtenerPlanes() {
    return [
      {
        id: 'basico',
        nombre: 'Básico',
        precioMensual: 499,
        precioAnual: 4990,
        limiteUsuarios: 2,
        limiteSucursales: 1,
        limiteArticulos: 500,
        soporteOffline: true,
        whatsappMarketing: false,
      },
      {
        id: 'pro',
        nombre: 'Pro',
        precioMensual: 899,
        precioAnual: 8990,
        limiteUsuarios: 10,
        limiteSucursales: 3,
        limiteArticulos: 5000,
        soporteOffline: true,
        whatsappMarketing: true,
      },
      {
        id: 'enterprise',
        nombre: 'Enterprise',
        precioMensual: 1699,
        precioAnual: 16990,
        limiteUsuarios: 999,
        limiteSucursales: 99,
        limiteArticulos: 99999,
        soporteOffline: true,
        whatsappMarketing: true,
      },
    ];
  }
}
