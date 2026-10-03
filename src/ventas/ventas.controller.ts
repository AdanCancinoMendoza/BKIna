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
}
