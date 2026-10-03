import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, data: {
        room: string;
    }): {
        status: string;
        room: string;
    };
    emitirVentaCreada(venta: any, room?: string): void;
    emitirStockActualizado(data: {
        articuloId: string;
        sucursalId: string;
        nuevoStock: number;
    }, room?: string): void;
    emitirEstadoTerminal(data: {
        terminalId: string;
        estado: string;
    }, room?: string): void;
    handlePing(): {
        event: string;
        time: string;
    };
}
