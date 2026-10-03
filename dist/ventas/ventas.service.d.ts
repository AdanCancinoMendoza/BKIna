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
    }): Promise<{
        sucursal: {
            nombre: string;
            telefono: string | null;
            direccion: string | null;
            id: string;
            organizacionId: string;
            activo: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        cliente: {
            nombre: string;
            telefono: string | null;
            id: string;
            email: string | null;
            organizacionId: string;
            createdAt: Date;
            updatedAt: Date;
            rfc: string | null;
            localidad: string | null;
            puntos: number;
            saldo: import("@prisma/client/runtime/library").Decimal;
        } | null;
        detalles: ({
            articulo: {
                nombre: string;
                id: string;
                organizacionId: string;
                activo: boolean;
                createdAt: Date;
                updatedAt: Date;
                familiaId: string | null;
                subfamiliaId: string | null;
                codigo: string;
                descripcion: string | null;
                precioCompra: import("@prisma/client/runtime/library").Decimal;
                precioVenta: import("@prisma/client/runtime/library").Decimal;
                unidad: string;
                imagen: string | null;
            };
        } & {
            id: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            cantidad: number;
            precioUnitario: import("@prisma/client/runtime/library").Decimal;
            articuloId: string;
            ventaId: string;
        })[];
    } & {
        estado: import("@prisma/client").$Enums.EstadoVenta;
        id: string;
        organizacionId: string;
        sucursalId: string;
        createdAt: Date;
        usuarioId: string | null;
        folio: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        impuesto: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        metodoPago: string;
        terminalId: string | null;
        clienteId: string | null;
    }>;
    obtenerVentas(organizacionId: string): Promise<({
        usuario: {
            nombre: string;
            telefono: string | null;
            id: string;
            email: string;
            organizacionId: string;
            sucursalId: string | null;
            password: string;
            rol: import("@prisma/client").$Enums.RolUsuario;
            activo: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        cliente: {
            nombre: string;
            telefono: string | null;
            id: string;
            email: string | null;
            organizacionId: string;
            createdAt: Date;
            updatedAt: Date;
            rfc: string | null;
            localidad: string | null;
            puntos: number;
            saldo: import("@prisma/client/runtime/library").Decimal;
        } | null;
        detalles: ({
            articulo: {
                nombre: string;
                id: string;
                organizacionId: string;
                activo: boolean;
                createdAt: Date;
                updatedAt: Date;
                familiaId: string | null;
                subfamiliaId: string | null;
                codigo: string;
                descripcion: string | null;
                precioCompra: import("@prisma/client/runtime/library").Decimal;
                precioVenta: import("@prisma/client/runtime/library").Decimal;
                unidad: string;
                imagen: string | null;
            };
        } & {
            id: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            cantidad: number;
            precioUnitario: import("@prisma/client/runtime/library").Decimal;
            articuloId: string;
            ventaId: string;
        })[];
    } & {
        estado: import("@prisma/client").$Enums.EstadoVenta;
        id: string;
        organizacionId: string;
        sucursalId: string;
        createdAt: Date;
        usuarioId: string | null;
        folio: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        impuesto: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        metodoPago: string;
        terminalId: string | null;
        clienteId: string | null;
    })[]>;
}
