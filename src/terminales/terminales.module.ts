import { Module } from '@nestjs/common';
import { TerminalesController } from './terminales.controller.js';
import { TerminalesService } from './terminales.service.js';

@Module({
  controllers: [TerminalesController],
  providers: [TerminalesService]
})
export class TerminalesModule {}
