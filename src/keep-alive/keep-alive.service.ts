import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeepAliveService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KeepAliveService.name);
  private intervalTimer?: NodeJS.Timeout;
  private startupTimer?: NodeJS.Timeout;

  private readonly enabled: boolean;
  private readonly targetUrls: string[];
  private readonly intervalMinutes: number;
  private readonly startHour: number;
  private readonly endHour: number;
  private readonly timeZone: string;
  private readonly alwaysActive24_7: boolean;

  constructor(private readonly configService: ConfigService) {
    this.enabled =
      this.configService.get<string>('KEEP_ALIVE_ENABLED', 'true') !== 'false';

    const defaultBackendUrl = process.env.RENDER_EXTERNAL_URL
      ? `${process.env.RENDER_EXTERNAL_URL}/inagerlis/ping`
      : 'https://bkina.onrender.com/inagerlis/ping';

    const defaultFrontendUrl =
      process.env.FRONTEND_URL || 'https://inagerlis-pv-crm.onrender.com';

    // Lista de URLs configuradas (soporta múltiples separadas por coma)
    const rawUrls = this.configService.get<string>('KEEP_ALIVE_URLS');
    if (rawUrls) {
      this.targetUrls = rawUrls
        .split(',')
        .map((u) => u.trim())
        .filter(Boolean);
    } else {
      const single = this.configService.get<string>('KEEP_ALIVE_URL');
      if (single) {
        this.targetUrls = Array.from(new Set([single, defaultFrontendUrl]));
      } else {
        this.targetUrls = [defaultBackendUrl, defaultFrontendUrl];
      }
    }

    // Intervalo de 12 minutos (Render suspende a los 15 minutos exactos de inactividad)
    this.intervalMinutes = Number(
      this.configService.get<string>('KEEP_ALIVE_INTERVAL_MINUTES', '12'),
    );

    this.alwaysActive24_7 =
      this.configService.get<string>('KEEP_ALIVE_24_7', 'true') === 'true';

    this.startHour = Number(
      this.configService.get<string>('KEEP_ALIVE_START_HOUR', '6'),
    );

    this.endHour = Number(
      this.configService.get<string>('KEEP_ALIVE_END_HOUR', '24'),
    );

    this.timeZone = this.configService.get<string>(
      'KEEP_ALIVE_TIMEZONE',
      'America/Mexico_City',
    );
  }

  onModuleInit() {
    if (!this.enabled) {
      this.logger.log('Keep-alive service está desactivado.');
      return;
    }

    this.logger.log(
      `Keep-alive multi-servicio inicializado. Destinos: [${this.targetUrls.join(', ')}] | Intervalo: ${this.intervalMinutes}m | Horario: ${this.alwaysActive24_7 ? '24/7 Continuo' : `${this.startHour}:00 - ${this.endHour}:00 (${this.timeZone})`}`,
    );

    // Primer ping 15 segundos después de que inicie el servidor
    this.startupTimer = setTimeout(() => {
      void this.pingAllServers('startup');
    }, 15000);

    // Pings periódicos cada 12 minutos para evitar que Render suspenda backend o frontend
    const intervalMs = this.intervalMinutes * 60 * 1000;
    this.intervalTimer = setInterval(() => {
      void this.pingAllServers('scheduled');
    }, intervalMs);
  }

  onModuleDestroy() {
    if (this.startupTimer) clearTimeout(this.startupTimer);
    if (this.intervalTimer) clearInterval(this.intervalTimer);
  }

  private getCurrentTimeInfo(): { hour: number; minute: number } {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: this.timeZone,
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h23',
      }).formatToParts(new Date());

      const hourPart = parts.find((p) => p.type === 'hour')?.value ?? '0';
      const minutePart = parts.find((p) => p.type === 'minute')?.value ?? '0';

      return {
        hour: parseInt(hourPart, 10),
        minute: parseInt(minutePart, 10),
      };
    } catch (error) {
      this.logger.error(
        `Error al parsear zona horaria ${this.timeZone}, usando UTC: ${error}`,
      );
      const now = new Date();
      return {
        hour: now.getUTCHours(),
        minute: now.getUTCMinutes(),
      };
    }
  }

  private isWithinActiveHours(): boolean {
    if (this.alwaysActive24_7) return true;
    const { hour } = this.getCurrentTimeInfo();
    return hour >= this.startHour && hour < this.endHour;
  }

  async pingAllServers(reason: 'startup' | 'scheduled'): Promise<void> {
    const { hour, minute } = this.getCurrentTimeInfo();
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;

    if (!this.isWithinActiveHours()) {
      this.logger.debug(
        `[Keep-alive] Fuera de horario activo (${formattedTime} en ${this.timeZone}). Horario configurado: ${this.startHour}:00 a ${this.endHour}:00. Pings omitidos.`,
      );
      return;
    }

    await Promise.allSettled(
      this.targetUrls.map((url) => this.pingSingleUrl(url, reason, formattedTime)),
    );
  }

  private async pingSingleUrl(
    url: string,
    reason: 'startup' | 'scheduled',
    formattedTime: string,
  ): Promise<void> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Inagerlis-KeepAlive/2.0',
        },
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        this.logger.log(
          `[Keep-alive] (${reason} @ ${formattedTime}) Ping exitoso a ${url} - HTTP ${res.status}`,
        );
      } else {
        this.logger.warn(
          `[Keep-alive] (${reason} @ ${formattedTime}) Ping a ${url} respondió con código HTTP ${res.status}`,
        );
      }
    } catch (err: any) {
      this.logger.warn(
        `[Keep-alive] (${reason} @ ${formattedTime}) Error al conectar con ${url}: ${err?.message}`,
      );
    }
  }
}
