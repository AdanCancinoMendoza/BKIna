import { Module } from '@nestjs/common';
import { ArticulosController } from './articulos.controller.js';
import { ArticulosService } from './articulos.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [ArticulosController],
  providers: [ArticulosService],
  exports: [ArticulosService],
})
export class ArticulosModule {}
