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

  private safeEmit(event: string, data: any, room?: string) {
    if (!this.server) return;
    try {
      const orgId = data?.organizacionId;
      const targetRoom = room || (orgId ? `org_${orgId}` : undefined);

      if (targetRoom) {
        this.server.to(targetRoom).emit(event, data);
        // También emitir a sala global para clientes legacy o globales
        this.server.emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    } catch (err) {
      this.logger.warn(`Error al emitir evento websocket ${event}:`, err);
    }
  }

  emitirVentaCreada(venta: any, room?: string) {
    this.safeEmit('venta:creada', venta, room);
  }

  emitirStockActualizado(data: { articuloId: string; sucursalId?: string; nuevoStock: number; organizacionId?: string }, room?: string) {
    this.safeEmit('stock:actualizado', data, room);
  }

  emitirMovimientoStock(movimiento: any, room?: string) {
    this.safeEmit('inventario:movimiento', movimiento, room);
  }

  emitirEstadoTerminal(data: { terminalId: string; estado: string; organizacionId?: string }, room?: string) {
    this.safeEmit('terminal:estado', data, room);
  }

  emitirCorteCaja(corte: any, room?: string) {
    this.safeEmit('caja:corte', corte, room);
  }

  emitirCajaEstado(data: { terminalId: string; estado: string; fondoInicial?: number; organizacionId?: string }, room?: string) {
    this.safeEmit('caja:estado', data, room);
  }

  emitirArticuloCreado(articulo: any, room?: string) {
    this.safeEmit('articulo:creado', articulo, room);
  }

  emitirArticuloActualizado(articulo: any, room?: string) {
    this.safeEmit('articulo:actualizado', articulo, room);
  }

  emitirArticuloEliminado(articuloId: string, room?: string, organizacionId?: string) {
    this.safeEmit('articulo:eliminado', { id: articuloId, organizacionId }, room);
  }

  emitirCatalogoPrecargado(data: { organizacionId: string; count: number }, room?: string) {
    this.safeEmit('catalogo:precargado', data, room);
  }

  emitirClienteCreado(cliente: any, room?: string) {
    this.safeEmit('cliente:creado', cliente, room);
  }

  emitirClienteActualizado(cliente: any, room?: string) {
    this.safeEmit('cliente:actualizado', cliente, room);
  }

  emitirClienteEliminado(clienteId: string, room?: string, organizacionId?: string) {
    this.safeEmit('cliente:eliminado', { id: clienteId, organizacionId }, room);
  }

  emitirProveedorCreado(proveedor: any, room?: string) {
    this.safeEmit('proveedor:creado', proveedor, room);
  }

  emitirProveedorActualizado(proveedor: any, room?: string) {
    this.safeEmit('proveedor:actualizado', proveedor, room);
  }

  emitirProveedorEliminado(proveedorId: string, room?: string, organizacionId?: string) {
    this.safeEmit('proveedor:eliminado', { id: proveedorId, organizacionId }, room);
  }

  emitirCitaCreada(cita: any, room?: string) {
    this.safeEmit('cita:creada', cita, room);
  }

  emitirCitaActualizada(cita: any, room?: string) {
    this.safeEmit('cita:actualizada', cita, room);
  }

  emitirCitaEliminada(citaId: string, room?: string, organizacionId?: string) {
    this.safeEmit('cita:eliminada', { id: citaId, organizacionId }, room);
  }

  emitirWhatsAppQR(data: { qrCode: string; organizacionId: string }, room?: string) {
    this.safeEmit('whatsapp:qr', data, room);
  }

  emitirWhatsAppConectado(data: { organizacionId: string; telefono?: string; usuario?: any }, room?: string) {
    this.safeEmit('whatsapp:conectado', data, room);
  }

  emitirWhatsAppDesconectado(data: { organizacionId: string }, room?: string) {
    this.safeEmit('whatsapp:desconectado', data, room);
  }

  emitirCampanaProgreso(data: { campanaId: string; total: number; enviados: number; cliente?: string; estado: string }, room?: string) {
    this.safeEmit('campana:progreso', data, room);
  }

  @SubscribeMessage('ping')
  handlePing() {
    return { event: 'pong', time: new Date().toISOString() };
  }
}
