import { PrismaService } from '../prisma/prisma.service.js';
export declare class ClientesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
            folio: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            impuesto: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            metodoPago: string;
            terminalId: string | null;
            clienteId: string | null;
            usuarioId: string | null;
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
    create(data: {
        organizacionId: string;
        nombre: string;
        telefono?: string;
        email?: string;
        rfc?: string;
        localidad?: string;
    }): Promise<{
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
    update(id: string, data: {
        nombre?: string;
        telefono?: string;
        email?: string;
        rfc?: string;
        localidad?: string;
        puntos?: number;
        saldo?: number;
    }): Promise<{
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
