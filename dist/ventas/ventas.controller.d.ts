import { VentasService } from './ventas.service.js';
export declare class VentasController {
    private readonly ventasService;
    constructor(ventasService: VentasService);
    registrarVenta(body: any): Promise<{
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
                descripcion: string | null;
                familiaId: string | null;
                codigo: string;
                precioCompra: import("@prisma/client/runtime/library").Decimal;
                precioVenta: import("@prisma/client/runtime/library").Decimal;
                unidad: string;
                imagen: string | null;
                subfamiliaId: string | null;
            };
        } & {
            id: string;
            articuloId: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            cantidad: number;
            precioUnitario: import("@prisma/client/runtime/library").Decimal;
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
                descripcion: string | null;
                familiaId: string | null;
                codigo: string;
                precioCompra: import("@prisma/client/runtime/library").Decimal;
                precioVenta: import("@prisma/client/runtime/library").Decimal;
                unidad: string;
                imagen: string | null;
                subfamiliaId: string | null;
            };
        } & {
            id: string;
            articuloId: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            cantidad: number;
            precioUnitario: import("@prisma/client/runtime/library").Decimal;
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
