import { UsuariosService } from './usuarios.service.js';
import { LoginDto, LoginPerfilDto } from './dto/login.dto.js';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
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
