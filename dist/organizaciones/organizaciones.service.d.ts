import { PrismaService } from '../prisma/prisma.service.js';
import { RegistroOrganizacionDto } from './dto/registro-organizacion.dto.js';
export declare class OrganizacionesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    registrarEmpresa(dto: RegistroOrganizacionDto): Promise<{
        mensaje: string;
        organizacion: {
            id: string;
            nombre: string;
            email: string | null;
            telefono: string | null;
            direccion: string | null;
            pais: string | null;
            estado: string | null;
            municipio: string | null;
            codigoPostal: string | null;
            createdAt: Date;
        };
        sucursal: {
            id: string;
            nombre: string;
            direccion: string | null;
            telefono: string | null;
            terminalInicial: {
                id: string;
                nombre: string;
            };
        };
        admin: {
            id: string;
            nombre: string;
            email: string;
            telefono: string | null;
            rol: import("@prisma/client").$Enums.RolUsuario;
        };
        vendedor: {
            id: any;
            nombre: any;
            email: any;
            telefono: any;
            rol: any;
        } | null;
        suscripcion: {
            id: string;
            plan: string;
            estado: string;
            fechaInicio: Date;
            fechaFin: Date;
        };
        articulosPrecargadosCount: number;
    }>;
    findAll(): Promise<({
        suscripciones: {
            estado: string;
            plan: string;
            fechaFin: Date;
            id: string;
            organizacionId: string;
            createdAt: Date;
            updatedAt: Date;
            fechaInicio: Date;
        }[];
        _count: {
            ventas: number;
            sucursales: number;
            usuarios: number;
            clientes: number;
        };
    } & {
        nombre: string;
        telefono: string | null;
        pais: string | null;
        estado: string | null;
        municipio: string | null;
        codigoPostal: string | null;
        direccion: string | null;
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        rfc: string | null;
        logo: string | null;
    })[]>;
    findOne(id: string): Promise<{
        sucursales: ({
            terminales: {
                nombre: string;
                estado: string;
                id: string;
                sucursalId: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
            _count: {
                ventas: number;
                usuarios: number;
            };
        } & {
            nombre: string;
            telefono: string | null;
            direccion: string | null;
            id: string;
            organizacionId: string;
            activo: boolean;
            createdAt: Date;
            updatedAt: Date;
        })[];
        usuarios: {
            nombre: string;
            telefono: string | null;
            id: string;
            email: string;
            sucursalId: string | null;
            rol: import("@prisma/client").$Enums.RolUsuario;
            activo: boolean;
            createdAt: Date;
        }[];
        suscripciones: {
            estado: string;
            plan: string;
            fechaFin: Date;
            id: string;
            organizacionId: string;
            createdAt: Date;
            updatedAt: Date;
            fechaInicio: Date;
        }[];
    } & {
        nombre: string;
        telefono: string | null;
        pais: string | null;
        estado: string | null;
        municipio: string | null;
        codigoPostal: string | null;
        direccion: string | null;
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        rfc: string | null;
        logo: string | null;
    }>;
}
