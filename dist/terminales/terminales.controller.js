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
import { Body, Controller, Get, Param, Patch, Post, Query, } from '@nestjs/common';
import { TerminalesService } from './terminales.service.js';
let TerminalesController = class TerminalesController {
    terminalesService;
    constructor(terminalesService) {
        this.terminalesService = terminalesService;
    }
    async findAll(sucursalId) {
        return this.terminalesService.findAll(sucursalId);
    }
    async findOne(id) {
        return this.terminalesService.findOne(id);
    }
    async create(body) {
        return this.terminalesService.create(body);
    }
    async updateEstado(id, estado) {
        return this.terminalesService.updateEstado(id, estado);
    }
};
__decorate([
    Get(),
    __param(0, Query('sucursalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TerminalesController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TerminalesController.prototype, "findOne", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TerminalesController.prototype, "create", null);
__decorate([
    Patch(':id/estado'),
    __param(0, Param('id')),
    __param(1, Body('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TerminalesController.prototype, "updateEstado", null);
TerminalesController = __decorate([
    Controller('terminales'),
    __metadata("design:paramtypes", [TerminalesService])
], TerminalesController);
export { TerminalesController };
//# sourceMappingURL=terminales.controller.js.map