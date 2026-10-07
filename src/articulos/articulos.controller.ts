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
      return this.articulosService.findAll(organizacionId, search, familiaId, sucursalId);
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

  @Post('familias')
  async createFamilia(
    @Body() dto: { organizacionId: string; nombre: string; descripcion?: string },
    @Query('organizacionId') orgQuery?: string,
  ) {
    const orgId = dto.organizacionId || orgQuery;
    return this.articulosService.createFamilia(orgId!, dto);
  }

  @Post('subfamilias')
  async createSubfamilia(
    @Body() dto: { familiaId: string; nombre: string; descripcion?: string },
  ) {
    return this.articulosService.createSubfamilia(dto);
  }

  @Delete('familias/:id')
  async deleteFamilia(@Param('id') id: string) {
    return this.articulosService.deleteFamilia(id);
  }

  @Delete('subfamilias/:id')
  async deleteSubfamilia(@Param('id') id: string) {
    return this.articulosService.deleteSubfamilia(id);
  }

  @Get('unidades')
  async getUnidadesDefault(@Query('organizacionId') organizacionId?: string) {
    return this.articulosService.getUnidades(organizacionId);
  }

  @Get('unidades/:organizacionId')
  async getUnidades(@Param('organizacionId') organizacionId: string) {
    return this.articulosService.getUnidades(organizacionId);
  }

  @Post('unidades')
  async createUnidad(
    @Body()
    dto: {
      organizacionId: string;
      nombre: string;
      abreviatura: string;
      descripcion?: string;
      tipo?: string;
      necesitaBascula?: boolean;
    },
    @Query('organizacionId') orgQuery?: string,
  ) {
    const orgId = dto.organizacionId || orgQuery;
    return this.articulosService.createUnidad(orgId!, dto);
  }

  @Delete('unidades/:id')
  async deleteUnidad(@Param('id') id: string) {
    return this.articulosService.deleteUnidad(id);
  }

  @Get('stats/:organizacionId')
  async getStats(@Param('organizacionId') organizacionId: string) {
    return this.articulosService.getStats(organizacionId);
  }

  @Get('barcode/:codigo')
  async findByBarcode(
    @Param('codigo') codigo: string,
    @Query('organizacionId') organizacionId: string,
  ) {
    return this.articulosService.findByCodigo(organizacionId, codigo);
  }

  @Get('codigo/:organizacionId/:codigo')
  async findByCodigo(
    @Param('organizacionId') organizacionId: string,
    @Param('codigo') codigo: string,
  ) {
    return this.articulosService.findByCodigo(organizacionId, codigo);
  }

  @Get('inventario/:organizacionId')
  async getInventarioOverview(
    @Param('organizacionId') organizacionId: string,
    @Query('sucursalId') sucursalId?: string,
  ) {
    return this.articulosService.getInventarioOverview(organizacionId, sucursalId);
  }

  @Post('inventario/ajuste')
  async registrarMovimientoStock(
    @Body()
    dto: {
      organizacionId: string;
      articuloId: string;
      sucursalId?: string;
      tipo: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
      cantidad: number;
      nuevoStock?: number;
      motivo?: string;
      usuarioId?: string;
    },
  ) {
    return this.articulosService.registrarMovimientoStock(dto);
  }

  @Get('inventario/movimientos/:organizacionId')
  async getMovimientosStock(
    @Param('organizacionId') organizacionId: string,
    @Query('articuloId') articuloId?: string,
    @Query('sucursalId') sucursalId?: string,
    @Query('tipo') tipo?: string,
    @Query('limit') limit?: string,
  ) {
    return this.articulosService.getMovimientosStock(organizacionId, {
      articuloId,
      sucursalId,
      tipo,
      limit: limit ? parseInt(limit, 10) : 50,
    });
  }

  @Put('inventario/limites/:articuloId')
  async updateLimitesStock(
    @Param('articuloId') articuloId: string,
    @Body() dto: { sucursalId?: string; stockMinimo: number; stockMaximo: number },
  ) {
    return this.articulosService.updateLimitesStock(articuloId, dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articulosService.findOne(id);
  }

  @Post()
  async create(
    @Body() dto: any,
    @Query('organizacionId') organizacionId?: string,
  ) {
    return this.articulosService.create(dto, organizacionId || dto.organizacionId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.articulosService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.articulosService.delete(id);
  }
}
