import { Module } from '@nestjs/common';
import { CajaService } from './caja.service.js';
import { CajaController } from './caja.controller.js';

@Module({
  controllers: [CajaController],
  providers: [CajaService],
  exports: [CajaService],
})
export class CajaModule {}
