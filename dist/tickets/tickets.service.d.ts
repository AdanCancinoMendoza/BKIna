import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
export declare class TicketsService {
    private readonly prisma;
    private readonly eventsGateway;
    constructor(prisma: PrismaService, eventsGateway: EventsGateway);
    findAll(organizacionId?: string, search?: string, estado?: string, sucursalId?: string): Promise<({
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
        terminal: {
            nombre: string;
            estado: string;
            id: string;
            sucursalId: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        usuario: {
            nombre: string;
            telefono: string | null;
            id: string;
            email: string;
            organizacionId: string;
            sucursalId: string | null;
            password: string;
            pin: string | null;
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
                descripcion: string | null;
                familiaId: string | null;
                subfamiliaId: string | null;
                codigo: string;
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
    findOne(id: string): Promise<{
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
        terminal: {
            nombre: string;
            estado: string;
            id: string;
            sucursalId: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        usuario: {
            nombre: string;
            telefono: string | null;
            id: string;
            email: string;
            organizacionId: string;
            sucursalId: string | null;
            password: string;
            pin: string | null;
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
                descripcion: string | null;
                familiaId: string | null;
                subfamiliaId: string | null;
                codigo: string;
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
    cambiarEstado(id: string, nuevoEstado: 'DEVUELTO' | 'CANCELADO', motivo?: string): Promise<{
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
                descripcion: string | null;
                familiaId: string | null;
                subfamiliaId: string | null;
                codigo: string;
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
}
