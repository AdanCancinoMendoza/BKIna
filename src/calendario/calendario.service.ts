import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { WhatsappService } from '../whatsapp/whatsapp.service.js';
import { EventsGateway } from '../events/events.gateway.js';

import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty({ message: 'El ID de la organización es obligatorio' })
  organizacionId: string;

  @IsString()
  @IsOptional()
  tipo?: 'PEDIDO' | 'RECORDATORIO' | 'NOTA';

  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsNotEmpty({ message: 'La fecha es obligatoria (YYYY-MM-DD)' })
  fecha: string;

  @IsString()
  @IsOptional()
  hora?: string;

  @IsNumber()
  @IsOptional()
  monto?: number;

  @IsString()
  @IsOptional()
  clienteNombre?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsBoolean()
  @IsOptional()
  enviarWhatsapp?: boolean;

  @IsString()
  @IsOptional()
  estado?: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO' | 'CANCELADO';

  @IsString()
  @IsOptional()
  prioridad?: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
}

export class UpdateEventoDto {
  @IsString()
  @IsOptional()
  tipo?: 'PEDIDO' | 'RECORDATORIO' | 'NOTA';

  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  fecha?: string;

  @IsString()
  @IsOptional()
  hora?: string;

  @IsNumber()
  @IsOptional()
  monto?: number;

  @IsString()
  @IsOptional()
  clienteNombre?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsBoolean()
  @IsOptional()
  enviarWhatsapp?: boolean;

  @IsString()
  @IsOptional()
  estado?: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO' | 'CANCELADO';

  @IsString()
  @IsOptional()
  prioridad?: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
}

@Injectable()
export class CalendarioService {
  private readonly logger = new Logger(CalendarioService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly whatsappService: WhatsappService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async findAll(organizacionId?: string) {
    let whereClause: any = {};
    if (organizacionId) {
      whereClause.organizacionId = organizacionId;
    }
    return this.prisma.eventoCalendario.findMany({
      where: whereClause,
      orderBy: [
        { fecha: 'asc' },
        { hora: 'asc' },
      ],
    });
  }

  async findOne(id: string) {
    const evento = await this.prisma.eventoCalendario.findUnique({
      where: { id },
    });
    if (!evento) {
      throw new NotFoundException(`Evento o pedido con ID ${id} no encontrado.`);
    }
    return evento;
  }

  async create(data: CreateEventoDto) {
    if (!data.organizacionId || !data.titulo || !data.fecha) {
      throw new BadRequestException('organizacionId, titulo y fecha son obligatorios.');
    }

    const nuevo = await this.prisma.eventoCalendario.create({
      data: {
        organizacionId: data.organizacionId,
        tipo: data.tipo || 'RECORDATORIO',
        titulo: data.titulo.trim(),
        descripcion: data.descripcion?.trim() || null,
        fecha: data.fecha.trim(),
        hora: data.hora?.trim() || null,
        monto: data.monto !== undefined && data.monto !== null ? Number(data.monto) : null,
        clienteNombre: data.clienteNombre?.trim() || null,
        telefono: data.telefono?.trim() || null,
        enviarWhatsapp: Boolean(data.enviarWhatsapp),
        estado: data.estado || 'PENDIENTE',
        prioridad: data.prioridad || 'MEDIA',
      },
    });

    // Emitir WebSocket en tiempo real
    this.eventsGateway.emitirCitaCreada(nuevo, `org_${nuevo.organizacionId}`);

    let whatsappEnviado = false;
    let whatsappError: string | undefined;

    // Si se solicitó enviar WhatsApp inmediatamente al registrar
    if (data.enviarWhatsapp && data.telefono?.trim()) {
      try {
        const mensaje = this.generarMensajeWhatsApp(nuevo);
        await this.whatsappService.enviarMensaje(nuevo.organizacionId, data.telefono.trim(), mensaje);
        whatsappEnviado = true;
      } catch (err: any) {
        this.logger.warn(`No se pudo enviar WhatsApp automático para evento ${nuevo.id}: ${err.message}`);
        whatsappError = err.message || 'WhatsApp no conectado en el servidor';
      }
    }

    return {
      ...nuevo,
      whatsappEnviado,
      whatsappError,
    };
  }

  async update(id: string, data: UpdateEventoDto) {
    await this.findOne(id);

    const updated = await this.prisma.eventoCalendario.update({
      where: { id },
      data: {
        tipo: data.tipo,
        titulo: data.titulo?.trim(),
        descripcion: data.descripcion !== undefined ? data.descripcion?.trim() || null : undefined,
        fecha: data.fecha?.trim(),
        hora: data.hora !== undefined ? data.hora?.trim() || null : undefined,
        monto: data.monto !== undefined ? (data.monto !== null ? Number(data.monto) : null) : undefined,
        clienteNombre: data.clienteNombre !== undefined ? data.clienteNombre?.trim() || null : undefined,
        telefono: data.telefono !== undefined ? data.telefono?.trim() || null : undefined,
        enviarWhatsapp: data.enviarWhatsapp,
        estado: data.estado,
        prioridad: data.prioridad,
      },
    });

    // Emitir WebSocket en tiempo real
    this.eventsGateway.emitirCitaActualizada(updated, `org_${updated.organizacionId}`);

    return updated;
  }

  async remove(id: string) {
    const evento = await this.findOne(id);
    await this.prisma.eventoCalendario.delete({
      where: { id },
    });

    // Emitir WebSocket en tiempo real
    this.eventsGateway.emitirCitaEliminada(id, `org_${evento.organizacionId}`, evento.organizacionId);

    return { exito: true, mensaje: 'Elemento eliminado correctamente.' };
  }

  async enviarRecordatorioWhatsApp(id: string, telefonoDestino?: string, mensajePersonalizado?: string) {
    const evento = await this.findOne(id);
    const telefonoFinal = telefonoDestino?.trim() || evento.telefono?.trim();

    if (!telefonoFinal) {
      throw new BadRequestException('No se especificó un número de teléfono de WhatsApp.');
    }

    const texto = mensajePersonalizado?.trim() || this.generarMensajeWhatsApp(evento);
    const res = await this.whatsappService.enviarMensaje(evento.organizacionId, telefonoFinal, texto);

    return {
      exito: true,
      mensaje: 'Recordatorio enviado a WhatsApp con éxito.',
      telefono: telefonoFinal,
      detalle: res,
    };
  }

  private generarMensajeWhatsApp(evento: any): string {
    const horaTexto = evento.hora ? ` a las ${evento.hora}` : '';
    const fechaTexto = `${evento.fecha}${horaTexto}`;

    if (evento.tipo === 'PEDIDO') {
      const cliente = evento.clienteNombre ? ` para *${evento.clienteNombre}*` : '';
      const monto = evento.monto ? `\n💰 Total: $${Number(evento.monto).toFixed(2)}` : '';
      const detalle = evento.descripcion ? `\n📝 Detalle: ${evento.descripcion}` : '';
      return `📦 *RECORDATORIO DE PEDIDO*\n\nHola, te recordamos el pedido *${evento.titulo}*${cliente}.\n📅 Entrega programada: *${fechaTexto}*${monto}${detalle}\n📌 Estado: *${evento.estado}*\n\n¡Gracias por tu preferencia!`;
    }

    const descripcion = evento.descripcion ? `\n\n📌 *Nota:* ${evento.descripcion}` : '';
    const prioridad = evento.prioridad === 'URGENTE' ? ' 🚨 [URGENTE]' : evento.prioridad === 'ALTA' ? ' ⚠️ [PRIORIDAD ALTA]' : '';
    return `⏰ *RECORDATORIO DEL SISTEMA*${prioridad}\n\n*${evento.titulo}*\n📅 Fecha: *${fechaTexto}*${descripcion}\n\nNotificación enviada desde el sistema CRM.`;
  }
}
