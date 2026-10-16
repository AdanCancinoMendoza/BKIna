import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('inagerlis');

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

  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
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