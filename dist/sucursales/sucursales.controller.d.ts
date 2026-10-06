import { SucursalesService } from './sucursales.service.js';
export declare class SucursalesController {
    private readonly sucursalesService;
    constructor(sucursalesService: SucursalesService);
    findAll(organizacionId?: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(body: any): Promise<any>;
}
