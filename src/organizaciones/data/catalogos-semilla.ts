export type TipoCodigoArticulo = "EAN" | "PLU" | "INTERNO" | "SIN_CODIGO";

export interface ArticuloSemilla {
  codigo: string; // EAN-13, PLU de báscula o Código interno
  tipoCodigo?: TipoCodigoArticulo;
  nombre: string;
  subfamilia?: string;
  descripcion?: string;
  precioCompra: number;
  precioVenta: number;
  unidad: string; // "Kg", "Pieza", "Manojo", "Caja", "Bolsa", etc.
  stockInicial: number;
}

export interface SubfamiliaSemilla {
  nombre: string;
  descripcion?: string;
  articulos: ArticuloSemilla[];
}

export interface FamiliaSemilla {
  nombre: string;
  descripcion: string;
  subfamilias?: SubfamiliaSemilla[];
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

// ===========================================================================
// MEXICO (Prefijo EAN-13: 750 + Códigos PLU de Frutas/Verduras / Moneda: MXN $)
// ===========================================================================
export const CATALOGO_MEXICO: FamiliaSemilla[] = [
  // --- BOTANAS, PAPAS Y SNACKS ---
  {
    nombre: "Botanas y Snacks",
    descripcion: "Papas fritas Sabritas y Barcel, totopos, frituras de maíz y cacahuates",
    articulos: [
      { codigo: "7501011115652", tipoCodigo: "EAN", subfamilia: "Papas Fritas", nombre: "Papas Sabritas Sal Original 45 g", descripcion: "Papas fritas clásicas con sal de mar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011115676", tipoCodigo: "EAN", subfamilia: "Papas Fritas", nombre: "Papas Sabritas Adobadas 42 g", descripcion: "Papas fritas sabor adobo", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011115706", tipoCodigo: "EAN", subfamilia: "Papas Fritas", nombre: "Papas Sabritas Crema y Especias 42 g", descripcion: "Papas fritas sabor crema y cebolla", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011115669", tipoCodigo: "EAN", subfamilia: "Papas Fritas", nombre: "Papas Sabritas Limón y Sal 42 g", descripcion: "Papas con sabor ácido y sal de mar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011115683", tipoCodigo: "EAN", subfamilia: "Papas Fritas", nombre: "Ruffles Queso 48 g", descripcion: "Papas onduladas crujientes con queso", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011167521", tipoCodigo: "EAN", subfamilia: "Papas Fritas", nombre: "Ruffles Mega Crunch Salsa Negra 48 g", descripcion: "Papas onduladas corte grueso sabor salsa negra", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011131065", tipoCodigo: "EAN", subfamilia: "Tortillas y Totopos", nombre: "Doritos Nacho Sabritas 58 g", descripcion: "Totopos de maíz sabor queso nacho", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011135407", tipoCodigo: "EAN", subfamilia: "Tortillas y Totopos", nombre: "Doritos Dinamita Flamin Hot 58 g", descripcion: "Totopos enrollados picantes con toque de limón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011142511", tipoCodigo: "EAN", subfamilia: "Tortillas y Totopos", nombre: "Doritos 3D Queso 45 g", descripcion: "Botana tridimensional de maíz sabor queso", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011115713", tipoCodigo: "EAN", subfamilia: "Botanas de Maíz", nombre: "Cheetos Torciditos 52 g", descripcion: "Botana de maíz inflado con queso y chile", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011115720", tipoCodigo: "EAN", subfamilia: "Botanas de Maíz", nombre: "Cheetos Poffs 48 g", descripcion: "Botana de maíz inflado horneado con queso", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011124784", tipoCodigo: "EAN", subfamilia: "Botanas de Maíz", nombre: "Cheetos Flamin Hot 52 g", descripcion: "Botana de maíz con sabor picante Flamin Hot", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011115690", tipoCodigo: "EAN", subfamilia: "Botanas de Maíz", nombre: "Cheetos Bolitas 46 g", descripcion: "Esferitas de maíz horneadas sabor queso y chile", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011133915", tipoCodigo: "EAN", subfamilia: "Tortillas y Totopos", nombre: "Tostitos Salsa Verde 65 g", descripcion: "Totopos de maíz nixtamalizado sabor salsa verde", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011133939", tipoCodigo: "EAN", subfamilia: "Tortillas y Totopos", nombre: "Tostitos Flamin Hot 65 g", descripcion: "Totopos de maíz sabor chile y limón picante", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011115768", tipoCodigo: "EAN", subfamilia: "Frituras de Maíz", nombre: "Rancheritos Sabritas 58 g", descripcion: "Totopos de maíz sazonados sabor chile y especias", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011115737", tipoCodigo: "EAN", subfamilia: "Frituras de Maíz", nombre: "Fritos Sal y Limón 57 g", descripcion: "Frituras de maíz con sal y toque de limón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011141125", tipoCodigo: "EAN", subfamilia: "Frituras de Maíz", nombre: "Fritos Chorizo Chipotle 57 g", descripcion: "Tiras de maíz con sabor a chorizo chipotle", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011115744", tipoCodigo: "EAN", subfamilia: "Frituras de Maíz", nombre: "Churrumais con Limoncito 60 g", descripcion: "Tiritas de maíz fritas con chile y limón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011129987", tipoCodigo: "EAN", subfamilia: "Frituras de Maíz", nombre: "Crujitos Queso y Chile 45 g", descripcion: "Botana de maíz inflado con queso y chile en tiras", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011115775", tipoCodigo: "EAN", subfamilia: "Frituras de Trigo", nombre: "Sabritones con Chile y Limón 65 g", descripcion: "Frituras de trigo inflado con chile y limón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011124791", tipoCodigo: "EAN", subfamilia: "Mix de Botanas", nombre: "Paketaxo Botanero Sabritas 215 g", descripcion: "Mezcla de Sabritones, Rancheritos, Cheetos y Fritos", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011124807", tipoCodigo: "EAN", subfamilia: "Mix de Botanas", nombre: "Paketaxo Quexo Sabritas 215 g", descripcion: "Mezcla de botanas sabor queso y chile", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000153403", tipoCodigo: "EAN", subfamilia: "Frituras Barcel", nombre: "Takis Fuego Barcel 62 g", descripcion: "Taquitos de maíz enrollados sabor chile y limón extremo", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000153410", tipoCodigo: "EAN", subfamilia: "Frituras Barcel", nombre: "Takis Guacamole Barcel 62 g", descripcion: "Taquitos enrollados sabor aguacate y especias", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000153304", tipoCodigo: "EAN", subfamilia: "Frituras Barcel", nombre: "Takis Original Barcel 62 g", descripcion: "Taquitos enrollados de maíz crujiente sabor suave", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000111953", tipoCodigo: "EAN", subfamilia: "Papas Barcel", nombre: "Chips Jalapeño Barcel 55 g", descripcion: "Papas artesanales corte grueso sabor chile jalapeño", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000111946", tipoCodigo: "EAN", subfamilia: "Papas Barcel", nombre: "Chips Sal de Mar Barcel 55 g", descripcion: "Papas corte artesanal doradas con sal de mar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000111960", tipoCodigo: "EAN", subfamilia: "Papas Barcel", nombre: "Chips Fuego Barcel 55 g", descripcion: "Papas corte artesanal sabor chile y limón picante", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000153427", tipoCodigo: "EAN", subfamilia: "Frituras Barcel", nombre: "Runners Barcel 55 g", descripcion: "Botana de maíz en forma de coche sabor salsa picante", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000153443", tipoCodigo: "EAN", subfamilia: "Frituras Barcel", nombre: "Big Mix Barcel Clásico 60 g", descripcion: "Mix de botanas crujientes Barcel", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501025501014", tipoCodigo: "EAN", subfamilia: "Botanas Totis", nombre: "Totis Donitas Sal y Limón 110 g", descripcion: "Aros de trigo crujientes con sal y limón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501025501021", tipoCodigo: "EAN", subfamilia: "Botanas Totis", nombre: "Totis Donitas con Chile 110 g", descripcion: "Aros de trigo crujientes con chile y limón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011100511", tipoCodigo: "EAN", subfamilia: "Cacahuates y Semillas", nombre: "Cacahuates Japoneses Karate 50 g", descripcion: "Cacahuates estilo japonés con cáscara crujiente de soya", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011102010", tipoCodigo: "EAN", subfamilia: "Cacahuates y Semillas", nombre: "Cacahuates Mafer Tostados con Sal 65 g", descripcion: "Cacahuates de primera calidad tostados y salados", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011102027", tipoCodigo: "EAN", subfamilia: "Cacahuates y Semillas", nombre: "Cacahuates Mafer Enchilados 65 g", descripcion: "Cacahuates tostados con cobertura de chile y limón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
    ],
  },

  // --- DULCERÍA Y CONFITERÍA MEXICANA ---
  {
    nombre: "Dulces y Confitería",
    descripcion: "Mazapanes, tamarindos con chile, paletas Vero, chocolates y golosinas",
    articulos: [
      { codigo: "7501026800017", tipoCodigo: "EAN", subfamilia: "Mazapanes", nombre: "Mazapán De la Rosa Original 28 g", descripcion: "Dulce tradicional de cacahuate tostado estilo mazapán", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501026800024", tipoCodigo: "EAN", subfamilia: "Mazapanes", nombre: "Mazapán De la Rosa Gigante 50 g", descripcion: "Mazapán grande de cacahuate", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501021100129", tipoCodigo: "EAN", subfamilia: "Tamarindos", nombre: "Pelón Pelo Rico Original 30 g", descripcion: "Pulpa de tamarindo suave con sabor acidito", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501026800154", tipoCodigo: "EAN", subfamilia: "Tamarindos", nombre: "Pulparindo De la Rosa Original 14 g", descripcion: "Barra de pulpa de tamarindo natural salada y picante", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501026800161", tipoCodigo: "EAN", subfamilia: "Tamarindos", nombre: "Pulparindo Extra Picante 14 g", descripcion: "Barra de tamarindo con chile habanero", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000140014", tipoCodigo: "EAN", subfamilia: "Cremas y Untables", nombre: "Duvalín Bi Sabor Avellana y Fresa 15 g", descripcion: "Golosina untable cremosa con dos sabores", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000140021", tipoCodigo: "EAN", subfamilia: "Cremas y Untables", nombre: "Duvalín Tri Sabor 15 g", descripcion: "Golosina con tres sabores: vainilla, fresa y avellana", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000110123", tipoCodigo: "EAN", subfamilia: "Paletas con Chile", nombre: "Paleta Vero Mango con Chile 16 g", descripcion: "Caramelo macizo sabor mango cubierto de chile", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000110130", tipoCodigo: "EAN", subfamilia: "Paletas con Chile", nombre: "Paleta Vero Elote con Chile 16 g", descripcion: "Caramelo macizo sabor fresa y chile en forma de elotito", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000110147", tipoCodigo: "EAN", subfamilia: "Caramelos Rellenos", nombre: "Vero Rellerindos 11 g", descripcion: "Caramelo duro con centro líquido de tamarindo picante", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011120014", tipoCodigo: "EAN", subfamilia: "Gomitas y Tiras", nombre: "Skwinkles Salsagheti Sandía 24 g", descripcion: "Tiras de dulce sabor sandía con salsa líquida de tamarindo", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501011120021", tipoCodigo: "EAN", subfamilia: "Polvos y Líquidos", nombre: "Lucas Muecas Chamoy 24 g", descripcion: "Paleta de caramelo con polvo sabor chamoy", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501041400018", tipoCodigo: "EAN", subfamilia: "Paletas con Chicle", nombre: "Paleta Tutsi Pop Original 20 g", descripcion: "Paleta de caramelo sabor cereza rellena de chicle", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501058617834", tipoCodigo: "EAN", subfamilia: "Chocolates", nombre: "Chocolate Abuelita Tableta 90 g", descripcion: "Tableta para preparar chocolate caliente con canela", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501058617841", tipoCodigo: "EAN", subfamilia: "Chocolates", nombre: "Chocolate Carlos V Barra 20 g", descripcion: "Barra de chocolate con leche estilo suizo", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "8000500015971", tipoCodigo: "EAN", subfamilia: "Chocolates", nombre: "Huevo Kinder Sorpresa 20 g", descripcion: "Huevo de chocolate con leche y sorpresa coleccionable", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
    ],
  },

  // --- BEBIDAS Y REFRESCOS ---
  {
    nombre: "Bebidas y Refrescos",
    descripcion: "Refrescos de cola y sabor, jugos, néctares, aguas purificadas y electrolitos",
    articulos: [
      { codigo: "7501055301088", tipoCodigo: "EAN", subfamilia: "Refrescos de Cola", nombre: "Coca-Cola Original 600 ml Pet", descripcion: "Refresco de cola sabor original en botella PET", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055301828", tipoCodigo: "EAN", subfamilia: "Refrescos de Cola", nombre: "Coca-Cola Original 3 Litros No Retornable", descripcion: "Refresco familiar 3 litros PET", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055301835", tipoCodigo: "EAN", subfamilia: "Refrescos de Cola", nombre: "Coca-Cola Original 2.5 Litros Pet", descripcion: "Refresco presentación familiar 2.5L", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055301057", tipoCodigo: "EAN", subfamilia: "Refrescos de Cola", nombre: "Coca-Cola 500 ml Vidrio Retornable", descripcion: "Refresco en botella de vidrio clásica retornable", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055301149", tipoCodigo: "EAN", subfamilia: "Refrescos de Cola", nombre: "Coca-Cola Original 355 ml Lata", descripcion: "Lata de refresco de cola tradicional 355 ml", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055311216", tipoCodigo: "EAN", subfamilia: "Refrescos de Cola", nombre: "Coca-Cola Sin Azúcar 600 ml", descripcion: "Refresco de cola sin azúcar ni calorías", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055301125", tipoCodigo: "EAN", subfamilia: "Refrescos de Sabor", nombre: "Sprite Lima-Limón 600 ml", descripcion: "Refresco transparente sabor lima-limón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055301132", tipoCodigo: "EAN", subfamilia: "Refrescos de Sabor", nombre: "Fanta Naranja 600 ml", descripcion: "Refresco de sabor naranja dulce", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055301156", tipoCodigo: "EAN", subfamilia: "Refrescos de Sabor", nombre: "Fresca Toronja 600 ml", descripcion: "Refresco cítrico sabor toronja con gas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055301224", tipoCodigo: "EAN", subfamilia: "Refrescos de Sabor", nombre: "Sidral Mundet Manzana 600 ml", descripcion: "Refresco tradicional sabor manzana pasteurizada", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055301842", tipoCodigo: "EAN", subfamilia: "Refrescos de Sabor", nombre: "Sidral Mundet Manzana 2 Litros", descripcion: "Refresco sabor manzana pasteurizada familiar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071100023", tipoCodigo: "EAN", subfamilia: "Refrescos Tradicionales", nombre: "Jarritos Mandarina 600 ml", descripcion: "Refresco mexicano tradicional sabor mandarina", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071100047", tipoCodigo: "EAN", subfamilia: "Refrescos Tradicionales", nombre: "Jarritos Toronja 600 ml", descripcion: "Refresco mexicano sabor toronja para mezclar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071100054", tipoCodigo: "EAN", subfamilia: "Refrescos Tradicionales", nombre: "Jarritos Tamarindo 2 Litros", descripcion: "Refresco sabor tamarindo presentación familiar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071110015", tipoCodigo: "EAN", subfamilia: "Refrescos de Sabor", nombre: "Squirt Toronja 600 ml", descripcion: "Refresco sabor toronja con jugo natural", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071110053", tipoCodigo: "EAN", subfamilia: "Aguas Minerales", nombre: "Agua Mineral Peñafiel 600 ml", descripcion: "Agua mineral de manantial carbonatada", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071110060", tipoCodigo: "EAN", subfamilia: "Aguas Minerales", nombre: "Agua Mineral Peñafiel Sifón 1.5 Litros", descripcion: "Agua mineralizada con gas en botella sifón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055320515", tipoCodigo: "EAN", subfamilia: "Jugos y Néctares", nombre: "Jugo Del Valle Mango 413 ml", descripcion: "Néctar clarificado con pulpa de mango mexicano", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501013101015", tipoCodigo: "EAN", subfamilia: "Jugos y Néctares", nombre: "Néctar Jumex Mango 450 ml Lata Botella", descripcion: "Néctar de mango en lata reutilizable", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501013101022", tipoCodigo: "EAN", subfamilia: "Jugos y Néctares", nombre: "Néctar Jumex Manzana 450 ml Lata Botella", descripcion: "Néctar de manzana en lata", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501013101039", tipoCodigo: "EAN", subfamilia: "Jugos y Néctares", nombre: "Néctar Jumex Durazno 450 ml Lata Botella", descripcion: "Néctar espeso de durazno en lata", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017002017", tipoCodigo: "EAN", subfamilia: "Jugos y Néctares", nombre: "Boing Mango 500 ml Tetra Brik", descripcion: "Bebida con pulpa de mango pasteurizada", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017002024", tipoCodigo: "EAN", subfamilia: "Jugos y Néctares", nombre: "Boing Guayaba 500 ml Tetra Brik", descripcion: "Bebida de frutas con pulpa de guayaba", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071110107", tipoCodigo: "EAN", subfamilia: "Preparadores de Bebidas", nombre: "Clamato Jugo de Tomate Original 946 ml", descripcion: "Bebida de jugo de tomate con almeja y especias", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501055310882", tipoCodigo: "EAN", subfamilia: "Agua Purificada", nombre: "Agua Purificada Ciel 1 Litro", descripcion: "Agua purificada sin sodio", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501031311308", tipoCodigo: "EAN", subfamilia: "Agua Purificada", nombre: "Agua Purificada Bonafont 1 Litro", descripcion: "Agua ligera embotellada de origen natural", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501125103930", tipoCodigo: "EAN", subfamilia: "Bebidas Hidratantes", nombre: "Electrolit Fresa 625 ml", descripcion: "Solución rehidratante oral con electrolitos", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501125103947", tipoCodigo: "EAN", subfamilia: "Bebidas Hidratantes", nombre: "Electrolit Coco 625 ml", descripcion: "Suero rehidratante oral sabor coco", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501125103954", tipoCodigo: "EAN", subfamilia: "Bebidas Hidratantes", nombre: "Electrolit Mora Azul 625 ml", descripcion: "Suero rehidratante oral sabor mora azul", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "9002490100070", tipoCodigo: "EAN", subfamilia: "Bebidas Energéticas", nombre: "Bebida Energética Red Bull 250 ml", descripcion: "Bebida energizante clásica en lata", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "070847012411", tipoCodigo: "EAN", subfamilia: "Bebidas Energéticas", nombre: "Bebida Energética Monster Energy 473 ml", descripcion: "Bebida con taurina, cafeína y ginseng", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
    ],
  },

  // --- CERVEZAS, VINOS Y LICORES ---
  {
    nombre: "Cervezas y Licores",
    descripcion: "Cervezas Corona, Victoria, Modelo, Tecate, tequilas, mezcales, rones y whiskies",
    articulos: [
      { codigo: "7501064191120", tipoCodigo: "EAN", subfamilia: "Cervezas Nacionales", nombre: "Cerveza Corona Extra 355 ml Botella", descripcion: "Cerveza clara tipo Pilsner mexicana", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501064191137", tipoCodigo: "EAN", subfamilia: "Cervezas Nacionales", nombre: "Cerveza Corona Extra Mega Caguama 1.2 L", descripcion: "Cerveza clara caguama familiar 1.2L", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501064191243", tipoCodigo: "EAN", subfamilia: "Cervezas Nacionales", nombre: "Cerveza Victoria 355 ml Botella", descripcion: "Cerveza tipo Viena color ámbar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501064191250", tipoCodigo: "EAN", subfamilia: "Cervezas Nacionales", nombre: "Cerveza Victoria Mega Caguama 1.2 L", descripcion: "Cerveza tipo Viena caguama familiar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501064193339", tipoCodigo: "EAN", subfamilia: "Cervezas Nacionales", nombre: "Cerveza Modelo Especial 355 ml Lata", descripcion: "Cerveza premium clara en lata", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501064193346", tipoCodigo: "EAN", subfamilia: "Cervezas Nacionales", nombre: "Cerveza Negra Modelo 355 ml Botella", descripcion: "Cerveza oscura tipo Munich de gran cuerpo", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7503001449008", tipoCodigo: "EAN", subfamilia: "Cervezas Nacionales", nombre: "Cerveza Tecate Original 355 ml Lata", descripcion: "Cerveza clásica tipo Pilsner con cuerpo", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7503001449015", tipoCodigo: "EAN", subfamilia: "Cervezas Nacionales", nombre: "Cerveza Tecate Light 355 ml Lata", descripcion: "Cerveza tipo Lager ligera refrescante", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7503001449039", tipoCodigo: "EAN", subfamilia: "Cervezas Nacionales", nombre: "Cerveza Dos Equis XX Lager 355 ml Lata", descripcion: "Cerveza clara suave tipo lager", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7503001449053", tipoCodigo: "EAN", subfamilia: "Cervezas Nacionales", nombre: "Cerveza Indio 355 ml Botella", descripcion: "Cerveza ámbar mexicana con malta tostada", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7503001449077", tipoCodigo: "EAN", subfamilia: "Cervezas Nacionales", nombre: "Cerveza Bohemia Clásica 355 ml Botella", descripcion: "Cerveza premium tipo Pilsner dorada", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501064198174", tipoCodigo: "EAN", subfamilia: "Cervezas Bajas Calorías", nombre: "Cerveza Michelob Ultra 355 ml Botella", descripcion: "Cerveza light con bajas calorías y carbohidratos", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501035010108", tipoCodigo: "EAN", subfamilia: "Tequilas", nombre: "Tequila José Cuervo Especial Reposado 990 ml", descripcion: "Tequila reposado en barricas de roble", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501035010207", tipoCodigo: "EAN", subfamilia: "Tequilas", nombre: "Tequila Gran Centenario Plata 700 ml", descripcion: "Tequila blanco 100% agave azul", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501035010214", tipoCodigo: "EAN", subfamilia: "Tequilas", nombre: "Tequila Gran Centenario Reposado 700 ml", descripcion: "Tequila reposado en barricas de roble blanco", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501035020107", tipoCodigo: "EAN", subfamilia: "Tequilas", nombre: "Tequila Herradura Reposado 700 ml", descripcion: "Tequila 100% de agave con 11 meses de maduración", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005630015", tipoCodigo: "EAN", subfamilia: "Tequilas", nombre: "Tequila Cazadores Reposado 1 Litro", descripcion: "Tequila 100% agave azul de Los Altos de Jalisco", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501035041010", tipoCodigo: "EAN", subfamilia: "Tequilas", nombre: "Tequila Don Julio Blanco 700 ml", descripcion: "Tequila 100% agave azul destilado", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501035041706", tipoCodigo: "EAN", subfamilia: "Tequilas", nombre: "Tequila Don Julio 70 Cristalino 700 ml", descripcion: "Tequila añejo cristalino filtrado", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501035042017", tipoCodigo: "EAN", subfamilia: "Tequilas", nombre: "Tequila 1800 Cristalino Añejo 700 ml", descripcion: "Tequila añejo filtrado en carbón activo", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501035043014", tipoCodigo: "EAN", subfamilia: "Tequilas", nombre: "Tequila Maestro Dobel Diamante 700 ml", descripcion: "Tequila cristalino reposado filtrado", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7503000551016", tipoCodigo: "EAN", subfamilia: "Licores de Agave", nombre: "Licor de Agave Rancho Escondido 750 ml", descripcion: "Destilado de agave reposado tradicional", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005610086", tipoCodigo: "EAN", subfamilia: "Rones", nombre: "Ron Bacardí Carta Blanca 980 ml", descripcion: "Ron blanco añejado en roble blanco americano", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005610307", tipoCodigo: "EAN", subfamilia: "Rones", nombre: "Ron Bacardí Mango Chile 750 ml", descripcion: "Ron saborizado con mango y toque picante", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005610109", tipoCodigo: "EAN", subfamilia: "Rones", nombre: "Ron Matusalem Clásico 10 Años 750 ml", descripcion: "Ron solera añejo de alta pureza", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005640014", tipoCodigo: "EAN", subfamilia: "Brandies", nombre: "Brandy Presidente Clásico 1 Litro", descripcion: "Brandy clásico mexicano destilado de uva", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005640021", tipoCodigo: "EAN", subfamilia: "Brandies", nombre: "Brandy Azteca de Oro 700 ml", descripcion: "Brandy solera añejado en barrica de roble", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "5000267014005", tipoCodigo: "EAN", subfamilia: "Whiskies", nombre: "Whisky Johnnie Walker Red Label 700 ml", descripcion: "Blended Scotch Whisky escocés", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "5000267023007", tipoCodigo: "EAN", subfamilia: "Whiskies", nombre: "Whisky Buchanan's De Luxe 12 Años 750 ml", descripcion: "Whisky escocés añejado 12 años en barrica", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "5000267015002", tipoCodigo: "EAN", subfamilia: "Whiskies", nombre: "Whisky Black & White 700 ml", descripcion: "Whisky escocés suave de mezcla ligera", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7503018274020", tipoCodigo: "EAN", subfamilia: "Mezcales", nombre: "Mezcal 400 Conejos Espadín Joven 750 ml", descripcion: "Mezcal artesanal 100% agave espadín de Oaxaca", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7503018274037", tipoCodigo: "EAN", subfamilia: "Mezcales", nombre: "Mezcal Ojo de Tigre Artesanal 750 ml", descripcion: "Mezcal artesanal ensamble Espadín y Tobalá", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
    ],
  },

  // --- CUIDADO PERSONAL E HIGIENE ---
  {
    nombre: "Cuidado Personal e Higiene",
    descripcion: "Jabones de tocador, shampoo, pastas dentales, cremas, desodorantes y farmacia básica",
    articulos: [
      { codigo: "7501006550213", tipoCodigo: "EAN", subfamilia: "Jabones de Tocador", nombre: "Jabón de Tocador Zest Neutro 135 g", descripcion: "Jabón en barra con fórmula antibacterial", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7509546050514", tipoCodigo: "EAN", subfamilia: "Jabones de Tocador", nombre: "Jabón Palmolive Clásico Oliva y Aloe 150 g", descripcion: "Jabón de tocador suavizante con extractos naturales", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7509546050521", tipoCodigo: "EAN", subfamilia: "Jabones de Tocador", nombre: "Jabón Palmolive Neutro Balance 120 g", descripcion: "Jabón dermolimpiador para piel sensible", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7500435117845", tipoCodigo: "EAN", subfamilia: "Jabones de Tocador", nombre: "Jabón Escudo Antibacterial Blanco 150 g", descripcion: "Jabón en barra protección total antibacterial", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7500435117852", tipoCodigo: "EAN", subfamilia: "Jabones de Tocador", nombre: "Jabón Camay Clásico Suave 150 g", descripcion: "Jabón de tocador con delicada fragancia francesa", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017001010", tipoCodigo: "EAN", subfamilia: "Jabones de Tocador", nombre: "Jabón Rosa Venus Blanco 100 g", descripcion: "Jabón de tocador tradicional con perfume floral", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017001027", tipoCodigo: "EAN", subfamilia: "Jabones de Tocador", nombre: "Jabón Lirio Dermatológico Neutro 150 g", descripcion: "Jabón con glicerina pura para cuidado de la piel", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501006550305", tipoCodigo: "EAN", subfamilia: "Jabones de Tocador", nombre: "Jabón Dove Blanco Original 90 g", descripcion: "Barra de belleza con 1/4 de crema humectante", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7500435117821", tipoCodigo: "EAN", subfamilia: "Shampoo y Cabello", nombre: "Shampoo Head & Shoulders Limpieza Renovadora 375 ml", descripcion: "Shampoo anticaspa de uso diario", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7500435117838", tipoCodigo: "EAN", subfamilia: "Shampoo y Cabello", nombre: "Shampoo Pantene Restauración 400 ml", descripcion: "Shampoo con provitaminas para cabello dañado", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7509546051702", tipoCodigo: "EAN", subfamilia: "Shampoo y Cabello", nombre: "Shampoo Caprice Especial Manzana 750 ml", descripcion: "Shampoo familiar con brillo y aroma a manzana", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501006550411", tipoCodigo: "EAN", subfamilia: "Shampoo y Cabello", nombre: "Shampoo Savilé Sábila y Biotina 750 ml", descripcion: "Shampoo con extracto de sábila y biotina para fuerza", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501006550428", tipoCodigo: "EAN", subfamilia: "Shampoo y Cabello", nombre: "Shampoo Sedal Rizos Definidos 340 ml", descripcion: "Shampoo para control y definición de rizos", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7509546051511", tipoCodigo: "EAN", subfamilia: "Cuidado Bucal", nombre: "Pasta Dental Colgate Triple Acción 100 ml", descripcion: "Crema dental protección anticaries, blancura y aliento fresco", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7509546051528", tipoCodigo: "EAN", subfamilia: "Cuidado Bucal", nombre: "Pasta Dental Colgate Luminous White 75 ml", descripcion: "Crema dental blanqueadora con microcristales", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501006550503", tipoCodigo: "EAN", subfamilia: "Cremas Corporales", nombre: "Crema Corporal Hinds Rosa Clásica 250 ml", descripcion: "Emulsión humectante para manos y cuerpo", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "4005808801015", tipoCodigo: "EAN", subfamilia: "Cremas Corporales", nombre: "Crema Nivea Tarro Azul 250 ml", descripcion: "Crema humectante intensiva multiusos", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7500435117869", tipoCodigo: "EAN", subfamilia: "Afeitado y Cuchillas", nombre: "Rastrillos Gillette Prestobarba 3 2 Piezas", descripcion: "Máquina de afeitar desechable con 3 hojas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501006560021", tipoCodigo: "EAN", subfamilia: "Desodorantes", nombre: "Desodorante Rexona Men Clinical Aerosol 150 ml", descripcion: "Antitranspirante máxima protección 96h", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501006560045", tipoCodigo: "EAN", subfamilia: "Desodorantes", nombre: "Desodorante Axe Dark Temptation 150 ml", descripcion: "Body spray para caballero fragancia chocolate dulce", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017300052", tipoCodigo: "EAN", subfamilia: "Papel Higiénico", nombre: "Papel Higiénico Pétalo Rendimax 4 Rollos", descripcion: "Papel higiénico grabado de máxima duración", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017320012", tipoCodigo: "EAN", subfamilia: "Higiene Femenina", nombre: "Toallas Femeninas Kotex Nocturna con Alas 10 pzas", descripcion: "Toallas sanitarias de absorción ultra rápida", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501008400011", tipoCodigo: "EAN", subfamilia: "Farmacia Básica", nombre: "Aspirina Bayer 500 mg 10 Tabletas", descripcion: "Ácido acetilsalicílico analgésico y antipirético", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501008400028", tipoCodigo: "EAN", subfamilia: "Farmacia Básica", nombre: "Paracetamol Genérico 500 mg 10 Tabletas", descripcion: "Alivio de fiebre y dolor corporal", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501008400035", tipoCodigo: "EAN", subfamilia: "Farmacia Básica", nombre: "Sal de Uvas Picot 10 Sobres", descripcion: "Polvo efervescente para alivio de la acidez y agruras", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7500435118316", tipoCodigo: "EAN", subfamilia: "Farmacia Básica", nombre: "Pomada Vick VapoRub 50 g", descripcion: "Ungüento tópico descongestionante y calmante", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501008400059", tipoCodigo: "EAN", subfamilia: "Material de Curación", nombre: "Alcohol Desnaturalizado 70% Jaloma 250 ml", descripcion: "Antiséptico de uso externo para curaciones", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501008400042", tipoCodigo: "EAN", subfamilia: "Material de Curación", nombre: "Curitas Adhesivas Clásicas 10 Piezas", descripcion: "Venditas protectoras adhesivas para heridas menores", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
    ],
  },

  // --- LIMPIEZA DEL HOGAR Y LAVANDERÍA ---
  {
    nombre: "Limpieza del Hogar",
    descripcion: "Jabones de lavandería Zote, detergentes Roma, Foca, Ariel, cloros, Fabuloso y Pinol",
    articulos: [
      { codigo: "7501017000051", tipoCodigo: "EAN", subfamilia: "Jabones de Barra", nombre: "Jabón de Lavandería Zote Blanco 400 g", descripcion: "Jabón en barra neutro para ropa blanca y delicada", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017000013", tipoCodigo: "EAN", subfamilia: "Jabones de Barra", nombre: "Jabón de Lavandería Zote Rosa 400 g", descripcion: "Jabón tradicional en barra con aroma suave", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017000068", tipoCodigo: "EAN", subfamilia: "Jabones de Barra", nombre: "Jabón de Lavandería Zote Amarillo 400 g", descripcion: "Jabón en barra con aceite de citronela", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017000020", tipoCodigo: "EAN", subfamilia: "Detergentes en Polvo", nombre: "Detergente en Polvo Roma 1 Kg", descripcion: "Detergente multiusos biodegradable con aroma clásico", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017000044", tipoCodigo: "EAN", subfamilia: "Detergentes en Polvo", nombre: "Detergente en Polvo Foca 1 Kg", descripcion: "Detergente biológico en polvo para todo tipo de ropa", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017000037", tipoCodigo: "EAN", subfamilia: "Detergentes en Polvo", nombre: "Detergente Blanca Nieves 1 Kg", descripcion: "Detergente biodegradable para ropa blanca y de color", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7500435111010", tipoCodigo: "EAN", subfamilia: "Detergentes en Polvo", nombre: "Detergente Ariel Doble Poder 1 Kg", descripcion: "Detergente en polvo para lavado profundo y remoción de manchas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7500435111034", tipoCodigo: "EAN", subfamilia: "Detergentes en Polvo", nombre: "Detergente Ace Blanco en Polvo 1 Kg", descripcion: "Detergente con poder blanqueador para ropa blanca", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501058611025", tipoCodigo: "EAN", subfamilia: "Detergentes en Polvo", nombre: "Detergente en Polvo 1-2-3 Jazmín 1 Kg", descripcion: "Detergente económico rendidor con perfume floral", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501025400010", tipoCodigo: "EAN", subfamilia: "Cloros y Desinfectantes", nombre: "Blanqueador Cloralex El Rendidor 950 ml", descripcion: "Cloro desinfectante que elimina el 99.9% de bacterias", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501025400034", tipoCodigo: "EAN", subfamilia: "Cloros y Desinfectantes", nombre: "Blanqueador Cloralex El Rendidor 2 Litros", descripcion: "Cloro desinfectante presentación familiar 2L", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7509546071014", tipoCodigo: "EAN", subfamilia: "Limpiadores Líquidos", nombre: "Limpiador Multiusos Fabuloso Lavanda 1 Litro", descripcion: "Limpiador líquido aromatizante para pisos y superficies", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501025400027", tipoCodigo: "EAN", subfamilia: "Limpiadores Líquidos", nombre: "Limpiador Desinfectante Pinol Original 1 Litro", descripcion: "Limpiador con aceite de pino 100% natural", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7509546072011", tipoCodigo: "EAN", subfamilia: "Lavatrastes", nombre: "Lavatrastes Líquido Axion Limón 750 ml", descripcion: "Detergente lavatrastes arranca grasa concentrado", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7500435111058", tipoCodigo: "EAN", subfamilia: "Lavatrastes", nombre: "Lavatrastes Líquido Salvo Limón 750 ml", descripcion: "Lavatrastes con poder destruye grasa", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7509546073018", tipoCodigo: "EAN", subfamilia: "Suavizantes de Ropa", nombre: "Suavizante de Telas Suavitel Primavera 850 ml", descripcion: "Acondicionador de telas con fragancia duradera", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501023110027", tipoCodigo: "EAN", subfamilia: "Fibras y Esponjas", nombre: "Fibra Verde Scotch-Brite Multiusos 1 Pieza", descripcion: "Fibra abrasiva para tallado de ollas y sartenes", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017300076", tipoCodigo: "EAN", subfamilia: "Servilletas y Desechables", nombre: "Servilletas de Papel Pétalo 250 Hojas", descripcion: "Servilletas blancas resistentes para mesa", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501024300014", tipoCodigo: "EAN", subfamilia: "Insecticidas", nombre: "Insecticida Raid Casa y Jardín 400 ml", descripcion: "Aerosol insecticida base agua sin olor penetrante", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017005018", tipoCodigo: "EAN", subfamilia: "Hogar y Varios", nombre: "Cerillos Clásicos La Central 1 Caja", descripcion: "Caja de cerillos de madera encendido seguro", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
    ],
  },

  // --- LÁCTEOS, HUEVOS Y REFRIGERADOS ---
  {
    nombre: "Lácteos y Refrigerados",
    descripcion: "Leches Lala y Alpura, huevo San Juan, quesos panela, Oaxaca, manchego y embutidos",
    articulos: [
      { codigo: "7501020513647", tipoCodigo: "EAN", subfamilia: "Leches Líquidas", nombre: "Leche Lala Entera 1 Litro Tetra Brik", descripcion: "Leche pasteurizada adicionada con vitaminas A y D", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501020513678", tipoCodigo: "EAN", subfamilia: "Leches Líquidas", nombre: "Leche Lala Entera 1.89 Litros Galón", descripcion: "Leche entera fresca presentación galón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501020513654", tipoCodigo: "EAN", subfamilia: "Leches Líquidas", nombre: "Leche Lala Deslactosada 1 Litro", descripcion: "Leche de fácil digestión para intolerantes a la lactosa", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501020513685", tipoCodigo: "EAN", subfamilia: "Leches Líquidas", nombre: "Leche Lala Deslactosada Light 1 Litro", descripcion: "Leche baja en grasa y sin lactosa", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005101010", tipoCodigo: "EAN", subfamilia: "Leches Líquidas", nombre: "Leche Alpura Clásica Entera 1 Litro", descripcion: "Leche 100% pura de vaca ultrapasteurizada", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501020513692", tipoCodigo: "EAN", subfamilia: "Leches Líquidas", nombre: "Nutri Leche Producto Lácteo 1 Litro", descripcion: "Producto lácteo combinado fortificado", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501058617843", tipoCodigo: "EAN", subfamilia: "Leches Evaporadas", nombre: "Leche Evaporada Carnation Clavel 360 g", descripcion: "Leche evaporada parcialmente descremada para postres", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501058617850", tipoCodigo: "EAN", subfamilia: "Leches Condensadas", nombre: "Leche Condensada La Lechera 375 g", descripcion: "Leche entera condensada azucarada", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501058617867", tipoCodigo: "EAN", subfamilia: "Cremas", nombre: "Media Crema Nestlé 225 g", descripcion: "Crema de leche esterilizada para cocinar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501025700011", tipoCodigo: "EAN", subfamilia: "Huevo Fresco", nombre: "Huevo Blanco San Juan 12 Piezas", descripcion: "Docena de huevo blanco fresco de granja", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501025700028", tipoCodigo: "EAN", subfamilia: "Huevo Fresco", nombre: "Huevo Blanco San Juan 30 Piezas", descripcion: "Cono familiar de 30 huevos seleccionados", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501020521024", tipoCodigo: "EAN", subfamilia: "Quesos Frescos", nombre: "Queso Panela Lala 400 g", descripcion: "Queso fresco tipo panela listo para rebanar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501020522014", tipoCodigo: "EAN", subfamilia: "Quesos Madurados", nombre: "Queso Manchego Nochebuena Rebanado 400 g", descripcion: "Queso tipo manchego fundible en rebanadas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501020522021", tipoCodigo: "EAN", subfamilia: "Quesos Procesados", nombre: "Queso Tipo Americano Lala 144 g 8 Rebanadas", descripcion: "Rebanadas individuales de queso amarillo", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501020523011", tipoCodigo: "EAN", subfamilia: "Quesos Frescos", nombre: "Queso Oaxaca La Villita Hebra 400 g", descripcion: "Queso tradicional para deshebrar y quesadillas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501020560016", tipoCodigo: "EAN", subfamilia: "Quesos Untables", nombre: "Queso Crema Philadelphia Kraft 200 g", descripcion: "Queso crema pasteurizado suave para untar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501020512015", tipoCodigo: "EAN", subfamilia: "Cremas", nombre: "Crema Lala Ácida Tradicional 450 ml", descripcion: "Crema entera de leche de vaca", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005101034", tipoCodigo: "EAN", subfamilia: "Cremas", nombre: "Crema Alpura Clásica Entera 450 ml", descripcion: "Crema de vaca pasteurizada espesa", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501039800019", tipoCodigo: "EAN", subfamilia: "Mantequillas", nombre: "Mantequilla Gloria con Sal 90 g", descripcion: "Mantequilla pura de vaca para cocinar o untar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501040001016", tipoCodigo: "EAN", subfamilia: "Yogures", nombre: "Yoghurt Yoplait Batido Fresa 125 g", descripcion: "Yoghurt cremoso con trocitos de fresa natural", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501048000013", tipoCodigo: "EAN", subfamilia: "Bebidas Probióticas", nombre: "Yakult Bebida Fermentada Pack 5 piezas", descripcion: "Bebida láctea fermentada con lactobacilos vivos", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501040002013", tipoCodigo: "EAN", subfamilia: "Salchichonería", nombre: "Salchicha de Pavo Viena San Rafael 500 g", descripcion: "Salchicha de pavo cocida para asar o hot dogs", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501040002020", tipoCodigo: "EAN", subfamilia: "Salchichonería", nombre: "Jamón de Pavo Virginia Fud 290 g", descripcion: "Rebanadas de jamón de pavo cocido", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501040002044", tipoCodigo: "EAN", subfamilia: "Salchichonería", nombre: "Tocino Ahumado de Cerdo Fud 250 g", descripcion: "Rebanadas finas de tocino ahumado para freír", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
    ],
  },

  // --- DESPENSA, GRANOS Y ABARROTES ---
  {
    nombre: "Despensa y Abarrotes",
    descripcion: "Aceites, granos Verde Valle, mayonesa McCormick, salsas Valentina y Huichol, atunes y enlatados",
    articulos: [
      { codigo: "7501004300018", tipoCodigo: "EAN", subfamilia: "Aceites Comestibles", nombre: "Aceite Vegetal Comestible 1-2-3 1 Litro", descripcion: "Aceite mixto vegetal comestible para freír", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501004300032", tipoCodigo: "EAN", subfamilia: "Aceites Comestibles", nombre: "Aceite Puro de Soya Nutrioli 850 ml", descripcion: "Aceite vegetal 100% puro de soya sin colesterol", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501004300049", tipoCodigo: "EAN", subfamilia: "Grasas y Mantecas", nombre: "Manteca Vegetal Inca 500 g", descripcion: "Manteca vegetal para repostería y panadería", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071300010", tipoCodigo: "EAN", subfamilia: "Granos y Semillas", nombre: "Arroz Súper Extra Verde Valle 900 g", descripcion: "Arroz pulido grano largo seleccionado", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071300027", tipoCodigo: "EAN", subfamilia: "Granos y Semillas", nombre: "Frijol Negro Verde Valle 900 g", descripcion: "Frijol negro de cosecha reciente", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071300034", tipoCodigo: "EAN", subfamilia: "Granos y Semillas", nombre: "Frijol Pinto Verde Valle 900 g", descripcion: "Frijol pinto nacional de cocción rápida", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071300041", tipoCodigo: "EAN", subfamilia: "Granos y Semillas", nombre: "Frijol Peruano Verde Valle 900 g", descripcion: "Frijol amarillo cremoso", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501071300058", tipoCodigo: "EAN", subfamilia: "Granos y Semillas", nombre: "Lentejas Seleccionadas Verde Valle 500 g", descripcion: "Lentejas limpias para sopa", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000100018", tipoCodigo: "EAN", subfamilia: "Endulzantes y Azúcar", nombre: "Azúcar Estándar Morena Zulka 1 Kg", descripcion: "Azúcar morena 100% de caña sin refinar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501004500012", tipoCodigo: "EAN", subfamilia: "Condimentos y Sal", nombre: "Sal de Mesa Refinada La Fina 1 Kg", descripcion: "Sal yodada y fluorurada para cocina", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005100013", tipoCodigo: "EAN", subfamilia: "Aderezos y Mayonesas", nombre: "Mayonesa McCormick con Jugo de Limón 390 g", descripcion: "Mayonesa clásica mexicana con toque de limón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005100020", tipoCodigo: "EAN", subfamilia: "Aderezos y Mayonesas", nombre: "Mayonesa McCormick con Limón Frasco 725 g", descripcion: "Mayonesa tradicional frasco grande", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017000181", tipoCodigo: "EAN", subfamilia: "Aderezos y Salsas", nombre: "Salsa Cátsup La Costeña 320 g", descripcion: "Salsa de tomate condimentada para hamburguesas y papas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "013000000109", tipoCodigo: "EAN", subfamilia: "Aderezos y Salsas", nombre: "Mostaza Amarilla Heinz 240 g", descripcion: "Mostaza amarilla clásica estilo americano", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017003014", tipoCodigo: "EAN", subfamilia: "Salsas y Chiles", nombre: "Salsa Valentina Etiqueta Amarilla 370 ml", descripcion: "Salsa picante de mesa con chile de árbol", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017003021", tipoCodigo: "EAN", subfamilia: "Salsas y Chiles", nombre: "Salsa Valentina Etiqueta Negra Extra Picante 370 ml", descripcion: "Salsa muy picante para botanas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017003038", tipoCodigo: "EAN", subfamilia: "Salsas y Chiles", nombre: "Salsa Botanera Clásica 370 ml", descripcion: "Salsa para botanas, fruta y chicharrones", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017003045", tipoCodigo: "EAN", subfamilia: "Salsas y Chiles", nombre: "Salsa Picante Huichol 190 ml", descripcion: "Salsa tradicional de Nayarit con chile cascabel", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501058617858", tipoCodigo: "EAN", subfamilia: "Salsas y Sazonadores", nombre: "Salsa Crosse & Blackwell Tipo Inglesa 145 ml", descripcion: "Salsa para sazonar carnes, botanas y micheladas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501058617865", tipoCodigo: "EAN", subfamilia: "Salsas y Sazonadores", nombre: "Jugo Maggi Sazonador Original 100 ml", descripcion: "Sazonador líquido concentrado", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501044400013", tipoCodigo: "EAN", subfamilia: "Enlatados y Pescados", nombre: "Atún Dolores en Agua 140 g", descripcion: "Lomo de atún aleta amarilla en hojuelas en agua", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501044400020", tipoCodigo: "EAN", subfamilia: "Enlatados y Pescados", nombre: "Atún Dolores en Aceite 140 g", descripcion: "Lomo de atún aleta amarilla en aceite vegetal", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017000112", tipoCodigo: "EAN", subfamilia: "Chiles Enlatados", nombre: "Chiles Jalapeños Enteros La Costeña 220 g", descripcion: "Chiles jalapeños en escabeche con zanahorias", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017000167", tipoCodigo: "EAN", subfamilia: "Chiles Enlatados", nombre: "Rajas de Jalapeño en Escabeche La Costeña 220 g", descripcion: "Rajas de jalapeño listas para tortas y guisados", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017000174", tipoCodigo: "EAN", subfamilia: "Chiles Enlatados", nombre: "Chiles Chipotles Adobados San Marcos 215 g", descripcion: "Chiles chipotles en salsa agridulce adobada", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005140026", tipoCodigo: "EAN", subfamilia: "Verduras Enlatadas", nombre: "Granos de Elote Dorado Herdez 410 g", descripcion: "Elote dulce tierno en salmuera", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005150018", tipoCodigo: "EAN", subfamilia: "Frijoles Preparados", nombre: "Frijoles Refritos Negros Isadora 430 g", descripcion: "Frijoles refritos en bolsa listos para calentar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501017000136", tipoCodigo: "EAN", subfamilia: "Frijoles Preparados", nombre: "Frijoles Bayos Refritos La Costeña 400 g", descripcion: "Frijoles bayos enlatados sazonados", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005140019", tipoCodigo: "EAN", subfamilia: "Purés y Tomates", nombre: "Puré de Tomate Del Fuerte 210 g", descripcion: "Puré de tomate sazonado sin conservadores", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005100044", tipoCodigo: "EAN", subfamilia: "Moles y Pastas", nombre: "Mole Poblano en Vaso Doña María 235 g", descripcion: "Pasta tradicional para preparar mole poblano", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005160017", tipoCodigo: "EAN", subfamilia: "Sazonadores y Caldos", nombre: "Caldo de Pollo Knorr Suiza 8 Cubos", descripcion: "Sazonador en cubos sabor pollo con hierbas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501058617812", tipoCodigo: "EAN", subfamilia: "Cafés Solubles", nombre: "Café Soluble Nescafé Clásico 120 g", descripcion: "Café 100% puro soluble granulado", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501058617829", tipoCodigo: "EAN", subfamilia: "Cafés Solubles", nombre: "Café Legal con Canela 200 g", descripcion: "Café tostado y molido mezclado con canela", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005170016", tipoCodigo: "EAN", subfamilia: "Modificadores de Leche", nombre: "Chocolate en Polvo Choco Milk 400 g", descripcion: "Alimento en polvo sabor a chocolate enriquecido con vitaminas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005180022", tipoCodigo: "EAN", subfamilia: "Harinas", nombre: "Harina de Maíz Nixtamalizado Maseca 1 Kg", descripcion: "Harina de maíz para tortillas y antojitos", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000615017", tipoCodigo: "EAN", subfamilia: "Cereales y Desayuno", nombre: "Avena Quaker 3 Minutos 475 g", descripcion: "Hojuelas de avena de grano entero", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501008001015", tipoCodigo: "EAN", subfamilia: "Cereales y Desayuno", nombre: "Cereal Corn Flakes Kellogg's 500 g", descripcion: "Hojuelas de maíz tostadas clásicas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501008001022", tipoCodigo: "EAN", subfamilia: "Cereales y Desayuno", nombre: "Cereal Zucaritas Kellogg's 710 g", descripcion: "Hojuelas de maíz escarchadas con azúcar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501008001039", tipoCodigo: "EAN", subfamilia: "Cereales y Desayuno", nombre: "Cereal Choco Krispis Kellogg's 620 g", descripcion: "Arroz inflado sabor a chocolate con calcio", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501030155551", tipoCodigo: "EAN", subfamilia: "Pastas para Sopa", nombre: "Pasta La Moderna Espagueti 200 g", descripcion: "Pasta de sémola de trigo durum", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501030155568", tipoCodigo: "EAN", subfamilia: "Pastas para Sopa", nombre: "Pasta La Moderna Codo No. 2 200 g", descripcion: "Pasta tradicional para sopa de coditos", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501030155575", tipoCodigo: "EAN", subfamilia: "Pastas para Sopa", nombre: "Pasta La Moderna Fideo No. 0 200 g", descripcion: "Pasta delgada para fideo seco o caldillo", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005180039", tipoCodigo: "EAN", subfamilia: "Gelatinas y Postres", nombre: "Polvo para Gelatina Pronto Fresa 84 g", descripcion: "Gelatina sabor fresa para preparar con agua", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501005180053", tipoCodigo: "EAN", subfamilia: "Harinas Preparadas", nombre: "Harina para Hot Cakes Pronto Tradicional 500 g", descripcion: "Harina enriquecida con mantequilla para hot cakes", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
    ],
  },

  // --- PANADERÍA, TORTILLERÍA Y GALLETAS ---
  {
    nombre: "Panadería y Galletas",
    descripcion: "Pan Bimbo, Tortillinas Tía Rosa, galletas Marías, Emperador, Chokis, Saladitas y pastelitos Marinela",
    articulos: [
      { codigo: "7501000111106", tipoCodigo: "EAN", subfamilia: "Pan de Caja", nombre: "Pan Blanco Bimbo Grande 680 g", descripcion: "Pan de caja blanco enriquecido con calcio", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000111212", tipoCodigo: "EAN", subfamilia: "Pan de Caja", nombre: "Pan Integral Bimbo Grande 680 g", descripcion: "Pan de trigo integral con fibra natural", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000111205", tipoCodigo: "EAN", subfamilia: "Pan Tostado", nombre: "Pan Tostado Clásico Bimbo 210 g", descripcion: "Pan tostado crujiente clásico", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000111403", tipoCodigo: "EAN", subfamilia: "Tortillas de Harina", nombre: "Tortillinas Tía Rosa 10 Piezas 255 g", descripcion: "Tortillas de harina de trigo suaves y calientitas", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000111618", tipoCodigo: "EAN", subfamilia: "Tortillas de Harina", nombre: "Tortillinas Tía Rosa 22 Piezas 560 g", descripcion: "Tortillas de harina paquete familiar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000111502", tipoCodigo: "EAN", subfamilia: "Pan de Caja", nombre: "Medias Noches Bimbo 8 Piezas", descripcion: "Pan para hot dog suave", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000111519", tipoCodigo: "EAN", subfamilia: "Pan de Caja", nombre: "Bimbollos Bimbo con Ajonjolí 8 Piezas", descripcion: "Pan para hamburguesa con ajonjolí", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000144447", tipoCodigo: "EAN", subfamilia: "Pan Dulce", nombre: "Donas Bimbo Espolvoreadas 105 g", descripcion: "Paquete con 6 donitas espolvoreadas con azúcar", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000144454", tipoCodigo: "EAN", subfamilia: "Pan Dulce", nombre: "Mantecadas Bimbo con Vainilla 125 g", descripcion: "Paquete con 4 panquecitos sabor vainilla", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000611019", tipoCodigo: "EAN", subfamilia: "Galletas Clásicas", nombre: "Galletas Marías Gamesa 170 g", descripcion: "Galletas clásicas enriquecidas con hierro", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000612016", tipoCodigo: "EAN", subfamilia: "Galletas Rellenas", nombre: "Galletas Emperador Chocolate Gamesa 101 g", descripcion: "Galletas sándwich rellenas de crema de chocolate", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000612023", tipoCodigo: "EAN", subfamilia: "Galletas Rellenas", nombre: "Galletas Emperador Combinado Gamesa 101 g", descripcion: "Galletas sándwich rellenas de crema y chocolate", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000612030", tipoCodigo: "EAN", subfamilia: "Galletas Rellenas", nombre: "Galletas Emperador Limón Gamesa 101 g", descripcion: "Galletas sándwich rellenas de crema de limón", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000613013", tipoCodigo: "EAN", subfamilia: "Galletas Dulces", nombre: "Galletas Chokis Clásicas Gamesa 84 g", descripcion: "Galletas crujientes con chispas sabor a chocolate", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000614010", tipoCodigo: "EAN", subfamilia: "Galletas Saladas", nombre: "Galletas Saladitas Gamesa 186 g", descripcion: "Galletas saladas crujientes ideales para mariscos y atún", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000614027", tipoCodigo: "EAN", subfamilia: "Galletas Saladas", nombre: "Galletas Crackets Gamesa 130 g", descripcion: "Galletas saladas con mantequilla", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000614034", tipoCodigo: "EAN", subfamilia: "Galletas Saladas", nombre: "Galletas Habaneras Gamesa 117 g", descripcion: "Galletas doradas horneadas con salvado de trigo", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000155018", tipoCodigo: "EAN", subfamilia: "Pastelitos", nombre: "Gansito Marinela 50 g", descripcion: "Pastelito relleno de crema y mermelada de fresa", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000155025", tipoCodigo: "EAN", subfamilia: "Pastelitos", nombre: "Pingüinos Marinela 2 Piezas 80 g", descripcion: "Pastelitos de chocolate rellenos de crema", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000155032", tipoCodigo: "EAN", subfamilia: "Pastelitos", nombre: "Chocoroles Marinela 2 Piezas 80 g", descripcion: "Rollitos de pastel de chocolate con piña y crema", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000155049", tipoCodigo: "EAN", subfamilia: "Pastelitos", nombre: "Submarinos Marinela Vainilla 3 Piezas 105 g", descripcion: "Pastelitos rellenos de crema de vainilla", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000155056", tipoCodigo: "EAN", subfamilia: "Galletas Dulces", nombre: "Galletas Canelitas Marinela 120 g", descripcion: "Galletas crujientes con azúcar y canela", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000155063", tipoCodigo: "EAN", subfamilia: "Galletas Dulces", nombre: "Barritas de Fresa Marinela 67 g", descripcion: "Galletas suaves con relleno horneado sabor fresa", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000155070", tipoCodigo: "EAN", subfamilia: "Galletas Dulces", nombre: "Polvorones Naranja Marinela 113 g", descripcion: "Galletas estilo polvorón con toque de naranja", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "7501000155087", tipoCodigo: "EAN", subfamilia: "Galletas Dulces", nombre: "Galletas Triki-Trakes Marinela 86 g", descripcion: "Galletas de vainilla con chispas sabor chocolate", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
    ],
  },

  // --- FRUTAS FRESCAS ---
  {
    nombre: "Frutas Frescas",
    descripcion: "Aguacate Hass, plátano Tabasco, limones, mangos, papayas, piñas y cítricos de temporada",
    articulos: [
      { codigo: "4011", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Plátano Tabasco / Chiapas", descripcion: "Plátano amarillo dulce de primera por kilo", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4234", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Plátano Macho Fresco", descripcion: "Plátano macho para freír o cocer", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4046", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Aguacate Hass de Michoacán", descripcion: "Aguacate Hass cremoso seleccionado", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "AGU-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Tropicales", nombre: "Aguacate Criollo de Cáscara Delgada", descripcion: "Aguacate criollo con cáscara comestible", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4048", tipoCodigo: "PLU", subfamilia: "Cítricos", nombre: "Limón con Semilla (Colima/Michoacán)", descripcion: "Limón agrio mexicano jugoso", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4053", tipoCodigo: "PLU", subfamilia: "Cítricos", nombre: "Limón Persa sin Semilla", descripcion: "Limón grande verde sin semillas", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4014", tipoCodigo: "PLU", subfamilia: "Cítricos", nombre: "Naranja Valencia para Jugo", descripcion: "Naranja dulce de temporada para exprimir", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4288", tipoCodigo: "PLU", subfamilia: "Cítricos", nombre: "Toronja Sangría Roja", descripcion: "Toronja jugosa de pulpa roja", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4384", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Mango Ataulfo de Chiapas", descripcion: "Mango dulce de pulpa firme sin fibra", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4385", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Mango Manila", descripcion: "Mango amarillo suave y jugoso", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4395", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Papaya Maradol", descripcion: "Papaya madura dulce por kilo", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4430", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Piña Miel Esmeralda", descripcion: "Piña gota de miel dulce madura", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4626", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Jícama de Agua", descripcion: "Jícama fresca crujiente para botana", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4299", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Guayaba Rosa", descripcion: "Guayaba aromática seleccionada", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4131", tipoCodigo: "PLU", subfamilia: "Frutas de Pepita", nombre: "Manzana Gala Nacional", descripcion: "Manzana crujiente dulce", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4015", tipoCodigo: "PLU", subfamilia: "Frutas de Pepita", nombre: "Manzana Red Delicious", descripcion: "Manzana roja clásica por kilo", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4032", tipoCodigo: "PLU", subfamilia: "Melones y Sandías", nombre: "Sandía Roja Rayada", descripcion: "Sandía fresca por pieza o rebanada", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4050", tipoCodigo: "PLU", subfamilia: "Melones y Sandías", nombre: "Melón Cantaloupe / Chino", descripcion: "Melón dulce con cáscara de red", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4023", tipoCodigo: "PLU", subfamilia: "Frutas de Racimo", nombre: "Uva Globo Roja sin Semilla", descripcion: "Uva roja dulce por kilo", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4022", tipoCodigo: "PLU", subfamilia: "Frutas de Racimo", nombre: "Uva Verde Thompson sin Semilla", descripcion: "Uva verde crujiente sin semilla", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
    ],
  },

  // --- VERDURAS Y HORTALIZAS ---
  {
    nombre: "Verduras y Hortalizas",
    descripcion: "Jitomates, cebollas, chiles serranos y jalapeños, papas, nopales y chayotes",
    articulos: [
      { codigo: "4087", tipoCodigo: "PLU", subfamilia: "Hortalizas de Fruto", nombre: "Jitomate Saladette / Roma", descripcion: "Jitomate rojo maduro para cocina", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4799", tipoCodigo: "PLU", subfamilia: "Hortalizas de Fruto", nombre: "Jitomate Bola", descripcion: "Jitomate bola firme para ensaladas", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4801", tipoCodigo: "PLU", subfamilia: "Hortalizas de Fruto", nombre: "Tomate Verde con Cáscara (Tomatillo)", descripcion: "Tomate verde para salsas tradicionales", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4709", tipoCodigo: "PLU", subfamilia: "Chiles y Pimientos", nombre: "Chile Serrano Verde", descripcion: "Chile serrano picante fresco", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4693", tipoCodigo: "PLU", subfamilia: "Chiles y Pimientos", nombre: "Chile Jalapeño / Cuaresmeño", descripcion: "Chile jalapeño fresco para rellenar o picar", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4065", tipoCodigo: "PLU", subfamilia: "Chiles y Pimientos", nombre: "Chile Poblano", descripcion: "Chile poblano de buen tamaño para capear", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "3125", tipoCodigo: "PLU", subfamilia: "Chiles y Pimientos", nombre: "Chile Habanero Naranja", descripcion: "Chile habanero extra picante de Yucatán", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4083", tipoCodigo: "PLU", subfamilia: "Bulbos y Raíces", nombre: "Cebolla Blanca", descripcion: "Cebolla blanca limpia seleccionada", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4082", tipoCodigo: "PLU", subfamilia: "Bulbos y Raíces", nombre: "Cebolla Morada", descripcion: "Cebolla morada para encurtidos y cochinita", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "AJO-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Bulbos y Raíces", nombre: "Ajo en Malla 3 Cabezas", descripcion: "Malla con 3 cabezas de ajo morado", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "4072", tipoCodigo: "PLU", subfamilia: "Tubérculos", nombre: "Papa Blanca Alpha", descripcion: "Papa para freír, cocer y guisar", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4073", tipoCodigo: "PLU", subfamilia: "Tubérculos", nombre: "Papa Galeana / Cambray", descripcion: "Papa pequeña para botanear o asar", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4761", tipoCodigo: "PLU", subfamilia: "Hortalizas de Fruto", nombre: "Chayote sin Espinas", descripcion: "Chayote tierno verde claro", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4067", tipoCodigo: "PLU", subfamilia: "Hortalizas de Fruto", nombre: "Calabacita Italiana", descripcion: "Calabacita tierna fresca", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4062", tipoCodigo: "PLU", subfamilia: "Hortalizas de Fruto", nombre: "Pepino Verde de Mesa", descripcion: "Pepino fresco crujiente", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "NOP-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hortalizas de Hoja", nombre: "Nopales Tiernos Limpios", descripcion: "Nopalitos sin espinas listos para cocinar", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4094", tipoCodigo: "PLU", subfamilia: "Crucíferas", nombre: "Zanahoria Mediana", descripcion: "Zanahoria fresca naranja dulce", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
      { codigo: "4060", tipoCodigo: "PLU", subfamilia: "Crucíferas", nombre: "Brócoli Fresco", descripcion: "Brócoli de campo en flor", precioCompra: 0, precioVenta: 0, unidad: "Kg", stockInicial: 0 },
    ],
  },

  // --- HIERBAS AROMÁTICAS, HOJAS Y CHILES SECOS ---
  {
    nombre: "Hierbas y Chiles Secos",
    descripcion: "Cilantro, epazote, perejil, hierbabuena, chiles secos guajillo, ancho, pasilla y de árbol",
    articulos: [
      { codigo: "4889", tipoCodigo: "PLU", subfamilia: "Hierbas Culinarias", nombre: "Cilantro Fresco", descripcion: "Manojo de cilantro fresco aromático", precioCompra: 0, precioVenta: 0, unidad: "Manojo", stockInicial: 0 },
      { codigo: "EPA-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas Culinarias", nombre: "Epazote Morado / Verde", descripcion: "Manojo de epazote para frijoles y quesadillas", precioCompra: 0, precioVenta: 0, unidad: "Manojo", stockInicial: 0 },
      { codigo: "4899", tipoCodigo: "PLU", subfamilia: "Hierbas Culinarias", nombre: "Perejil Liso Fresco", descripcion: "Manojo de perejil para caldos y guisos", precioCompra: 0, precioVenta: 0, unidad: "Manojo", stockInicial: 0 },
      { codigo: "HIE-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas Culinarias", nombre: "Hierbabuena Fresca", descripcion: "Hierbabuena fresca para tés y caldos", precioCompra: 0, precioVenta: 0, unidad: "Manojo", stockInicial: 0 },
      { codigo: "4061", tipoCodigo: "PLU", subfamilia: "Hortalizas de Hoja", nombre: "Lechuga Romana / Orejona", descripcion: "Pieza de lechuga orejona fresca", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
      { codigo: "4090", tipoCodigo: "PLU", subfamilia: "Hortalizas de Hoja", nombre: "Espinaca Fresca", descripcion: "Manojo de espinaca lavada", precioCompra: 0, precioVenta: 0, unidad: "Manojo", stockInicial: 0 },
      { codigo: "RAB-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hortalizas de Raíz", nombre: "Rábanos Rojos en Manojo", descripcion: "Manojo de rábanos frescos crujientes para pozole", precioCompra: 0, precioVenta: 0, unidad: "Manojo", stockInicial: 0 },
      { codigo: "CH-GUA", tipoCodigo: "SIN_CODIGO", subfamilia: "Chiles Secos", nombre: "Chile Guajillo Seco 100 g", descripcion: "Bolsa de chile guajillo para adobos y caldos", precioCompra: 0, precioVenta: 0, unidad: "Bolsa", stockInicial: 0 },
      { codigo: "CH-ANC", tipoCodigo: "SIN_CODIGO", subfamilia: "Chiles Secos", nombre: "Chile Ancho Seco 100 g", descripcion: "Chile ancho suave para mole y adobos", precioCompra: 0, precioVenta: 0, unidad: "Bolsa", stockInicial: 0 },
      { codigo: "CH-PAS", tipoCodigo: "SIN_CODIGO", subfamilia: "Chiles Secos", nombre: "Chile Pasilla Seco 100 g", descripcion: "Chile pasilla para salsas y caldillos", precioCompra: 0, precioVenta: 0, unidad: "Bolsa", stockInicial: 0 },
      { codigo: "CH-ARB", tipoCodigo: "SIN_CODIGO", subfamilia: "Chiles Secos", nombre: "Chile de Árbol Seco con Palo 100 g", descripcion: "Chile de árbol extra picante para salsas taqueras", precioCompra: 0, precioVenta: 0, unidad: "Bolsa", stockInicial: 0 },
      { codigo: "CH-MOR", tipoCodigo: "SIN_CODIGO", subfamilia: "Chiles Secos", nombre: "Chile Morita Seco 100 g", descripcion: "Chile morita ahumado para salsas y guisados", precioCompra: 0, precioVenta: 0, unidad: "Bolsa", stockInicial: 0 },
      { codigo: "ESP-CAN-50", tipoCodigo: "SIN_CODIGO", subfamilia: "Especias", nombre: "Canela Entera en Raja 50 g", descripcion: "Raja de canela aromática de Ceilán", precioCompra: 0, precioVenta: 0, unidad: "Bolsa", stockInicial: 0 },
      { codigo: "ESP-OREG-50", tipoCodigo: "SIN_CODIGO", subfamilia: "Especias", nombre: "Orégano Seco Entero 50 g", descripcion: "Orégano de campo aromático para pozole", precioCompra: 0, precioVenta: 0, unidad: "Bolsa", stockInicial: 0 },
      { codigo: "DUL-PILON-250", tipoCodigo: "SIN_CODIGO", subfamilia: "Endulzantes Tradicionales", nombre: "Piloncillo Cono Tradicional 250 g", descripcion: "Cono de piloncillo 100% puro de caña", precioCompra: 0, precioVenta: 0, unidad: "Pieza", stockInicial: 0 },
    ],
  },
];

// ===========================================================================
// COLOMBIA (Prefijo EAN-13: 770 + Frutas/Verduras colombianas / Moneda: COP $)
// ===========================================================================
export const CATALOGO_COLOMBIA: FamiliaSemilla[] = [
  // --- FRUTAS FRESCAS COLOMBIANAS ---
  {
    nombre: "Frutas Frescas",
    descripcion: "Frutas tropicales colombianas, cítricos, plátanos y exóticas",
    articulos: [
      { codigo: "4011", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Banano Criollo / Urabá", descripcion: "Banano dulce de exportación por kilo", precioCompra: 2200, precioVenta: 3200, unidad: "Kg", stockInicial: 35 },
      { codigo: "PLT-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Tropicales", nombre: "Plátano Verde Hartón", descripcion: "Plátano verde para patacones por kilo", precioCompra: 2500, precioVenta: 3800, unidad: "Kg", stockInicial: 30 },
      { codigo: "PLT-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Tropicales", nombre: "Plátano Maduro Hartón", descripcion: "Plátano maduro para hornear o freír", precioCompra: 2500, precioVenta: 3800, unidad: "Kg", stockInicial: 25 },
      { codigo: "LUL-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Exóticas", nombre: "Lulo Fresco / Naranjilla", descripcion: "Lulo jugoso para lulada y jugos", precioCompra: 4500, precioVenta: 6800, unidad: "Kg", stockInicial: 20 },
      { codigo: "MAR-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Exóticas", nombre: "Maracuyá Criollo", descripcion: "Maracuyá fresco de pulpa ácida", precioCompra: 3800, precioVenta: 5500, unidad: "Kg", stockInicial: 20 },
      { codigo: "GRA-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Exóticas", nombre: "Granadilla Seleccionada", descripcion: "Granadilla dulce de exportación por kilo", precioCompra: 5500, precioVenta: 8200, unidad: "Kg", stockInicial: 15 },
      { codigo: "UCH-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutos Rojos y Exóticos", nombre: "Uchuva / Aguaymanto (Caja 250g)", descripcion: "Cajita de uchuva fresca seleccionada", precioCompra: 3000, precioVenta: 4500, unidad: "Caja", stockInicial: 15 },
      { codigo: "GUA-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Tropicales", nombre: "Guanábana Fresca", descripcion: "Guanábana madura cremosa por kilo", precioCompra: 4000, precioVenta: 6200, unidad: "Kg", stockInicial: 15 },
      { codigo: "4046", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Aguacate Hass Colombiano", descripcion: "Aguacate Hass de Antioquia / Caldas", precioCompra: 5000, precioVenta: 7500, unidad: "Kg", stockInicial: 25 },
      { codigo: "4048", tipoCodigo: "PLU", subfamilia: "Cítricos", nombre: "Limón Mandarino / Tahití", descripcion: "Limón jugoso por kilo", precioCompra: 2800, precioVenta: 4200, unidad: "Kg", stockInicial: 30 },
      { codigo: "TOM-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Exóticas", nombre: "Tomate de Árbol", descripcion: "Tomate de árbol para jugos y postres", precioCompra: 3200, precioVenta: 4800, unidad: "Kg", stockInicial: 20 },
    ],
  },
  // --- VERDURAS, TUBÉRCULOS Y HORTALIZAS ---
  {
    nombre: "Verduras, Tubérculos y Hortalizas",
    descripcion: "Papas criollas, tomate chonto, cebolla junca y hortalizas",
    articulos: [
      { codigo: "4087", tipoCodigo: "PLU", subfamilia: "Hortalizas de Fruto", nombre: "Tomate Chonto", descripcion: "Tomate chonto tradicional para guisos", precioCompra: 2800, precioVenta: 4200, unidad: "Kg", stockInicial: 40 },
      { codigo: "PAP-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Tubérculos", nombre: "Papa Criolla Amarilla", descripcion: "Papa criolla tierna para ajiaco y fritos", precioCompra: 3500, precioVenta: 5200, unidad: "Kg", stockInicial: 35 },
      { codigo: "PAP-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Tubérculos", nombre: "Papa Pastusa / R-12", descripcion: "Papa pastusa seleccionada para sopa y puré", precioCompra: 2400, precioVenta: 3600, unidad: "Kg", stockInicial: 40 },
      { codigo: "CEB-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Bulbos y Tallos", nombre: "Cebolla Junca / Larga", descripcion: "Atado de cebolla en rama para hogao", precioCompra: 2200, precioVenta: 3500, unidad: "Manojo", stockInicial: 30 },
      { codigo: "4083", tipoCodigo: "PLU", subfamilia: "Bulbos y Tallos", nombre: "Cebolla Cabezona Roja", descripcion: "Cebolla roja para ensaladas", precioCompra: 2600, precioVenta: 3900, unidad: "Kg", stockInicial: 25 },
      { codigo: "YUC-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Tubérculos", nombre: "Yuca / Mandioca Fresca", descripcion: "Yuca blanca harinosa para sancocho", precioCompra: 2500, precioVenta: 3800, unidad: "Kg", stockInicial: 30 },
      { codigo: "AHU-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hortalizas de Fruto", nombre: "Ahuyama / Calabaza Criolla", descripcion: "Ahuyama dulce en trozos por kilo", precioCompra: 1800, precioVenta: 2800, unidad: "Kg", stockInicial: 25 },
      { codigo: "4094", tipoCodigo: "PLU", subfamilia: "Crucíferas", nombre: "Zanahoria Seleccionada", descripcion: "Zanahoria fresca de la sabana", precioCompra: 2000, precioVenta: 3000, unidad: "Kg", stockInicial: 25 },
      { codigo: "MAZ-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Legumbres Frescas", nombre: "Mazorca de Maíz Tierno", descripcion: "Mazorca con capacho para sancocho", precioCompra: 1200, precioVenta: 2000, unidad: "Pieza", stockInicial: 30 },
    ],
  },
  // --- HIERBAS Y VERDURAS DE HOJA ---
  {
    nombre: "Hierbas Aromáticas y Hojas",
    descripcion: "Cilantro, guascas, poleo, albahaca y hojas frescas",
    articulos: [
      { codigo: "4889", tipoCodigo: "PLU", subfamilia: "Hierbas Culinarias", nombre: "Cilantro Criollo Fresco", descripcion: "Atado de cilantro fresco con raíz", precioCompra: 1000, precioVenta: 1800, unidad: "Manojo", stockInicial: 40 },
      { codigo: "GUA-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas Culinarias", nombre: "Guascas Frescas", descripcion: "Hierba esencial para el Ajiaco Santafereño", precioCompra: 1200, precioVenta: 2200, unidad: "Manojo", stockInicial: 25 },
      { codigo: "CIM-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas Culinarias", nombre: "Cilantro Cimarrón / Culantro", descripcion: "Cilantro de hoja ancha para sancochos", precioCompra: 1200, precioVenta: 2200, unidad: "Manojo", stockInicial: 20 },
      { codigo: "ALB-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas Culinarias", nombre: "Albahaca Blanca", descripcion: "Albahaca fresca aromática", precioCompra: 1200, precioVenta: 2200, unidad: "Manojo", stockInicial: 20 },
      { codigo: "4061", tipoCodigo: "PLU", subfamilia: "Hortalizas de Hoja", nombre: "Lechuga Batavia Fresca", descripcion: "Lechuga crespa batavia por unidad", precioCompra: 1800, precioVenta: 2800, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  // --- ABARROTES Y PROCESADOS ---
  {
    nombre: "Bebidas y Cafés",
    descripcion: "Gaseosas, maltas, jugos y café 100% colombiano",
    articulos: [
      { codigo: "770200100123", tipoCodigo: "EAN", subfamilia: "Gaseosas", nombre: "Gaseosa Postobón Manzana 400 ml", descripcion: "Bebida refrescante sabor manzana", precioCompra: 1800, precioVenta: 2500, unidad: "Pieza", stockInicial: 30 },
      { codigo: "770200400101", tipoCodigo: "EAN", subfamilia: "Maltas", nombre: "Pony Malta Botella 330 ml", descripcion: "Bebida de malta con vitaminas", precioCompra: 2000, precioVenta: 2800, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770200105544", tipoCodigo: "EAN", subfamilia: "Jugos de Fruta", nombre: "Jugo Hit Mango 500 ml", descripcion: "Bebida de fruta sabor mango", precioCompra: 2300, precioVenta: 3200, unidad: "Pieza", stockInicial: 20 },
      { codigo: "770201012345", tipoCodigo: "EAN", subfamilia: "Café Tostado y Molido", nombre: "Café Sello Rojo Molido 250 g", descripcion: "Café tostado y molido tradicional", precioCompra: 9500, precioVenta: 12500, unidad: "Pieza", stockInicial: 18 },
      { codigo: "770201018899", tipoCodigo: "EAN", subfamilia: "Café Soluble", nombre: "Café Soluble Colcafé Clásico 100 g", descripcion: "Café instantáneo granulado", precioCompra: 10500, precioVenta: 14000, unidad: "Pieza", stockInicial: 15 },
      { codigo: "770200108877", tipoCodigo: "EAN", subfamilia: "Agua Embotellada", nombre: "Agua Cristal sin Gas 600 ml", descripcion: "Agua tratada embotellada", precioCompra: 1400, precioVenta: 2000, unidad: "Pieza", stockInicial: 24 },
    ],
  },
  {
    nombre: "Snacks y Golosinas",
    descripcion: "Chocolatinas, ponqués y pasabocas típicos",
    articulos: [
      { codigo: "770208001001", tipoCodigo: "EAN", subfamilia: "Chocolates", nombre: "Chocolatina Jet Tradicional 12 g", descripcion: "Chocolatina con lámina coleccionable", precioCompra: 700, precioVenta: 1000, unidad: "Pieza", stockInicial: 50 },
      { codigo: "770208002233", tipoCodigo: "EAN", subfamilia: "Ponqués y Tortas", nombre: "Chocoramo Bimbo Ponqué 65 g", descripcion: "Bizcocho recubierto de chocolate", precioCompra: 1900, precioVenta: 2600, unidad: "Pieza", stockInicial: 30 },
      { codigo: "770201104455", tipoCodigo: "EAN", subfamilia: "Papas Fritas", nombre: "Papas Margarita Pollo 40 g", descripcion: "Papas fritas sabor a pollo", precioCompra: 1800, precioVenta: 2500, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770201109988", tipoCodigo: "EAN", subfamilia: "Platanitos y Frituras", nombre: "Platanitos Natuchips Limón 45 g", descripcion: "Plátanos verdes crujientes con limón", precioCompra: 1800, precioVenta: 2500, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770201106677", tipoCodigo: "EAN", subfamilia: "Mix de Pasabocas", nombre: "DeTodito Familiar 120 g", descripcion: "Mix de papas, plátanos y chicharrones", precioCompra: 4200, precioVenta: 5800, unidad: "Pieza", stockInicial: 15 },
    ],
  },
  {
    nombre: "Lácteos y Derivados",
    descripcion: "Leches, arequipes, quesitos y yogures",
    articulos: [
      { codigo: "770202500001", tipoCodigo: "EAN", subfamilia: "Leches Líquidas", nombre: "Leche Entera Alquería Larga Vida 1 L", descripcion: "Leche líquida UHT enriquecida", precioCompra: 3700, precioVenta: 4800, unidad: "Pieza", stockInicial: 24 },
      { codigo: "770202500112", tipoCodigo: "EAN", subfamilia: "Leches Especiales", nombre: "Leche Deslactosada Colanta 1 L", descripcion: "Leche fácil digestión Colanta", precioCompra: 4000, precioVenta: 5200, unidad: "Pieza", stockInicial: 20 },
      { codigo: "770202500334", tipoCodigo: "EAN", subfamilia: "Quesos Típicos", nombre: "Quesito Colombiano Colanta 250 g", descripcion: "Queso fresco tradicional antioqueño", precioCompra: 5800, precioVenta: 7500, unidad: "Pieza", stockInicial: 12 },
      { codigo: "770202500556", tipoCodigo: "EAN", subfamilia: "Dulces de Leche", nombre: "Arequipe Alpina 220 g", descripcion: "Dulce de leche colombiano cremoso", precioCompra: 4900, precioVenta: 6500, unidad: "Pieza", stockInicial: 16 },
      { codigo: "770202500778", tipoCodigo: "EAN", subfamilia: "Bebidas Lácteas", nombre: "Yox Alpina Fresa Melocotón 100 g", descripcion: "Bebida láctea con probióticos", precioCompra: 1700, precioVenta: 2400, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  {
    nombre: "Panadería y Galletas",
    descripcion: "Galletas saladas y dulces colombianas",
    articulos: [
      { codigo: "770209001010", tipoCodigo: "EAN", subfamilia: "Galletas Saladas", nombre: "Galletas Ducales Noel 294 g", descripcion: "Galletas con el toque secreto dulce-salado", precioCompra: 4700, precioVenta: 6200, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770209002020", tipoCodigo: "EAN", subfamilia: "Galletas Dulces", nombre: "Galletas Festival Chocolate Noel 403 g", descripcion: "Galletas tipo sándwich de chocolate", precioCompra: 5600, precioVenta: 7400, unidad: "Pieza", stockInicial: 20 },
      { codigo: "770209003030", tipoCodigo: "EAN", subfamilia: "Galletas de Soda", nombre: "Galletas Saltín Noel 3 Tacos 400 g", descripcion: "Galletas de soda crocantes", precioCompra: 4400, precioVenta: 5800, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770200800111", tipoCodigo: "EAN", subfamilia: "Pan Empacado", nombre: "Pan Artesano Bimbo Blanco 500 g", descripcion: "Pan tajado tipo artesanal", precioCompra: 6500, precioVenta: 8500, unidad: "Pieza", stockInicial: 12 },
    ],
  },
  {
    nombre: "Despensa y Granos",
    descripcion: "Harinas, arroces, aceites y granos",
    articulos: [
      { codigo: "770205001234", tipoCodigo: "EAN", subfamilia: "Harinas y Mezclas", nombre: "Harina P.A.N. Blanca Maíz 1 kg", descripcion: "Harina precocida para arepas", precioCompra: 4100, precioVenta: 5500, unidad: "Pieza", stockInicial: 30 },
      { codigo: "770205005678", tipoCodigo: "EAN", subfamilia: "Arroces", nombre: "Arroz Diana Blanco 1 kg", descripcion: "Arroz blanco superior fortificado", precioCompra: 3800, precioVenta: 4900, unidad: "Pieza", stockInicial: 30 },
      { codigo: "770205009900", tipoCodigo: "EAN", subfamilia: "Aceites", nombre: "Aceite Gourmet Familia 1 L", descripcion: "Aceite vegetal premium para cocina", precioCompra: 12500, precioVenta: 16500, unidad: "Pieza", stockInicial: 16 },
      { codigo: "770205003322", tipoCodigo: "EAN", subfamilia: "Enlatados", nombre: "Atún Van Camp's Lomitos en Aceite 160 g", descripcion: "Lomitos de atún en aceite vegetal", precioCompra: 6100, precioVenta: 7900, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770205004411", tipoCodigo: "EAN", subfamilia: "Pastas", nombre: "Pastas Doria Spaghetti 250 g", descripcion: "Pasta tradicional con sémola de trigo", precioCompra: 2100, precioVenta: 2800, unidad: "Pieza", stockInicial: 30 },
      { codigo: "770205008833", tipoCodigo: "EAN", subfamilia: "Legumbres Secas", nombre: "Frijol Cargamanto Rojo Diana 500 g", descripcion: "Frijol seleccionado para bandeja paisa", precioCompra: 4800, precioVenta: 6400, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  {
    nombre: "Aseo y Limpieza",
    descripcion: "Cuidado del hogar y productos de higiene",
    articulos: [
      { codigo: "770204001111", tipoCodigo: "EAN", subfamilia: "Detergentes Líquidos", nombre: "Detergente Líquido Fab Floral 1 L", descripcion: "Detergente concentrado aroma floral", precioCompra: 10200, precioVenta: 13500, unidad: "Pieza", stockInicial: 15 },
      { codigo: "770204002222", tipoCodigo: "EAN", subfamilia: "Desinfectantes", nombre: "Blanqueador Clorox Original 1 L", descripcion: "Desinfectante y blanqueador para ropa", precioCompra: 4100, precioVenta: 5500, unidad: "Pieza", stockInicial: 20 },
      { codigo: "770204003333", tipoCodigo: "EAN", subfamilia: "Jabones de Tocador", nombre: "Jabón de Baño Protex Antibacterial 110 g", descripcion: "Jabón en barra para higiene corporal", precioCompra: 2800, precioVenta: 3800, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770204004444", tipoCodigo: "EAN", subfamilia: "Papel Higiénico", nombre: "Papel Higiénico Familia 4 Rollos", descripcion: "Papel acolchamax doble hoja", precioCompra: 6200, precioVenta: 8200, unidad: "Pieza", stockInicial: 20 },
    ],
  },
];

// ===========================================================================
// ESTADOS UNIDOS (UPC / EAN + PLU Codes / Moneda: USD $)
// ===========================================================================
export const CATALOGO_USA: FamiliaSemilla[] = [
  // --- FRESH PRODUCE ---
  {
    nombre: "Fresh Produce & Fruits",
    descripcion: "Fresh fruits, citrus, apples and berries",
    articulos: [
      { codigo: "4011", tipoCodigo: "PLU", subfamilia: "Tropical Fruits", nombre: "Yellow Bananas", descripcion: "Fresh yellow bananas by the pound", precioCompra: 0.35, precioVenta: 0.69, unidad: "lb", stockInicial: 40 },
      { codigo: "4046", tipoCodigo: "PLU", subfamilia: "Tropical Fruits", nombre: "Hass Avocados (Medium)", descripcion: "Fresh Hass avocados individual", precioCompra: 0.75, precioVenta: 1.49, unidad: "Pieza", stockInicial: 30 },
      { codigo: "4135", tipoCodigo: "PLU", subfamilia: "Apples & Pears", nombre: "Gala Apples", descripcion: "Crisp sweet Gala apples by the pound", precioCompra: 0.95, precioVenta: 1.89, unidad: "lb", stockInicial: 25 },
      { codigo: "3283", tipoCodigo: "PLU", subfamilia: "Apples & Pears", nombre: "Honeycrisp Apples", descripcion: "Premium juicy Honeycrisp apples", precioCompra: 1.65, precioVenta: 2.99, unidad: "lb", stockInicial: 20 },
      { codigo: "4033", tipoCodigo: "PLU", subfamilia: "Citrus", nombre: "Lemons Conventional", descripcion: "Fresh yellow cooking lemons", precioCompra: 0.35, precioVenta: 0.79, unidad: "Pieza", stockInicial: 35 },
      { codigo: "4012", tipoCodigo: "PLU", subfamilia: "Citrus", nombre: "Navel Oranges Large", descripcion: "Sweet seedless navel oranges", precioCompra: 0.75, precioVenta: 1.49, unidad: "lb", stockInicial: 25 },
      { codigo: "4249", tipoCodigo: "PLU", subfamilia: "Berries", nombre: "Fresh Strawberries 1 lb Clamshell", descripcion: "Sweet California red strawberries", precioCompra: 2.20, precioVenta: 3.99, unidad: "Caja", stockInicial: 20 },
      { codigo: "4032", tipoCodigo: "PLU", subfamilia: "Melons", nombre: "Seedless Watermelon", descripcion: "Whole sweet seedless watermelon", precioCompra: 3.50, precioVenta: 5.99, unidad: "Pieza", stockInicial: 15 },
    ],
  },
  {
    nombre: "Fresh Vegetables & Herbs",
    descripcion: "Tomatoes, greens, potatoes, onions and fresh culinary herbs",
    articulos: [
      { codigo: "4087", tipoCodigo: "PLU", subfamilia: "Tomatoes & Peppers", nombre: "Roma Tomatoes", descripcion: "Plum red cooking tomatoes", precioCompra: 0.75, precioVenta: 1.49, unidad: "lb", stockInicial: 30 },
      { codigo: "4068", tipoCodigo: "PLU", subfamilia: "Tomatoes & Peppers", nombre: "Green Bell Peppers", descripcion: "Fresh crunchy green bell peppers", precioCompra: 0.50, precioVenta: 0.99, unidad: "Pieza", stockInicial: 25 },
      { codigo: "4090", tipoCodigo: "PLU", subfamilia: "Potatoes & Root Vegetables", nombre: "Russet Potatoes 5 lb Bag", descripcion: "Baking and mashing russet potatoes", precioCompra: 2.10, precioVenta: 3.99, unidad: "Bolsa", stockInicial: 20 },
      { codigo: "4093", tipoCodigo: "PLU", subfamilia: "Onions & Garlic", nombre: "Yellow Onions", descripcion: "All-purpose cooking yellow onions", precioCompra: 0.65, precioVenta: 1.29, unidad: "lb", stockInicial: 30 },
      { codigo: "4061", tipoCodigo: "PLU", subfamilia: "Greens & Lettuce", nombre: "Iceberg Lettuce Head", descripcion: "Crisp head of iceberg lettuce", precioCompra: 0.90, precioVenta: 1.79, unidad: "Pieza", stockInicial: 20 },
      { codigo: "3082", tipoCodigo: "PLU", subfamilia: "Cruciferous Vegetables", nombre: "Broccoli Crowns", descripcion: "Fresh green broccoli crowns", precioCompra: 1.10, precioVenta: 1.99, unidad: "lb", stockInicial: 20 },
      { codigo: "4889", tipoCodigo: "PLU", subfamilia: "Fresh Herbs", nombre: "Fresh Cilantro Bunch", descripcion: "Fresh aromatic green cilantro", precioCompra: 0.45, precioVenta: 0.99, unidad: "Manojo", stockInicial: 30 },
      { codigo: "4899", tipoCodigo: "PLU", subfamilia: "Fresh Herbs", nombre: "Italian Flat Leaf Parsley", descripcion: "Fresh culinary Italian parsley bunch", precioCompra: 0.50, precioVenta: 1.19, unidad: "Manojo", stockInicial: 25 },
    ],
  },
  // --- PACKAGED GOODS ---
  {
    nombre: "Beverages & Drinks",
    descripcion: "Sodas, energy drinks, juices and purified water",
    articulos: [
      { codigo: "049000028904", tipoCodigo: "EAN", subfamilia: "Carbonated Drinks", nombre: "Coca-Cola Classic Soda 20 fl oz", descripcion: "Classic Coca-Cola bottle", precioCompra: 1.65, precioVenta: 2.49, unidad: "Pieza", stockInicial: 30 },
      { codigo: "049000028911", tipoCodigo: "EAN", subfamilia: "Diet Drinks", nombre: "Diet Coke Soda 20 fl oz", descripcion: "Sugar-free calorie-free soda", precioCompra: 1.65, precioVenta: 2.49, unidad: "Pieza", stockInicial: 20 },
      { codigo: "078000082403", tipoCodigo: "EAN", subfamilia: "Carbonated Drinks", nombre: "Dr Pepper Soda 20 fl oz", descripcion: "Original 23 flavors soda", precioCompra: 1.65, precioVenta: 2.49, unidad: "Pieza", stockInicial: 20 },
      { codigo: "012000000133", tipoCodigo: "EAN", subfamilia: "Carbonated Drinks", nombre: "Pepsi Cola Bottle 20 fl oz", descripcion: "Pepsi cola soft drink", precioCompra: 1.5, precioVenta: 2.29, unidad: "Pieza", stockInicial: 24 },
      { codigo: "052000328678", tipoCodigo: "EAN", subfamilia: "Sports Drinks", nombre: "Gatorade Lemon-Lime 28 fl oz", descripcion: "Electrolyte sports drink", precioCompra: 1.8, precioVenta: 2.79, unidad: "Pieza", stockInicial: 20 },
      { codigo: "068274000101", tipoCodigo: "EAN", subfamilia: "Bottled Water", nombre: "Pure Life Purified Water 16.9 oz", descripcion: "Natural spring purified bottled water", precioCompra: 0.65, precioVenta: 1.29, unidad: "Pieza", stockInicial: 35 },
    ],
  },
  {
    nombre: "Snacks & Confectionery",
    descripcion: "Chips, cookies, chocolates and candies",
    articulos: [
      { codigo: "028400040112", tipoCodigo: "EAN", subfamilia: "Potato Chips", nombre: "Lay's Classic Potato Chips 8 oz", descripcion: "Crispy salted potato chips", precioCompra: 3.1, precioVenta: 4.59, unidad: "Pieza", stockInicial: 25 },
      { codigo: "028400064118", tipoCodigo: "EAN", subfamilia: "Tortilla Chips", nombre: "Doritos Nacho Cheese Chips 9.25 oz", descripcion: "Nacho flavored tortilla chips", precioCompra: 3.4, precioVenta: 4.99, unidad: "Pieza", stockInicial: 25 },
      { codigo: "028400072113", tipoCodigo: "EAN", subfamilia: "Cheese Snacks", nombre: "Cheetos Crunchy Cheese 8.5 oz", descripcion: "Cheese flavored crunchy snacks", precioCompra: 3.2, precioVenta: 4.79, unidad: "Pieza", stockInicial: 20 },
      { codigo: "044000032029", tipoCodigo: "EAN", subfamilia: "Cookies", nombre: "Oreo Original Sandwich Cookies 14.3 oz", descripcion: "Chocolate cookies with creme filling", precioCompra: 3.3, precioVenta: 4.89, unidad: "Pieza", stockInicial: 25 },
      { codigo: "034000002405", tipoCodigo: "EAN", subfamilia: "Chocolates", nombre: "Hershey's Milk Chocolate Bar 1.55 oz", descripcion: "Pure milk chocolate standard bar", precioCompra: 1.1, precioVenta: 1.79, unidad: "Pieza", stockInicial: 40 },
    ],
  },
  {
    nombre: "Dairy & Breakfast",
    descripcion: "Milk, cereal, cheese and breakfast foods",
    articulos: [
      { codigo: "011110000123", tipoCodigo: "EAN", subfamilia: "Fresh Milk", nombre: "Great Value Whole Milk 1 Gallon", descripcion: "Pasteurized whole grade A milk", precioCompra: 2.65, precioVenta: 3.89, unidad: "Pieza", stockInicial: 16 },
      { codigo: "038000198514", tipoCodigo: "EAN", subfamilia: "Cereals", nombre: "Kellogg's Corn Flakes Cereal 18 oz", descripcion: "Toasted corn flakes cereal box", precioCompra: 3.7, precioVenta: 5.49, unidad: "Pieza", stockInicial: 15 },
      { codigo: "041303001001", tipoCodigo: "EAN", subfamilia: "Cheeses", nombre: "Kraft American Cheese Singles 16ct", descripcion: "Individually wrapped cheese slices", precioCompra: 2.9, precioVenta: 4.29, unidad: "Pieza", stockInicial: 20 },
      { codigo: "070470003001", tipoCodigo: "EAN", subfamilia: "Yogurts", nombre: "Yoplait Strawberry Yogurt 6 oz", descripcion: "Creamy low-fat strawberry yogurt", precioCompra: 0.55, precioVenta: 0.99, unidad: "Pieza", stockInicial: 25 },
    ],
  },
  {
    nombre: "Pantry & Groceries",
    descripcion: "Canned goods, condiments, pasta and staples",
    articulos: [
      { codigo: "013000006030", tipoCodigo: "EAN", subfamilia: "Condiments", nombre: "Heinz Tomato Ketchup Bottle 20 oz", descripcion: "Thick & rich tomato ketchup", precioCompra: 2.65, precioVenta: 3.99, unidad: "Pieza", stockInicial: 20 },
      { codigo: "051000000115", tipoCodigo: "EAN", subfamilia: "Canned Soups", nombre: "Campbell's Condensed Tomato Soup 10.75 oz", descripcion: "Classic condensed tomato soup", precioCompra: 1.15, precioVenta: 1.89, unidad: "Pieza", stockInicial: 24 },
      { codigo: "071514000101", tipoCodigo: "EAN", subfamilia: "Pastas", nombre: "Barilla Spaghetti Pasta 16 oz", descripcion: "Enriched semolina wheat pasta", precioCompra: 1.35, precioVenta: 2.19, unidad: "Pieza", stockInicial: 30 },
      { codigo: "073420000101", tipoCodigo: "EAN", subfamilia: "Spreads", nombre: "Jif Creamy Peanut Butter 16 oz", descripcion: "Smooth roasted peanut butter", precioCompra: 2.3, precioVenta: 3.49, unidad: "Pieza", stockInicial: 18 },
    ],
  },
  {
    nombre: "Household & Cleaning",
    descripcion: "Detergents, disinfecting wipes and paper products",
    articulos: [
      { codigo: "037000123456", tipoCodigo: "EAN", subfamilia: "Laundry Detergents", nombre: "Tide PODS Liquid Laundry 31 ct", descripcion: "3-in-1 concentrated detergent pods", precioCompra: 8.9, precioVenta: 12.99, unidad: "Pieza", stockInicial: 12 },
      { codigo: "044600010011", tipoCodigo: "EAN", subfamilia: "Disinfectants", nombre: "Clorox Disinfecting Wipes 75 ct", descripcion: "Bleach-free antibacterial wet wipes", precioCompra: 3.65, precioVenta: 5.49, unidad: "Pieza", stockInicial: 18 },
      { codigo: "037000001010", tipoCodigo: "EAN", subfamilia: "Dishwashing", nombre: "Dawn Ultra Dishwashing Liquid 19.4 oz", descripcion: "Original grease-fighting dish soap", precioCompra: 2.65, precioVenta: 3.99, unidad: "Pieza", stockInicial: 20 },
    ],
  },
];

// ===========================================================================
// ESPAÑA (EAN-13: 84 + Huerta y Frutas españolas / Moneda: EUR €)
// ===========================================================================
export const CATALOGO_ESPANA: FamiliaSemilla[] = [
  // --- FRUTAS FRESCAS ESPAÑOLAS ---
  {
    nombre: "Frutas Frescas de la Huerta",
    descripcion: "Cítricos de Valencia, plátano de Canarias, melones y frutas de temporada",
    articulos: [
      { codigo: "4011", tipoCodigo: "PLU", subfamilia: "Frutas de Canarias", nombre: "Plátano de Canarias IGP", descripcion: "Plátano dulce con motitas de primera", precioCompra: 1.20, precioVenta: 1.95, unidad: "Kg", stockInicial: 30 },
      { codigo: "4014", tipoCodigo: "PLU", subfamilia: "Cítricos de Valencia", nombre: "Naranja de Valencia de Mesa", descripcion: "Naranjas dulces seleccionadas para mesa", precioCompra: 0.95, precioVenta: 1.65, unidad: "Kg", stockInicial: 35 },
      { codigo: "MAN-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Cítricos de Valencia", nombre: "Mandarina Clementina con Hoja", descripcion: "Mandarinas fáciles de pelar muy dulces", precioCompra: 1.30, precioVenta: 2.10, unidad: "Kg", stockInicial: 25 },
      { codigo: "MEL-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Melones y Sandías", nombre: "Melón Piel de Sapo de La Mancha", descripcion: "Melón dulce crujiente por kilo", precioCompra: 0.85, precioVenta: 1.45, unidad: "Kg", stockInicial: 30 },
      { codigo: "SAN-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Melones y Sandías", nombre: "Sandía Rayada sin Pepitas", descripcion: "Sandía dulce extra de temporada", precioCompra: 0.75, precioVenta: 1.35, unidad: "Kg", stockInicial: 30 },
      { codigo: "4131", tipoCodigo: "PLU", subfamilia: "Frutas de Pepita", nombre: "Manzana Golden Reineta", descripcion: "Manzanas crujientes de Lérida", precioCompra: 1.25, precioVenta: 1.95, unidad: "Kg", stockInicial: 20 },
      { codigo: "FRE-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutos Rojos", nombre: "Fresón de Huelva (Bandeja 500g)", descripcion: "Fresas rojas maduras de Huelva", precioCompra: 1.80, precioVenta: 2.85, unidad: "Caja", stockInicial: 20 },
      { codigo: "4033", tipoCodigo: "PLU", subfamilia: "Cítricos", nombre: "Limón Primofiori", descripcion: "Limón fino jugoso para aliños", precioCompra: 1.10, precioVenta: 1.80, unidad: "Kg", stockInicial: 25 },
    ],
  },
  // --- VERDURAS Y HORTALIZAS ESPAÑOLAS ---
  {
    nombre: "Verduras y Hortalizas",
    descripcion: "Tomates de la huerta, pimientos, calabacines y hortalizas",
    articulos: [
      { codigo: "TOM-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Hortalizas de Fruto", nombre: "Tomate Raf / Pera de Almería", descripcion: "Tomate de sabor dulce con carne firme", precioCompra: 1.90, precioVenta: 2.95, unidad: "Kg", stockInicial: 30 },
      { codigo: "PIM-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Pimientos", nombre: "Pimiento Verde Italiano para Freír", descripcion: "Pimiento alargado tierno", precioCompra: 1.40, precioVenta: 2.20, unidad: "Kg", stockInicial: 25 },
      { codigo: "PIM-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Pimientos", nombre: "Pimiento Rojo de Asar", descripcion: "Pimiento carnoso dulce para asar", precioCompra: 1.70, precioVenta: 2.65, unidad: "Kg", stockInicial: 20 },
      { codigo: "CAL-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hortalizas de Fruto", nombre: "Calabacín Verde de Huerta", descripcion: "Calabacín tierno de primera", precioCompra: 1.10, precioVenta: 1.75, unidad: "Kg", stockInicial: 25 },
      { codigo: "BER-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hortalizas de Fruto", nombre: "Berenjena Negra Brillante", descripcion: "Berenjenas frescas para cocinar", precioCompra: 1.25, precioVenta: 1.90, unidad: "Kg", stockInicial: 20 },
      { codigo: "PAT-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Tubérculos", nombre: "Patata Monalisa para Freír y Guisar", descripcion: "Patata lavada especial cocina", precioCompra: 0.90, precioVenta: 1.45, unidad: "Kg", stockInicial: 40 },
      { codigo: "CEB-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Bulbos", nombre: "Cebolla Dulce de Fuentes", descripcion: "Cebolla suave que no pica para ensaladas", precioCompra: 1.15, precioVenta: 1.80, unidad: "Kg", stockInicial: 30 },
      { codigo: "AJO-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Bulbos", nombre: "Ajo Morado de Las Pedroñeras (Malla 3u)", descripcion: "Ajo de denominación de origen", precioCompra: 1.20, precioVenta: 1.95, unidad: "Malla", stockInicial: 25 },
    ],
  },
  // --- HIERBAS Y CONDIMENTOS FRESCOS ---
  {
    nombre: "Hierbas Aromáticas y Silvestres",
    descripcion: "Perejil rizado, romero, tomillo y laurel frescos de monte",
    articulos: [
      { codigo: "4899", tipoCodigo: "PLU", subfamilia: "Hierbas Culinarias", nombre: "Perejil Fresco de Huerta", descripcion: "Manojo de perejil fresco aromático", precioCompra: 0.40, precioVenta: 0.85, unidad: "Manojo", stockInicial: 35 },
      { codigo: "ROM-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas Aromáticas", nombre: "Romero Fresco Silvestre", descripcion: "Ramas de romero para carnes y paellas", precioCompra: 0.60, precioVenta: 1.25, unidad: "Manojo", stockInicial: 20 },
      { codigo: "TOM-003", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas Aromáticas", nombre: "Tomillo Fresco", descripcion: "Ramitas de tomillo para guisos y asados", precioCompra: 0.60, precioVenta: 1.25, unidad: "Manojo", stockInicial: 20 },
      { codigo: "LAU-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas Aromáticas", nombre: "Laurel en Rama Fresco", descripcion: "Hojas de laurel para caldos y legumbres", precioCompra: 0.50, precioVenta: 1.10, unidad: "Manojo", stockInicial: 20 },
    ],
  },
  // --- ABARROTES Y BODEGA ESPAÑOLA ---
  {
    nombre: "Bebidas y Cervezas",
    descripcion: "Cervezas nacionales, aguas minerales y cafés",
    articulos: [
      { codigo: "841010001001", tipoCodigo: "EAN", subfamilia: "Cervezas", nombre: "Cerveza Mahou Cinco Estrellas 33 cl", descripcion: "Cerveza rubia lager especial", precioCompra: 0.75, precioVenta: 1.20, unidad: "Pieza", stockInicial: 36 },
      { codigo: "841000050001", tipoCodigo: "EAN", subfamilia: "Aguas Minerales", nombre: "Agua Mineral Bezoya 1.5 L", descripcion: "Agua de mineralización muy débil", precioCompra: 0.50, precioVenta: 0.85, unidad: "Pieza", stockInicial: 30 },
      { codigo: "841000600101", tipoCodigo: "EAN", subfamilia: "Cacao y Desayunos", nombre: "ColaCao Original 400 g", descripcion: "Cacao soluble con grumos característicos", precioCompra: 2.70, precioVenta: 3.95, unidad: "Pieza", stockInicial: 18 },
      { codigo: "841000012345", tipoCodigo: "EAN", subfamilia: "Cafés", nombre: "Café Marcilla Gran Aroma Molido 250 g", descripcion: "Café mezcla tueste natural", precioCompra: 2.30, precioVenta: 3.40, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  {
    nombre: "Charcutería y Quesos",
    descripcion: "Jamón curado, embutidos ibéricos y quesos",
    articulos: [
      { codigo: "841007601001", tipoCodigo: "EAN", subfamilia: "Jamones Curados", nombre: "Jamón Serrano Navidul Loncheado 100 g", descripcion: "Jamón curado reserva en sobres", precioCompra: 2.50, precioVenta: 3.75, unidad: "Pieza", stockInicial: 25 },
      { codigo: "841007602002", tipoCodigo: "EAN", subfamilia: "Embutidos Ibéricos", nombre: "Chorizo Ibérico Campofrío 100 g", descripcion: "Chorizo loncheado calidad extra", precioCompra: 1.85, precioVenta: 2.80, unidad: "Pieza", stockInicial: 20 },
      { codigo: "848000012345", tipoCodigo: "EAN", subfamilia: "Lácteos", nombre: "Leche Entera Pascual 1 L", descripcion: "Leche entera UHT con vitaminas", precioCompra: 0.78, precioVenta: 1.15, unidad: "Pieza", stockInicial: 24 },
      { codigo: "841008800101", tipoCodigo: "EAN", subfamilia: "Quesos", nombre: "Queso Manchego García Baquero 250 g", descripcion: "Queso semicurado cuña selecta", precioCompra: 3.30, precioVenta: 4.90, unidad: "Pieza", stockInicial: 15 },
    ],
  },
  {
    nombre: "Aceites y Despensa Española",
    descripcion: "Aceite de oliva virgen extra, conservas y legumbres",
    articulos: [
      { codigo: "841000000101", tipoCodigo: "EAN", subfamilia: "Aceites de Oliva", nombre: "Aceite Oliva Virgen Extra Carbonell 1 L", descripcion: "Aceite de oliva 100% español prensado", precioCompra: 6.20, precioVenta: 8.95, unidad: "Pieza", stockInicial: 15 },
      { codigo: "841012300001", tipoCodigo: "EAN", subfamilia: "Conservas y Salsas", nombre: "Tomate Frito Solís Estilo Casero 350 g", descripcion: "Tomate frito con aceite de oliva", precioCompra: 0.85, precioVenta: 1.35, unidad: "Pieza", stockInicial: 30 },
      { codigo: "841013400001", tipoCodigo: "EAN", subfamilia: "Arroces", nombre: "Arroz SOS Grano Redondo 1 kg", descripcion: "Arroz especial para paella y guisos", precioCompra: 1.40, precioVenta: 2.10, unidad: "Pieza", stockInicial: 25 },
      { codigo: "841014500001", tipoCodigo: "EAN", subfamilia: "Conservas de Pescado", nombre: "Atún Claro Calvo en Aceite Oliva 3x80 g", descripcion: "Lomos de atún claro pack ahorro", precioCompra: 2.45, precioVenta: 3.60, unidad: "Pieza", stockInicial: 25 },
      { codigo: "841015600001", tipoCodigo: "EAN", subfamilia: "Pastas", nombre: "Pasta Gallo Macarrones 500 g", descripcion: "Pasta de trigo duro clásica", precioCompra: 0.90, precioVenta: 1.40, unidad: "Pieza", stockInicial: 30 },
    ],
  },
];

// ===========================================================================
// ARGENTINA (EAN-13: 779 + Verdulería argentina / Moneda: ARS $)
// ===========================================================================
export const CATALOGO_ARGENTINA: FamiliaSemilla[] = [
  // --- FRUTAS FRESCAS ARGENTINAS ---
  {
    nombre: "Frutas Frescas de Estación",
    descripcion: "Manzanas del Valle, peras Williams, cítricos y bananas",
    articulos: [
      { codigo: "4131", tipoCodigo: "PLU", subfamilia: "Frutas de Pepita", nombre: "Manzana Red Delicious de Río Negro", descripcion: "Manzana roja crujiente dulce por kilo", precioCompra: 1100, precioVenta: 1750, unidad: "Kg", stockInicial: 30 },
      { codigo: "4081", tipoCodigo: "PLU", subfamilia: "Frutas de Pepita", nombre: "Pera Williams del Alto Valle", descripcion: "Pera jugosa aromática de primera", precioCompra: 950, precioVenta: 1550, unidad: "Kg", stockInicial: 25 },
      { codigo: "4011", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Banana Ecuador / Salteña", descripcion: "Banana madura seleccionada por kilo", precioCompra: 1200, precioVenta: 1900, unidad: "Kg", stockInicial: 35 },
      { codigo: "4014", tipoCodigo: "PLU", subfamilia: "Cítricos", nombre: "Naranja de Ombligo de San Pedro", descripcion: "Naranja dulce de mesa y jugo", precioCompra: 750, precioVenta: 1200, unidad: "Kg", stockInicial: 30 },
      { codigo: "4033", tipoCodigo: "PLU", subfamilia: "Cítricos", nombre: "Limón Tucumano", descripcion: "Limón de exportación amarillo jugoso", precioCompra: 650, precioVenta: 1100, unidad: "Kg", stockInicial: 30 },
      { codigo: "FRU-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutos Rojos", nombre: "Frutillas de Coronda (Bandeja 500g)", descripcion: "Frutillas rojas dulces seleccionadas", precioCompra: 1800, precioVenta: 2700, unidad: "Caja", stockInicial: 15 },
    ],
  },
  // --- VERDULERÍA Y HORTALIZAS ---
  {
    nombre: "Verduras, Papas y Hortalizas",
    descripcion: "Papas cepilladas, tomates perita, zapallo anco y hortalizas",
    articulos: [
      { codigo: "4087", tipoCodigo: "PLU", subfamilia: "Hortalizas de Fruto", nombre: "Tomate Perita / Redondo", descripcion: "Tomate fresco para ensalada y salsa", precioCompra: 1200, precioVenta: 1850, unidad: "Kg", stockInicial: 35 },
      { codigo: "PAP-003", tipoCodigo: "SIN_CODIGO", subfamilia: "Tubérculos", nombre: "Papa Negra / Cepillada de Balcarce", descripcion: "Papa para puré, horno y papas fritas", precioCompra: 650, precioVenta: 1100, unidad: "Kg", stockInicial: 45 },
      { codigo: "ZAP-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hortalizas de Fruto", nombre: "Zapallo Anco / Butternut", descripcion: "Calabaza anco dulce por kilo", precioCompra: 700, precioVenta: 1200, unidad: "Kg", stockInicial: 30 },
      { codigo: "ZAP-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Hortalizas de Fruto", nombre: "Zapallito Redondo Verde", descripcion: "Zapallito tierno para relleno y tartas", precioCompra: 900, precioVenta: 1450, unidad: "Kg", stockInicial: 25 },
      { codigo: "4083", tipoCodigo: "PLU", subfamilia: "Bulbos", nombre: "Cebolla Valcacer", descripcion: "Cebolla dorada para cocinar", precioCompra: 750, precioVenta: 1250, unidad: "Kg", stockInicial: 35 },
      { codigo: "MOR-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Pimientos", nombre: "Morrón Rojo Grande", descripcion: "Pimiento morrón carnoso dulce", precioCompra: 1800, precioVenta: 2800, unidad: "Kg", stockInicial: 20 },
      { codigo: "4061", tipoCodigo: "PLU", subfamilia: "Hojas Verdes", nombre: "Lechuga Mantecosa / Criolla", descripcion: "Planta de lechuga tierna fresca", precioCompra: 600, precioVenta: 1000, unidad: "Pieza", stockInicial: 20 },
      { codigo: "4899", tipoCodigo: "PLU", subfamilia: "Hierbas", nombre: "Perejil Fresco", descripcion: "Atado de perejil aromático", precioCompra: 300, precioVenta: 600, unidad: "Manojo", stockInicial: 30 },
      { codigo: "ALB-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas", nombre: "Albahaca Hoja Ancha", descripcion: "Albahaca fresca para pesto", precioCompra: 400, precioVenta: 800, unidad: "Manojo", stockInicial: 20 },
    ],
  },
  // --- ALMACÉN Y BEBIDAS ---
  {
    nombre: "Yerba Mate y Bebidas",
    descripcion: "Yerba mate tradicional, fernet y aperitivos",
    articulos: [
      { codigo: "779004000010", tipoCodigo: "EAN", subfamilia: "Yerba Mate", nombre: "Yerba Mate Taragüi 500 g", descripcion: "Yerba mate con palo sabor clásico", precioCompra: 1700, precioVenta: 2400, unidad: "Pieza", stockInicial: 30 },
      { codigo: "779004000020", tipoCodigo: "EAN", subfamilia: "Yerba Mate", nombre: "Yerba Mate Playadito 500 g", descripcion: "Yerba suave tradicional correntina", precioCompra: 1950, precioVenta: 2800, unidad: "Pieza", stockInicial: 30 },
      { codigo: "779004500001", tipoCodigo: "EAN", subfamilia: "Aperitivos y Licores", nombre: "Fernet Branca 750 ml", descripcion: "Aperitivo amargo a base de hierbas", precioCompra: 7200, precioVenta: 9800, unidad: "Pieza", stockInicial: 15 },
    ],
  },
  {
    nombre: "Alfajores y Galletitas",
    descripcion: "Alfajores argentinos, galletitas dulces y de agua",
    articulos: [
      { codigo: "779089500001", tipoCodigo: "EAN", subfamilia: "Alfajores Premium", nombre: "Alfajores Havanna Chocolate 6 u", descripcion: "Caja de alfajores marplatenses rellenos de dulce de leche", precioCompra: 6200, precioVenta: 8500, unidad: "Caja", stockInicial: 15 },
      { codigo: "779089500111", tipoCodigo: "EAN", subfamilia: "Alfajores Populares", nombre: "Alfajor Guaymallén Triple Chocolate", descripcion: "Alfajor triple bañado en repostería", precioCompra: 480, precioVenta: 700, unidad: "Pieza", stockInicial: 40 },
      { codigo: "779058012345", tipoCodigo: "EAN", subfamilia: "Galletitas Dulces", nombre: "Galletitas Chocolinas Bagley 250 g", descripcion: "Galletitas de chocolate para chocotorta", precioCompra: 1500, precioVenta: 2100, unidad: "Pieza", stockInicial: 25 },
    ],
  },
  {
    nombre: "Lácteos y Dulce de Leche",
    descripcion: "Dulce de leche, leche entera y quesos",
    articulos: [
      { codigo: "779007012345", tipoCodigo: "EAN", subfamilia: "Dulce de Leche", nombre: "Dulce de Leche La Serenísima 400 g", descripcion: "Dulce de leche estilo colonial", precioCompra: 2300, precioVenta: 3200, unidad: "Pieza", stockInicial: 25 },
      { codigo: "779007018899", tipoCodigo: "EAN", subfamilia: "Leches Líquidas", nombre: "Leche Entera La Serenísima 1 L", descripcion: "Leche ultrapasteurizada en cartón", precioCompra: 980, precioVenta: 1400, unidad: "Pieza", stockInicial: 24 },
    ],
  },
  {
    nombre: "Almacén y Comestibles",
    descripcion: "Aceites, fideos, harinas y conservas",
    articulos: [
      { codigo: "779008001001", tipoCodigo: "EAN", subfamilia: "Aceites", nombre: "Aceite de Girasol Cocinero 900 ml", descripcion: "Aceite 100% puro de girasol", precioCompra: 1450, precioVenta: 2100, unidad: "Pieza", stockInicial: 20 },
      { codigo: "779008002002", tipoCodigo: "EAN", subfamilia: "Pastas Secas", nombre: "Fideos Matarazzo Tallarines 500 g", descripcion: "Fideos de sémola de trigo candeal", precioCompra: 1050, precioVenta: 1500, unidad: "Pieza", stockInicial: 30 },
    ],
  },
];

// ===========================================================================
// PERU (EAN-13: 775 + Frutas y Verduras peruanas / Moneda: PEN S/)
// ===========================================================================
export const CATALOGO_PERU: FamiliaSemilla[] = [
  // --- FRUTAS FRESCAS PERUANAS ---
  {
    nombre: "Frutas Frescas Peruanas",
    descripcion: "Plátano seda, lúcuma, mango Kent, palta fuerte y frutas nativas",
    articulos: [
      { codigo: "4011", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Plátano Seda / de la Isla", descripcion: "Plátano maduro dulce por kilo", precioCompra: 2.20, precioVenta: 3.50, unidad: "Kg", stockInicial: 35 },
      { codigo: "4046", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Palta Fuerte / Hass Peruana", descripcion: "Palta cremosa mantequilla de primera", precioCompra: 5.50, precioVenta: 8.50, unidad: "Kg", stockInicial: 25 },
      { codigo: "LUC-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Nativas", nombre: "Lúcuma de Seda Fresca", descripcion: "Lúcuma aromática para jugos y postres", precioCompra: 4.80, precioVenta: 7.50, unidad: "Kg", stockInicial: 15 },
      { codigo: "4384", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Mango Kent de Piura", descripcion: "Mango dulce de exportación sin fibra", precioCompra: 3.50, precioVenta: 5.80, unidad: "Kg", stockInicial: 20 },
      { codigo: "GRA-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Nativas", nombre: "Granadilla Andina", descripcion: "Granadilla dulce de la sierra", precioCompra: 4.20, precioVenta: 6.50, unidad: "Kg", stockInicial: 20 },
      { codigo: "MAR-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Tropicales", nombre: "Maracuyá Costeño", descripcion: "Maracuyá jugoso para refrescos", precioCompra: 2.80, precioVenta: 4.50, unidad: "Kg", stockInicial: 25 },
      { codigo: "CHI-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas Nativas", nombre: "Chirimoya Cumbe", descripcion: "Chirimoya blanca dulce cremosa", precioCompra: 6.00, precioVenta: 9.50, unidad: "Kg", stockInicial: 15 },
      { codigo: "4048", tipoCodigo: "PLU", subfamilia: "Cítricos", nombre: "Limón Sutil / Ceutí Peruano", descripcion: "Limón ácido aromático para ceviche", precioCompra: 3.20, precioVenta: 5.00, unidad: "Kg", stockInicial: 35 },
    ],
  },
  // --- VERDURAS, AJÍES Y PAPAS NATIVAS ---
  {
    nombre: "Verduras, Ajíes y Tubérculos",
    descripcion: "Papas amarillas, ají amarillo, rocoto, choclo cusqueño y hortalizas",
    articulos: [
      { codigo: "AJI-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Ajíes Peruanos", nombre: "Ají Amarillo Fresco (Escabeche)", descripcion: "Ají aromático base de la gastronomía peruana", precioCompra: 3.50, precioVenta: 5.50, unidad: "Kg", stockInicial: 30 },
      { codigo: "AJI-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Ajíes Peruanos", nombre: "Ají Limo Picante", descripcion: "Ají fresco multicolor para ceviche", precioCompra: 4.50, precioVenta: 7.00, unidad: "Kg", stockInicial: 20 },
      { codigo: "ROC-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Ajíes Peruanos", nombre: "Rocoto Rojo de Huerta", descripcion: "Rocoto picante para salsas y relleno", precioCompra: 3.80, precioVenta: 6.00, unidad: "Kg", stockInicial: 20 },
      { codigo: "PAP-004", tipoCodigo: "SIN_CODIGO", subfamilia: "Papas Nativas", nombre: "Papa Amarilla Tumbay", descripcion: "Papa arenosa amarilla para causa y puré", precioCompra: 3.20, precioVenta: 4.80, unidad: "Kg", stockInicial: 40 },
      { codigo: "PAP-005", tipoCodigo: "SIN_CODIGO", subfamilia: "Papas Nativas", nombre: "Papa Canchán / Huayro", descripcion: "Papa versátil para guisos y fritura", precioCompra: 2.10, precioVenta: 3.40, unidad: "Kg", stockInicial: 40 },
      { codigo: "CHO-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Maíces", nombre: "Choclo Cusqueño Grano Grande", descripcion: "Choclo tierno gigante para ceviche y sancochado", precioCompra: 2.00, precioVenta: 3.50, unidad: "Pieza", stockInicial: 30 },
      { codigo: "CAM-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Tubérculos", nombre: "Camote Amarillo Dulce", descripcion: "Camote dulce para acompañar ceviche", precioCompra: 1.80, precioVenta: 2.90, unidad: "Kg", stockInicial: 30 },
      { codigo: "YUC-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Tubérculos", nombre: "Yuca Amarilla de la Selva", descripcion: "Yuca suave para fritura y sopas", precioCompra: 2.50, precioVenta: 3.80, unidad: "Kg", stockInicial: 25 },
    ],
  },
  // --- HIERBAS CULINARIAS PERUANAS ---
  {
    nombre: "Hierbas Aromáticas Peruanas",
    descripcion: "Huacatay, culantro, muña y hierbas nativas",
    articulos: [
      { codigo: "HUA-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas Nativas", nombre: "Huacatay Fresco en Rama", descripcion: "Hierba aromática indispensable para ocopa y ajíes", precioCompra: 0.80, precioVenta: 1.50, unidad: "Manojo", stockInicial: 30 },
      { codigo: "4889", tipoCodigo: "PLU", subfamilia: "Hierbas Culinarias", nombre: "Culantro / Cilantro de Huerta", descripcion: "Atado de culantro para arroz con pollo y caldos", precioCompra: 0.80, precioVenta: 1.50, unidad: "Manojo", stockInicial: 35 },
      { codigo: "MUN-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas Nativas", nombre: "Muña Andina Fresca", descripcion: "Hierba digestiva tradicional de la sierra", precioCompra: 0.90, precioVenta: 1.80, unidad: "Manojo", stockInicial: 20 },
    ],
  },
  // --- BEBIDAS Y ABARROTES PERUANOS ---
  {
    nombre: "Bebidas y Gaseosas",
    descripcion: "Inca Kola, chicha morada y cerveza",
    articulos: [
      { codigo: "775010001001", tipoCodigo: "EAN", subfamilia: "Gaseosas", nombre: "Gaseosa Inca Kola Sabor Original 500 ml", descripcion: "Bebida dorada de sabor único nacional", precioCompra: 2.50, precioVenta: 3.50, unidad: "Pieza", stockInicial: 30 },
      { codigo: "775010002002", tipoCodigo: "EAN", subfamilia: "Gaseosas", nombre: "Gaseosa Inca Kola 1.5 L Botella", descripcion: "Inca Kola formato mediano familiar", precioCompra: 5.50, precioVenta: 7.50, unidad: "Pieza", stockInicial: 20 },
      { codigo: "775010003003", tipoCodigo: "EAN", subfamilia: "Cervezas", nombre: "Cerveza Cusqueña Dorada 330 ml", descripcion: "Cerveza premium 100% cebada malteada", precioCompra: 4.20, precioVenta: 6.00, unidad: "Pieza", stockInicial: 24 },
    ],
  },
  {
    nombre: "Lácteos y Despensa",
    descripcion: "Leche Gloria, galletas Casino y conservas",
    articulos: [
      { codigo: "775010004004", tipoCodigo: "EAN", subfamilia: "Leches Evaporadas", nombre: "Leche Evaporada Gloria Azul 400 g", descripcion: "Leche entera evaporada con vitaminas", precioCompra: 3.50, precioVenta: 4.60, unidad: "Pieza", stockInicial: 48 },
      { codigo: "775010005005", tipoCodigo: "EAN", subfamilia: "Galletas", nombre: "Galletas Casino Menta Victoria 6 u", descripcion: "Galletas rellenas sabor a menta", precioCompra: 1.20, precioVenta: 1.80, unidad: "Pieza", stockInicial: 30 },
      { codigo: "775010006006", tipoCodigo: "EAN", subfamilia: "Galletas", nombre: "Galletas Doña Pepa Field 23 g", descripcion: "Galleta bañada en cobertura con grageas", precioCompra: 1.00, precioVenta: 1.50, unidad: "Pieza", stockInicial: 35 },
    ],
  },
];

// ===========================================================================
// CHILE (EAN-13: 780 + Frutas y Verduras chilenas / Moneda: CLP $)
// ===========================================================================
export const CATALOGO_CHILE: FamiliaSemilla[] = [
  // --- FRUTAS FRESCAS CHILENAS ---
  {
    nombre: "Frutas Frescas de la Zona Central y Sur",
    descripcion: "Paltas Hass, manzanas Fuji, uvas de exportación, cerezas y berries",
    articulos: [
      { codigo: "4046", tipoCodigo: "PLU", subfamilia: "Frutas", nombre: "Palta Hass Chilena Calidad Extra", descripcion: "Palta cremosa seleccionada por kilo", precioCompra: 3800, precioVenta: 5490, unidad: "Kg", stockInicial: 25 },
      { codigo: "4131", tipoCodigo: "PLU", subfamilia: "Frutas de Pepita", nombre: "Manzana Fuji / Royal Gala", descripcion: "Manzana dulce crocante de exportación", precioCompra: 1100, precioVenta: 1790, unidad: "Kg", stockInicial: 30 },
      { codigo: "CER-001", tipoCodigo: "SIN_CODIGO", subfamilia: "Frutas de Carozo", nombre: "Cerezas Frescas del Maule (Bolsa 500g)", descripcion: "Cerezas rojas dulces de temporada", precioCompra: 2500, precioVenta: 3990, unidad: "Bolsa", stockInicial: 20 },
      { codigo: "4023", tipoCodigo: "PLU", subfamilia: "Uvas", nombre: "Uva Red Globe de Exportación", descripcion: "Uva de racimo dulce grande", precioCompra: 1600, precioVenta: 2490, unidad: "Kg", stockInicial: 25 },
      { codigo: "4011", tipoCodigo: "PLU", subfamilia: "Frutas Tropicales", nombre: "Plátano Seda / Cavendish", descripcion: "Plátano maduro por kilo", precioCompra: 1000, precioVenta: 1590, unidad: "Kg", stockInicial: 35 },
      { codigo: "4048", tipoCodigo: "PLU", subfamilia: "Cítricos", nombre: "Limón Amarillo Sutil", descripcion: "Limón jugoso por kilo", precioCompra: 900, precioVenta: 1490, unidad: "Kg", stockInicial: 30 },
    ],
  },
  // --- VERDURAS Y TUBÉRCULOS CHILENOS ---
  {
    nombre: "Verduras, Papas y Hortalizas",
    descripcion: "Tomates limachinos, papas chilotas, zapallo camote y hortalizas",
    articulos: [
      { codigo: "4087", tipoCodigo: "PLU", subfamilia: "Hortalizas de Fruto", nombre: "Tomate Larga Vida / Limachino", descripcion: "Tomate fresco para ensaladas y pebre", precioCompra: 1200, precioVenta: 1890, unidad: "Kg", stockInicial: 35 },
      { codigo: "PAP-006", tipoCodigo: "SIN_CODIGO", subfamilia: "Tubérculos", nombre: "Papa Desiré / Granola Lavada", descripcion: "Papa roja de guarda especial puré y fritura", precioCompra: 850, precioVenta: 1390, unidad: "Kg", stockInicial: 45 },
      { codigo: "ZAP-003", tipoCodigo: "SIN_CODIGO", subfamilia: "Hortalizas de Fruto", nombre: "Zapallo Camote en Trozo", descripcion: "Zapallo dulce para cazuela y sopaipillas", precioCompra: 950, precioVenta: 1590, unidad: "Kg", stockInicial: 30 },
      { codigo: "4083", tipoCodigo: "PLU", subfamilia: "Bulbos", nombre: "Cebolla Valenciana de Guarda", descripcion: "Cebolla de guarda para empanadas", precioCompra: 750, precioVenta: 1290, unidad: "Kg", stockInicial: 35 },
      { codigo: "AJI-003", tipoCodigo: "SIN_CODIGO", subfamilia: "Ajíes Chilenos", nombre: "Ají Verde Cristal Fresco", descripcion: "Ají verde para pebre y ensaladas", precioCompra: 1800, precioVenta: 2890, unidad: "Kg", stockInicial: 20 },
      { codigo: "CHO-002", tipoCodigo: "SIN_CODIGO", subfamilia: "Legumbres Frescas", nombre: "Choclo Pastelero / Húmido", descripcion: "Choclo con hojas para pastel de choclo y humitas", precioCompra: 500, precioVenta: 890, unidad: "Pieza", stockInicial: 35 },
    ],
  },
  // --- HIERBAS CHILENAS ---
  {
    nombre: "Hierbas Aromáticas y Hojas",
    descripcion: "Cilantro, albahaca y orégano para cocina chilena",
    articulos: [
      { codigo: "4889", tipoCodigo: "PLU", subfamilia: "Hierbas Culinarias", nombre: "Cilantro Fresco Atado", descripcion: "Atado de cilantro fresco para pebre", precioCompra: 400, precioVenta: 790, unidad: "Manojo", stockInicial: 35 },
      { codigo: "ALB-003", tipoCodigo: "SIN_CODIGO", subfamilia: "Hierbas Culinarias", nombre: "Albahaca de Estación", descripcion: "Manojo de albahaca para porotos granados", precioCompra: 500, precioVenta: 990, unidad: "Manojo", stockInicial: 20 },
      { codigo: "4061", tipoCodigo: "PLU", subfamilia: "Hortalizas de Hoja", nombre: "Lechuga Costina / Escarola", descripcion: "Planta de lechuga fresca crujiente", precioCompra: 650, precioVenta: 1190, unidad: "Pieza", stockInicial: 25 },
    ],
  },
  // --- ABARROTES Y BEBIDAS CHILENAS ---
  {
    nombre: "Bebidas y Licores",
    descripcion: "Bebidas, pisco chileno y cervezas",
    articulos: [
      { codigo: "780100000001", tipoCodigo: "EAN", subfamilia: "Gaseosas", nombre: "Bebida Bilz Sabor Frutal 1.5 L", descripcion: "Bebida de fantasía sabor frutal", precioCompra: 1150, precioVenta: 1690, unidad: "Pieza", stockInicial: 20 },
      { codigo: "780100000002", tipoCodigo: "EAN", subfamilia: "Gaseosas", nombre: "Bebida Pap Sabor Papaya 1.5 L", descripcion: "Bebida de fantasía sabor papaya", precioCompra: 1150, precioVenta: 1690, unidad: "Pieza", stockInicial: 20 },
      { codigo: "780100000003", tipoCodigo: "EAN", subfamilia: "Piscos", nombre: "Pisco Mistral 35° Especial 750 ml", descripcion: "Pisco añejado en roble americano", precioCompra: 5200, precioVenta: 7290, unidad: "Pieza", stockInicial: 15 },
    ],
  },
  {
    nombre: "Lácteos y Panadería",
    descripcion: "Manjar, leche Soprole y galletas chilenas",
    articulos: [
      { codigo: "780200000001", tipoCodigo: "EAN", subfamilia: "Dulces de Leche", nombre: "Manjar Colun Tradicional Bolsa 400 g", descripcion: "Dulce de leche 100% leche del sur", precioCompra: 1450, precioVenta: 2090, unidad: "Pieza", stockInicial: 25 },
      { codigo: "780200000002", tipoCodigo: "EAN", subfamilia: "Leches Líquidas", nombre: "Leche Entera Soprole Tetra Top 1 L", descripcion: "Leche natural entera pasteurizada", precioCompra: 820, precioVenta: 1190, unidad: "Pieza", stockInicial: 24 },
      { codigo: "780300000001", tipoCodigo: "EAN", subfamilia: "Galletas", nombre: "Galletas Triton Chocolate McKay 126 g", descripcion: "Galletas tipo sándwich de vainilla y chocolate", precioCompra: 650, precioVenta: 990, unidad: "Pieza", stockInicial: 30 },
      { codigo: "780300000002", tipoCodigo: "EAN", subfamilia: "Galletas", nombre: "Galletas Negrita / Chokita Nestlé 28 g", descripcion: "Galleta bañada en chocolate rellena de vainilla", precioCompra: 350, precioVenta: 590, unidad: "Pieza", stockInicial: 40 },
    ],
  },
  {
    nombre: "Abarrotes y Despensa",
    descripcion: "Fideos Carozzi, arroz Tucapel, aceite y atún",
    articulos: [
      { codigo: "780400000101", tipoCodigo: "EAN", subfamilia: "Pastas", nombre: "Fideos Carozzi Spaghetti 5 400 g", descripcion: "Pasta de sémola de trigo candeal", precioCompra: 750, precioVenta: 1090, unidad: "Pieza", stockInicial: 30 },
      { codigo: "780400000303", tipoCodigo: "EAN", subfamilia: "Arroces", nombre: "Arroz Tucapel Grano Largo 1 kg", descripcion: "Arroz grado 1 seleccionado", precioCompra: 1250, precioVenta: 1790, unidad: "Pieza", stockInicial: 25 },
    ],
  },
];

// ===========================================================================
// FARMACIA Y SALUD (Multi-país)
// ===========================================================================
export const CATALOGO_FARMACIA: FamiliaSemilla[] = [
  {
    nombre: "Medicamentos de Libre Venta",
    descripcion: "Analgésicos, antigripales y antiácidos",
    articulos: [
      { codigo: "750110010001", tipoCodigo: "EAN", subfamilia: "Analgésicos", nombre: "Paracetamol 500 mg 10 tabletas", descripcion: "Alivio de fiebre y dolor moderado", precioCompra: 12.0, precioVenta: 22.0, unidad: "Caja", stockInicial: 30 },
      { codigo: "750110010002", tipoCodigo: "EAN", subfamilia: "Antiinflamatorios", nombre: "Ibuprofeno 400 mg 10 cápsulas", descripcion: "Antiinflamatorio y analgésico", precioCompra: 18.0, precioVenta: 32.0, unidad: "Caja", stockInicial: 25 },
      { codigo: "750110010003", tipoCodigo: "EAN", subfamilia: "Analgésicos", nombre: "Aspirina 500 mg 20 tabletas", descripcion: "Ácido acetilsalicílico", precioCompra: 24.0, precioVenta: 38.0, unidad: "Caja", stockInicial: 20 },
      { codigo: "750110010004", tipoCodigo: "EAN", subfamilia: "Antiácidos", nombre: "Alka-Seltzer 10 sobres", descripcion: "Antiácido efervescente", precioCompra: 28.0, precioVenta: 44.0, unidad: "Caja", stockInicial: 20 },
    ],
  },
  {
    nombre: "Primeros Auxilios y Curación",
    descripcion: "Gasas, alcohol, vendas y antisépticos",
    articulos: [
      { codigo: "750110020001", tipoCodigo: "EAN", subfamilia: "Antisépticos", nombre: "Alcohol Desnaturalizado 70% 500 ml", descripcion: "Antiséptico para curaciones", precioCompra: 20.0, precioVenta: 32.0, unidad: "Pieza", stockInicial: 20 },
      { codigo: "750110020002", tipoCodigo: "EAN", subfamilia: "Material de Curación", nombre: "Curitas Adhesivas Caja con 20 pzas", descripcion: "Venditas adhesivas protectoras", precioCompra: 15.0, precioVenta: 25.0, unidad: "Caja", stockInicial: 25 },
    ],
  },
];

// Helper para obtener el catálogo adecuado según País y Giro
export function getCatalogoSemilla(pais?: string, giro?: string): FamiliaSemilla[] {
  const g = (giro || "").toUpperCase();
  if (g.includes("FARMACIA") || g.includes("SALUD") || g.includes("MEDICA")) {
    return CATALOGO_FARMACIA;
  }

  const p = (pais || "").toUpperCase().trim();

  let catalogoBase = CATALOGO_MEXICO;
  if (p.includes("COLOMBIA") || p === "CO") {
    catalogoBase = CATALOGO_COLOMBIA;
  } else if (p.includes("ESTADOS UNIDOS") || p.includes("USA") || p.includes("UNITED STATES") || p === "US") {
    catalogoBase = CATALOGO_USA;
  } else if (p.includes("ESPAÑA") || p.includes("ESPANA") || p.includes("SPAIN") || p === "ES") {
    catalogoBase = CATALOGO_ESPANA;
  } else if (p.includes("ARGENTINA") || p === "AR") {
    catalogoBase = CATALOGO_ARGENTINA;
  } else if (p.includes("PERU") || p.includes("PERÚ") || p === "PE") {
    catalogoBase = CATALOGO_PERU;
  } else if (p.includes("CHILE") || p === "CL") {
    catalogoBase = CATALOGO_CHILE;
  }

  // Si el giro es específicamente Frutería y Verdulería, filtrar solo familias de frutas, verduras y hierbas
  if (g.includes("FRUTA") || g.includes("VERDURA") || g.includes("PERECEDERO") || g === "FRUTERIA") {
    return catalogoBase.filter(
      (f) =>
        f.nombre.toLowerCase().includes("fruta") ||
        f.nombre.toLowerCase().includes("verdura") ||
        f.nombre.toLowerCase().includes("hierba") ||
        f.nombre.toLowerCase().includes("produce"),
    );
  }

  return catalogoBase;
}

// Mantener retrocompatibilidad
export function getCatalogoPorGiro(giro?: string): FamiliaSemilla[] {
  return getCatalogoSemilla("México", giro);
}
