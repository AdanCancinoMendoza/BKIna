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
import { ArticulosService } from './articulos.service.js';
import { CreateArticuloDto, UpdateArticuloDto } from './dto/create-articulo.dto.js';

@Controller('articulos')
export class ArticulosController {
  constructor(private readonly articulosService: ArticulosService) {}

  @Get('buscar-imagenes')
  async buscarImagenes(@Query('q') query: string) {
    return this.articulosService.buscarImagenes(query);
  }

  @Post('precargar-catalogo')
  async precargarCatalogo(
    @Body() dto: { organizacionId: string; pais?: string; giroComercial?: string },
  ) {
    return this.articulosService.precargarCatalogo(dto);
  }

  @Get()
  async findAll(
    @Query('organizacionId') organizacionId?: string,
    @Query('sucursalId') sucursalId?: string,
    @Query('familiaId') familiaId?: string,
    @Query('subfamiliaId') subfamiliaId?: string,
    @Query('search') search?: string,
    @Query('activo') activo?: string,
  ) {
    if (sucursalId && !organizacionId) {
      return this.articulosService.findBySucursal(sucursalId, search);
    }

    if (!organizacionId) {
      return [];
    }

    return this.articulosService.findByOrganizacion(organizacionId, {
      search,
      familiaId,
      subfamiliaId,
      sucursalId,
      activo: activo !== undefined ? activo === 'true' : undefined,
    });
  }

  @Get('organizacion/:organizacionId')
  async findByOrganizacion(
    @Param('organizacionId') organizacionId: string,
    @Query('search') search?: string,
    @Query('familiaId') familiaId?: string,
    @Query('subfamiliaId') subfamiliaId?: string,
    @Query('sucursalId') sucursalId?: string,
    @Query('activo') activo?: string,
  ) {
    return this.articulosService.findByOrganizacion(organizacionId, {
      search,
      familiaId,
      subfamiliaId,
      sucursalId,
      activo: activo !== undefined ? activo === 'true' : undefined,
    });
  }

  @Get('sucursal/:sucursalId')
  async findBySucursal(
    @Param('sucursalId') sucursalId: string,
    @Query('search') search?: string,
  ) {
    return this.articulosService.findBySucursal(sucursalId, search);
  }

  @Get('familias/:organizacionId')
  async getFamilias(@Param('organizacionId') organizacionId: string) {
    return this.articulosService.getFamilias(organizacionId);
  }

  @Get('stats/:organizacionId')
  async getStats(@Param('organizacionId') organizacionId: string) {
    return this.articulosService.getStats(organizacionId);
  }

  @Get('codigo/:organizacionId/:codigo')
  async findByCodigo(
    @Param('organizacionId') organizacionId: string,
    @Param('codigo') codigo: string,
  ) {
    return this.articulosService.findByCodigo(organizacionId, codigo);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articulosService.findOne(id);
  }

  @Post()
  async create(
    @Body() dto: CreateArticuloDto,
    @Query('organizacionId') organizacionId?: string,
  ) {
    return this.articulosService.create(dto, organizacionId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateArticuloDto) {
    return this.articulosService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.articulosService.delete(id);
  }
}
