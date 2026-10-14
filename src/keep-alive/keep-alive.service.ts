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
  private readonly targetUrl: string;
  private readonly intervalMinutes: number;
  private readonly startHour: number;
  private readonly endHour: number;
  private readonly timeZone: string;

  constructor(private readonly configService: ConfigService) {
    this.enabled =
      this.configService.get<string>('KEEP_ALIVE_ENABLED', 'true') !== 'false';

    const defaultUrl =
      process.env.RENDER_EXTERNAL_URL
        ? `${process.env.RENDER_EXTERNAL_URL}/inagerlis/ping`
        : 'https://bkina.onrender.com/inagerlis/ping';

    this.targetUrl = this.configService.get<string>(
      'KEEP_ALIVE_URL',
      defaultUrl,
    );

    this.intervalMinutes = Number(
      this.configService.get<string>('KEEP_ALIVE_INTERVAL_MINUTES', '14'),
    );

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
      `Keep-alive service inicializado. Destino: ${this.targetUrl} | Intervalo: ${this.intervalMinutes}m | Horario: ${this.startHour}:00 - ${this.endHour}:00 (${this.timeZone})`,
    );

    // Esperar 15 segundos después de que levante el servidor antes del primer ping
    this.startupTimer = setTimeout(() => {
      void this.pingServer('startup');
    }, 15000);

    // Ejecutar cada X minutos (14m por defecto para evitar los 15m de inactividad de Render)
    const intervalMs = this.intervalMinutes * 60 * 1000;
    this.intervalTimer = setInterval(() => {
      void this.pingServer('scheduled');
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
    const { hour } = this.getCurrentTimeInfo();
    // startHour = 6 (06:00), endHour = 24 (23:59:59 inclusive, 00:00 es hora 0)
    return hour >= this.startHour && hour < this.endHour;
  }

  async pingServer(reason: 'startup' | 'scheduled'): Promise<void> {
    const { hour, minute } = this.getCurrentTimeInfo();
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;

    if (!this.isWithinActiveHours()) {
      this.logger.debug(
        `[Keep-alive] Fuera de horario activo (${formattedTime} en ${this.timeZone}). Horario configurado: ${this.startHour}:00 a ${this.endHour}:00. Ping omitido.`,
      );
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const res = await fetch(this.targetUrl, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'BKIna-KeepAlive/1.0',
        },
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        this.logger.log(
          `[Keep-alive] (${reason} @ ${formattedTime}) Ping exitoso a ${this.targetUrl} - HTTP ${res.status}`,
        );
      } else {
        this.logger.warn(
          `[Keep-alive] (${reason} @ ${formattedTime}) Ping respondió con código HTTP ${res.status}`,
        );
      }
    } catch (err: any) {
      this.logger.warn(
        `[Keep-alive] (${reason} @ ${formattedTime}) Error al conectar con ${this.targetUrl}: ${err?.message}`,
      );
    }
  }
}
