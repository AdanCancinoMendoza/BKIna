import { Module } from '@nestjs/common';
import { OrganizacionesController } from './organizaciones.controller.js';
import { OrganizacionesService } from './organizaciones.service.js';

@Module({
  controllers: [OrganizacionesController],
  providers: [OrganizacionesService]
})
export class OrganizacionesModule {}
