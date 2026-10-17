import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('inagerlis');

  // Habilitar 'trust proxy' para que Express reconozca correctamente las IPs reales detrás de Render / Cloudflare
  const expressApp = app.getHttpAdapter().getInstance();
  if (expressApp && typeof expressApp.set === 'function') {
    expressApp.set('trust proxy', 1);
  }

  // Cabeceras HTTP de Seguridad Institucional (Anti-Clickjacking, MIME Sniffing, HSTS)
  app.use((req: any, res: any, next: () => void) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    );
    next();
  });

  // Compresión HTTP Gzip/Deflate optimizada: reduce MB transferidos en más del 80% y acelera tiempos de respuesta en Render
  app.use(
    compression({
      level: 6, // Balance óptimo entre CPU y compresión
      threshold: 512, // Comprimir respuestas mayores a 512 bytes
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }
        return compression.filter(req, res);
      },
    }),
  );

  const allowedOriginsEnv = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Peticiones sin origen (Postman, curl, server-to-server, apps nativas)
      if (!origin) {
        return callback(null, true);
      }

      // Validar orígenes de desarrollo local, despliegues autorizados y lista blanca
      if (
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
        origin.endsWith('.onrender.com') ||
        origin.endsWith('.vercel.app') ||
        allowedOriginsEnv.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(
        new Error(
          `Acceso bloqueado: Origen CORS no autorizado por la política institucional Inagerlis (${origin})`,
        ),
        false,
      );
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-admin-key',
      'x-superadmin-key',
      'x-no-compression',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ?? 3001;
  const server = await app.listen(port, '0.0.0.0');

  // Ajustar timeouts HTTP para evitar que proxies inversos (Cloudflare, Render, AWS ALBs)
  // reciban 502 Bad Gateway / reset de conexiones cuando hay cientos o miles de peticiones simultáneas
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
}

bootstrap();