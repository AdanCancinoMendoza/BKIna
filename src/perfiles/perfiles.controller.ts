import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PerfilesService } from './perfiles.service.js';
import { CreatePerfilDto, UpdatePerfilDto } from './dto/create-perfil.dto.js';

@Controller('perfiles')
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) {}

  @Get('plantilla')
  getPlantilla() {
    return this.perfilesService.getPlantilla();
  }

  @Get()
  async findAll(@Query('organizacionId') organizacionId?: string) {
    if (!organizacionId) return [];
    return this.perfilesService.findByOrganizacion(organizacionId);
  }

  @Get('organizacion/:organizacionId')
  async findByOrganizacion(@Param('organizacionId') organizacionId: string) {
    return this.perfilesService.findByOrganizacion(organizacionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.perfilesService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreatePerfilDto) {
    return this.perfilesService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePerfilDto) {
    return this.perfilesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.perfilesService.remove(id);
  }
}
