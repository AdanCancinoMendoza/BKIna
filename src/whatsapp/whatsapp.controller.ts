import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service.js';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('estado/:organizacionId')
  async obtenerEstado(@Param('organizacionId') organizacionId: string) {
    return this.whatsappService.obtenerEstado(organizacionId);
  }

  @Post('conectar')
  async conectar(@Body('organizacionId') organizacionId: string) {
    return this.whatsappService.iniciarConexion(organizacionId);
  }

  @Post('desconectar')
  async desconectar(@Body('organizacionId') organizacionId: string) {
    return this.whatsappService.desconectar(organizacionId);
  }

  @Post('enviar-mensaje')
  async enviarMensaje(
    @Body('organizacionId') organizacionId: string,
    @Body('telefono') telefono: string,
    @Body('mensaje') mensaje: string,
  ) {
    return this.whatsappService.enviarMensaje(organizacionId, telefono, mensaje);
  }

  @Post('campanas/enviar-masivo')
  async enviarCampanaAutomatica(
    @Body()
    body: {
      organizacionId: string;
      nombreCampana: string;
      mensaje: string;
      clientesIds: string[];
      articuloNombre?: string;
      articuloPrecio?: number;
    },
  ) {
    return this.whatsappService.enviarCampanaAutomatica(body);
  }
}
