var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service.js';
import { LoginDto, LoginPerfilDto } from './dto/login.dto.js';
let UsuariosController = class UsuariosController {
    usuariosService;
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    async login(dto) {
        return this.usuariosService.login(dto);
    }
    async loginPerfil(dto) {
        return this.usuariosService.loginPerfil(dto);
    }
    async findByOrganizacion(organizacionId) {
        return this.usuariosService.findByOrganizacion(organizacionId);
    }
    async findOne(id) {
        return this.usuariosService.findOne(id);
    }
};
__decorate([
    Post('login'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "login", null);
__decorate([
    Post('login-perfil'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginPerfilDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "loginPerfil", null);
__decorate([
    Get('organizacion/:organizacionId'),
    __param(0, Param('organizacionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "findByOrganizacion", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "findOne", null);
UsuariosController = __decorate([
    Controller('usuarios'),
    __metadata("design:paramtypes", [UsuariosService])
], UsuariosController);
export { UsuariosController };
//# sourceMappingURL=usuarios.controller.js.map