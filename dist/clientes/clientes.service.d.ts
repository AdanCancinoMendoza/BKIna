import { PrismaService } from '../prisma/prisma.service.js';
export declare class ClientesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(organizacionId?: string, search?: string, localidad?: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(data: {
        organizacionId: string;
        nombre: string;
        telefono?: string;
        email?: string;
        rfc?: string;
        localidad?: string;
    }): Promise<any>;
    update(id: string, data: {
        nombre?: string;
        telefono?: string;
        email?: string;
        rfc?: string;
        localidad?: string;
        puntos?: number;
        saldo?: number;
    }): Promise<any>;
    remove(id: string): Promise<any>;
}
