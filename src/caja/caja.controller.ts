import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CajaService } from './caja.service.js';

@Controller('caja')
export class CajaController {
  constructor(private readonly cajaService: CajaService) {}

  @Get('estado/:terminalId')
  async obtenerEstadoCaja(@Param('terminalId') terminalId: string) {
    return this.cajaService.obtenerEstadoCaja(terminalId);
  }

  @Post('abrir')
  async abrirCaja(
    @Body('terminalId') terminalId: string,
    @Body('fondoInicial') fondoInicial: number,
  ) {
    return this.cajaService.abrirCaja(terminalId, fondoInicial || 0);
  }

  @Post('cerrar')
  async cerrarCaja(
    @Body('terminalId') terminalId: string,
    @Body('efectivoMano') efectivoMano: number,
    @Body('notas') notas?: string,
  ) {
    return this.cajaService.cerrarCaja(terminalId, efectivoMano || 0, notas);
  }
}
