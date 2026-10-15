import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ProveedoresService } from './proveedores.service.js';
import { CreateProveedorDto } from './dto/create-proveedor.dto.js';
import { UpdateProveedorDto } from './dto/update-proveedor.dto.js';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Get()
  async findAll(
    @Query('organizacionId') organizacionId?: string,
    @Query('search') search?: string,
    @Query('categoria') categoria?: string,
    @Query('activo') activo?: string,
  ) {
    return this.proveedoresService.findAll(organizacionId, search, categoria, activo);
  }

  @Get('estadisticas/:organizacionId')
  async getEstadisticas(@Param('organizacionId') organizacionId: string) {
    return this.proveedoresService.getEstadisticas(organizacionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.proveedoresService.findOne(id);
  }

  @Post()
  async create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedoresService.create(createProveedorDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProveedorDto: UpdateProveedorDto,
  ) {
    return this.proveedoresService.update(id, updateProveedorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.proveedoresService.remove(id);
  }
}
