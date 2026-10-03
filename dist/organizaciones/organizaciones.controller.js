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
import { OrganizacionesService } from './organizaciones.service.js';
import { RegistroOrganizacionDto } from './dto/registro-organizacion.dto.js';
let OrganizacionesController = class OrganizacionesController {
    organizacionesService;
    constructor(organizacionesService) {
        this.organizacionesService = organizacionesService;
    }
    async registrarEmpresa(dto) {
        return this.organizacionesService.registrarEmpresa(dto);
    }
    async findAll() {
        return this.organizacionesService.findAll();
    }
    async findOne(id) {
        return this.organizacionesService.findOne(id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegistroOrganizacionDto]),
    __metadata("design:returntype", Promise)
], OrganizacionesController.prototype, "registrarEmpresa", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizacionesController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizacionesController.prototype, "findOne", null);
OrganizacionesController = __decorate([
    Controller('organizaciones'),
    __metadata("design:paramtypes", [OrganizacionesService])
], OrganizacionesController);
export { OrganizacionesController };
//# sourceMappingURL=organizaciones.controller.js.map