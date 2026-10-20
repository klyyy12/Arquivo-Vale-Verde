import { ArchiveRecord, GameSettings } from '../types';
import { INITIAL_ARCHIVE_RECORDS } from '../data/records';
import { SPAWN_POINT } from '../data/worldMap';

const STORAGE_KEY = 'arquivo_vale_verde_save_v1';

export interface SaveData {
  version: number;
  playerPos: { x: number; y: number };
  discoveredRecordIds: string[];
  readRecordIds: string[];
  settings: GameSettings;
  hasFinishedEnding?: boolean;
  lastUpdated: number;
}

const DEFAULT_SETTINGS: GameSettings = {
  audioMuted: false,
  crtScanlines: true,
  crtFlicker: true,
  ambientHum: false,
  playerSpeed: 1.0,
  showTouchControls: false,
};

export const defaultSaveData: SaveData = {
  version: 1,
  playerPos: { x: SPAWN_POINT.x, y: SPAWN_POINT.y },
  discoveredRecordIds: INITIAL_ARCHIVE_RECORDS.filter(r => r.unlockedByDefault).map(r => r.id),
  readRecordIds: [],
  settings: DEFAULT_SETTINGS,
  hasFinishedEnding: false,
  lastUpdated: Date.now(),
};

export function loadGameData(): SaveData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSaveData;
    const parsed = JSON.parse(raw) as Partial<SaveData>;
    return {
      version: 1,
      playerPos: parsed.playerPos || defaultSaveData.playerPos,
      discoveredRecordIds: Array.isArray(parsed.discoveredRecordIds)
        ? Array.from(new Set([...defaultSaveData.discoveredRecordIds, ...parsed.discoveredRecordIds]))
            .filter(id => INITIAL_ARCHIVE_RECORDS.some(r => r.id === id))
        : defaultSaveData.discoveredRecordIds,
      readRecordIds: Array.isArray(parsed.readRecordIds) ? parsed.readRecordIds : [],
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) },
      hasFinishedEnding: Boolean(parsed.hasFinishedEnding),
      lastUpdated: parsed.lastUpdated || Date.now(),
    };
  } catch (e) {
    console.error('Failed to load save data:', e);
    return defaultSaveData;
  }
}

export function saveGameData(data: SaveData): void {
  try {
    const toSave: SaveData = {
      ...data,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.error('Failed to save game data:', e);
  }
}

export function clearGameData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear game data:', e);
  }
}
