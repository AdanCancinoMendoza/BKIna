import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service.js';
import { ProveedoresController } from './proveedores.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { EventsModule } from '../events/events.module.js';

@Module({
  imports: [PrismaModule, EventsModule],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  exports: [ProveedoresService],
})
export class ProveedoresModule {}
