import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}
