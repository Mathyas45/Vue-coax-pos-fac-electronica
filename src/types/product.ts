export type ProductCategorie = {
    id?:string,
    name:string,
}

export type Product = {
    id:string,
    name:string,
    sku:string,
    imagen:string,
    product_categorie_id:number,
    product_categorie: ProductCategorie,
    price_general:number,
    price_company:number,
    description:string,
    is_discount:number,
    max_discount:number,
    disponiblidad:number,
    include_igv:number,
    is_icbper:number,
    is_ivap:number,
    state:number,
    unidad_medida:string,
    stock:number,
    created_at:string,
    percentage_isc:number,
    is_especial_nota:number,
    fecha_vencimiento ?: string,

}

export type Products = {
    total: number,
    pagination: number,
    products: {
        data:Product[],
    },
}
export type ProductResponse = {
    code?:number,
    message:string,
    product?: Product,
}

export type ProductConfigResponse = {
    categories: ProductCategorie[],
}

export const UNITS = [
    {"code": "4A", "name": "BOBINAS"},
    {"code": "BJ", "name": "BALDE"},
    {"code": "BLL", "name": "BARRILES"},
    {"code": "BG", "name": "BOLSA"},
    {"code": "BO", "name": "BOTELLAS"},
    {"code": "BX", "name": "CAJA"},
    {"code": "CT", "name": "CARTONES"},
    {"code": "CMK", "name": "CENTIMETRO CUADRADO"},
    {"code": "CMQ", "name": "CENTIMETRO CUBICO"},
    {"code": "CMT", "name": "CENTIMETRO LINEAL"},
    {"code": "CEN", "name": "CIENTO DE UNIDADES"},
    {"code": "CY", "name": "CILINDRO"},
    {"code": "CJ", "name": "CONOS"},
    {"code": "DZN", "name": "DOCENA"},
    {"code": "DZP", "name": "DOCENA POR 10**6"},
    {"code": "BE", "name": "FARDO"},
    {"code": "GLI", "name": "GALON INGLES (4,545956L)"},
    {"code": "GRM", "name": "GRAMO"},
    {"code": "GRO", "name": "GRUESA"},
    {"code": "HLT", "name": "HECTOLITRO"},
    {"code": "LEF", "name": "HOJA"},
    {"code": "SET", "name": "JUEGO"},
    {"code": "KGM", "name": "KILOGRAMO"},
    {"code": "KTM", "name": "KILOMETRO"},
    {"code": "KWH", "name": "KILOVATIO HORA"},
    {"code": "KT", "name": "KIT"},
    {"code": "CA", "name": "LATAS"},
    {"code": "LBR", "name": "LIBRAS"},
    {"code": "LTR", "name": "LITRO"},
    {"code": "MWH", "name": "MEGAWATT HORA"},
    {"code": "MTR", "name": "METRO"},
    {"code": "MTK", "name": "METRO CUADRADO"},
    {"code": "MTQ", "name": "METRO CUBICO"},
    {"code": "MGM", "name": "MILIGRAMOS"},
    {"code": "MLT", "name": "MILILITRO"},
    {"code": "MMT", "name": "MILIMETRO"},
    {"code": "MMK", "name": "MILIMETRO CUADRADO"},
    {"code": "MMQ", "name": "MILIMETRO CUBICO"},
    {"code": "MIL", "name": "MILLARES"},
    {"code": "UM", "name": "MILLON DE UNIDADES"},
    {"code": "ONZ", "name": "ONZAS"},
    {"code": "PF", "name": "PALETAS"},
    {"code": "PK", "name": "PAQUETE"},
    {"code": "PR", "name": "PAR"},
    {"code": "FOT", "name": "PIES"},
    {"code": "FTK", "name": "PIES CUADRADOS"},
    {"code": "FTQ", "name": "PIES CUBICOS"},
    {"code": "C62", "name": "PIEZAS"},
    {"code": "PG", "name": "PLACAS"},
    {"code": "ST", "name": "PLIEGO"},
    {"code": "INH", "name": "PULGADAS"},
    {"code": "RM", "name": "RESMA"},
    {"code": "SA", "name": "SACO"},
    {"code": "DR", "name": "TAMBOR"},
    {"code": "STN", "name": "TONELADA CORTA"},
    {"code": "LTN", "name": "TONELADA LARGA"},
    {"code": "TNE", "name": "TONELADAS"},
    {"code": "TU", "name": "TUBOS"},
    {"code": "NIU", "name": "UNIDAD (NIU)"},
    {"code": "ZZ", "name": "UNIDAD (ZZ)"},
    {"code": "GLL", "name": "US GALON (3,7843 L)"},
    {"code": "YRD", "name": "YARDA"},
    {"code": "YDK", "name": "YARDA CUADRADA"},
    {"code": "QQM", "name": "QUINTAL"}
  ]

export const UNIT_IMPORTS = [
    { "code": "126", "name": "DOCENA POR 10**6" },
    { "code": "12U", "name": "DOCENA" },
    { "code": "2U", "name": "PAR" },
    { "code": "2U6", "name": "PAR POR 10**6" },
    { "code": "AM", "name": "AMPOLLA" },
    { "code": "BAL", "name": "BALDE" },
    { "code": "BID", "name": "BIDONES" },
    { "code": "BLS", "name": "BOLSA" },
    { "code": "BOB", "name": "BOBINAS" },
    { "code": "BOT", "name": "BOTELLAS" },
    { "code": "BRR", "name": "BARRILES" },
    { "code": "CAJ", "name": "CAJA" },
    { "code": "CIL", "name": "CILINDRO" },
    { "code": "CM", "name": "CENTIMETRO LINEAL" },
    { "code": "CM2", "name": "CENTIMETRO CUADRADO" },
    { "code": "CM3", "name": "CENTIMETRO CUBICO" },
    { "code": "CON", "name": "CONOS" },
    { "code": "CRT", "name": "CARTONES" },
    { "code": "FDO", "name": "FARDO" },
    { "code": "FRC", "name": "FRASCOS" },
    { "code": "GAL", "name": "US GALON (3,7843 L)" },
    { "code": "GLE", "name": "GALON INGLES (4,545956L)" },
    { "code": "GR", "name": "GRAMO" },
    { "code": "GRU", "name": "GRUESA" },
    { "code": "HL", "name": "HECTOLITRO" },
    { "code": "HOJ", "name": "HOJA" },
    { "code": "JGS", "name": "JUEGO" },
    { "code": "KG", "name": "KILOGRAMO" },
    { "code": "KG3", "name": "KILOGRAMO POR 10**3 (TM)" },
    { "code": "KG6", "name": "KILOGRAMO POR 10**6" },
    { "code": "KGA", "name": "KILOGRAMO INGREDIENTE ACTIVO" },
    { "code": "KI", "name": "QUILATE" },
    { "code": "KI6", "name": "QUILATE 10**6" },
    { "code": "KIT", "name": "KIT" },
    { "code": "KL6", "name": "KILOS X 10 EXP - 6 (MG)" },
    { "code": "KL9", "name": "KILOS X 10 EXP -9" },
    { "code": "KM", "name": "KILOMETRO" },
    { "code": "KW3", "name": "KILOVATIO HORA POR 10**3 (1000KWH)" },
    { "code": "KW6", "name": "KILOVATIO HORA POR 10**6" },
    { "code": "KWH", "name": "KILOVATIO HORA" },
    { "code": "L", "name": "LITRO" },
    { "code": "L 6", "name": "LITRO POR 10**6" },
    { "code": "LAT", "name": "LATAS" },
    { "code": "LB", "name": "LIBRAS" },
    { "code": "M", "name": "METRO" },
    { "code": "M 6", "name": "METRO POR 10**6" },
    { "code": "M2", "name": "METRO CUADRADO" },
    { "code": "M26", "name": "METRO CUADRADO POR 10**6" },
    { "code": "M3", "name": "METRO CUBICO" },
    { "code": "M36", "name": "METRO CUBICO POR 10**6" },
    { "code": "MGA", "name": "MILIGRAMO ACTIVO" },
    { "code": "MGR", "name": "MILIGRAMOS" },
    { "code": "ML", "name": "MILILITRO" },
    { "code": "MLL", "name": "MILLARES" },
    { "code": "MM", "name": "MILIMETRO" },
    { "code": "MM2", "name": "MILIMETRO CUADRADO" },
    { "code": "MM3", "name": "MILIMETRO CUBICO" },
    { "code": "MU", "name": "MUESTRAS" },
    { "code": "MWH", "name": "MEGAWATT HORA" },
    { "code": "OZ", "name": "ONZAS" },
    { "code": "PAI", "name": "PAILAS" },
    { "code": "PAL", "name": "PALETAS" },
    { "code": "PAQ", "name": "PAQUETE" },
    { "code": "PL", "name": "PLACAS" },
    { "code": "PLC", "name": "PLANCHAS" },
    { "code": "PLG", "name": "PLIEGO" },
    { "code": "PS", "name": "PIES" },
    { "code": "PS2", "name": "PIES CUADRADOS" },
    { "code": "PS3", "name": "PIES CUBICOS" },
    { "code": "PST", "name": "PIES TABLARES(MADERA)" },
    { "code": "PUL", "name": "PULGADAS" },
    { "code": "PZA", "name": "PIEZAS" },
    { "code": "QQ", "name": "QUINTAL METRICO (100 KG)" },
    { "code": "QUT", "name": "QUINTAL USA (100 LB)" },
    { "code": "RAM", "name": "RAMOS" },
    { "code": "RES", "name": "RESMA" },
    { "code": "ROL", "name": "ROLLOS" },
    { "code": "SAC", "name": "SACO" },
    { "code": "SET", "name": "SET" },
    { "code": "TAM", "name": "TAMBOR" },
    { "code": "TC", "name": "TONELADA CORTA" },
    { "code": "TCS", "name": "TONELADA CORTA SECA" },
    { "code": "TIR", "name": "TIRAS" },
    { "code": "TL", "name": "TONELADA LARGA" },
    { "code": "TLS", "name": "TONELADA LARGA SECA" },
    { "code": "TM", "name": "TONELONAS" },
    { "code": "TM3", "name": "TONELADA CUBICA" },
    { "code": "TMS", "name": "TONELADA METRICA SECA" },
    { "code": "TUB", "name": "TUBOS" },
    { "code": "U", "name": "UNIDAD" },
    { "code": "U 3", "name": "UNIDAD POR 10**3" },
    { "code": "U 6", "name": "UNIDAD PO 10**6" },
    { "code": "U2", "name": "CIENTO DE UNIDADES" },
    { "code": "U3", "name": "MILES DE UNIDADES" },
    { "code": "U6", "name": "MILLON DE UNIDADES" },
    { "code": "YD", "name": "YARDA" },
    { "code": "YD2", "name": "YARDA CUADRADA" }
];
