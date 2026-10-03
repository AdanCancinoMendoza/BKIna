import { Module } from '@nestjs/common';
import { SuscripcionesController } from './suscripciones.controller.js';
import { SuscripcionesService } from './suscripciones.service.js';

@Module({
  controllers: [SuscripcionesController],
  providers: [SuscripcionesService]
})
export class SuscripcionesModule {}
