import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TerminalesService } from './terminales.service.js';

@Controller('terminales')
export class TerminalesController {
  constructor(private readonly terminalesService: TerminalesService) {}

  @Get()
  async findAll(
    @Query('sucursalId') sucursalId?: string,
    @Query('organizacionId') organizacionId?: string,
  ) {
    return this.terminalesService.findAll(sucursalId, organizacionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.terminalesService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.terminalesService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.terminalesService.update(id, body);
  }

  @Patch(':id/estado')
  async updateEstado(
    @Param('id') id: string,
    @Body('estado') estado: 'Abierta' | 'Cerrada',
  ) {
    return this.terminalesService.updateEstado(id, estado);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.terminalesService.remove(id);
  }
}
