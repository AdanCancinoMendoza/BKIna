import { Body, Controller, Get, Headers, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { OrganizacionesService } from './organizaciones.service.js';
import { RegistroOrganizacionDto } from './dto/registro-organizacion.dto.js';
import { SuperAdminGuard } from '../common/guards/superadmin.guard.js';
import { SecurityTelemetryService } from '../common/services/security-telemetry.service.js';

@Controller('organizaciones')
export class OrganizacionesController {
  constructor(private readonly organizacionesService: OrganizacionesService) {}

  @Post()
  async registrarEmpresa(@Body() dto: RegistroOrganizacionDto) {
    return this.organizacionesService.registrarEmpresa(dto);
  }

  @Get()
  async findAll() {
    return this.organizacionesService.findAll();
  }

  @UseGuards(SuperAdminGuard)
  @Get('analitica/plan')
  async obtenerPlanAnalitico() {
    return this.organizacionesService.obtenerPlanAnalitico();
  }

  @UseGuards(SuperAdminGuard)
  @Get('seguridad/telemetria')
  async obtenerTelemetriaSeguridad() {
    return SecurityTelemetryService.obtenerTelemetria();
  }

  @UseGuards(SuperAdminGuard)
  @Post('seguridad/desbloquear-ip')
  async desbloquearIp(@Body('ip') ip: string) {
    const ok = SecurityTelemetryService.desbloquearIp(ip);
    return {
      ok,
      mensaje: ok
        ? `IP [${ip}] desbloqueada exitosamente del Escudo Inagerlis.`
        : `IP [${ip}] no encontrada en la lista de bloqueo.`,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.organizacionesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('x-admin-key') adminKey?: string,
  ) {
    return this.organizacionesService.update(id, body, adminKey);
  }

  @UseGuards(SuperAdminGuard)
  @Patch(':id/gemini-key')
  async actualizarGeminiKey(
    @Param('id') id: string,
    @Body('apiKey') apiKey: string,
  ) {
    return this.organizacionesService.actualizarGeminiKey(id, apiKey);
  }

  @UseGuards(SuperAdminGuard)
  @Patch(':id/estado')
  async cambiarEstado(
    @Param('id') id: string,
    @Body('activa') activa: boolean,
    @Body('motivo') motivo?: string,
  ) {
    return this.organizacionesService.cambiarEstado(id, activa, motivo);
  }

  @UseGuards(SuperAdminGuard)
  @Patch(':id/plan')
  async actualizarPlan(
    @Param('id') id: string,
    @Body('plan') plan: string,
    @Body('estado') estado?: string,
    @Body('diasVigencia') diasVigencia?: number,
  ) {
    return this.organizacionesService.actualizarPlan(
      id,
      plan,
      estado,
      diasVigencia,
    );
  }
}

