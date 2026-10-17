import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service.js';
import { AuthRateLimitGuard } from '../common/guards/auth-rate-limit.guard.js';

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
  async findOne(@Param('id') id: string, @Query('organizacionId') organizacionId?: string) {
    return this.clientesService.findOne(id, organizacionId);
  }

  @Post()
  @UseGuards(AuthRateLimitGuard)
  async create(@Body() body: any) {
    return this.clientesService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Query('organizacionId') organizacionId?: string,
  ) {
    return this.clientesService.update(id, body, organizacionId || body.organizacionId);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Query('organizacionId') organizacionId?: string,
  ) {
    return this.clientesService.remove(id, organizacionId);
  }
}
