import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MantenimientoService } from './mantenimiento.service.js';
import { MantenimientoAuthDto } from './mantenimiento.dto.js';
import { AuthRateLimitGuard } from '../common/guards/auth-rate-limit.guard.js';

@UseGuards(AuthRateLimitGuard)
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
