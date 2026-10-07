import { Controller, Get, Patch, Param, Query, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service.js';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async findAll(
    @Query('organizacionId') organizacionId?: string,
    @Query('search') search?: string,
    @Query('estado') estado?: string,
    @Query('sucursalId') sucursalId?: string,
  ) {
    return this.ticketsService.findAll(organizacionId, search, estado, sucursalId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id/estado')
  async cambiarEstado(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const estado = (body?.estado || '').toUpperCase() as 'DEVUELTO' | 'CANCELADO' | 'PAGADO';
    return this.ticketsService.cambiarEstado(id, estado, body?.motivo);
  }
}
