import { ClientesService } from './clientes.service.js';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    findAll(organizacionId?: string, search?: string, localidad?: string): Promise<({
        _count: {
            ventas: number;
        };
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        ventas: ({
            detalles: ({
                articulo: {
                    nombre: string;
                    id: string;
                    organizacionId: string;
                    activo: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    descripcion: string | null;
                    codigo: string;
                    precioCompra: import("@prisma/client/runtime/library").Decimal;
                    precioVenta: import("@prisma/client/runtime/library").Decimal;
                    unidad: string;
                    imagen: string | null;
                    familiaId: string | null;
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
        })[];
    } & {
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
    }>;
    create(body: any): Promise<{
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
    }>;
    update(id: string, body: any): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
