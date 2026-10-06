import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SucursalesService } from './sucursales.service.js';

@Controller('sucursales')
export class SucursalesController {
  constructor(private readonly sucursalesService: SucursalesService) {}

  @Get()
  async findAll(@Query('organizacionId') organizacionId?: string) {
    return this.sucursalesService.findAll(organizacionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sucursalesService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.sucursalesService.create(body);
  }
}
