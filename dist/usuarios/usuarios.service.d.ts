import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto, LoginPerfilDto } from './dto/login.dto.js';
export declare class UsuariosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    login(dto: LoginDto): Promise<{
        mensaje: string;
        usuario: {
            id: any;
            nombre: any;
            email: any;
            telefono: any;
            rol: any;
            organizacionId: any;
            sucursalId: any;
            organizacion: any;
            sucursal: any;
        };
    }>;
    loginPerfil(dto: LoginPerfilDto): Promise<{
        mensaje: string;
        usuario: {
            id: any;
            nombre: any;
            email: any;
            telefono: any;
            rol: any;
            organizacionId: any;
            sucursalId: any;
            organizacion: any;
            sucursal: any;
        };
    }>;
    findByOrganizacion(organizacionId: string): Promise<any>;
    findOne(id: string): Promise<any>;
}
