import { TerminalesService } from './terminales.service.js';
export declare class TerminalesController {
    private readonly terminalesService;
    constructor(terminalesService: TerminalesService);
    findAll(sucursalId?: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(body: any): Promise<any>;
    updateEstado(id: string, estado: 'Abierta' | 'Cerrada'): Promise<any>;
}
