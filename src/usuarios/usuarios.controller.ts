import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service.js';
import { LoginDto, LoginPerfilDto } from './dto/login.dto.js';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.usuariosService.login(dto);
  }

  @Post('login-perfil')
  async loginPerfil(@Body() dto: LoginPerfilDto) {
    return this.usuariosService.loginPerfil(dto);
  }

  @Get('organizacion/:organizacionId')
  async findByOrganizacion(@Param('organizacionId') organizacionId: string) {
    return this.usuariosService.findByOrganizacion(organizacionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }
}
