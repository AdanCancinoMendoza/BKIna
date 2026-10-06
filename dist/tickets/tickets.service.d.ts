import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
export declare class TicketsService {
    private readonly prisma;
    private readonly eventsGateway;
    constructor(prisma: PrismaService, eventsGateway: EventsGateway);
    findAll(organizacionId?: string, search?: string, estado?: string, sucursalId?: string): Promise<any>;
    findOne(id: string): Promise<any>;
    cambiarEstado(id: string, nuevoEstado: 'DEVUELTO' | 'CANCELADO', motivo?: string): Promise<any>;
}
