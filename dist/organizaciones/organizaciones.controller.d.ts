import { OrganizacionesService } from './organizaciones.service.js';
import { RegistroOrganizacionDto } from './dto/registro-organizacion.dto.js';
export declare class OrganizacionesController {
    private readonly organizacionesService;
    constructor(organizacionesService: OrganizacionesService);
    registrarEmpresa(dto: RegistroOrganizacionDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
}
