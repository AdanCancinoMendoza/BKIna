import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { OrganizacionesService } from './organizaciones.service.js';
import { RegistroOrganizacionDto } from './dto/registro-organizacion.dto.js';

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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.organizacionesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.organizacionesService.update(id, body);
  }

  @Patch(':id/gemini-key')
  async actualizarGeminiKey(
    @Param('id') id: string,
    @Body('apiKey') apiKey: string,
  ) {
    return this.organizacionesService.actualizarGeminiKey(id, apiKey);
  }

  @Patch(':id/estado')
  async cambiarEstado(
    @Param('id') id: string,
    @Body('activa') activa: boolean,
    @Body('motivo') motivo?: string,
  ) {
    return this.organizacionesService.cambiarEstado(id, activa, motivo);
  }

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

