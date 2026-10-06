import { PrismaService } from '../prisma/prisma.service.js';
export declare class TerminalesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(sucursalId?: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(data: {
        sucursalId: string;
        nombre: string;
    }): Promise<any>;
    updateEstado(id: string, estado: 'Abierta' | 'Cerrada'): Promise<any>;
}
