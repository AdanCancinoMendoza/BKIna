import { Module } from '@nestjs/common';
import { PerfilesController } from './perfiles.controller.js';
import { PerfilesService } from './perfiles.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [PerfilesController],
  providers: [PerfilesService],
  exports: [PerfilesService],
})
export class PerfilesModule {}
