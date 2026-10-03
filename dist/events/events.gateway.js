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
var EventsGateway_1;
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
let EventsGateway = EventsGateway_1 = class EventsGateway {
    server;
    logger = new Logger(EventsGateway_1.name);
    handleConnection(client) {
        this.logger.log(`Cliente conectado via WebSocket: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Cliente desconectado: ${client.id}`);
    }
    handleJoinRoom(client, data) {
        client.join(data.room);
        this.logger.log(`Cliente ${client.id} se unió a la sala: ${data.room}`);
        return { status: 'joined', room: data.room };
    }
    emitirVentaCreada(venta, room) {
        if (room) {
            this.server.to(room).emit('venta:creada', venta);
        }
        else {
            this.server.emit('venta:creada', venta);
        }
    }
    emitirStockActualizado(data, room) {
        if (room) {
            this.server.to(room).emit('stock:actualizado', data);
        }
        else {
            this.server.emit('stock:actualizado', data);
        }
    }
    emitirEstadoTerminal(data, room) {
        if (room) {
            this.server.to(room).emit('terminal:estado', data);
        }
        else {
            this.server.emit('terminal:estado', data);
        }
    }
    handlePing() {
        return { event: 'pong', time: new Date().toISOString() };
    }
};
__decorate([
    WebSocketServer(),
    __metadata("design:type", Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    SubscribeMessage('join:room'),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleJoinRoom", null);
__decorate([
    SubscribeMessage('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handlePing", null);
EventsGateway = EventsGateway_1 = __decorate([
    WebSocketGateway({
        cors: {
            origin: '*',
        },
    })
], EventsGateway);
export { EventsGateway };
//# sourceMappingURL=events.gateway.js.map