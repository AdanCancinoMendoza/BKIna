import { Injectable, Logger, OnModuleDestroy, NotFoundException, BadRequestException } from '@nestjs/common';
import path from 'node:path';
import fs from 'node:fs';
import baileysPkg, {
  DisconnectReason,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import QRCode from 'qrcode';
import pino from 'pino';

import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';

const makeWASocket = (baileysPkg as any).default || baileysPkg;

export type WhatsAppEstado = 'DESCONECTADO' | 'GENERANDO_QR' | 'CONECTADO';

interface SessionData {
  sock: any;
  qrCode: string | null;
  estado: WhatsAppEstado;
  info: {
    telefono?: string;
    nombre?: string;
    conectadoEn?: Date;
  } | null;
  reconnectAttempts: number;
}

@Injectable()
export class WhatsappService implements OnModuleDestroy {
  private readonly logger = new Logger(WhatsappService.name);
  private sessions = new Map<string, SessionData>();
  private activeCampaigns = new Map<string, boolean>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  onModuleDestroy() {
    // Cerrar todas las sesiones al apagar el servidor
    for (const [orgId, session] of this.sessions.entries()) {
      try {
        if (session.sock) {
          session.sock.end?.();
        }
      } catch (e) {
        this.logger.error(`Error al cerrar sesión de ${orgId}:`, e);
      }
    }
  }

  private getSessionPath(organizacionId: string): string {
    const baseDir = path.join(process.cwd(), 'whatsapp-sessions');
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
    return path.join(baseDir, `org_${organizacionId}`);
  }

  async obtenerEstado(organizacionId: string) {
    let org = null;
    if (organizacionId && organizacionId !== 'default') {
      org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || organizacionId;

    const session = this.sessions.get(resolvedOrgId);

    // Si no está en memoria pero la carpeta de sesión existe, intentar reconectar
    const sessionDir = this.getSessionPath(resolvedOrgId);
    const tieneCreds = fs.existsSync(path.join(sessionDir, 'creds.json'));

    if (!session && tieneCreds) {
      // Iniciar reconexión silenciosa en segundo plano
      this.iniciarConexion(resolvedOrgId).catch((err) =>
        this.logger.warn(`No se pudo reconectar automáticamente ${resolvedOrgId}:`, err),
      );
    }

    return {
      organizacionId: resolvedOrgId,
      estado: session?.estado || (tieneCreds ? 'CONECTADO' : 'DESCONECTADO'),
      qrCode: session?.qrCode || null,
      info: session?.info || (org?.whatsapp ? { telefono: org.whatsapp, nombre: org.nombre } : null),
      numeroGuardado: org?.whatsapp || org?.telefono || null,
    };
  }

  async iniciarConexion(organizacionId: string) {
    let org = null;
    if (organizacionId && organizacionId !== 'default') {
      org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || organizacionId;

    // Si ya está conectado, devolver el estado actual
    const actual = this.sessions.get(resolvedOrgId);
    if (actual && actual.estado === 'CONECTADO' && actual.sock) {
      return {
        estado: 'CONECTADO',
        qrCode: null,
        info: actual.info,
      };
    }

    const sessionDir = this.getSessionPath(resolvedOrgId);
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

    const sessionData: SessionData = {
      sock: null,
      qrCode: null,
      estado: 'GENERANDO_QR',
      info: null,
      reconnectAttempts: actual?.reconnectAttempts || 0,
    };
    this.sessions.set(resolvedOrgId, sessionData);

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      logger: pino({ level: 'silent' }),
      browser: ['Inagerlis CRM', 'Chrome', '1.0.0'],
      syncFullHistory: false,
    });

    sessionData.sock = sock;

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update: any) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        try {
          const qrCodeUrl = await QRCode.toDataURL(qr, {
            width: 320,
            margin: 2,
            color: { dark: '#000000', light: '#FFFFFF' },
          });

          sessionData.qrCode = qrCodeUrl;
          sessionData.estado = 'GENERANDO_QR';

          this.eventsGateway.emitirWhatsAppQR(
            { qrCode: qrCodeUrl, organizacionId: resolvedOrgId },
            `org_${resolvedOrgId}`,
          );
        } catch (e) {
          this.logger.error('Error al generar código QR:', e);
        }
      }

      if (connection === 'open') {
        const userJid = sock.user?.id || '';
        // El id suele venir como "5212491537727:12@s.whatsapp.net"
        let telefonoLimpio = userJid.split(':')[0] || userJid.split('@')[0];
        if (telefonoLimpio.startsWith('521') && telefonoLimpio.length === 13) {
          telefonoLimpio = `52${telefonoLimpio.slice(3)}`;
        }

        const info = {
          telefono: `+${telefonoLimpio}`,
          nombre: sock.user?.name || org?.nombre || 'Negocio',
          conectadoEn: new Date(),
        };

        sessionData.estado = 'CONECTADO';
        sessionData.qrCode = null;
        sessionData.info = info;
        sessionData.reconnectAttempts = 0;

        // Persistir en la base de datos para la organización
        await this.prisma.organizacion.update({
          where: { id: resolvedOrgId },
          data: { whatsapp: info.telefono },
        });

        this.eventsGateway.emitirWhatsAppConectado(
          { organizacionId: resolvedOrgId, telefono: info.telefono, usuario: info },
          `org_${resolvedOrgId}`,
        );

        this.logger.log(`WhatsApp conectado exitosamente para organización: ${resolvedOrgId} (${info.telefono})`);
      }

      if (connection === 'close') {
        const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
        const loggedOut = statusCode === DisconnectReason.loggedOut;

        this.logger.warn(
          `Conexión WhatsApp cerrada para ${resolvedOrgId}. Código: ${statusCode}. LoggedOut: ${loggedOut}`,
        );

        if (loggedOut) {
          sessionData.estado = 'DESCONECTADO';
          sessionData.qrCode = null;
          sessionData.info = null;

          try {
            if (fs.existsSync(sessionDir)) {
              fs.rmSync(sessionDir, { recursive: true, force: true });
            }
          } catch (e) {
            this.logger.error('Error al eliminar credenciales tras logout:', e);
          }

          this.eventsGateway.emitirWhatsAppDesconectado(
            { organizacionId: resolvedOrgId },
            `org_${resolvedOrgId}`,
          );
        } else {
          // Reintentar reconexión si no fue cierre voluntario
          if (sessionData.reconnectAttempts < 5) {
            sessionData.reconnectAttempts += 1;
            setTimeout(() => {
              this.iniciarConexion(resolvedOrgId).catch((e) =>
                this.logger.warn(`Error al reintentar conexión ${resolvedOrgId}:`, e),
              );
            }, 3000);
          } else {
            sessionData.estado = 'DESCONECTADO';
          }
        }
      }
    });

    return {
      estado: sessionData.estado,
      qrCode: sessionData.qrCode,
      info: sessionData.info,
    };
  }

  async desconectar(organizacionId: string) {
    let org = null;
    if (organizacionId && organizacionId !== 'default') {
      org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || organizacionId;

    const session = this.sessions.get(resolvedOrgId);
    if (session?.sock) {
      try {
        await session.sock.logout();
      } catch (err) {
        session.sock.end?.();
      }
    }

    const sessionDir = this.getSessionPath(resolvedOrgId);
    if (fs.existsSync(sessionDir)) {
      try {
        fs.rmSync(sessionDir, { recursive: true, force: true });
      } catch (err) {
        this.logger.warn('No se pudo borrar carpeta de sesión:', err);
      }
    }

    this.sessions.delete(resolvedOrgId);

    this.eventsGateway.emitirWhatsAppDesconectado(
      { organizacionId: resolvedOrgId },
      `org_${resolvedOrgId}`,
    );

    return { exito: true, mensaje: 'Sesión de WhatsApp desconectada correctamente.' };
  }

  async enviarMensaje(organizacionId: string, telefono: string, texto: string) {
    let org = null;
    if (organizacionId && organizacionId !== 'default') {
      org = await this.prisma.organizacion.findUnique({ where: { id: organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || organizacionId;

    const session = this.sessions.get(resolvedOrgId);
    if (!session || session.estado !== 'CONECTADO' || !session.sock) {
      throw new BadRequestException('WhatsApp no está conectado en el servidor. Escanea el código QR primero.');
    }

    let rawPhone = (telefono || '').replace(/\D/g, '');
    if (rawPhone.length === 10) {
      rawPhone = `52${rawPhone}`;
    }

    // Comprobar si el número existe en WhatsApp
    let jid = `${rawPhone}@s.whatsapp.net`;
    try {
      const [onWa] = await session.sock.onWhatsApp(jid);
      if (onWa && onWa.exists) {
        jid = onWa.jid;
      }
    } catch (e) {
      // Continuar con jid por defecto
    }

    await session.sock.sendMessage(jid, { text: texto });

    return { exito: true, telefono: rawPhone, jid };
  }

  async enviarCampanaAutomatica(data: {
    organizacionId: string;
    nombreCampana: string;
    mensaje: string;
    clientesIds: string[];
    articuloNombre?: string;
    articuloPrecio?: number;
  }) {
    let org = null;
    if (data.organizacionId && data.organizacionId !== 'default') {
      org = await this.prisma.organizacion.findUnique({ where: { id: data.organizacionId } });
    }
    if (!org) {
      org = await this.prisma.organizacion.findFirst();
    }
    const resolvedOrgId = org?.id || data.organizacionId;

    const session = this.sessions.get(resolvedOrgId);
    if (!session || session.estado !== 'CONECTADO' || !session.sock) {
      throw new BadRequestException(
        'Para el envío automático masivo, es necesario que vincules WhatsApp mediante el Código QR.',
      );
    }

    // Evitar ejecuciones simultáneas de la misma organización
    if (this.activeCampaigns.get(resolvedOrgId)) {
      throw new BadRequestException('Ya hay una campaña enviándose en este momento. Espera a que termine.');
    }

    const clientes = await this.prisma.cliente.findMany({
      where: {
        id: { in: data.clientesIds },
        telefono: { not: null },
      },
      select: {
        id: true,
        nombre: true,
        telefono: true,
        puntos: true,
        descuento: true,
      },
    });

    if (clientes.length === 0) {
      throw new BadRequestException('Ninguno de los clientes seleccionados cuenta con teléfono válido.');
    }

    // Registrar campaña en base de datos
    const campana = await this.prisma.campana.create({
      data: {
        organizacionId: resolvedOrgId,
        nombre: data.nombreCampana,
        canal: 'WHATSAPP',
        mensaje: data.mensaje,
        estado: 'EN_PROCESO',
        totalDestinatarios: clientes.length,
        enviados: 0,
      },
    });

    // Iniciar envío en segundo plano
    this.activeCampaigns.set(resolvedOrgId, true);

    (async () => {
      let enviadosOk = 0;
      const orgNombre = org?.nombre || 'Nuestro Negocio';
      const orgWhatsapp = session.info?.telefono || org?.whatsapp || '';

      for (let i = 0; i < clientes.length; i++) {
        const c = clientes[i];
        let texto = data.mensaje
          .replace(/{cliente}/g, c.nombre)
          .replace(/{organizacion}/g, orgNombre)
          .replace(/{telefono_org}/g, orgWhatsapp)
          .replace(/{puntos}/g, String(c.puntos || 0))
          .replace(/{descuento}/g, `${Number(c.descuento || 0)}%`)
          .replace(/{articulo}/g, data.articuloNombre || '')
          .replace(/{precio}/g, data.articuloPrecio ? `$${data.articuloPrecio}` : '');

        let rawPhone = (c.telefono || '').replace(/\D/g, '');
        if (rawPhone.length === 10) {
          rawPhone = `52${rawPhone}`;
        }

        let jid = `${rawPhone}@s.whatsapp.net`;
        try {
          const [onWa] = await session.sock.onWhatsApp(jid);
          if (onWa && onWa.exists) {
            jid = onWa.jid;
          }
          await session.sock.sendMessage(jid, { text: texto });
          enviadosOk++;

          // Notificar progreso a través de WebSocket
          this.eventsGateway.emitirCampanaProgreso(
            {
              campanaId: campana.id,
              total: clientes.length,
              enviados: i + 1,
              cliente: c.nombre,
              estado: 'ENVIANDO',
            },
            `org_${resolvedOrgId}`,
          );
        } catch (err) {
          this.logger.error(`Error al enviar mensaje a ${c.nombre} (${rawPhone}):`, err);
        }

        // Intervalo de seguridad entre mensajes (2000 ms) para evitar que WhatsApp bloquee por spam
        if (i < clientes.length - 1) {
          await new Promise((res) => setTimeout(res, 2000));
        }
      }

      // Marcar como finalizada en la base de datos
      await this.prisma.campana.update({
        where: { id: campana.id },
        data: {
          estado: 'ENVIADA',
          fechaEnvio: new Date(),
          enviados: enviadosOk,
        },
      });

      this.eventsGateway.emitirCampanaProgreso(
        {
          campanaId: campana.id,
          total: clientes.length,
          enviados: enviadosOk,
          estado: 'FINALIZADA',
        },
        `org_${resolvedOrgId}`,
      );

      this.activeCampaigns.delete(resolvedOrgId);
      this.logger.log(`Campaña masiva "${data.nombreCampana}" finalizada: ${enviadosOk}/${clientes.length} enviados.`);
    })().catch((e) => {
      this.activeCampaigns.delete(resolvedOrgId);
      this.logger.error('Error en proceso de campaña masiva:', e);
    });

    return {
      exito: true,
      mensaje: `Campaña iniciada en segundo plano para ${clientes.length} clientes.`,
      campanaId: campana.id,
      totalClientes: clientes.length,
    };
  }
}
