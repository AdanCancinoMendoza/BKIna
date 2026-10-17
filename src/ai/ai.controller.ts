import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AiService, ChatMessage } from './ai.service.js';
import { AuthRateLimitGuard } from '../common/guards/auth-rate-limit.guard.js';

@UseGuards(AuthRateLimitGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(
    @Body()
    body: {
      organizacionId: string;
      mensaje: string;
      historial?: ChatMessage[];
    },
  ) {
    return this.aiService.chat(
      body.organizacionId,
      body.mensaje,
      body.historial || [],
    );
  }

  @Post('diagnostico')
  async generarDiagnostico(
    @Body()
    body: {
      organizacionId: string;
      tipo?: 'rendimiento' | 'inventario' | 'demanda' | 'general';
    },
  ) {
    return this.aiService.generarDiagnostico(
      body.organizacionId,
      body.tipo || 'general',
    );
  }

  @Get('estado/:organizacionId')
  async obtenerEstado(@Param('organizacionId') organizacionId: string) {
    return this.aiService.obtenerEstadoIa(organizacionId);
  }

  @Get('contexto/:organizacionId')
  async obtenerContexto(@Param('organizacionId') organizacionId: string) {
    return this.aiService.recopilarContextoNegocio(organizacionId);
  }
}
