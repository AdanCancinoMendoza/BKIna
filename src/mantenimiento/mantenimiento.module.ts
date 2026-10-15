import { Module } from '@nestjs/common';
import { MantenimientoService } from './mantenimiento.service.js';
import { MantenimientoController } from './mantenimiento.controller.js';

@Module({
  controllers: [MantenimientoController],
  providers: [MantenimientoService],
  exports: [MantenimientoService],
})
export class MantenimientoModule {}
