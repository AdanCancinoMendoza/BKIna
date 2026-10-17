import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { SecurityTelemetryService } from '../services/security-telemetry.service.js';

@Injectable()
export class AuthRateLimitGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // 1. Obtención precisa de IP del cliente considerando proxies inversos (Render / Cloudflare)
    const forwarded = request.headers['x-forwarded-for'];
    const ip = (
      typeof forwarded === 'string'
        ? forwarded.split(',')[0].trim()
        : request.ip || request.socket?.remoteAddress || 'unknown-client'
    );

    // 2. Normalización de ruta: aislar path eliminando query strings para evitar bypass por polución
    const rawUrl = request.originalUrl || request.url || '/auth';
    const rutaLimpia = rawUrl.split('?')[0];

    // Determinar tipo de evento según la ruta
    let tipoIncidente: any = 'EXCESO_PETICIONES';
    let motivo = 'Frecuencia anormal de solicitudes en endpoint protegido';

    if (rutaLimpia.includes('/login')) {
      tipoIncidente = 'FUERZA_BRUTA_LOGIN';
      motivo = 'Múltiples intentos de autenticación o vulneración de PIN';
    } else if (rutaLimpia.includes('/mantenimiento')) {
      tipoIncidente = 'INTENTO_DESTRUCCION';
      motivo = 'Intentos repetidos sobre endpoints de eliminación de datos';
    } else if (rutaLimpia.includes('/ai')) {
      tipoIncidente = 'ABUSO_IA';
      motivo = 'Sobrecarga de peticiones sobre la API de Inteligencia Artificial';
    }

    const { permitido, segundosRestantes } = SecurityTelemetryService.evaluarAcceso(
      ip,
      rutaLimpia,
      tipoIncidente,
      motivo,
    );

    if (!permitido) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          error: 'Too Many Requests',
          message: `IP [${ip}] bloqueada por el Escudo de Seguridad Inagerlis tras detectar anomalías o fuerza bruta. Reintente en ${segundosRestantes} segundos.`,
          segundosRestantes,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
