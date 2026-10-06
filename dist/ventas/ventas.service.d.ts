import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
export declare class VentasService {
    private readonly prisma;
    private readonly eventsGateway;
    constructor(prisma: PrismaService, eventsGateway: EventsGateway);
    registrarVenta(data: {
        organizacionId: string;
        sucursalId: string;
        terminalId?: string;
        clienteId?: string;
        usuarioId?: string;
        subtotal: number;
        impuesto: number;
        total: number;
        metodoPago: string;
        detalles: Array<{
            articuloId: string;
            cantidad: number;
            precioUnitario: number;
            subtotal: number;
        }>;
    }): Promise<any>;
    obtenerVentas(organizacionId: string): Promise<any>;
}
