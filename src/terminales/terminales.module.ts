import { Module } from '@nestjs/common';
import { TerminalesController } from './terminales.controller.js';
import { TerminalesService } from './terminales.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [TerminalesController],
  providers: [TerminalesService],
  exports: [TerminalesService],
})
export class TerminalesModule {}
