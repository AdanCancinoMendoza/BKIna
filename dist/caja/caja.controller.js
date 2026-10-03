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
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CajaService } from './caja.service.js';
let CajaController = class CajaController {
    cajaService;
    constructor(cajaService) {
        this.cajaService = cajaService;
    }
    async obtenerEstadoCaja(terminalId) {
        return this.cajaService.obtenerEstadoCaja(terminalId);
    }
    async abrirCaja(terminalId, fondoInicial) {
        return this.cajaService.abrirCaja(terminalId, fondoInicial || 0);
    }
    async cerrarCaja(terminalId, efectivoMano, notas) {
        return this.cajaService.cerrarCaja(terminalId, efectivoMano || 0, notas);
    }
};
__decorate([
    Get('estado/:terminalId'),
    __param(0, Param('terminalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "obtenerEstadoCaja", null);
__decorate([
    Post('abrir'),
    __param(0, Body('terminalId')),
    __param(1, Body('fondoInicial')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "abrirCaja", null);
__decorate([
    Post('cerrar'),
    __param(0, Body('terminalId')),
    __param(1, Body('efectivoMano')),
    __param(2, Body('notas')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "cerrarCaja", null);
CajaController = __decorate([
    Controller('caja'),
    __metadata("design:paramtypes", [CajaService])
], CajaController);
export { CajaController };
//# sourceMappingURL=caja.controller.js.map