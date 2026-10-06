import { CajaService } from './caja.service.js';
export declare class CajaController {
    private readonly cajaService;
    constructor(cajaService: CajaService);
    obtenerEstadoCaja(terminalId: string): Promise<{
        terminalId: any;
        nombreTerminal: any;
        estado: any;
        sucursal: any;
        ventasEfectivo: number;
        ventasTarjeta: number;
        totalVentas: number;
    }>;
    abrirCaja(terminalId: string, fondoInicial: number): Promise<{
        mensaje: string;
        terminal: any;
        fondoInicial: number;
    }>;
    cerrarCaja(terminalId: string, efectivoMano: number, notas?: string): Promise<{
        mensaje: string;
        terminal: any;
        efectivoEsperado: number;
        efectivoContado: number;
        diferencia: number;
        notas: string | undefined;
    }>;
}
