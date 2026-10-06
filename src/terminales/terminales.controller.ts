import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TerminalesService } from './terminales.service.js';

@Controller('terminales')
export class TerminalesController {
  constructor(private readonly terminalesService: TerminalesService) {}

  @Get()
  async findAll(@Query('sucursalId') sucursalId?: string) {
    return this.terminalesService.findAll(sucursalId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.terminalesService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.terminalesService.create(body);
  }

  @Patch(':id/estado')
  async updateEstado(
    @Param('id') id: string,
    @Body('estado') estado: 'Abierta' | 'Cerrada',
  ) {
    return this.terminalesService.updateEstado(id, estado);
  }
}
