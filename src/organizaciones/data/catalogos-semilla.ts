export interface ArticuloSemilla {
  codigo: string; // Código de barras real (EAN-13 / UPC)
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

// ---------------------------------------------------------------------------
// MÉXICO (Prefijo EAN-13: 750 / Moneda: MXN $)
// ---------------------------------------------------------------------------
export const CATALOGO_MEXICO: FamiliaSemilla[] = [
  {
    nombre: "Bebidas y Refrescos",
    descripcion: "Refrescos, jugos, aguas y bebidas hidratantes",
    articulos: [
      { codigo: "750105530001", nombre: "Coca-Cola Original 600 ml", descripcion: "Refresco de cola en botella PET", precioCompra: 13.5, precioVenta: 18.0, unidad: "Pieza", stockInicial: 30 },
      { codigo: "750105530002", nombre: "Coca-Cola Sin Azúcar 600 ml", descripcion: "Refresco de cola sin calorías", precioCompra: 13.5, precioVenta: 18.0, unidad: "Pieza", stockInicial: 20 },
      { codigo: "750101111234", nombre: "Agua Mineral Peñafiel 600 ml", descripcion: "Agua mineral de manantial con gas", precioCompra: 11.0, precioVenta: 15.0, unidad: "Pieza", stockInicial: 24 },
      { codigo: "750105530055", nombre: "Jugo del Valle Mango 413 ml", descripcion: "Jugo néctar con pulpa de mango", precioCompra: 12.0, precioVenta: 16.5, unidad: "Pieza", stockInicial: 18 },
      { codigo: "750112510203", nombre: "Electrolit Fresa 625 ml", descripcion: "Suero rehidratante oral", precioCompra: 22.0, precioVenta: 30.0, unidad: "Pieza", stockInicial: 15 },
      { codigo: "750105530099", nombre: "Agua Purificada Ciel 1 L", descripcion: "Agua purificada sin gas", precioCompra: 9.0, precioVenta: 13.0, unidad: "Pieza", stockInicial: 24 },
    ],
  },
  {
    nombre: "Botanas y Snacks",
    descripcion: "Papas fritas, frituras, cacahuates y botanas",
    articulos: [
      { codigo: "750101110001", nombre: "Papas Sabritas Sal 45 g", descripcion: "Papas fritas clásicas con sal", precioCompra: 15.0, precioVenta: 20.0, unidad: "Pieza", stockInicial: 25 },
      { codigo: "750101110002", nombre: "Doritos Nacho 58 g", descripcion: "Totopos de maíz sabor queso nacho", precioCompra: 15.0, precioVenta: 20.0, unidad: "Pieza", stockInicial: 25 },
      { codigo: "750101110003", nombre: "Ruffles Queso 50 g", descripcion: "Papas onduladas sabor queso", precioCompra: 15.0, precioVenta: 20.0, unidad: "Pieza", stockInicial: 20 },
      { codigo: "750101110004", nombre: "Cheetos Torciditos 55 g", descripcion: "Botana de maíz con queso y chile", precioCompra: 12.0, precioVenta: 16.0, unidad: "Pieza", stockInicial: 20 },
      { codigo: "750101110044", nombre: "Cacahuates Japoneses Karate 150 g", descripcion: "Cacahuates con cubierta crujiente", precioCompra: 13.0, precioVenta: 18.5, unidad: "Pieza", stockInicial: 15 },
    ],
  },
  {
    nombre: "Lácteos y Derivados",
    descripcion: "Leches, quesos, cremas y yogures",
    articulos: [
      { codigo: "750102051234", nombre: "Leche Lala Entera 1 L", descripcion: "Leche entera ultrapasteurizada", precioCompra: 22.0, precioVenta: 28.0, unidad: "Pieza", stockInicial: 24 },
      { codigo: "750102051235", nombre: "Leche Lala Deslactosada 1 L", descripcion: "Leche deslactosada de fácil digestión", precioCompra: 23.0, precioVenta: 29.5, unidad: "Pieza", stockInicial: 20 },
      { codigo: "750102055678", nombre: "Queso Panela Nochebuena 400 g", descripcion: "Queso panela fresco y cremoso", precioCompra: 45.0, precioVenta: 62.0, unidad: "Pieza", stockInicial: 10 },
      { codigo: "750102059999", nombre: "Yoghurt Danone Fresa 220 g", descripcion: "Yoghurt bebible sabor fresa", precioCompra: 11.0, precioVenta: 15.5, unidad: "Pieza", stockInicial: 16 },
      { codigo: "750102058888", nombre: "Huevo Blanco San Juan 12 pzas", descripcion: "Paquete de 12 huevos frescos seleccionados", precioCompra: 34.0, precioVenta: 45.0, unidad: "Pieza", stockInicial: 15 },
    ],
  },
  {
    nombre: "Panadería y Galletas",
    descripcion: "Pan de caja, pan dulce y galletas",
    articulos: [
      { codigo: "750100011111", nombre: "Pan Blanco Bimbo Grande 680 g", descripcion: "Pan blanco tradicional rebanado", precioCompra: 38.0, precioVenta: 48.0, unidad: "Pieza", stockInicial: 12 },
      { codigo: "750100012222", nombre: "Galletas Emperador Chocolate 101 g", descripcion: "Galletas sándwich rellenas de chocolate", precioCompra: 14.0, precioVenta: 19.0, unidad: "Pieza", stockInicial: 25 },
      { codigo: "750100013333", nombre: "Galletas Marías Gamesa 170 g", descripcion: "Galletas clásicas fortificadas", precioCompra: 13.0, precioVenta: 18.0, unidad: "Pieza", stockInicial: 30 },
      { codigo: "750100014444", nombre: "Donas Bimbo Espolvoreadas 105 g", descripcion: "Paquete con 6 donitas espolvoreadas", precioCompra: 17.0, precioVenta: 23.0, unidad: "Pieza", stockInicial: 15 },
    ],
  },
  {
    nombre: "Despensa y Enlatados",
    descripcion: "Granos, aceites, pastas y alimentos no perecederos",
    articulos: [
      { codigo: "750103011111", nombre: "Arroz Súper Extra Verde Valle 900 g", descripcion: "Arroz grano largo seleccionado", precioCompra: 26.0, precioVenta: 34.0, unidad: "Pieza", stockInicial: 20 },
      { codigo: "750103012222", nombre: "Frijol Negro Verde Valle 900 g", descripcion: "Frijol negro limpio listo para cocer", precioCompra: 32.0, precioVenta: 42.0, unidad: "Pieza", stockInicial: 20 },
      { codigo: "750103013333", nombre: "Aceite Vegetal Nutrioli 850 ml", descripcion: "Aceite puro de soya 100% comestible", precioCompra: 36.0, precioVenta: 46.5, unidad: "Pieza", stockInicial: 18 },
      { codigo: "750103014444", nombre: "Atún Dolores en Agua 140 g", descripcion: "Lomo de atún aleta amarilla en agua", precioCompra: 17.5, precioVenta: 23.5, unidad: "Pieza", stockInicial: 30 },
      { codigo: "750103015555", nombre: "Pasta La Moderna Espagueti 200 g", descripcion: "Pasta de sémola de trigo duro", precioCompra: 8.5, precioVenta: 12.0, unidad: "Pieza", stockInicial: 35 },
      { codigo: "750103016666", nombre: "Mayonesa McCormick con Limón 390 g", descripcion: "Mayonesa con toque de jugo de limón", precioCompra: 28.0, precioVenta: 38.0, unidad: "Pieza", stockInicial: 15 },
    ],
  },
  {
    nombre: "Cuidado del Hogar y Limpieza",
    descripcion: "Detergentes, limpiadores, papel y desinfectantes",
    articulos: [
      { codigo: "750104011111", nombre: "Detergente en Polvo Ariel 1 kg", descripcion: "Detergente multiusos limpieza profunda", precioCompra: 32.0, precioVenta: 42.0, unidad: "Pieza", stockInicial: 15 },
      { codigo: "750104012222", nombre: "Limpiador Líquido Fabuloso Lavanda 1 L", descripcion: "Limpiador multiusos aromatizante", precioCompra: 20.0, precioVenta: 28.0, unidad: "Pieza", stockInicial: 20 },
      { codigo: "750104013333", nombre: "Papel Higiénico Pétalo 4 rollos", descripcion: "Papel higiénico suave con extracto de manzanilla", precioCompra: 25.0, precioVenta: 35.0, unidad: "Pieza", stockInicial: 20 },
      { codigo: "750104014444", nombre: "Jabón de Lavandería Zote Blanco 400 g", descripcion: "Jabón tradicional para ropa blanca", precioCompra: 17.0, precioVenta: 23.0, unidad: "Pieza", stockInicial: 25 },
    ],
  },
];

// ---------------------------------------------------------------------------
// COLOMBIA (Prefijo EAN-13: 770 / Moneda: COP $)
// ---------------------------------------------------------------------------
export const CATALOGO_COLOMBIA: FamiliaSemilla[] = [
  {
    nombre: "Bebidas y Cafés",
    descripcion: "Gaseosas, maltas, jugos y café 100% colombiano",
    articulos: [
      { codigo: "770200100123", nombre: "Gaseosa Postobón Manzana 400 ml", descripcion: "Bebida refrescante sabor manzana", precioCompra: 1800, precioVenta: 2500, unidad: "Pieza", stockInicial: 30 },
      { codigo: "770200400101", nombre: "Pony Malta Botella 330 ml", descripcion: "Bebida de malta con vitaminas", precioCompra: 2000, precioVenta: 2800, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770200105544", nombre: "Jugo Hit Mango 500 ml", descripcion: "Bebida de fruta sabor mango", precioCompra: 2300, precioVenta: 3200, unidad: "Pieza", stockInicial: 20 },
      { codigo: "770201012345", nombre: "Café Sello Rojo Molido 250 g", descripcion: "Café tostado y molido tradicional", precioCompra: 9500, precioVenta: 12500, unidad: "Pieza", stockInicial: 18 },
      { codigo: "770201018899", nombre: "Café Soluble Colcafé Clásico 100 g", descripcion: "Café instantáneo granulado", precioCompra: 10500, precioVenta: 14000, unidad: "Pieza", stockInicial: 15 },
      { codigo: "770200108877", nombre: "Agua Cristal sin Gas 600 ml", descripcion: "Agua tratada embotellada", precioCompra: 1400, precioVenta: 2000, unidad: "Pieza", stockInicial: 24 },
    ],
  },
  {
    nombre: "Snacks y Golosinas",
    descripcion: "Chocolatinas, ponqués y pasabocas típicos",
    articulos: [
      { codigo: "770208001001", nombre: "Chocolatina Jet Tradicional 12 g", descripcion: "Chocolatina con lámina coleccionable", precioCompra: 700, precioVenta: 1000, unidad: "Pieza", stockInicial: 50 },
      { codigo: "770208002233", nombre: "Chocoramo Bimbo Ponqué 65 g", descripcion: "Bizcocho recubierto de chocolate", precioCompra: 1900, precioVenta: 2600, unidad: "Pieza", stockInicial: 30 },
      { codigo: "770201104455", nombre: "Papas Margarita Pollo 40 g", descripcion: "Papas fritas sabor a pollo", precioCompra: 1800, precioVenta: 2500, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770201109988", nombre: "Platanitos Natuchips Limón 45 g", descripcion: "Plátanos verdes crujientes con limón", precioCompra: 1800, precioVenta: 2500, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770201106677", nombre: "DeTodito Familiar 120 g", descripcion: "Mix de papas, plátanos y chicharrones", precioCompra: 4200, precioVenta: 5800, unidad: "Pieza", stockInicial: 15 },
    ],
  },
  {
    nombre: "Lácteos y Derivados",
    descripcion: "Leches, arequipes, quesitos y yogures",
    articulos: [
      { codigo: "770202500001", nombre: "Leche Entera Alquería Larga Vida 1 L", descripcion: "Leche líquida UHT enriquecida", precioCompra: 3700, precioVenta: 4800, unidad: "Pieza", stockInicial: 24 },
      { codigo: "770202500112", nombre: "Leche Deslactosada Colanta 1 L", descripcion: "Leche fácil digestión Colanta", precioCompra: 4000, precioVenta: 5200, unidad: "Pieza", stockInicial: 20 },
      { codigo: "770202500334", nombre: "Quesito Colombiano Colanta 250 g", descripcion: "Queso fresco tradicional antioqueño", precioCompra: 5800, precioVenta: 7500, unidad: "Pieza", stockInicial: 12 },
      { codigo: "770202500556", nombre: "Arequipe Alpina 220 g", descripcion: "Dulce de leche colombiano cremoso", precioCompra: 4900, precioVenta: 6500, unidad: "Pieza", stockInicial: 16 },
      { codigo: "770202500778", nombre: "Yox Alpina Fresa Melocotón 100 g", descripcion: "Bebida láctea con probióticos", precioCompra: 1700, precioVenta: 2400, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  {
    nombre: "Panadería y Galletas",
    descripcion: "Galletas saladas y dulces colombianas",
    articulos: [
      { codigo: "770209001010", nombre: "Galletas Ducales Noel 294 g", descripcion: "Galletas con el toque secreto dulce-salado", precioCompra: 4700, precioVenta: 6200, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770209002020", nombre: "Galletas Festival Chocolate Noel 403 g", descripcion: "Galletas tipo sándwich de chocolate", precioCompra: 5600, precioVenta: 7400, unidad: "Pieza", stockInicial: 20 },
      { codigo: "770209003030", nombre: "Galletas Saltín Noel 3 Tacos 400 g", descripcion: "Galletas de soda crocantes", precioCompra: 4400, precioVenta: 5800, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770200800111", nombre: "Pan Artesano Bimbo Blanco 500 g", descripcion: "Pan tajado tipo artesanal", precioCompra: 6500, precioVenta: 8500, unidad: "Pieza", stockInicial: 12 },
    ],
  },
  {
    nombre: "Despensa y Granos",
    descripcion: "Harinas, arroces, aceites y granos",
    articulos: [
      { codigo: "770205001234", nombre: "Harina P.A.N. Blanca Maíz 1 kg", descripcion: "Harina precocida para arepas", precioCompra: 4100, precioVenta: 5500, unidad: "Pieza", stockInicial: 30 },
      { codigo: "770205005678", nombre: "Arroz Diana Blanco 1 kg", descripcion: "Arroz blanco superior fortificado", precioCompra: 3800, precioVenta: 4900, unidad: "Pieza", stockInicial: 30 },
      { codigo: "770205009900", nombre: "Aceite Gourmet Familia 1 L", descripcion: "Aceite vegetal premium para cocina", precioCompra: 12500, precioVenta: 16500, unidad: "Pieza", stockInicial: 16 },
      { codigo: "770205003322", nombre: "Atún Van Camp's Lomitos en Aceite 160 g", descripcion: "Lomitos de atún en aceite vegetal", precioCompra: 6100, precioVenta: 7900, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770205004411", nombre: "Pastas Doria Spaghetti 250 g", descripcion: "Pasta tradicional con sémola de trigo", precioCompra: 2100, precioVenta: 2800, unidad: "Pieza", stockInicial: 30 },
      { codigo: "770205008833", nombre: "Frijol Cargamanto Rojo Diana 500 g", descripcion: "Frijol seleccionado para bandeja paisa", precioCompra: 4800, precioVenta: 6400, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  {
    nombre: "Aseo y Limpieza",
    descripcion: "Cuidado del hogar y productos de higiene",
    articulos: [
      { codigo: "770204001111", nombre: "Detergente Líquido Fab Floral 1 L", descripcion: "Detergente concentrado aroma floral", precioCompra: 10200, precioVenta: 13500, unidad: "Pieza", stockInicial: 15 },
      { codigo: "770204002222", nombre: "Blanqueador Clorox Original 1 L", descripcion: "Desinfectante y blanqueador para ropa", precioCompra: 4100, precioVenta: 5500, unidad: "Pieza", stockInicial: 20 },
      { codigo: "770204003333", nombre: "Jabón de Baño Protex Antibacterial 110 g", descripcion: "Jabón en barra para higiene corporal", precioCompra: 2800, precioVenta: 3800, unidad: "Pieza", stockInicial: 25 },
      { codigo: "770204004444", nombre: "Papel Higiénico Familia 4 Rollos", descripcion: "Papel acolchamax doble hoja", precioCompra: 6200, precioVenta: 8200, unidad: "Pieza", stockInicial: 20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// ESTADOS UNIDOS (Prefijo UPC / EAN: 0... / Moneda: USD $)
// ---------------------------------------------------------------------------
export const CATALOGO_USA: FamiliaSemilla[] = [
  {
    nombre: "Beverages & Drinks",
    descripcion: "Sodas, energy drinks, juices and purified water",
    articulos: [
      { codigo: "049000028904", nombre: "Coca-Cola Classic Soda 20 fl oz", descripcion: "Classic Coca-Cola bottle", precioCompra: 1.65, precioVenta: 2.49, unidad: "Pieza", stockInicial: 30 },
      { codigo: "049000028911", nombre: "Diet Coke Soda 20 fl oz", descripcion: "Sugar-free calorie-free soda", precioCompra: 1.65, precioVenta: 2.49, unidad: "Pieza", stockInicial: 20 },
      { codigo: "078000082403", nombre: "Dr Pepper Soda 20 fl oz", descripcion: "Original 23 flavors soda", precioCompra: 1.65, precioVenta: 2.49, unidad: "Pieza", stockInicial: 20 },
      { codigo: "012000000133", nombre: "Pepsi Cola Bottle 20 fl oz", descripcion: "Pepsi cola soft drink", precioCompra: 1.5, precioVenta: 2.29, unidad: "Pieza", stockInicial: 24 },
      { codigo: "052000328678", nombre: "Gatorade Lemon-Lime 28 fl oz", descripcion: "Electrolyte sports drink", precioCompra: 1.8, precioVenta: 2.79, unidad: "Pieza", stockInicial: 20 },
      { codigo: "068274000101", nombre: "Pure Life Purified Water 16.9 oz", descripcion: "Natural spring purified bottled water", precioCompra: 0.65, precioVenta: 1.29, unidad: "Pieza", stockInicial: 35 },
    ],
  },
  {
    nombre: "Snacks & Confectionery",
    descripcion: "Chips, cookies, chocolates and candies",
    articulos: [
      { codigo: "028400040112", nombre: "Lay's Classic Potato Chips 8 oz", descripcion: "Crispy salted potato chips", precioCompra: 3.1, precioVenta: 4.59, unidad: "Pieza", stockInicial: 25 },
      { codigo: "028400064118", nombre: "Doritos Nacho Cheese Chips 9.25 oz", descripcion: "Nacho flavored tortilla chips", precioCompra: 3.4, precioVenta: 4.99, unidad: "Pieza", stockInicial: 25 },
      { codigo: "028400072113", nombre: "Cheetos Crunchy Cheese 8.5 oz", descripcion: "Cheese flavored crunchy snacks", precioCompra: 3.2, precioVenta: 4.79, unidad: "Pieza", stockInicial: 20 },
      { codigo: "044000032029", nombre: "Oreo Original Sandwich Cookies 14.3 oz", descripcion: "Chocolate cookies with creme filling", precioCompra: 3.3, precioVenta: 4.89, unidad: "Pieza", stockInicial: 25 },
      { codigo: "034000002405", nombre: "Hershey's Milk Chocolate Bar 1.55 oz", descripcion: "Pure milk chocolate standard bar", precioCompra: 1.1, precioVenta: 1.79, unidad: "Pieza", stockInicial: 40 },
      { codigo: "040000004463", nombre: "M&M's Milk Chocolate Candies 3.14 oz", descripcion: "Candy coated milk chocolate bits", precioCompra: 1.45, precioVenta: 2.29, unidad: "Pieza", stockInicial: 30 },
    ],
  },
  {
    nombre: "Dairy & Breakfast",
    descripcion: "Milk, cereal, cheese and breakfast foods",
    articulos: [
      { codigo: "011110000123", nombre: "Great Value Whole Milk 1 Gallon", descripcion: "Pasteurized whole grade A milk", precioCompra: 2.65, precioVenta: 3.89, unidad: "Pieza", stockInicial: 16 },
      { codigo: "038000198514", nombre: "Kellogg's Corn Flakes Cereal 18 oz", descripcion: "Toasted corn flakes cereal box", precioCompra: 3.7, precioVenta: 5.49, unidad: "Pieza", stockInicial: 15 },
      { codigo: "016000275270", nombre: "Honey Nut Cheerios Cereal 15.4 oz", descripcion: "Whole grain oat cereal with honey", precioCompra: 3.9, precioVenta: 5.79, unidad: "Pieza", stockInicial: 15 },
      { codigo: "041303001001", nombre: "Kraft American Cheese Singles 16ct", descripcion: "Individually wrapped cheese slices", precioCompra: 2.9, precioVenta: 4.29, unidad: "Pieza", stockInicial: 20 },
      { codigo: "070470003001", nombre: "Yoplait Strawberry Yogurt 6 oz", descripcion: "Creamy low-fat strawberry yogurt", precioCompra: 0.55, precioVenta: 0.99, unidad: "Pieza", stockInicial: 25 },
    ],
  },
  {
    nombre: "Pantry & Groceries",
    descripcion: "Canned goods, condiments, pasta and staples",
    articulos: [
      { codigo: "013000006030", nombre: "Heinz Tomato Ketchup Bottle 20 oz", descripcion: "Thick & rich tomato ketchup", precioCompra: 2.65, precioVenta: 3.99, unidad: "Pieza", stockInicial: 20 },
      { codigo: "051000000115", nombre: "Campbell's Condensed Tomato Soup 10.75 oz", descripcion: "Classic condensed tomato soup", precioCompra: 1.15, precioVenta: 1.89, unidad: "Pieza", stockInicial: 24 },
      { codigo: "048001000101", nombre: "Hellmann's Real Mayonnaise 30 fl oz", descripcion: "Real creamy mayonnaise jar", precioCompra: 4.1, precioVenta: 5.99, unidad: "Pieza", stockInicial: 15 },
      { codigo: "071514000101", nombre: "Barilla Spaghetti Pasta 16 oz", descripcion: "Enriched semolina wheat pasta", precioCompra: 1.35, precioVenta: 2.19, unidad: "Pieza", stockInicial: 30 },
      { codigo: "073420000101", nombre: "Jif Creamy Peanut Butter 16 oz", descripcion: "Smooth roasted peanut butter", precioCompra: 2.3, precioVenta: 3.49, unidad: "Pieza", stockInicial: 18 },
      { codigo: "070000000101", nombre: "StarKist Chunk Light Tuna 5 oz", descripcion: "Wild caught tuna in natural water", precioCompra: 0.95, precioVenta: 1.59, unidad: "Pieza", stockInicial: 30 },
    ],
  },
  {
    nombre: "Household & Cleaning",
    descripcion: "Detergents, disinfecting wipes and paper products",
    articulos: [
      { codigo: "037000123456", nombre: "Tide PODS Liquid Laundry 31 ct", descripcion: "3-in-1 concentrated detergent pods", precioCompra: 8.9, precioVenta: 12.99, unidad: "Pieza", stockInicial: 12 },
      { codigo: "044600010011", nombre: "Clorox Disinfecting Wipes 75 ct", descripcion: "Bleach-free antibacterial wet wipes", precioCompra: 3.65, precioVenta: 5.49, unidad: "Pieza", stockInicial: 18 },
      { codigo: "037000001010", nombre: "Dawn Ultra Dishwashing Liquid 19.4 oz", descripcion: "Original grease-fighting dish soap", precioCompra: 2.65, precioVenta: 3.99, unidad: "Pieza", stockInicial: 20 },
      { codigo: "036000241001", nombre: "Scott ComfortPlus Toilet Paper 12ct", descripcion: "1-ply bath tissue regular rolls", precioCompra: 6.1, precioVenta: 8.99, unidad: "Pieza", stockInicial: 15 },
    ],
  },
];

// ---------------------------------------------------------------------------
// ESPAÑA (Prefijo EAN-13: 84 / Moneda: EUR €)
// ---------------------------------------------------------------------------
export const CATALOGO_ESPANA: FamiliaSemilla[] = [
  {
    nombre: "Bebidas y Cervezas",
    descripcion: "Cervezas nacionales, aguas minerales y cafés",
    articulos: [
      { codigo: "841010001001", nombre: "Cerveza Mahou Cinco Estrellas 33 cl", descripcion: "Cerveza rubia lager especial", precioCompra: 0.75, precioVenta: 1.20, unidad: "Pieza", stockInicial: 36 },
      { codigo: "841000050001", nombre: "Agua Mineral Bezoya 1.5 L", descripcion: "Agua de mineralización muy débil", precioCompra: 0.50, precioVenta: 0.85, unidad: "Pieza", stockInicial: 30 },
      { codigo: "841000600101", nombre: "ColaCao Original 400 g", descripcion: "Cacao soluble con grumos característicos", precioCompra: 2.70, precioVenta: 3.95, unidad: "Pieza", stockInicial: 18 },
      { codigo: "841000012345", nombre: "Café Marcilla Gran Aroma Molido 250 g", descripcion: "Café mezcla tueste natural", precioCompra: 2.30, precioVenta: 3.40, unidad: "Pieza", stockInicial: 20 },
      { codigo: "841000789012", nombre: "Zumo Don Simón Naranja 1 L", descripcion: "Zumo 100% fruta exprimida", precioCompra: 0.95, precioVenta: 1.55, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  {
    nombre: "Charcutería y Quesos",
    descripcion: "Jamón curado, embutidos ibéricos y quesos",
    articulos: [
      { codigo: "841007601001", nombre: "Jamón Serrano Navidul Loncheado 100 g", descripcion: "Jamón curado reserva en sobres", precioCompra: 2.50, precioVenta: 3.75, unidad: "Pieza", stockInicial: 25 },
      { codigo: "841007602002", nombre: "Chorizo Ibérico Campofrío 100 g", descripcion: "Chorizo loncheado calidad extra", precioCompra: 1.85, precioVenta: 2.80, unidad: "Pieza", stockInicial: 20 },
      { codigo: "848000012345", nombre: "Leche Entera Pascual 1 L", descripcion: "Leche entera UHT con vitaminas", precioCompra: 0.78, precioVenta: 1.15, unidad: "Pieza", stockInicial: 24 },
      { codigo: "841008800101", nombre: "Queso Manchego García Baquero 250 g", descripcion: "Queso semicurado cuña selecta", precioCompra: 3.30, precioVenta: 4.90, unidad: "Pieza", stockInicial: 15 },
      { codigo: "841009900202", nombre: "Yogur Danone Natural Pack 4x125 g", descripcion: "Yogur clásico fermentado", precioCompra: 1.20, precioVenta: 1.85, unidad: "Pieza", stockInicial: 16 },
    ],
  },
  {
    nombre: "Aceites y Despensa Española",
    descripcion: "Aceite de oliva virgen extra, conservas y legumbres",
    articulos: [
      { codigo: "841000000101", nombre: "Aceite Oliva Virgen Extra Carbonell 1 L", descripcion: "Aceite de oliva 100% español prensado", precioCompra: 6.20, precioVenta: 8.95, unidad: "Pieza", stockInicial: 15 },
      { codigo: "841012300001", nombre: "Tomate Frito Solís Estilo Casero 350 g", descripcion: "Tomate frito con aceite de oliva", precioCompra: 0.85, precioVenta: 1.35, unidad: "Pieza", stockInicial: 30 },
      { codigo: "841013400001", nombre: "Arroz SOS Grano Redondo 1 kg", descripcion: "Arroz especial para paella y guisos", precioCompra: 1.40, precioVenta: 2.10, unidad: "Pieza", stockInicial: 25 },
      { codigo: "841014500001", nombre: "Atún Claro Calvo en Aceite Oliva 3x80 g", descripcion: "Lomos de atún claro pack ahorro", precioCompra: 2.45, precioVenta: 3.60, unidad: "Pieza", stockInicial: 25 },
      { codigo: "841015600001", nombre: "Pasta Gallo Macarrones 500 g", descripcion: "Pasta de trigo duro clásica", precioCompra: 0.90, precioVenta: 1.40, unidad: "Pieza", stockInicial: 30 },
      { codigo: "841016700001", nombre: "Garbanzo Pedrosillano Luengo 500 g", descripcion: "Legumbres seleccionadas categoría extra", precioCompra: 1.25, precioVenta: 1.90, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  {
    nombre: "Galletas y Snacks",
    descripcion: "Galletas maría, patatas fritas y aperitivos",
    articulos: [
      { codigo: "841001400001", nombre: "Galletas Gullón María 800 g", descripcion: "Pack 4 tubos galletas maría doradas", precioCompra: 1.45, precioVenta: 2.20, unidad: "Pieza", stockInicial: 20 },
      { codigo: "841001402233", nombre: "Galletas Príncipe de Lu Chocolate 300 g", descripcion: "Galletas rellenas de crema de chocolate", precioCompra: 1.65, precioVenta: 2.45, unidad: "Pieza", stockInicial: 25 },
      { codigo: "841002200111", nombre: "Patatas Fritas Lay's Al Punto de Sal 150 g", descripcion: "Patatas lisas fritas clásicas", precioCompra: 1.35, precioVenta: 2.10, unidad: "Pieza", stockInicial: 20 },
      { codigo: "841003300222", nombre: "Pipas Grefusa con Sal 100 g", descripcion: "Semillas de girasol tostadas", precioCompra: 0.80, precioVenta: 1.30, unidad: "Pieza", stockInicial: 30 },
    ],
  },
  {
    nombre: "Droguería y Limpieza",
    descripcion: "Detergentes, suavizantes y cuidado del hogar",
    articulos: [
      { codigo: "841020000101", nombre: "Detergente Ariel Líquido 30 Lavados", descripcion: "Detergente para lavadora frescor", precioCompra: 5.80, precioVenta: 8.50, unidad: "Pieza", stockInicial: 12 },
      { codigo: "841020000202", nombre: "Suavizante Flor Azul 60 Lavados", descripcion: "Suavizante concentrado para ropa", precioCompra: 2.60, precioVenta: 3.95, unidad: "Pieza", stockInicial: 18 },
      { codigo: "841020000303", nombre: "Fregasuelos Mistol Limón 1 L", descripcion: "Limpiador de suelos brillo y aroma", precioCompra: 1.40, precioVenta: 2.20, unidad: "Pieza", stockInicial: 20 },
      { codigo: "841020000404", nombre: "Papel Higiénico Scottex 12 Rollos", descripcion: "Papel higiénico acolchado suave", precioCompra: 3.20, precioVenta: 4.80, unidad: "Pieza", stockInicial: 15 },
    ],
  },
];

// ---------------------------------------------------------------------------
// ARGENTINA (Prefijo EAN-13: 779 / Moneda: ARS $)
// ---------------------------------------------------------------------------
export const CATALOGO_ARGENTINA: FamiliaSemilla[] = [
  {
    nombre: "Yerba Mate y Bebidas",
    descripcion: "Yerba mate tradicional, fernet y aperitivos",
    articulos: [
      { codigo: "779004000010", nombre: "Yerba Mate Taragüi 500 g", descripcion: "Yerba mate con palo sabor clásico", precioCompra: 1700, precioVenta: 2400, unidad: "Pieza", stockInicial: 30 },
      { codigo: "779004000020", nombre: "Yerba Mate Playadito 500 g", descripcion: "Yerba suave tradicional correntina", precioCompra: 1950, precioVenta: 2800, unidad: "Pieza", stockInicial: 30 },
      { codigo: "779004500001", nombre: "Fernet Branca 750 ml", descripcion: "Aperitivo amargo a base de hierbas", precioCompra: 7200, precioVenta: 9800, unidad: "Pieza", stockInicial: 15 },
      { codigo: "779004000030", nombre: "Té La Virginia Clásico 25 saquitos", descripcion: "Té negro en saquitos", precioCompra: 850, precioVenta: 1200, unidad: "Pieza", stockInicial: 25 },
    ],
  },
  {
    nombre: "Alfajores y Galletitas",
    descripcion: "Alfajores argentinos, galletitas dulces y de agua",
    articulos: [
      { codigo: "779089500001", nombre: "Alfajores Havanna Chocolate 6 u", descripcion: "Caja de alfajores marplatenses rellenos de dulce de leche", precioCompra: 6200, precioVenta: 8500, unidad: "Caja", stockInicial: 15 },
      { codigo: "779089500111", nombre: "Alfajor Guaymallén Triple Chocolate", descripcion: "Alfajor triple bañado en repostería", precioCompra: 480, precioVenta: 700, unidad: "Pieza", stockInicial: 40 },
      { codigo: "779058012345", nombre: "Galletitas Chocolinas Bagley 250 g", descripcion: "Galletitas de chocolate para chocotorta", precioCompra: 1500, precioVenta: 2100, unidad: "Pieza", stockInicial: 25 },
      { codigo: "779058013456", nombre: "Galletitas Criollitas 300 g", descripcion: "Galletitas de agua crocantes", precioCompra: 1100, precioVenta: 1600, unidad: "Pieza", stockInicial: 25 },
      { codigo: "779004001122", nombre: "Bon o Bon Chocolate Arcor 270 g", descripcion: "Bombón relleno con crema de maní", precioCompra: 1650, precioVenta: 2400, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  {
    nombre: "Lácteos y Dulce de Leche",
    descripcion: "Dulce de leche, leche entera y quesos",
    articulos: [
      { codigo: "779007012345", nombre: "Dulce de Leche La Serenísima 400 g", descripcion: "Dulce de leche estilo colonial", precioCompra: 2300, precioVenta: 3200, unidad: "Pieza", stockInicial: 25 },
      { codigo: "779007018899", nombre: "Leche Entera La Serenísima 1 L", descripcion: "Leche ultrapasteurizada en cartón", precioCompra: 980, precioVenta: 1400, unidad: "Pieza", stockInicial: 24 },
      { codigo: "779007015544", nombre: "Manteca La Serenísima Clásica 200 g", descripcion: "Manteca de primera calidad", precioCompra: 1850, precioVenta: 2600, unidad: "Pieza", stockInicial: 18 },
      { codigo: "779007019900", nombre: "Queso Cremoso Cremón 500 g", descripcion: "Queso blando fundible para pizzas", precioCompra: 3700, precioVenta: 5100, unidad: "Pieza", stockInicial: 12 },
    ],
  },
  {
    nombre: "Almacén y Comestibles",
    descripcion: "Aceites, fideos, harinas y conservas",
    articulos: [
      { codigo: "779008001001", nombre: "Aceite de Girasol Cocinero 900 ml", descripcion: "Aceite 100% puro de girasol", precioCompra: 1450, precioVenta: 2100, unidad: "Pieza", stockInicial: 20 },
      { codigo: "779008002002", nombre: "Fideos Matarazzo Tallarines 500 g", descripcion: "Fideos de sémola de trigo candeal", precioCompra: 1050, precioVenta: 1500, unidad: "Pieza", stockInicial: 30 },
      { codigo: "779008003003", nombre: "Harina Pureza 0000 1 kg", descripcion: "Harina refinada ultrafina", precioCompra: 920, precioVenta: 1300, unidad: "Pieza", stockInicial: 25 },
      { codigo: "779008004004", nombre: "Puré de Tomate Arcor 520 g", descripcion: "Puré de tomate listo para salsas", precioCompra: 760, precioVenta: 1100, unidad: "Pieza", stockInicial: 30 },
      { codigo: "779008005005", nombre: "Atún La Campagnola en Trozos 170 g", descripcion: "Lomos de atún en aceite y agua", precioCompra: 2500, precioVenta: 3500, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  {
    nombre: "Limpieza y Perfumería",
    descripcion: "Jabones, lavandina y productos para el hogar",
    articulos: [
      { codigo: "779009001001", nombre: "Jabón en Polvo Ala Clásico 800 g", descripcion: "Jabón para lavarropa automático", precioCompra: 2100, precioVenta: 2900, unidad: "Pieza", stockInicial: 15 },
      { codigo: "779009002002", nombre: "Lavandina Ayudín Común 1 L", descripcion: "Desinfectante concentrado", precioCompra: 850, precioVenta: 1200, unidad: "Pieza", stockInicial: 20 },
      { codigo: "779009003003", nombre: "Papel Higiénico Higienol 4 Rollos", descripcion: "Papel higiénico hoja simple suave", precioCompra: 1550, precioVenta: 2200, unidad: "Pieza", stockInicial: 18 },
    ],
  },
];

// ---------------------------------------------------------------------------
// PERÚ (Prefijo EAN-13: 775 / Moneda: PEN S/)
// ---------------------------------------------------------------------------
export const CATALOGO_PERU: FamiliaSemilla[] = [
  {
    nombre: "Bebidas y Cervezas",
    descripcion: "Gaseosa Inca Kola, cervezas y néctares peruanos",
    articulos: [
      { codigo: "775010100010", nombre: "Gaseosa Inca Kola Original 500 ml", descripcion: "La bebida del sabor nacional", precioCompra: 2.40, precioVenta: 3.50, unidad: "Pieza", stockInicial: 30 },
      { codigo: "775024300001", nombre: "Cerveza Cusqueña Dorada 330 ml", descripcion: "Cerveza premium 100% malta", precioCompra: 4.60, precioVenta: 6.50, unidad: "Pieza", stockInicial: 24 },
      { codigo: "775024300022", nombre: "Cerveza Pilsen Callao 330 ml", descripcion: "La cerveza más tradicional del Perú", precioCompra: 3.80, precioVenta: 5.50, unidad: "Pieza", stockInicial: 24 },
      { codigo: "775010100033", nombre: "Agua San Luis sin Gas 625 ml", descripcion: "Agua de mesa tratada", precioCompra: 1.40, precioVenta: 2.20, unidad: "Pieza", stockInicial: 30 },
    ],
  },
  {
    nombre: "Snacks y Golosinas",
    descripcion: "Galletas Casino, Sublime, Cua Cua y chifles",
    articulos: [
      { codigo: "775088500001", nombre: "Galletas Casino Menta 6pk", descripcion: "Galletas rellenas sabor a menta", precioCompra: 2.90, precioVenta: 4.20, unidad: "Pieza", stockInicial: 25 },
      { codigo: "775088500011", nombre: "Galletas Margarita Clásicas 6pk", descripcion: "Galletas de soda saladas", precioCompra: 2.60, precioVenta: 3.80, unidad: "Pieza", stockInicial: 25 },
      { codigo: "775000100555", nombre: "Chocolate Sublime Clásico 30 g", descripcion: "Chocolate con leche y maní tostado", precioCompra: 1.70, precioVenta: 2.50, unidad: "Pieza", stockInicial: 40 },
      { codigo: "775000100666", nombre: "Barra Cua Cua 18 g", descripcion: "Waffer bañado en chocolate", precioCompra: 0.95, precioVenta: 1.50, unidad: "Pieza", stockInicial: 40 },
      { codigo: "775012300888", nombre: "Chifles Piuranos Salados 100 g", descripcion: "Plátano verde frito crocante", precioCompra: 2.80, precioVenta: 4.00, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  {
    nombre: "Lácteos y Desayuno",
    descripcion: "Leche Gloria azul, mantequilla y derivados",
    articulos: [
      { codigo: "775000100101", nombre: "Leche Gloria Evaporada Azul 400 g", descripcion: "Leche evaporada entera de tarro", precioCompra: 3.10, precioVenta: 4.20, unidad: "Pieza", stockInicial: 35 },
      { codigo: "775000100202", nombre: "Leche Gloria Deslactosada 400 g", descripcion: "Leche evaporada de fácil asimilación", precioCompra: 3.30, precioVenta: 4.50, unidad: "Pieza", stockInicial: 25 },
      { codigo: "775000100303", nombre: "Mantequilla Gloria con Sal 200 g", descripcion: "Mantequilla de pura leche", precioCompra: 5.40, precioVenta: 7.50, unidad: "Pieza", stockInicial: 15 },
    ],
  },
  {
    nombre: "Abarrotes y Salsas Peruanas",
    descripcion: "Fideos, arroces, ají Tarí, mayonesa Alacena",
    articulos: [
      { codigo: "775012300001", nombre: "Fideos Don Vittorio Spaghetti 500 g", descripcion: "Fideos de trigo selecto", precioCompra: 2.30, precioVenta: 3.40, unidad: "Pieza", stockInicial: 30 },
      { codigo: "775012300111", nombre: "Arroz Costeño Extra 750 g", descripcion: "Arroz blanco superior libre de impurezas", precioCompra: 3.40, precioVenta: 4.80, unidad: "Pieza", stockInicial: 25 },
      { codigo: "775012300222", nombre: "Aceite Primor Premium 900 ml", descripcion: "Aceite 100% puro vegetal", precioCompra: 6.50, precioVenta: 8.90, unidad: "Pieza", stockInicial: 20 },
      { codigo: "775012300333", nombre: "Atún Primor en Aceite 170 g", descripcion: "Trozos de atún en aceite vegetal", precioCompra: 4.10, precioVenta: 5.80, unidad: "Pieza", stockInicial: 25 },
      { codigo: "775012300444", nombre: "Crema de Ají Tarí Alacena 85 g", descripcion: "Salsa de ají casera picante", precioCompra: 2.20, precioVenta: 3.20, unidad: "Pieza", stockInicial: 25 },
      { codigo: "775012300555", nombre: "Mayonesa Alacena Tradicional 95 g", descripcion: "Mayonesa con toque de limón peruano", precioCompra: 2.10, precioVenta: 3.00, unidad: "Pieza", stockInicial: 25 },
    ],
  },
  {
    nombre: "Limpieza del Hogar",
    descripcion: "Detergente Bolívar, jabones y papel",
    articulos: [
      { codigo: "775020000101", nombre: "Detergente Bolívar Floral 800 g", descripcion: "Detergente con partículas de fragancia", precioCompra: 4.90, precioVenta: 6.90, unidad: "Pieza", stockInicial: 18 },
      { codigo: "775020000202", nombre: "Jabón Bolívar Azul en Barra 200 g", descripcion: "Jabón clásico para lavar ropa", precioCompra: 1.90, precioVenta: 2.80, unidad: "Pieza", stockInicial: 25 },
      { codigo: "775020000303", nombre: "Papel Higiénico Suave Doble Hoja 4u", descripcion: "Papel suave absorbente", precioCompra: 3.40, precioVenta: 4.90, unidad: "Pieza", stockInicial: 20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// CHILE (Prefijo EAN-13: 780 / Moneda: CLP $)
// ---------------------------------------------------------------------------
export const CATALOGO_CHILE: FamiliaSemilla[] = [
  {
    nombre: "Bebidas y Cervezas",
    descripcion: "Bebidas Bilz, Pap, cervezas y té supremo",
    articulos: [
      { codigo: "780123456789", nombre: "Gaseosa Bilz 1.5 L", descripcion: "Bebida chilena de fantasía roja", precioCompra: 1300, precioVenta: 1890, unidad: "Pieza", stockInicial: 24 },
      { codigo: "780123456790", nombre: "Gaseosa Pap 1.5 L", descripcion: "Bebida sabor papaya original", precioCompra: 1300, precioVenta: 1890, unidad: "Pieza", stockInicial: 24 },
      { codigo: "780100000101", nombre: "Cerveza Cristal Lata 350 cc", descripcion: "Cerveza lager tradicional chilena", precioCompra: 750, precioVenta: 1100, unidad: "Pieza", stockInicial: 30 },
      { codigo: "780100000202", nombre: "Té Supremo Ceylan 100 bolsitas", descripcion: "Té en bolsitas clásico", precioCompra: 2200, precioVenta: 3200, unidad: "Pieza", stockInicial: 20 },
    ],
  },
  {
    nombre: "Galletas y Dulces",
    descripcion: "Criollitas, chocolates Sahne-Nuss y manjar",
    articulos: [
      { codigo: "780161000101", nombre: "Galletas McKay Criollitas 140 g", descripcion: "Galletas clásicas de agua", precioCompra: 680, precioVenta: 990, unidad: "Pieza", stockInicial: 30 },
      { codigo: "780161000202", nombre: "Galletas Triton Chocolate 126 g", descripcion: "Galletas rellenas con crema de chocolate", precioCompra: 750, precioVenta: 1100, unidad: "Pieza", stockInicial: 25 },
      { codigo: "780161000404", nombre: "Chocolate Sahne-Nuss Nestlé 100 g", descripcion: "Chocolate con leche y almendras enteras", precioCompra: 1750, precioVenta: 2490, unidad: "Pieza", stockInicial: 20 },
      { codigo: "780200000101", nombre: "Manjar Colun Tradicional 400 g", descripcion: "Dulce de leche chileno artesanal", precioCompra: 1550, precioVenta: 2190, unidad: "Pieza", stockInicial: 20 },
      { codigo: "780250000101", nombre: "Leche Soprole Entera 1 L", descripcion: "Leche entera natural UHT", precioCompra: 890, precioVenta: 1290, unidad: "Pieza", stockInicial: 24 },
    ],
  },
  {
    nombre: "Abarrotes y Despensa",
    descripcion: "Fideos Carozzi, arroz Tucapel, aceite y atún",
    articulos: [
      { codigo: "780400000101", nombre: "Fideos Carozzi Spaghetti 5 400 g", descripcion: "Pasta de sémola de trigo candeal", precioCompra: 750, precioVenta: 1090, unidad: "Pieza", stockInicial: 30 },
      { codigo: "780400000202", nombre: "Salsa de Tomates Carozzi Italiana 200 g", descripcion: "Salsa de tomates con especias", precioCompra: 450, precioVenta: 690, unidad: "Pieza", stockInicial: 30 },
      { codigo: "780400000303", nombre: "Arroz Tucapel Grano Largo 1 kg", descripcion: "Arroz grado 1 seleccionado", precioCompra: 1250, precioVenta: 1790, unidad: "Pieza", stockInicial: 25 },
      { codigo: "780400000404", nombre: "Aceite Vegetal Belmont 900 ml", descripcion: "Aceite 100% puro para cocina", precioCompra: 1800, precioVenta: 2590, unidad: "Pieza", stockInicial: 20 },
      { codigo: "780400000505", nombre: "Atún San José en Aceite 160 g", descripcion: "Lomitos de atún en aceite vegetal", precioCompra: 1150, precioVenta: 1690, unidad: "Pieza", stockInicial: 25 },
    ],
  },
  {
    nombre: "Limpieza del Hogar",
    descripcion: "Detergente Omo, Clorox y papel confort",
    articulos: [
      { codigo: "780500000101", nombre: "Detergente Omo Polvo 800 g", descripcion: "Detergente multiacción remueve manchas", precioCompra: 2400, precioVenta: 3490, unidad: "Pieza", stockInicial: 15 },
      { codigo: "780500000202", nombre: "Cloro Clorox Tradicional 1 L", descripcion: "Desinfectante multiusos", precioCompra: 980, precioVenta: 1490, unidad: "Pieza", stockInicial: 20 },
      { codigo: "780500000303", nombre: "Papel Higiénico Confort 4 Rollos", descripcion: "Papel higiénico suave doble hoja", precioCompra: 1450, precioVenta: 2190, unidad: "Pieza", stockInicial: 20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// FARMACIA Y SALUD (Común multi-país)
// ---------------------------------------------------------------------------
export const CATALOGO_FARMACIA: FamiliaSemilla[] = [
  {
    nombre: "Medicamentos de Libre Venta",
    descripcion: "Analgésicos, antigripales y antiácidos",
    articulos: [
      { codigo: "750110010001", nombre: "Paracetamol 500 mg 10 tabletas", descripcion: "Alivio de fiebre y dolor moderado", precioCompra: 12.0, precioVenta: 22.0, unidad: "Caja", stockInicial: 30 },
      { codigo: "750110010002", nombre: "Ibuprofeno 400 mg 10 cápsulas", descripcion: "Antiinflamatorio y analgésico", precioCompra: 18.0, precioVenta: 32.0, unidad: "Caja", stockInicial: 25 },
      { codigo: "750110010003", nombre: "Aspirina 500 mg 20 tabletas", descripcion: "Ácido acetilsalicílico", precioCompra: 24.0, precioVenta: 38.0, unidad: "Caja", stockInicial: 20 },
      { codigo: "750110010004", nombre: "Alka-Seltzer 10 sobres", descripcion: "Antiácido efervescente", precioCompra: 28.0, precioVenta: 44.0, unidad: "Caja", stockInicial: 20 },
    ],
  },
  {
    nombre: "Primeros Auxilios y Curación",
    descripcion: "Gasas, alcohol, vendas y antisépticos",
    articulos: [
      { codigo: "750110020001", nombre: "Alcohol Desnaturalizado 70% 500 ml", descripcion: "Antiséptico para curaciones", precioCompra: 20.0, precioVenta: 32.0, unidad: "Pieza", stockInicial: 20 },
      { codigo: "750110020002", nombre: "Curitas Adhesivas Caja con 20 pzas", descripcion: "Venditas adhesivas protectoras", precioCompra: 15.0, precioVenta: 25.0, unidad: "Caja", stockInicial: 25 },
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

  if (p.includes("COLOMBIA") || p === "CO") {
    return CATALOGO_COLOMBIA;
  }
  if (p.includes("ESTADOS UNIDOS") || p.includes("USA") || p.includes("UNITED STATES") || p === "US") {
    return CATALOGO_USA;
  }
  if (p.includes("ESPAÑA") || p.includes("ESPANA") || p.includes("SPAIN") || p === "ES") {
    return CATALOGO_ESPANA;
  }
  if (p.includes("ARGENTINA") || p === "AR") {
    return CATALOGO_ARGENTINA;
  }
  if (p.includes("PERU") || p.includes("PERÚ") || p === "PE") {
    return CATALOGO_PERU;
  }
  if (p.includes("CHILE") || p === "CL") {
    return CATALOGO_CHILE;
  }

  // Por defecto retorna México
  return CATALOGO_MEXICO;
}

// Mantener retrocompatibilidad
export function getCatalogoPorGiro(giro?: string): FamiliaSemilla[] {
  return getCatalogoSemilla("México", giro);
}
