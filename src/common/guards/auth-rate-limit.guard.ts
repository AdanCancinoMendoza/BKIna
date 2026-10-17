import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

@Injectable()
export class AuthRateLimitGuard implements CanActivate {
  // Almacenamiento en memoria para intentos de autenticación
  private static records = new Map<string, RateLimitRecord>();
  private static readonly MAX_ATTEMPTS = 7; // Máximo 7 intentos por minuto
  private static readonly WINDOW_MS = 60 * 1000; // Ventana de 1 minuto

  constructor() {
    // Limpieza periódica de registros caducados cada 5 minutos
    if (!AuthRateLimitGuard.cleanupTimer) {
      AuthRateLimitGuard.cleanupTimer = setInterval(() => {
        const now = Date.now();
        for (const [key, record] of AuthRateLimitGuard.records.entries()) {
          if (now > record.resetAt) {
            AuthRateLimitGuard.records.delete(key);
          }
        }
      }, 5 * 60 * 1000);
      // Evitar que el timer bloquee la terminación del proceso si es necesario
      AuthRateLimitGuard.cleanupTimer.unref?.();
    }
  }

  private static cleanupTimer: any = null;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Obtener IP del cliente considerando proxies inversos (Render, Cloudflare, NGINX)
    const forwarded = request.headers['x-forwarded-for'];
    const ip = (
      typeof forwarded === 'string'
        ? forwarded.split(',')[0].trim()
        : request.ip || request.socket?.remoteAddress || 'unknown-client'
    );

    const route = request.url || 'auth';
    const key = `${ip}:${route}`;
    const now = Date.now();

    const record = AuthRateLimitGuard.records.get(key);

    if (!record || now > record.resetAt) {
      AuthRateLimitGuard.records.set(key, {
        count: 1,
        resetAt: now + AuthRateLimitGuard.WINDOW_MS,
      });
      return true;
    }

    record.count += 1;

    if (record.count > AuthRateLimitGuard.MAX_ATTEMPTS) {
      const waitSeconds = Math.ceil((record.resetAt - now) / 1000);
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          error: 'Too Many Requests',
          message: `Demasiados intentos de acceso sospechosos. Por seguridad institucional de Inagerlis, espere ${waitSeconds} segundos antes de reintentar.`,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
