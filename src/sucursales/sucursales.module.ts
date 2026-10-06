import { Module } from '@nestjs/common';
import { SucursalesController } from './sucursales.controller.js';
import { SucursalesService } from './sucursales.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [SucursalesController],
  providers: [SucursalesService],
  exports: [SucursalesService],
})
export class SucursalesModule {}
