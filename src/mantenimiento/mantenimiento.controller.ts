import { Controller, Post, Body } from '@nestjs/common';
import { MantenimientoService } from './mantenimiento.service.js';
import { MantenimientoAuthDto } from './mantenimiento.dto.js';

@Controller('mantenimiento')
export class MantenimientoController {
  constructor(private readonly mantenimientoService: MantenimientoService) {}

  @Post('eliminar-productos')
  async eliminarProductos(@Body() dto: MantenimientoAuthDto) {
    return this.mantenimientoService.eliminarProductos(dto);
  }

  @Post('eliminar-familias')
  async eliminarFamilias(@Body() dto: MantenimientoAuthDto) {
    return this.mantenimientoService.eliminarFamilias(dto);
  }

  @Post('eliminar-clientes')
  async eliminarClientes(@Body() dto: MantenimientoAuthDto) {
    return this.mantenimientoService.eliminarClientes(dto);
  }

  @Post('eliminar-ventas')
  async eliminarVentas(@Body() dto: MantenimientoAuthDto) {
    return this.mantenimientoService.eliminarVentas(dto);
  }

  @Post('reset-total')
  async resetTotal(@Body() dto: MantenimientoAuthDto) {
    return this.mantenimientoService.resetTotal(dto);
  }
}
