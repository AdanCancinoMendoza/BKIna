import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service.js';

@Controller('suscripciones')
export class SuscripcionesController {
  constructor(private readonly suscripcionesService: SuscripcionesService) {}

  @Get('planes')
  obtenerPlanes() {
    return this.suscripcionesService.obtenerPlanes();
  }

  @Get('organizacion/:organizacionId')
  async obtenerSuscripcion(@Param('organizacionId') organizacionId: string) {
    return this.suscripcionesService.obtenerSuscripcion(organizacionId);
  }

  @Put('organizacion/:organizacionId')
  async actualizarSuscripcion(
    @Param('organizacionId') organizacionId: string,
    @Body() body: any,
  ) {
    return this.suscripcionesService.actualizarSuscripcion(organizacionId, body);
  }

  @Post('cambiar-plan')
  async cambiarPlan(
    @Body('organizacionId') organizacionId: string,
    @Body('plan') plan: string,
    @Body('periodo') periodo?: 'mensual' | 'anual',
  ) {
    return this.suscripcionesService.cambiarPlan(organizacionId, plan, periodo);
  }
}
