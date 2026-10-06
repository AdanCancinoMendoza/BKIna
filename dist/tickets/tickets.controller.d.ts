import { TicketsService } from './tickets.service.js';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    findAll(organizacionId?: string, search?: string, estado?: string, sucursalId?: string): Promise<any>;
    findOne(id: string): Promise<any>;
    cambiarEstado(id: string, estado: 'DEVUELTO' | 'CANCELADO', motivo?: string): Promise<any>;
}
