import { UsuariosService } from './usuarios.service.js';
import { LoginDto, LoginPerfilDto } from './dto/login.dto.js';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    login(dto: LoginDto): Promise<{
        mensaje: string;
        usuario: {
            id: string;
            nombre: string;
            email: string;
            telefono: string | null;
            rol: import("@prisma/client").$Enums.RolUsuario;
            organizacionId: string;
            sucursalId: string | null;
            organizacion: {
                nombre: string;
                id: string;
                email: string | null;
                logo: string | null;
            };
            sucursal: {
                nombre: string;
                id: string;
            } | null;
        };
    }>;
    loginPerfil(dto: LoginPerfilDto): Promise<{
        mensaje: string;
        usuario: {
            id: string;
            nombre: string;
            email: string;
            telefono: string | null;
            rol: import("@prisma/client").$Enums.RolUsuario;
            organizacionId: string;
            sucursalId: string | null;
            organizacion: {
                nombre: string;
                id: string;
                logo: string | null;
            };
            sucursal: {
                nombre: string;
                id: string;
            } | null;
        };
    }>;
    findByOrganizacion(organizacionId: string): Promise<{
        sucursal: {
            nombre: string;
            id: string;
        } | null;
        nombre: string;
        telefono: string | null;
        id: string;
        email: string;
        sucursalId: string | null;
        rol: import("@prisma/client").$Enums.RolUsuario;
    }[]>;
    findOne(id: string): Promise<{
        organizacion: {
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
        };
        sucursal: {
            nombre: string;
            telefono: string | null;
            direccion: string | null;
            id: string;
            organizacionId: string;
            activo: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        nombre: string;
        telefono: string | null;
        id: string;
        email: string;
        organizacionId: string;
        sucursalId: string | null;
        rol: import("@prisma/client").$Enums.RolUsuario;
        activo: boolean;
        createdAt: Date;
    }>;
}
