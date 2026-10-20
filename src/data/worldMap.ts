import { CollisionBox, InteractableObject } from '../types';
import { TOWN_FURNITURE } from './furniture';

export const WORLD_WIDTH = 3800;
export const WORLD_HEIGHT = 2900;

// Player initial spawn near the entrance of the Zoológico on Avenida do Parque
export const SPAWN_POINT = {
  x: 2840,
  y: 1350,
};

// Lake geometry and water boundary
export const LAKE_POINTS = [
  { x: 0, y: 350 },
  { x: 450, y: 350 },
  { x: 650, y: 550 },
  { x: 720, y: 800 },
  { x: 750, y: 1100 },
  { x: 710, y: 1450 },
  { x: 740, y: 1750 },
  { x: 760, y: 2050 },
  { x: 680, y: 2400 },
  { x: 500, y: 2600 },
  { x: 0, y: 2600 },
];

// Building and structure footprints
export interface BuildingLayout {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  door: { x: number; y: number; w: number; h: number };
  roofColor?: string;
  floorType?: 'TILES' | 'WOOD' | 'CONCRETE' | 'OFFICE';
  rooms?: Array<{ name: string; x: number; y: number; w: number; h: number }>;
}

export const BUILDINGS: BuildingLayout[] = [
  // 3. Posto de Saúde (Top Left)
  {
    id: 'b_posto_saude',
    name: 'POSTO DE SAÚDE',
    x: 880,
    y: 180,
    w: 300,
    h: 460,
    door: { x: 990, y: 640, w: 80, h: 20 },
    rooms: [
      { name: 'RECEPÇÃO E ESPERA', x: 890, y: 440, w: 280, h: 190 },
      { name: 'SALA DE TRIAGEM', x: 890, y: 200, w: 130, h: 220 },
      { name: 'CONSULTÓRIO MÉDICO', x: 1030, y: 200, w: 140, h: 220 },
    ],
  },
  // 4. Farmácia (Next to Posto de Saúde)
  {
    id: 'b_farmacia',
    name: 'FARMÁCIA',
    x: 1240,
    y: 180,
    w: 260,
    h: 460,
    door: { x: 1330, y: 640, w: 80, h: 20 },
    rooms: [
      { name: 'BALCÃO DE ATENDIMENTO', x: 1250, y: 400, w: 240, h: 230 },
      { name: 'ESTOQUE E MANIPULAÇÃO', x: 1250, y: 200, w: 240, h: 180 },
    ],
  },
  // 5. Prefeitura (Top Center)
  {
    id: 'b_prefeitura',
    name: 'PREFEITURA MUNICIPAL',
    x: 1650,
    y: 150,
    w: 520,
    h: 520,
    door: { x: 1860, y: 670, w: 100, h: 20 },
    rooms: [
      { name: 'SAGUÃO PRINCIPAL', x: 1670, y: 450, w: 480, h: 210 },
      { name: 'ARQUIVO MUNICIPAL', x: 1670, y: 170, w: 230, h: 260 },
      { name: 'GABINETE DO PREFEITO', x: 1920, y: 170, w: 230, h: 260 },
    ],
  },
  // 6. Lojas (Commercial Strip)
  {
    id: 'b_loja_papelaria',
    name: 'PAPELARIA VALE VERDE',
    x: 2280,
    y: 180,
    w: 160,
    h: 440,
    door: { x: 2320, y: 620, w: 60, h: 20 },
  },
  {
    id: 'b_loja_mercado',
    name: 'MINI MERCADO CENTRAL',
    x: 2460,
    y: 180,
    w: 170,
    h: 440,
    door: { x: 2500, y: 620, w: 60, h: 20 },
  },
  {
    id: 'b_loja_ferragens',
    name: 'LOJA DE FERRAGENS',
    x: 2650,
    y: 180,
    w: 170,
    h: 440,
    door: { x: 2690, y: 620, w: 60, h: 20 },
  },
  // 7. Câmara Municipal (Top Right)
  {
    id: 'b_camara',
    name: 'CÂMARA MUNICIPAL',
    x: 2950,
    y: 150,
    w: 520,
    h: 500,
    door: { x: 3160, y: 650, w: 100, h: 20 },
    rooms: [
      { name: 'PLENÁRIO LEGISLATIVO', x: 2970, y: 390, w: 480, h: 250 },
      { name: 'ARQUIVO DE ATAS E LEIS', x: 2970, y: 170, w: 230, h: 200 },
      { name: 'MESA DA PRESIDÊNCIA', x: 3220, y: 170, w: 230, h: 200 },
    ],
  },
  // 8. Supermercado (Center)
  {
    id: 'b_supermercado',
    name: 'SUPERMERCADO',
    x: 1580,
    y: 980,
    w: 580,
    h: 560,
    door: { x: 1820, y: 1540, w: 100, h: 20 },
    rooms: [
      { name: 'SALÃO DE COMPRAS', x: 1600, y: 1180, w: 540, h: 350 },
      { name: 'DEPÓSITO DE CARGAS', x: 1600, y: 1000, w: 320, h: 160 },
      { name: 'ESCRITÓRIO ADMINISTRATIVO', x: 1940, y: 1000, w: 200, h: 160 },
    ],
  },
  // 9. Escola (Below Supermercado)
  {
    id: 'b_escola',
    name: 'ESCOLA MUNICIPAL',
    x: 1580,
    y: 1780,
    w: 580,
    h: 540,
    door: { x: 1820, y: 2320, w: 100, h: 20 },
    rooms: [
      { name: 'CORREDOR CENTRAL & MURAL', x: 1600, y: 2040, w: 540, h: 270 },
      { name: 'SALA DE AULA 01', x: 1600, y: 1800, w: 250, h: 220 },
      { name: 'SALA DE CIÊNCIAS E MAPAS', x: 1880, y: 1800, w: 260, h: 220 },
    ],
  },
  // 11. Biblioteca (Left of Zoo)
  {
    id: 'b_biblioteca',
    name: 'BIBLIOTECA MUNICIPAL',
    x: 2300,
    y: 1100,
    w: 400,
    h: 520,
    door: { x: 2450, y: 1620, w: 80, h: 20 },
    rooms: [
      { name: 'SALÃO DE LEITURA', x: 2320, y: 1300, w: 360, h: 310 },
      { name: 'ARQUIVOS LOCAIS', x: 2320, y: 1120, w: 360, h: 160 },
    ],
  },

  // 12. Zoológico: Prédios e Instalações Completas
  // Bilheteria & Portão de Recepção
  {
    id: 'b_zoo_bilheteria',
    name: 'BILHETERIA DO ZOOLÓGICO',
    x: 2900,
    y: 1250,
    w: 90,
    h: 70,
    door: { x: 2930, y: 1320, w: 40, h: 20 },
  },
  // Administração do Parque
  {
    id: 'b_zoo_admin',
    name: 'ADMINISTRAÇÃO DO PARQUE',
    x: 3000,
    y: 920,
    w: 260,
    h: 220,
    door: { x: 3080, y: 1140, w: 70, h: 20 },
    rooms: [
      { name: 'GABINETE DA DIRETORIA', x: 3010, y: 930, w: 120, h: 190 },
      { name: 'ARQUIVO DO ZOO & SALA DE REUNIÕES', x: 3140, y: 930, w: 110, h: 190 },
    ],
  },
  // Clínica Veterinária & Cuidados
  {
    id: 'b_zoo_vet',
    name: 'CLÍNICA VETERINÁRIA & CUIDADOS',
    x: 3000,
    y: 1180,
    w: 170,
    h: 120,
    door: { x: 3040, y: 1300, w: 60, h: 20 },
    rooms: [
      { name: 'CONSULTÓRIO CIRÚRGICO VETERINÁRIO', x: 3010, y: 1190, w: 150, h: 100 },
    ],
  },
  // Quiosque de Alimentação / Lanches
  {
    id: 'b_zoo_quiosque',
    name: 'QUIOSQUE DE LANCHES & REFRIGERANTES',
    x: 3220,
    y: 1240,
    w: 90,
    h: 70,
    door: { x: 3240, y: 1310, w: 50, h: 20 },
  },
  // Sanitários e Prédio de Apoio
  {
    id: 'b_zoo_sanitarios',
    name: 'SANITÁRIOS DO PARQUE',
    x: 3220,
    y: 1150,
    w: 90,
    h: 60,
    door: { x: 3240, y: 1210, w: 40, h: 20 },
  },
  // Centro de Pesquisa e Laboratório (Área Restrita)
  {
    id: 'b_zoo_lab',
    name: 'CENTRO DE PESQUISA & QUARENTENA (ÁREA RESTRITA)',
    x: 3500,
    y: 920,
    w: 240,
    h: 460,
    door: { x: 3560, y: 1380, w: 80, h: 20 },
    rooms: [
      { name: 'CORREDOR DE DESCONTAMINAÇÃO & CABOS', x: 3510, y: 1230, w: 220, h: 140 },
      { name: 'SALA DE OBSERVAÇÃO & CONTROLE', x: 3510, y: 1080, w: 105, h: 140 },
      { name: 'SALA DE SERVIDORES & FITAS IBM', x: 3625, y: 1080, w: 105, h: 140 },
      { name: 'LABORATÓRIO DE ANÁLISES BIOLÓGICAS', x: 3510, y: 930, w: 220, h: 140 },
    ],
  },
  // Setor Isolado / Terminal Antigo (DOC-20)
  {
    id: 'b_zoo_quarentena',
    name: 'SETOR ISOLADO / QUARENTENA BIOLÓGICA',
    x: 3500,
    y: 1540,
    w: 240,
    h: 320,
    door: { x: 3560, y: 1540, w: 80, h: 20 },
    rooms: [
      { name: 'ANTE-SALA DE ISOLAMENTO', x: 3510, y: 1550, w: 220, h: 120 },
      { name: 'SALA DO TERMINAL ANTIGO', x: 3510, y: 1680, w: 220, h: 170 },
    ],
  },

  // 13. Clínica Especializada (Below Zoo)
  {
    id: 'b_clinica',
    name: 'CLÍNICA ESPECIALIZADA',
    x: 2950,
    y: 2400,
    w: 440,
    h: 400,
    door: { x: 3120, y: 2800, w: 80, h: 20 },
    rooms: [
      { name: 'RECEPÇÃO', x: 2970, y: 2600, w: 400, h: 190 },
      { name: 'SALA DE ATENDIMENTO', x: 2970, y: 2420, w: 400, h: 160 },
    ],
  },

  // Residential Houses - West
  { id: 'b_casa_o1', name: 'CASA 101', x: 880, y: 1000, w: 180, h: 180, door: { x: 940, y: 1180, w: 40, h: 15 } },
  { id: 'b_casa_o2', name: 'CASA 102', x: 1120, y: 1000, w: 180, h: 180, door: { x: 1180, y: 1180, w: 40, h: 15 } },
  { id: 'b_casa_o3', name: 'CASA 103', x: 880, y: 1320, w: 180, h: 180, door: { x: 940, y: 1500, w: 40, h: 15 } },
  { id: 'b_casa_o4', name: 'CASA 104 (SUSPEITA)', x: 1120, y: 1320, w: 180, h: 180, door: { x: 1180, y: 1500, w: 40, h: 15 } },
  { id: 'b_casa_o5', name: 'CASA 105', x: 880, y: 1640, w: 180, h: 180, door: { x: 940, y: 1820, w: 40, h: 15 } },
  { id: 'b_casa_o6', name: 'CASA 106', x: 1120, y: 1640, w: 180, h: 180, door: { x: 1180, y: 1820, w: 40, h: 15 } },

  // Residential Houses - Central & South
  { id: 'b_casa_s1', name: 'CASA 201', x: 880, y: 2150, w: 180, h: 180, door: { x: 940, y: 2330, w: 40, h: 15 } },
  { id: 'b_casa_s2', name: 'CASA 202', x: 1140, y: 2150, w: 180, h: 180, door: { x: 1200, y: 2330, w: 40, h: 15 } },
  { id: 'b_casa_s3', name: 'CASA 203', x: 1140, y: 2480, w: 180, h: 180, door: { x: 1200, y: 2660, w: 40, h: 15 } },
  { id: 'b_casa_s4', name: 'CASA 204', x: 880, y: 2480, w: 180, h: 180, door: { x: 940, y: 2660, w: 40, h: 15 } },
  { id: 'b_casa_s5', name: 'CASA 205', x: 2320, y: 2200, w: 180, h: 180, door: { x: 2380, y: 2380, w: 40, h: 15 } },
  { id: 'b_casa_s6', name: 'CASA 206', x: 2320, y: 2500, w: 180, h: 180, door: { x: 2380, y: 2680, w: 40, h: 15 } },
];

// Roads and connected continuous avenues
export interface Road {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
}

export const ROADS: Road[] = [
  // Horizontal Connected Arteries
  { x: 750, y: 690, w: 2750, h: 100, name: 'AVENIDA DOS PODERES' },
  { x: 750, y: 880, w: 2000, h: 90, name: 'AVENIDA CENTRAL VALE VERDE' },
  { x: 750, y: 1640, w: 2000, h: 90, name: 'AVENIDA CÍVICA' },
  { x: 750, y: 2340, w: 2000, h: 90, name: 'ALAMEDA DAS ACÁCIAS' },
  { x: 2750, y: 2260, w: 750, h: 90, name: 'AVENIDA DO LAGO SUL' },
  { x: 2850, y: 1980, w: 150, h: 70, name: 'ACESSO TÉCNICO SUL' },

  // Vertical Connected Arteries
  { x: 750, y: 120, w: 90, h: 2650, name: 'RUA MARGINAL DO LAGO' },
  { x: 1470, y: 120, w: 90, h: 2650, name: 'AVENIDA DAS PALMEIRAS' },
  { x: 2180, y: 120, w: 90, h: 2650, name: 'ALAMEDA DA BIBLIOTECA' },
  { x: 2750, y: 120, w: 100, h: 2650, name: 'AVENIDA DO PARQUE ZOOLÓGICO' },
];

// Pedestrian Crosswalks (Faixas de pedestre)
export interface Crosswalk {
  x: number;
  y: number;
  w: number;
  h: number;
  isHorizontal: boolean;
}

export const CROSSWALKS: Crosswalk[] = [
  { x: 1860, y: 690, w: 100, h: 100, isHorizontal: false }, // Prefeitura
  { x: 1820, y: 1640, w: 100, h: 90, isHorizontal: false },  // Supermercado
  { x: 1820, y: 2340, w: 100, h: 90, isHorizontal: false },  // Escola
  { x: 2750, y: 1330, w: 100, h: 80, isHorizontal: true },   // Entrada do Zoológico
  { x: 2180, y: 1560, w: 90, h: 70, isHorizontal: true },    // Biblioteca
  { x: 1470, y: 690, w: 90, h: 100, isHorizontal: true },    // Farmácia / Posto
  { x: 2750, y: 2260, w: 100, h: 90, isHorizontal: false },  // Acesso Clínica
];

// Paved Walkways connecting streets directly to building entrances
export interface BuildingWalkway {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const BUILDING_WALKWAYS: BuildingWalkway[] = [
  { x: 990, y: 640, w: 80, h: 50 },    // Posto de Saúde to Av. dos Poderes
  { x: 1330, y: 640, w: 80, h: 50 },   // Farmácia to Av. dos Poderes
  { x: 1860, y: 670, w: 100, h: 20 },  // Prefeitura to Av. dos Poderes
  { x: 2320, y: 620, w: 60, h: 70 },   // Papelaria to Av. dos Poderes
  { x: 2500, y: 620, w: 60, h: 70 },   // Mercado to Av. dos Poderes
  { x: 2690, y: 620, w: 60, h: 70 },   // Ferragens to Av. dos Poderes
  { x: 3160, y: 650, w: 100, h: 40 },  // Câmara to Av. dos Poderes
  { x: 1820, y: 1540, w: 100, h: 100 },// Supermercado to Av. Cívica
  { x: 1820, y: 2320, w: 100, h: 20 }, // Escola to Alameda das Acácias
  { x: 2450, y: 1620, w: 80, h: 20 },  // Biblioteca to Av. Cívica
  { x: 3120, y: 2350, w: 80, h: 450 }, // Clínica to Av. do Lago Sul
  { x: 2850, y: 1330, w: 50, h: 80 },  // Zoo Grand Gateway to Av. do Parque
];

// Zoo Visitor Trails & Technical Access Network
export interface ZooWalkway {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'MAIN_PLAZA' | 'TRAIL' | 'TECHNICAL';
}

export const ZOO_WALKWAYS: ZooWalkway[] = [
  // West Entrance Gateway Promenade
  { x: 2880, y: 1330, w: 120, h: 80, type: 'MAIN_PLAZA' },
  // Central Zoo Plaza
  { x: 2980, y: 1220, w: 260, h: 180, type: 'MAIN_PLAZA' },
  // Central North-South Visitor Promenade
  { x: 3200, y: 1120, w: 60, h: 900, type: 'TRAIL' },
  // East-West Cross Promenade (Between Enclosures 1/2 and 3/4)
  { x: 2980, y: 1610, w: 500, h: 110, type: 'TRAIL' },
  // Promenade towards North Administration
  { x: 3040, y: 1100, w: 80, h: 120, type: 'TRAIL' },
  // Promenade towards South Walkway
  { x: 2980, y: 1940, w: 500, h: 80, type: 'TRAIL' },
  // Promenade around Enclosure 1 & 3
  { x: 2940, y: 1420, w: 40, h: 540, type: 'TRAIL' },
  // Promenade towards Quiosque & Sanitários
  { x: 3220, y: 1210, w: 70, h: 110, type: 'TRAIL' },
  // Outdoor seating terrace at Quiosque
  { x: 3310, y: 1230, w: 110, h: 90, type: 'MAIN_PLAZA' },
  // Restricted Technical Trail into Research Complex
  { x: 3450, y: 1260, w: 130, h: 100, type: 'TECHNICAL' },
  // Wide Technical corridor inside Research Complex (connecting Lab and Isolation Sector)
  { x: 3540, y: 1360, w: 100, h: 200, type: 'TECHNICAL' },
];

// Zoo Enclosures & Facilities (Detailed with categories, water, and rich signs)
export interface ZooEnclosure {
  id: string;
  name: string;
  category: 'AVES' | 'MAMIFEROS' | 'REPTEIS' | 'AQUATICOS';
  x: number;
  y: number;
  w: number;
  h: number;
  fenced: boolean;
  waterFeature?: boolean;
  signText: string;
}

export const ZOO_ENCLOSURES: ZooEnclosure[] = [
  {
    id: 'zoo_enc_1',
    name: 'RECINTO 01: VIVEIRO DE AVES SILVESTRES',
    category: 'AVES',
    x: 2980,
    y: 1420,
    w: 220,
    h: 190,
    fenced: true,
    signText: 'RECINTO 01: VIVEIRO DE AVES SILVESTRES — TUCANOS, ARARAS & AVES MIGRATÓRIAS',
  },
  {
    id: 'zoo_enc_2',
    name: 'RECINTO 02: GRANDES MAMÍFEROS REGIONAIS',
    category: 'MAMIFEROS',
    x: 2980,
    y: 1720,
    w: 220,
    h: 220,
    fenced: true,
    signText: 'RECINTO 02: GRANDES MAMÍFEROS DO PLANALTO — LOBO-GUARÁ, TAMANDUÁ & ANTA',
  },
  {
    id: 'zoo_enc_3',
    name: 'RECINTO 03: SERPENTÁRIO & RÉPTEIS',
    category: 'REPTEIS',
    x: 3260,
    y: 1420,
    w: 190,
    h: 190,
    fenced: true,
    signText: 'RECINTO 03: SERPENTÁRIO MUNICIPAL — JARARACAS, CASCAVÉIS & JIBÓIAS',
  },
  {
    id: 'zoo_enc_4',
    name: 'RECINTO 04: FAUNA AQUÁTICA & LAGO INTERNO',
    category: 'AQUATICOS',
    x: 3260,
    y: 1720,
    w: 190,
    h: 220,
    fenced: true,
    waterFeature: true,
    signText: 'RECINTO 04: FAUNA AQUÁTICA — LAGO DAS LONTRAS E PEIXES DA BACIA DO PARANÁ',
  },
];

// Street lamps, park benches, trees, and obstacles
export interface PropObject {
  type: 'TREE' | 'LAMP' | 'BENCH' | 'FIRE_HYDRANT' | 'SIGN' | 'PIER';
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
}

export const PROPS: PropObject[] = [
  // Lake Pier
  { type: 'PIER', x: 620, y: 1200, w: 150, h: 60, label: 'PÍER DE MADEIRA DO LAGO' },
  { type: 'SIGN', x: 740, y: 1160, w: 30, h: 30, label: 'PLACA: NAVEGAÇÃO PROIBIDA' },

  // Street Lamps along main roads
  { type: 'LAMP', x: 880, y: 800, w: 20, h: 20 },
  { type: 'LAMP', x: 1200, y: 800, w: 20, h: 20 },
  { type: 'LAMP', x: 1600, y: 800, w: 20, h: 20 },
  { type: 'LAMP', x: 2000, y: 800, w: 20, h: 20 },
  { type: 'LAMP', x: 2400, y: 800, w: 20, h: 20 },
  { type: 'LAMP', x: 2740, y: 800, w: 20, h: 20 },

  { type: 'LAMP', x: 880, y: 1620, w: 20, h: 20 },
  { type: 'LAMP', x: 1200, y: 1620, w: 20, h: 20 },
  { type: 'LAMP', x: 1600, y: 1620, w: 20, h: 20 },
  { type: 'LAMP', x: 2300, y: 1620, w: 20, h: 20 },
  { type: 'LAMP', x: 2740, y: 1620, w: 20, h: 20 },

  // Zoo entrance lighting & gate pillars
  { type: 'LAMP', x: 2860, y: 1290, w: 24, h: 24 },
  { type: 'LAMP', x: 2860, y: 1430, w: 24, h: 24 },
  { type: 'SIGN', x: 2850, y: 1330, w: 20, h: 40, label: 'PÓRTICO DO ZOOLÓGICO' },

  // Zoo internal park lamps
  { type: 'LAMP', x: 3020, y: 1310, w: 20, h: 20 },
  { type: 'LAMP', x: 3180, y: 1310, w: 20, h: 20 },
  { type: 'LAMP', x: 3230, y: 1510, w: 20, h: 20 },
  { type: 'LAMP', x: 3230, y: 1810, w: 20, h: 20 },
  { type: 'LAMP', x: 3460, y: 1260, w: 20, h: 20 }, // Light at Research gate
  { type: 'LAMP', x: 3540, y: 1450, w: 20, h: 20 }, // Technical light

  // Trees in residential & park areas
  { type: 'TREE', x: 860, y: 760, w: 36, h: 36 },
  { type: 'TREE', x: 1040, y: 760, w: 36, h: 36 },
  { type: 'TREE', x: 1380, y: 760, w: 36, h: 36 },
  { type: 'TREE', x: 1720, y: 760, w: 36, h: 36 },
  { type: 'TREE', x: 2100, y: 760, w: 36, h: 36 },
  { type: 'TREE', x: 2500, y: 760, w: 36, h: 36 },

  { type: 'TREE', x: 840, y: 1220, w: 34, h: 34 },
  { type: 'TREE', x: 840, y: 1540, w: 34, h: 34 },
  { type: 'TREE', x: 840, y: 1860, w: 34, h: 34 },
  { type: 'TREE', x: 840, y: 2360, w: 34, h: 34 },

  // Trees inside Zoo gardens
  { type: 'TREE', x: 2950, y: 1230, w: 36, h: 36 },
  { type: 'TREE', x: 3180, y: 1230, w: 36, h: 36 },
  { type: 'TREE', x: 2950, y: 1640, w: 36, h: 36 },
  { type: 'TREE', x: 3220, y: 1640, w: 36, h: 36 },
  { type: 'TREE', x: 2950, y: 1960, w: 36, h: 36 },

  // Park benches in Zoo
  { type: 'BENCH', x: 3040, y: 1390, w: 40, h: 20 },
  { type: 'BENCH', x: 3140, y: 1390, w: 40, h: 20 },
  { type: 'BENCH', x: 3220, y: 1580, w: 40, h: 20 },
  { type: 'BENCH', x: 3220, y: 1700, w: 40, h: 20 },

  // Town park benches
  { type: 'BENCH', x: 2320, y: 830, w: 40, h: 20 },
  { type: 'BENCH', x: 2520, y: 830, w: 40, h: 20 },
  { type: 'BENCH', x: 2420, y: 1630, w: 40, h: 20 },
  { type: 'BENCH', x: 2620, y: 1630, w: 40, h: 20 },
];

// Interactive objects scattered across the locations (Retains all 20 docs 100% accessible!)
export const INTERACTABLE_OBJECTS: InteractableObject[] = [
  // 1. Lago
  {
    id: 'int_lago_relatorio',
    name: 'RELATÓRIO DE MANUTENÇÃO NA PRANCHA',
    type: 'DOCUMENT',
    x: 640,
    y: 1210,
    width: 60,
    height: 40,
    locationId: 'LAGO',
    message: 'Prancheta úmida deixada na prancha do píer de madeira.',
    archiveRecordId: 'DOC-01',
  },
  {
    id: 'int_lago_bilhete',
    name: 'BILHETE ENCONTRADO NAS PEDRAS',
    type: 'DOCUMENT',
    x: 730,
    y: 1480,
    width: 40,
    height: 35,
    locationId: 'LAGO',
    message: 'Um papel dobrado e amarelado preso sob as pedras da margem.',
    archiveRecordId: 'DOC-02',
  },
  {
    id: 'int_lago_placa',
    name: 'PLACA DO DEPARTAMENTO DE ÁGUAS',
    type: 'SIGN',
    x: 740,
    y: 920,
    width: 30,
    height: 30,
    locationId: 'LAGO',
    message: 'REPRESA MUNICIPAL VALE VERDE (1983)\nAVISO: CAPTAÇÃO DE ÁGUA SUSPENSA PARA ANÁLISE SANITÁRIA. PROIBIDO NADAR OU PESCAR.',
  },

  // 2. Área Residencial Oeste
  {
    id: 'int_casa_o1_porta',
    name: 'PORTA - RESIDÊNCIA 101',
    type: 'DOOR',
    x: 940,
    y: 1175,
    width: 40,
    height: 20,
    locationId: 'RESIDENCIAL_OESTE',
    message: 'RESIDÊNCIA FECHADA.\nAs cortinas estão puxadas. Uma garrafa vazia de leite repousa junto ao capacho.',
  },
  {
    id: 'int_casa_o2_porta',
    name: 'PORTA - RESIDÊNCIA 102',
    type: 'DOOR',
    x: 1180,
    y: 1175,
    width: 40,
    height: 20,
    locationId: 'RESIDENCIAL_OESTE',
    message: 'RESIDÊNCIA FECHADA.\nNenhuma resposta ao bater. O cadeado da grade está trancado por fora.',
  },
  {
    id: 'int_casa_o3_porta',
    name: 'PORTA - RESIDÊNCIA 103',
    type: 'DOOR',
    x: 940,
    y: 1495,
    width: 40,
    height: 20,
    locationId: 'RESIDENCIAL_OESTE',
    message: 'RESIDÊNCIA FECHADA.\nCorrespondências acumuladas sob a fresta da porta de entrada.',
  },
  {
    id: 'int_casa_o4_porta',
    name: 'PORTA ABERTA - RESIDÊNCIA 104',
    type: 'DOOR',
    x: 1180,
    y: 1495,
    width: 40,
    height: 20,
    locationId: 'RESIDENCIAL_OESTE',
    message: 'A fechadura está estourada com uma chave de fenda. Há marcas no chão em direção à Alameda.',
  },
  {
    id: 'int_casa_o5_porta',
    name: 'PORTA - RESIDÊNCIA 105',
    type: 'DOOR',
    x: 940,
    y: 1815,
    width: 40,
    height: 20,
    locationId: 'RESIDENCIAL_OESTE',
    message: 'RESIDÊNCIA FECHADA.\nUm cachorro late ao longe no quintal dos fundos.',
  },
  {
    id: 'int_casa_o6_porta',
    name: 'PORTA - RESIDÊNCIA 106',
    type: 'DOOR',
    x: 1180,
    y: 1815,
    width: 40,
    height: 20,
    locationId: 'RESIDENCIAL_OESTE',
    message: 'RESIDÊNCIA FECHADA.\nPlaca enferrujada: "CUIDADO COM O CÃO".',
  },

  // 3. Posto de Saúde
  {
    id: 'int_ps_balcao',
    name: 'BALCÃO DE TRIAGEM DO POSTO',
    type: 'DOCUMENT',
    x: 970,
    y: 480,
    width: 60,
    height: 35,
    locationId: 'POSTO_SAUDE',
    message: 'Livro de ponto dos enfermeiros aberto em 1983.',
    archiveRecordId: 'DOC-03',
  },
  {
    id: 'int_ps_armario',
    name: 'ARQUIVO DE REGISTROS DE ATENDIMENTO',
    type: 'CABINET',
    x: 1040,
    y: 220,
    width: 50,
    height: 40,
    locationId: 'POSTO_SAUDE',
    message: 'Gaveteiro metálico com prontuários de pacientes do município.',
  },
  {
    id: 'int_ps_mural',
    name: 'MURAL SANITÁRIO MUNICIPAL',
    type: 'MURAL',
    x: 900,
    y: 450,
    width: 40,
    height: 25,
    locationId: 'POSTO_SAUDE',
    message: 'CAMPANHA DE VACINAÇÃO 1983.\nAviso manuscrito: "ATENÇÃO: CASOS DE INSÔNIA RECORRENTE DEVEM SER NOTIFICADOS À ADMINISTRAÇÃO MUNICIPAL".',
  },

  // 4. Farmácia
  {
    id: 'int_far_balcao',
    name: 'BALCÃO DE MEDICAMENTOS CONTROLADOS',
    type: 'DOCUMENT',
    x: 1320,
    y: 470,
    width: 60,
    height: 35,
    locationId: 'FARMACIA',
    message: 'Balcão de madeira com livro de receitas retidas.',
  },
  {
    id: 'int_far_prateleira',
    name: 'ESTOQUE DE LOTES HOSPITALARES',
    type: 'CABINET',
    x: 1410,
    y: 230,
    width: 70,
    height: 35,
    locationId: 'FARMACIA',
    message: 'Prateleira de metal com caixas de suprimentos médicos.',
    archiveRecordId: 'DOC-04',
  },

  // 5. Prefeitura Municipal
  {
    id: 'int_pref_arquivo',
    name: 'GAVETEIRO DE COMUNICADOS INTERNOS',
    type: 'CABINET',
    x: 1700,
    y: 200,
    width: 60,
    height: 40,
    locationId: 'PREFEITURA',
    message: 'Arquivo de aço trancado com carimbo do Gabinete Municipal.',
    archiveRecordId: 'DOC-05',
  },
  {
    id: 'int_pref_mesa',
    name: 'MESA DO PREFEITO',
    type: 'DOCUMENT',
    x: 2000,
    y: 230,
    width: 70,
    height: 40,
    locationId: 'PREFEITURA',
    message: 'Mesa de mogno maciço com despachos oficiais de 1983.',
    archiveRecordId: 'DOC-06',
  },
  {
    id: 'int_pref_mural',
    name: 'MURAL DE DECRETOS MUNICIPAIS',
    type: 'MURAL',
    x: 1700,
    y: 480,
    width: 50,
    height: 25,
    locationId: 'PREFEITURA',
    message: 'DECRETO 42/83: DETERMINA A RESTRIÇÃO TEMPORÁRIA DA CIRCULAÇÃO DE PEDESTRES NAS IMEDIAÇÕES DO BOSQUE LESTE APÓS AS 22H.',
  },

  // 6. Lojas
  {
    id: 'int_loja_recibo',
    name: 'BALCÃO DE ATENDIMENTO DA PAPELARIA',
    type: 'DOCUMENT',
    x: 2330,
    y: 240,
    width: 60,
    height: 35,
    locationId: 'LOJAS',
    message: 'Bloco de notas e canhotos de pedidos timbrados sob o balcão.',
    archiveRecordId: 'DOC-07',
  },

  // 7. Supermercado
  {
    id: 'int_sup_prateleira',
    name: 'GÔNDOLA DE MERCEARIA DO SUPERMERCADO',
    type: 'DOCUMENT',
    x: 1700,
    y: 1250,
    width: 80,
    height: 40,
    locationId: 'SUPERMERCADO',
    message: 'Anotações coladas ao lado de enlatados com prazo vencido.',
    archiveRecordId: 'DOC-08',
  },
  {
    id: 'int_sup_escritorio',
    name: 'MESA DO GERENTE DO MERCADO',
    type: 'DOCUMENT',
    x: 2000,
    y: 1030,
    width: 50,
    height: 40,
    locationId: 'SUPERMERCADO',
    message: 'Planilha de recebimento de cargas de carnes e produtos químicos.',
  },
  {
    id: 'int_sup_deposito',
    name: 'ENGRAÇADOS DE CARGA NO DEPÓSITO',
    type: 'CRATE',
    x: 1650,
    y: 1030,
    width: 50,
    height: 40,
    locationId: 'SUPERMERCADO',
    message: 'Caixotes de madeira marcados com carimbo: "DESTINO: SETOR 04".',
  },

  // 8. Escola Municipal
  {
    id: 'int_esc_mural',
    name: 'MURAL ESCOLAR DO CORREDOR',
    type: 'MURAL',
    x: 1650,
    y: 2080,
    width: 50,
    height: 25,
    locationId: 'ESCOLA',
    message: 'Mural de avisos dos alunos e comunicados da diretoria.',
    archiveRecordId: 'DOC-09',
  },
  {
    id: 'int_esc_gaveta',
    name: 'MESA DA SALA DE CIÊNCIAS',
    type: 'DOCUMENT',
    x: 1950,
    y: 1840,
    width: 50,
    height: 35,
    locationId: 'ESCOLA',
    message: 'Gaveta da escrivaninha de biologia destrancada.',
    archiveRecordId: 'DOC-10',
  },
  {
    id: 'int_esc_diretoria',
    name: 'ARQUIVO DE HISTÓRICOS ESCOLARES',
    type: 'CABINET',
    x: 1720,
    y: 1840,
    width: 50,
    height: 35,
    locationId: 'ESCOLA',
    message: 'Pastas de matrículas do ano letivo de 1983.',
  },

  // 9. Biblioteca Municipal
  {
    id: 'int_bib_balcao',
    name: 'BALCÃO DE EMPRÉSTIMO DA BIBLIOTECA',
    type: 'DOCUMENT',
    x: 2460,
    y: 1380,
    width: 60,
    height: 35,
    locationId: 'BIBLIOTECA',
    message: 'Fichas de controle de livros retirados por moradores.',
    archiveRecordId: 'DOC-11',
  },
  {
    id: 'int_bib_arquivos',
    name: 'RECORTE DE JORNAL NA HEMEROTECA',
    type: 'BOOKSHELF',
    x: 2380,
    y: 1150,
    width: 80,
    height: 40,
    locationId: 'BIBLIOTECA',
    message: 'Recorte de jornal guardado entre pastas de arquivo histórico.',
    archiveRecordId: 'DOC-12',
  },

  // 10. Câmara Municipal
  {
    id: 'int_cam_ata',
    name: 'LIVRO DE ATAS LEGISLATIVAS',
    type: 'DOCUMENT',
    x: 3010,
    y: 200,
    width: 60,
    height: 40,
    locationId: 'CAMARA_MUNICIPAL',
    message: 'Tomo encadernado em couro com os anais das sessões secretas.',
    archiveRecordId: 'DOC-13',
  },
  {
    id: 'int_cam_gravacao',
    name: 'GRAVADOR DE FITA NA PRESIDÊNCIA',
    type: 'DOCUMENT',
    x: 3300,
    y: 200,
    width: 60,
    height: 40,
    locationId: 'CAMARA_MUNICIPAL',
    message: 'Gravador de rolo K7 conectado à mesa da presidência da Câmara.',
    archiveRecordId: 'DOC-14',
  },

  // 11. Clínica Especializada
  {
    id: 'int_cli_balcao',
    name: 'RELATÓRIO CLÍNICO DE FUNCIONÁRIO',
    type: 'DOCUMENT',
    x: 3050,
    y: 2630,
    width: 60,
    height: 35,
    locationId: 'CLINICA',
    message: 'Pasta de atendimento clínico arquivada na recepção da clínica.',
    archiveRecordId: 'DOC-15',
  },
  {
    id: 'int_cli_terminal',
    name: 'TERMINAL DIAGNÓSTICO DA CLÍNICA',
    type: 'TERMINAL',
    x: 3050,
    y: 2440,
    width: 60,
    height: 40,
    locationId: 'CLINICA',
    message: 'Terminal de monitoramento fisiológico da clínica.',
  },

  // 12. Residencial Sul (Casa 106)
  {
    id: 'int_casa_diario',
    name: 'DIÁRIO PESSOAL NA MESA DE CABECEIRA',
    type: 'DOCUMENT',
    x: 1200,
    y: 1670,
    width: 50,
    height: 35,
    locationId: 'RESIDENCIAL_SUL',
    message: 'Caderno de capa dura preta deixado aberto sobre a mesinha.',
    archiveRecordId: 'DOC-16',
  },

  // 13. Zoológico & Centro de Pesquisa (Central Mystery Hub)
  // DOC-17: ENTRADA DO ZOOLÓGICO
  {
    id: 'int_zoo_bilheteria',
    name: 'AVISO AOS VISITANTES NO PÓRTICO',
    type: 'SIGN',
    x: 2900,
    y: 1350,
    width: 40,
    height: 35,
    locationId: 'ZOOLOGICO',
    message: 'Cartaz institucional afixado no vidro da bilheteria do zoológico.',
    archiveRecordId: 'DOC-17',
  },
  // DOC-18: ZOOLÓGICO — ÁREA ADMINISTRATIVA
  {
    id: 'int_zoo_admin_arquivo',
    name: 'COMUNICADO DE SERVIÇO NA ADMINISTRAÇÃO',
    type: 'CABINET',
    x: 3080,
    y: 980,
    width: 60,
    height: 40,
    locationId: 'ZOOLOGICO',
    message: 'Pasta executiva na mesa de reuniões da administração do zoológico.',
    archiveRecordId: 'DOC-18',
  },
  // DOC-19: ZOOLÓGICO — ÁREA DE PESQUISA
  {
    id: 'int_zoo_lab_terminal',
    name: 'REGISTRO DE SISTEMA DO LABORATÓRIO',
    type: 'TERMINAL',
    x: 3550,
    y: 970,
    width: 60,
    height: 45,
    locationId: 'ZOOLOGICO',
    message: 'Terminal do centro de pesquisa emitindo dados intermitentes.',
    archiveRecordId: 'DOC-19',
  },
  // DOC-20: ZOOLÓGICO — TERMINAL ANTIGO (BLOQUEADO)
  {
    id: 'int_zoo_terminal_antigo',
    name: 'TERMINAL ANTIGO DO ZOOLÓGICO',
    type: 'TERMINAL',
    x: 3585,
    y: 1720,
    width: 60,
    height: 45,
    locationId: 'ZOOLOGICO',
    message: 'Terminal antigo monocromático no setor isolado do parque.',
    archiveRecordId: 'DOC-20',
  },
  // Objetos de Investigação e Placas Informativas no Zoológico
  {
    id: 'int_zoo_mapa_geral',
    name: 'MAPA ILUSTRADO DO ZOOLÓGICO',
    type: 'SIGN',
    x: 2980,
    y: 1330,
    width: 40,
    height: 30,
    locationId: 'ZOOLOGICO',
    message: 'MAPA ORIENTATIVO DO PARQUE ZOOLÓGICO VALE VERDE (1983)\n1. VIVEIRO DE AVES | 2. GRANDES MAMÍFEROS | 3. SERPENTÁRIO | 4. FAUNA AQUÁTICA\nAVISO: SETOR LESTE É DE ACESSO EXCLUSIVO DE PESQUISADORES CREDENCIADOS.',
  },
  {
    id: 'int_zoo_placa_aves',
    name: 'PLACA: VIVEIRO DE AVES SILVESTRES',
    type: 'SIGN',
    x: 3010,
    y: 1410,
    width: 35,
    height: 25,
    locationId: 'ZOOLOGICO',
    message: 'RECINTO 01: VIVEIRO DE AVES SILVESTRES\nESPÉCIES: Tucano-Toco, Arara-Canindé, Papagaio-Verdadeiro e aves aquáticas migrantes.\nAVISO DA ADMINISTRAÇÃO: "Não alimentar as aves. As telas contêm reforço de segurança após vistoria sanitária de julho/1983."',
  },
  {
    id: 'int_zoo_placa_mamiferos',
    name: 'PLACA: GRANDES MAMÍFEROS REGIONAIS',
    type: 'SIGN',
    x: 3010,
    y: 1710,
    width: 35,
    height: 25,
    locationId: 'ZOOLOGICO',
    message: 'RECINTO 02: GRANDES MAMÍFEROS DO PLANALTO\nESPÉCIES: Lobo-Guará, Tamanduá-Bandeira e Anta Brasileira.\nOBSERVAÇÃO À CANETA NO RODAPÉ: "Espécime 04 transferido de madrugada para quarentena técnica sob supervisão veterinária."',
  },
  {
    id: 'int_zoo_placa_repteis',
    name: 'PLACA: SERPENTÁRIO & RÉPTEIS',
    type: 'SIGN',
    x: 3290,
    y: 1410,
    width: 35,
    height: 25,
    locationId: 'ZOOLOGICO',
    message: 'RECINTO 03: SERPENTÁRIO MUNICIPAL DE VALE VERDE\nESPÉCIES: Cascavel, Jararaca, Coral-Verdadeira e Jibóia.\nAVISO: "Vidro temperado 15mm. Proibido bater no vidro ou usar iluminação direta."',
  },
  {
    id: 'int_zoo_placa_aquaticos',
    name: 'PLACA: FAUNA AQUÁTICA DO LAGO',
    type: 'SIGN',
    x: 3290,
    y: 1710,
    width: 35,
    height: 25,
    locationId: 'ZOOLOGICO',
    message: 'RECINTO 04: FAUNA AQUÁTICA & PEQUENOS ANIMAIS\nESPÉCIES: Lontras Neotropicais, Capivaras e Peixes da Bacia do Paraná.\nAVISO: "Profundidade 2,20m com circulação contínua de água filtrada."',
  },
  {
    id: 'int_zoo_quiosque_balcao',
    name: 'BALCÃO DO QUIOSQUE DE LANCHES',
    type: 'COUNTER',
    x: 3240,
    y: 1250,
    width: 50,
    height: 30,
    locationId: 'ZOOLOGICO',
    message: 'QUIOSQUE CENTRAL DO PARQUE ZOOLÓGICO\nCARDÁPIO: Sanduíche de pernil, pastéis, Guaraná em garrafa âmbar e picolés.\nAviso colado na fita crepe: "Fechado temporariamente por orientação da administração."',
  },
  {
    id: 'int_zoo_vet_registro',
    name: 'REGISTROS DA CLÍNICA VETERINÁRIA',
    type: 'CABINET',
    x: 3020,
    y: 1200,
    width: 45,
    height: 30,
    locationId: 'ZOOLOGICO',
    message: 'REGISTRO DE QUARENTENA VETERINÁRIA (SETEMBRO/1983)\nÚltimo assentamento: "Coletas de sangue enviadas ao Laboratório de Pesquisa Anexo. Amostras identificadas com etiquetas verdes não catalogadas."',
  },
  {
    id: 'int_zoo_recinto3_cerca',
    name: 'CERCA DE AÇO ROMPIDA DO RECINTO 02',
    type: 'ABANDONED_OBJECT',
    x: 3080,
    y: 1880,
    width: 70,
    height: 35,
    locationId: 'ZOOLOGICO',
    message: 'As barras de aço de 2 polegadas foram dobradas de dentro para fora com força brutal.',
  },
  {
    id: 'int_zoo_quarentena_porta',
    name: 'PORTÃO BLINDADO DE ISOLAMENTO BIOLÓGICO',
    type: 'LOCKED_DOOR',
    x: 3660,
    y: 1720,
    width: 50,
    height: 40,
    locationId: 'ZOOLOGICO',
    message: 'PORTÃO PESADO DE AÇO COM SÍMBOLO DE RISCO BIOLÓGICO CLASSE 4.\nTRANCADO ELETRONICAMENTE PELO SISTEMA CENTRAL.',
  },
  {
    id: 'int_zoo_restringido_portao',
    name: 'PORTÃO DE ACESSO AO SETOR TÉCNICO',
    type: 'SIGN',
    x: 3460,
    y: 1250,
    width: 30,
    height: 30,
    locationId: 'ZOOLOGICO',
    message: 'PLACA DE SEGURANÇA MUNICIPAL:\n"ÁREA RESTRITA — SOMENTE PESSOAL AUTORIZADO DO CENTRO DE PESQUISA. PROIBIDA A ENTRADA DE VISITANTES."',
  },
  {
    id: 'int_zoo_servidores',
    name: 'RACKS DE SERVIDORES IBM',
    type: 'COMPUTER',
    x: 3650,
    y: 1100,
    width: 40,
    height: 35,
    locationId: 'ZOOLOGICO',
    message: 'Racks de processamento com bobinas de fita magnética girando lentamente e luzes piscando.',
  },
  {
    id: 'int_zoo_observacao_painel',
    name: 'PAINEL DE CONTROLE DE QUARENTENA',
    type: 'TERMINAL',
    x: 3520,
    y: 1100,
    width: 45,
    height: 35,
    locationId: 'ZOOLOGICO',
    message: 'Painel com lâmpadas piloto verdes e interruptores de tranca pneumática.',
  },
];

// Helper to compute world collision boxes (buildings + lake + enclosure walls + fences)
export function getCollisionBoxes(): CollisionBox[] {
  const boxes: CollisionBox[] = [];

  // World outer boundary fences (prevent walking off the edge)
  boxes.push({ x: 0, y: 0, w: WORLD_WIDTH, h: 40, label: 'BORDA NORTE' });
  boxes.push({ x: 0, y: WORLD_HEIGHT - 40, w: WORLD_WIDTH, h: 40, label: 'BORDA SUL' });
  boxes.push({ x: 0, y: 0, w: 40, h: WORLD_HEIGHT, label: 'BORDA OESTE' });
  boxes.push({ x: WORLD_WIDTH - 40, y: 0, w: 40, h: WORLD_HEIGHT, label: 'BORDA LESTE' });

  // Buildings exterior walls (with doorway gaps so Lucas can comfortably enter and exit!)
  for (const b of BUILDINGS) {
    const wallThick = 14;
    const door = b.door;
    const isNorthDoor = Math.abs(door.y - b.y) <= 30;

    // Left wall
    boxes.push({ x: b.x, y: b.y, w: wallThick, h: b.h, label: `${b.name} - PAREDE OESTE` });
    // Right wall
    boxes.push({ x: b.x + b.w - wallThick, y: b.y, w: wallThick, h: b.h, label: `${b.name} - PAREDE LESTE` });

    if (isNorthDoor) {
      // Top wall has the doorway cutout!
      const leftWidth = Math.max(0, door.x - b.x);
      if (leftWidth > 0) {
        boxes.push({ x: b.x, y: b.y, w: leftWidth, h: wallThick, label: `${b.name} - PAREDE NORTE (ESQ)` });
      }
      const rightStart = door.x + door.w;
      const rightWidth = Math.max(0, (b.x + b.w) - rightStart);
      if (rightWidth > 0) {
        boxes.push({ x: rightStart, y: b.y, w: rightWidth, h: wallThick, label: `${b.name} - PAREDE NORTE (DIR)` });
      }
      // Bottom wall is solid
      boxes.push({ x: b.x, y: b.y + b.h - wallThick, w: b.w, h: wallThick, label: `${b.name} - PAREDE SUL` });
    } else {
      // Top wall is solid
      boxes.push({ x: b.x, y: b.y, w: b.w, h: wallThick, label: `${b.name} - PAREDE NORTE` });
      // Bottom wall with doorway gap
      const leftWidth = Math.max(0, door.x - b.x);
      if (leftWidth > 0) {
        boxes.push({ x: b.x, y: b.y + b.h - wallThick, w: leftWidth, h: wallThick, label: `${b.name} - PAREDE SUL (ESQ)` });
      }
      const rightStart = door.x + door.w;
      const rightWidth = Math.max(0, (b.x + b.w) - rightStart);
      if (rightWidth > 0) {
        boxes.push({ x: rightStart, y: b.y + b.h - wallThick, w: rightWidth, h: wallThick, label: `${b.name} - PAREDE SUL (DIR)` });
      }
    }
  }

  // Interior room partition walls for residential houses (Living room, Bedroom, Kitchen)
  for (const b of BUILDINGS) {
    if (b.id.startsWith('b_casa_')) {
      const partThick = 6;
      // Horizontal partition at b.y + 92: Doorway at b.x + 55..b.x + 97 (width 42)
      const leftW = 55;
      if (leftW > 0) {
        boxes.push({ x: b.x + 4, y: b.y + 90, w: leftW - 4, h: partThick, label: `${b.name} - DIVISÓRIA SALA ESQ` });
      }
      const rightStart = b.x + 97;
      const rightW = (b.x + b.w - 4) - rightStart;
      if (rightW > 0) {
        boxes.push({ x: rightStart, y: b.y + 90, w: rightW, h: partThick, label: `${b.name} - DIVISÓRIA SALA DIR` });
      }

      // Vertical partition at b.x + 95: Doorway at b.y + 38..b.y + 76 (height 38)
      const topH = 38;
      if (topH > 0) {
        boxes.push({ x: b.x + 93, y: b.y + 4, w: partThick, h: topH - 4, label: `${b.name} - DIVISÓRIA QUARTO/COZINHA SUP` });
      }
      const botStart = b.y + 76;
      const botH = (b.y + 90) - botStart;
      if (botH > 0) {
        boxes.push({ x: b.x + 93, y: botStart, w: partThick, h: botH, label: `${b.name} - DIVISÓRIA QUARTO/COZINHA INF` });
      }
    }
  }

  // Civic buildings key partition walls (with wide doorways)
  // Posto de Saúde:
  boxes.push({ x: 884, y: 428, w: 990 - 884, h: 6, label: 'POSTO SAÚDE - DIVISÓRIA ESQ' });
  boxes.push({ x: 1045, y: 428, w: 1176 - 1045, h: 6, label: 'POSTO SAÚDE - DIVISÓRIA DIR' });
  boxes.push({ x: 1023, y: 184, w: 6, h: 280 - 184, label: 'POSTO SAÚDE - TRIAGEM SUP' });
  boxes.push({ x: 1023, y: 325, w: 6, h: 428 - 325, label: 'POSTO SAÚDE - TRIAGEM INF' });

  // Farmácia:
  boxes.push({ x: 1244, y: 388, w: 1400 - 1244, h: 6, label: 'FARMÁCIA - BALCÃO ESQ' });
  boxes.push({ x: 1448, y: 388, w: 1496 - 1448, h: 6, label: 'FARMÁCIA - BALCÃO DIR' });

  // Prefeitura Municipal:
  boxes.push({ x: 1654, y: 438, w: 1740 - 1654, h: 6, label: 'PREFEITURA - SAGUÃO ESQ' });
  boxes.push({ x: 1795, y: 438, w: 2000 - 1795, h: 6, label: 'PREFEITURA - SAGUÃO MEIO' });
  boxes.push({ x: 2055, y: 438, w: 2166 - 2055, h: 6, label: 'PREFEITURA - SAGUÃO DIR' });
  boxes.push({ x: 1908, y: 154, w: 6, h: 260 - 154, label: 'PREFEITURA - ARQUIVO SUP' });
  boxes.push({ x: 1908, y: 308, w: 6, h: 438 - 308, label: 'PREFEITURA - ARQUIVO INF' });

  // Câmara Municipal:
  boxes.push({ x: 2954, y: 378, w: 3150 - 2954, h: 6, label: 'CÂMARA - PLENÁRIO ESQ' });
  boxes.push({ x: 3215, y: 378, w: 3466 - 3215, h: 6, label: 'CÂMARA - PLENÁRIO DIR' });
  boxes.push({ x: 3208, y: 154, w: 6, h: 240 - 154, label: 'CÂMARA - PRESIDÊNCIA SUP' });
  boxes.push({ x: 3208, y: 288, w: 6, h: 378 - 288, label: 'CÂMARA - PRESIDÊNCIA INF' });

  // Supermercado:
  boxes.push({ x: 1584, y: 1168, w: 1710 - 1584, h: 6, label: 'SUPERMERCADO - DEPÓSITO ESQ' });
  boxes.push({ x: 1772, y: 1168, w: 2000 - 1772, h: 6, label: 'SUPERMERCADO - SALÃO MEIO' });
  boxes.push({ x: 2048, y: 1168, w: 2156 - 2048, h: 6, label: 'SUPERMERCADO - ESCRITÓRIO DIR' });
  boxes.push({ x: 1928, y: 984, w: 6, h: 1040 - 984, label: 'SUPERMERCADO - GERÊNCIA SUP' });
  boxes.push({ x: 1928, y: 1085, w: 6, h: 1168 - 1085, label: 'SUPERMERCADO - GERÊNCIA INF' });

  // Escola Municipal:
  boxes.push({ x: 1584, y: 2028, w: 1700 - 1584, h: 6, label: 'ESCOLA - CORREDOR ESQ' });
  boxes.push({ x: 1750, y: 2028, w: 1970 - 1750, h: 6, label: 'ESCOLA - CORREDOR MEIO' });
  boxes.push({ x: 2020, y: 2028, w: 2156 - 2020, h: 6, label: 'ESCOLA - CORREDOR DIR' });
  boxes.push({ x: 1863, y: 1784, w: 6, h: 2028 - 1784, label: 'ESCOLA - DIVISÓRIA SALAS' });

  // Biblioteca Municipal:
  boxes.push({ x: 2304, y: 1288, w: 2450 - 2304, h: 6, label: 'BIBLIOTECA - LEITURA ESQ' });
  boxes.push({ x: 2515, y: 1288, w: 2696 - 2515, h: 6, label: 'BIBLIOTECA - LEITURA DIR' });

  // Clínica Especializada:
  boxes.push({ x: 2954, y: 2588, w: 3120 - 2954, h: 6, label: 'CLÍNICA - RECEPÇÃO ESQ' });
  boxes.push({ x: 3175, y: 2588, w: 3386 - 3175, h: 6, label: 'CLÍNICA - RECEPÇÃO DIR' });

  // Lake water collision blocks (stepped rectangles along the lake curve)
  boxes.push({ x: 0, y: 350, w: 500, h: 2250, label: 'LAGO ÁGUA PROFUNDA' });
  boxes.push({ x: 500, y: 550, w: 180, h: 1850, label: 'LAGO MARGEM OESTE' });
  boxes.push({ x: 680, y: 800, w: 50, h: 1250, label: 'LAGO COSTA ROCHOSA' });

  // Zoo Outer Perimeter Fence
  // Dimensions: x: 2880 to 3760 (w: 880), y: 850 to 2150 (h: 1300)
  // Main Entrance Gateway is at y: 1320 - 1420 (w: 100 wide completely open gap!)
  const zooX = 2880;
  const zooY = 850;
  const zooW = 880;
  const zooH = 1300;
  const gateY = 1320;
  const gateH = 100;

  // Zoo Top fence
  boxes.push({ x: zooX, y: zooY, w: zooW, h: 16, label: 'GRADE ZOOLÓGICO NORTE' });
  // Zoo Bottom fence
  boxes.push({ x: zooX, y: zooY + zooH - 16, w: zooW, h: 16, label: 'GRADE ZOOLÓGICO SUL' });
  // Zoo East fence
  boxes.push({ x: zooX + zooW - 16, y: zooY, w: 16, h: zooH, label: 'GRADE ZOOLÓGICO LESTE' });
  // Zoo West fence (top section before gate)
  boxes.push({ x: zooX, y: zooY, w: 16, h: gateY - zooY, label: 'GRADE ZOOLÓGICO OESTE SUPERIOR' });
  // Zoo West fence (bottom section after gate)
  boxes.push({ x: zooX, y: gateY + gateH, w: 16, h: (zooY + zooH) - (gateY + gateH), label: 'GRADE ZOOLÓGICO OESTE INFERIOR' });

  // Zoo Internal Security Fence (Separating Public Zoo from Technical Research Area)
  // Along x: 3480 with security gate opening at y: 1250 - 1350 (100px wide open corridor!)
  const secFenceX = 3480;
  const secGateY = 1250;
  const secGateH = 100;
  // Top segment of security fence
  boxes.push({ x: secFenceX, y: zooY, w: 12, h: secGateY - zooY, label: 'CERCA DE SEGURANÇA NORTE' });
  // Bottom segment of security fence
  boxes.push({ x: secFenceX, y: secGateY + secGateH, w: 12, h: (zooY + zooH) - (secGateY + secGateH), label: 'CERCA DE SEGURANÇA SUL' });

  // Zoo 4 Animal Enclosures fences (Animals stay safely inside, trails surrounding are wide!)
  for (const enc of ZOO_ENCLOSURES) {
    if (enc.fenced) {
      const ft = 10;
      boxes.push({ x: enc.x, y: enc.y, w: enc.w, h: ft });
      boxes.push({ x: enc.x, y: enc.y + enc.h - ft, w: enc.w, h: ft });
      boxes.push({ x: enc.x, y: enc.y, w: ft, h: enc.h });
      boxes.push({ x: enc.x + enc.w - ft, y: enc.y, w: ft, h: enc.h });
    }
  }

  // Props with collision (Only Tree Trunks - pier & lamps are non-blocking)
  for (const p of PROPS) {
    if (p.type === 'TREE') {
      boxes.push({ x: p.x + 10, y: p.y + 14, w: p.w - 20, h: p.h - 18 });
    }
  }

  // Solid town furniture & interior objects (Strictly checked to avoid blocking any doorway)
  for (const f of TOWN_FURNITURE) {
    if (f.isSolid) {
      boxes.push({
        x: f.x,
        y: f.y,
        w: f.w,
        h: f.h,
        label: f.label,
      });
    }
  }

  return boxes;
}
