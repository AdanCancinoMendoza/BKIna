import { PrismaService } from '../prisma/prisma.service.js';
export declare class SucursalesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(organizacionId?: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(data: {
        organizacionId: string;
        nombre: string;
        direccion?: string;
        telefono?: string;
    }): Promise<any>;
}
