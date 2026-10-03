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
import { Controller, Get, Patch, Param, Query, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
let TicketsController = class TicketsController {
    ticketsService;
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    async findAll(organizacionId, search, estado, sucursalId) {
        return this.ticketsService.findAll(organizacionId, search, estado, sucursalId);
    }
    async findOne(id) {
        return this.ticketsService.findOne(id);
    }
    async cambiarEstado(id, estado, motivo) {
        return this.ticketsService.cambiarEstado(id, estado, motivo);
    }
};
__decorate([
    Get(),
    __param(0, Query('organizacionId')),
    __param(1, Query('search')),
    __param(2, Query('estado')),
    __param(3, Query('sucursalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findOne", null);
__decorate([
    Patch(':id/estado'),
    __param(0, Param('id')),
    __param(1, Body('estado')),
    __param(2, Body('motivo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "cambiarEstado", null);
TicketsController = __decorate([
    Controller('tickets'),
    __metadata("design:paramtypes", [TicketsService])
], TicketsController);
export { TicketsController };
//# sourceMappingURL=tickets.controller.js.map