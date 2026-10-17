import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const adminKey =
      request.headers['x-admin-key'] ||
      request.headers['x-superadmin-key'] ||
      (request.headers['authorization']?.startsWith('Bearer ')
        ? request.headers['authorization'].slice(7)
        : null);

    const validKey =
      process.env.SUPERADMIN_KEY ||
      process.env.SUPERADMIN_SECRET_KEY ||
      'inagerlis-superadmin-2026';

    if (!adminKey || adminKey.trim() !== validKey.trim()) {
      throw new UnauthorizedException(
        'Acceso restringido: Se requiere clave maestra de Superadministrador autorizada en la cabecera x-admin-key.',
      );
    }

    return true;
  }
}
