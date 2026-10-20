export type LocationId =
  | 'LAGO'
  | 'RESIDENCIAL_OESTE'
  | 'POSTO_SAUDE'
  | 'FARMACIA'
  | 'PREFEITURA'
  | 'LOJAS'
  | 'CAMARA_MUNICIPAL'
  | 'SUPERMERCADO'
  | 'ESCOLA'
  | 'RESIDENCIAL_SUL'
  | 'BIBLIOTECA'
  | 'ZOOLOGICO'
  | 'CLINICA';

export type RecordStatus = 'RECUPERADO' | 'PARCIAL' | 'CORROMPIDO' | 'BLOQUEADO';

export interface ArchiveRecord {
  id: string;
  title: string;
  location: string;
  locationId: LocationId;
  classification: string;
  date: string;
  status: RecordStatus;
  content: string;
  author?: string;
  foundAt?: number;
  unlockedByDefault?: boolean;
}

export type InteractableType =
  | 'DOOR'
  | 'LOCKED_DOOR'
  | 'COMPUTER'
  | 'TERMINAL'
  | 'CABINET'
  | 'BOOKSHELF'
  | 'MURAL'
  | 'CRATE'
  | 'DOCUMENT'
  | 'SIGN'
  | 'ABANDONED_OBJECT'
  | 'COUNTER';

export interface InteractableObject {
  id: string;
  name: string;
  type: InteractableType;
  x: number;
  y: number;
  width: number;
  height: number;
  locationId: LocationId;
  promptText?: string;
  message?: string;
  archiveRecordId?: string; // Links to an ArchiveRecord
  requiresCode?: string;
  isUnlocked?: boolean;
}

export interface CollisionBox {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
}

export interface GameLocation {
  id: LocationId;
  name: string;
  subname?: string;
  bounds: { x: number; y: number; w: number; h: number };
  description: string;
  color?: string;
}

export interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  isMoving: boolean;
  stepCounter: number;
}

export interface GameSettings {
  audioMuted: boolean;
  crtScanlines: boolean;
  crtFlicker: boolean;
  ambientHum: boolean;
  playerSpeed: number; // 1 to 2
  showTouchControls: boolean;
}

export type ActiveModal =
  | 'NONE'
  | 'INTERACTION'
  | 'ARQUIVO'
  | 'PAUSE'
  | 'SETTINGS'
  | 'CONFIRM_RESET';
