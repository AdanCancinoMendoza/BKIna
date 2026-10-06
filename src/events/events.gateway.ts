import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventsGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado via WebSocket: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('join:room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string },
  ) {
    client.join(data.room);
    this.logger.log(`Cliente ${client.id} se unió a la sala: ${data.room}`);
    return { status: 'joined', room: data.room };
  }

  emitirVentaCreada(venta: any, room?: string) {
    if (room) {
      this.server.to(room).emit('venta:creada', venta);
    } else {
      this.server.emit('venta:creada', venta);
    }
  }

  emitirStockActualizado(data: { articuloId: string; sucursalId: string; nuevoStock: number }, room?: string) {
    if (room) {
      this.server.to(room).emit('stock:actualizado', data);
    } else {
      this.server.emit('stock:actualizado', data);
    }
  }

  emitirEstadoTerminal(data: { terminalId: string; estado: string }, room?: string) {
    if (room) {
      this.server.to(room).emit('terminal:estado', data);
    } else {
      this.server.emit('terminal:estado', data);
    }
  }

  emitirArticuloCreado(articulo: any, room?: string) {
    if (room) {
      this.server.to(room).emit('articulo:creado', articulo);
    } else {
      this.server.emit('articulo:creado', articulo);
    }
  }

  emitirArticuloActualizado(articulo: any, room?: string) {
    if (room) {
      this.server.to(room).emit('articulo:actualizado', articulo);
    } else {
      this.server.emit('articulo:actualizado', articulo);
    }
  }

  emitirArticuloEliminado(articuloId: string, room?: string) {
    if (room) {
      this.server.to(room).emit('articulo:eliminado', { id: articuloId });
    } else {
      this.server.emit('articulo:eliminado', { id: articuloId });
    }
  }

  emitirCatalogoPrecargado(data: { organizacionId: string; count: number }, room?: string) {
    if (room) {
      this.server.to(room).emit('catalogo:precargado', data);
    } else {
      this.server.emit('catalogo:precargado', data);
    }
  }

  @SubscribeMessage('ping')
  handlePing() {
    return { event: 'pong', time: new Date().toISOString() };
  }
}
