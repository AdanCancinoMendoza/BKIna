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
import { ArticulosService } from './articulos.service.js';

@Controller('articulos')
export class ArticulosController {
  constructor(private readonly articulosService: ArticulosService) {}

  @Get()
  async findAll(
    @Query('organizacionId') organizacionId?: string,
    @Query('search') search?: string,
    @Query('familiaId') familiaId?: string,
    @Query('sucursalId') sucursalId?: string,
  ) {
    return this.articulosService.findAll(
      organizacionId,
      search,
      familiaId,
      sucursalId,
    );
  }

  @Get('barcode/:codigo')
  async findByCodigo(
    @Param('codigo') codigo: string,
    @Query('organizacionId') organizacionId: string,
  ) {
    return this.articulosService.findByCodigo(codigo, organizacionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articulosService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.articulosService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.articulosService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articulosService.remove(id);
  }
}
