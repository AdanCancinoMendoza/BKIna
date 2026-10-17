import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service.js';
import { SuperAdminGuard } from '../common/guards/superadmin.guard.js';
import { AuthRateLimitGuard } from '../common/guards/auth-rate-limit.guard.js';

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
  @UseGuards(SuperAdminGuard, AuthRateLimitGuard)
  async actualizarSuscripcion(
    @Param('organizacionId') organizacionId: string,
    @Body() body: any,
  ) {
    return this.suscripcionesService.actualizarSuscripcion(organizacionId, body);
  }

  @Post('cambiar-plan')
  @UseGuards(AuthRateLimitGuard)
  async cambiarPlan(
    @Body('organizacionId') organizacionId: string,
    @Body('plan') plan: string,
    @Body('periodo') periodo?: 'mensual' | 'anual',
  ) {
    return this.suscripcionesService.cambiarPlan(organizacionId, plan, periodo);
  }
}
