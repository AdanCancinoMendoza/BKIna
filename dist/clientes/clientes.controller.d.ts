import { ClientesService } from './clientes.service.js';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    findAll(organizacionId?: string, search?: string, localidad?: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(body: any): Promise<any>;
    update(id: string, body: any): Promise<any>;
    remove(id: string): Promise<any>;
}
