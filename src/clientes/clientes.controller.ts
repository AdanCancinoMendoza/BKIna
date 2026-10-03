import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ClientesService } from './clientes.service.js';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  async findAll(
    @Query('organizacionId') organizacionId?: string,
    @Query('search') search?: string,
    @Query('localidad') localidad?: string,
  ) {
    return this.clientesService.findAll(organizacionId, search, localidad);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientesService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.clientesService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.clientesService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientesService.remove(id);
  }
}
