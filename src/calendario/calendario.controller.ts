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
import {
  CalendarioService,
  CreateEventoDto,
  UpdateEventoDto,
} from './calendario.service.js';

@Controller('calendario')
export class CalendarioController {
  constructor(private readonly calendarioService: CalendarioService) {}

  @Get()
  async findAll(@Query('organizacionId') organizacionId?: string) {
    return this.calendarioService.findAll(organizacionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.calendarioService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateEventoDto) {
    return this.calendarioService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateEventoDto) {
    return this.calendarioService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.calendarioService.remove(id);
  }

  @Post(':id/enviar-whatsapp')
  async enviarWhatsApp(
    @Param('id') id: string,
    @Body('telefono') telefono?: string,
    @Body('mensaje') mensaje?: string,
  ) {
    return this.calendarioService.enviarRecordatorioWhatsApp(id, telefono, mensaje);
  }
}
