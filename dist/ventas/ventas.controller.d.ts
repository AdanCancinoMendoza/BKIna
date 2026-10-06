import { VentasService } from './ventas.service.js';
export declare class VentasController {
    private readonly ventasService;
    constructor(ventasService: VentasService);
    registrarVenta(body: any): Promise<any>;
    obtenerVentas(organizacionId: string): Promise<any>;
}
