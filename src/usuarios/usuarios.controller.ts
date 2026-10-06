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
import { UsuariosService } from './usuarios.service.js';
import { LoginDto, LoginPerfilDto } from './dto/login.dto.js';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/create-usuario.dto.js';

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

  @Get()
  async findAll(
    @Query('organizacionId') organizacionId?: string,
    @Query('search') search?: string,
  ) {
    if (!organizacionId) return [];
    return this.usuariosService.findByOrganizacion(organizacionId, search);
  }

  @Get('organizacion/:organizacionId')
  async findByOrganizacion(
    @Param('organizacionId') organizacionId: string,
    @Query('search') search?: string,
  ) {
    return this.usuariosService.findByOrganizacion(organizacionId, search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
