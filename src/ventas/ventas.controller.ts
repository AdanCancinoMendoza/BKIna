import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VentasService } from './ventas.service.js';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  async registrarVenta(@Body() body: any) {
    return this.ventasService.registrarVenta(body);
  }

  @Get('organizacion/:organizacionId')
  async obtenerVentas(@Param('organizacionId') organizacionId: string) {
    return this.ventasService.obtenerVentas(organizacionId);
  }

  @Get('resumen/:organizacionId')
  async obtenerResumenVentas(@Param('organizacionId') organizacionId: string) {
    return this.ventasService.obtenerResumenVentas(organizacionId);
  }

  @Post('campanas')
  async crearCampana(@Body() body: any) {
    return this.ventasService.crearCampana(body);
  }

  @Get('campanas/:organizacionId')
  async obtenerCampanas(@Param('organizacionId') organizacionId: string) {
    return this.ventasService.obtenerCampanas(organizacionId);
  }

  @Post('campanas/enviar')
  async enviarCampana(@Body() body: any) {
    return this.ventasService.enviarCampana(body);
  }
}
