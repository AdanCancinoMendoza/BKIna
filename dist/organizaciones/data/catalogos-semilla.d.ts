export interface ArticuloSemilla {
    codigo: string;
    nombre: string;
    descripcion?: string;
    precioCompra: number;
    precioVenta: number;
    unidad: string;
    stockInicial: number;
}
export interface FamiliaSemilla {
    nombre: string;
    descripcion: string;
    articulos: ArticuloSemilla[];
}
export interface CatalogoPais {
    pais: string;
    codigoPais: string;
    bandera: string;
    monedaSimbolo: string;
    monedaCodigo: string;
    familias: FamiliaSemilla[];
}
export declare const CATALOGO_MEXICO: FamiliaSemilla[];
export declare const CATALOGO_COLOMBIA: FamiliaSemilla[];
export declare const CATALOGO_USA: FamiliaSemilla[];
export declare const CATALOGO_ESPANA: FamiliaSemilla[];
export declare const CATALOGO_ARGENTINA: FamiliaSemilla[];
export declare const CATALOGO_PERU: FamiliaSemilla[];
export declare const CATALOGO_CHILE: FamiliaSemilla[];
export declare const CATALOGO_FARMACIA: FamiliaSemilla[];
export declare function getCatalogoSemilla(pais?: string, giro?: string): FamiliaSemilla[];
export declare function getCatalogoPorGiro(giro?: string): FamiliaSemilla[];
