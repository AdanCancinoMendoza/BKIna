import { PrismaService } from '../prisma/prisma.service.js';
import { RegistroOrganizacionDto } from './dto/registro-organizacion.dto.js';
export declare class OrganizacionesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    registrarEmpresa(dto: RegistroOrganizacionDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
}
