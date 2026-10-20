/**
 * ARQUIVO VALE VERDE (1983)
 * Digital Narrative ARG Exploration Game
 * Protagonist: Lucas dos Santos Pereira
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ActiveModal,
  ArchiveRecord,
  GameLocation,
  GameSettings,
  InteractableObject,
  LocationId,
} from './types';
import { TitleScreen } from './components/TitleScreen';
import { GameCanvas } from './components/GameCanvas';
import { GameCanvas3D } from './components/3d/GameCanvas3D';
import { HUD } from './components/HUD';
import { InteractionModal } from './components/InteractionModal';
import { ArchiveModal } from './components/ArchiveModal';
import { PauseModal } from './components/PauseModal';
import { LOCATIONS } from './data/locations';
import { INITIAL_ARCHIVE_RECORDS } from './data/records';
import { SPAWN_POINT } from './data/worldMap';
import {
  clearGameData,
  loadGameData,
  saveGameData,
  defaultSaveData,
} from './services/storage';
import { sound } from './services/sound';

type EndingPhase =
  | 'NONE'
  | 'READING_DOC_20'
  | 'GLITCHING'
  | 'DISCOVERED_TOO_MUCH'
  | 'LOCATING_USER'
  | 'FADING_OUT'
  | 'FILE_CLOSED';

export default function App() {
  const [inTitleScreen, setInTitleScreen] = useState(true);
  const [activeModal, setActiveModal] = useState<ActiveModal>('NONE');

  // Loaded save data state
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>(() => {
    const data = loadGameData();
    return data.playerPos || SPAWN_POINT;
  });

  const [discoveredRecordIds, setDiscoveredRecordIds] = useState<string[]>(() => {
    const data = loadGameData();
    return data.discoveredRecordIds || defaultSaveData.discoveredRecordIds;
  });

  const [settings, setSettings] = useState<GameSettings>(() => {
    const data = loadGameData();
    const isMobileDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return {
      ...data.settings,
      showTouchControls: data.settings.showTouchControls || isMobileDevice,
    };
  });

  // Gameplay state
  const [currentLocationId, setCurrentLocationId] = useState<LocationId>('ZOOLOGICO');
  const [locationNotification, setLocationNotification] = useState<string | null>(null);
  const [nearbyInteractable, setNearbyInteractable] = useState<InteractableObject | null>(null);
  const [activeInteractionObject, setActiveInteractionObject] = useState<InteractableObject | null>(null);
  const [activeRecord, setActiveRecord] = useState<ArchiveRecord | null>(null);

  // Ending sequence state machine
  const [endingPhase, setEndingPhase] = useState<EndingPhase>('NONE');
  const [endingMessage, setEndingMessage] = useState<string | null>(null);
  const [darknessLevel, setDarknessLevel] = useState<number>(0);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [playerInterferenceMode, setPlayerInterferenceMode] = useState<boolean>(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(true);
  const [isCompromised, setIsCompromised] = useState<boolean>(false);
  const [postEndingSilentBoot, setPostEndingSilentBoot] = useState<boolean>(false);

  // Touch controls input
  const [touchDirection, setTouchDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null>(null);

  // 2D / 3D Graphics View Mode
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');

  const handleToggleViewMode = useCallback(() => {
    sound.playKeyClick();
    setViewMode((prev) => (prev === '2D' ? '3D' : '2D'));
  }, []);

  // Global shortcut 'V' to toggle view mode at any moment
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'v' || e.key === 'V') &&
        !inTitleScreen &&
        activeModal === 'NONE' &&
        endingPhase === 'NONE'
      ) {
        handleToggleViewMode();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [inTitleScreen, activeModal, endingPhase, handleToggleViewMode]);

  const notificationTimeoutRef = useRef<number | null>(null);
  const endingTimersRef = useRef<number[]>([]);

  // Clear ending sequence timers on unmount
  useEffect(() => {
    return () => {
      endingTimersRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  // Sync audio mute with settings (unless in silent post-ending reboot)
  useEffect(() => {
    if (postEndingSilentBoot) {
      sound.setMuted(true);
      sound.stopAmbientHum();
      return;
    }

    sound.setMuted(settings.audioMuted);
    if (settings.ambientHum && endingPhase === 'NONE') {
      sound.startAmbientHum();
    } else {
      sound.stopAmbientHum();
    }
  }, [settings.audioMuted, settings.ambientHum, endingPhase, postEndingSilentBoot]);

  // Handle location discovery announcement
  const handleLocationChange = useCallback((locId: LocationId) => {
    setCurrentLocationId(locId);
    const loc = LOCATIONS[locId];
    if (loc && endingPhase === 'NONE' && !postEndingSilentBoot) {
      sound.playLocationIdentified();
      setLocationNotification(loc.name);

      if (notificationTimeoutRef.current) {
        window.clearTimeout(notificationTimeoutRef.current);
      }
      notificationTimeoutRef.current = window.setTimeout(() => {
        setLocationNotification(null);
      }, 4000);
    }
  }, [endingPhase, postEndingSilentBoot]);

  // Trigger eerie climax sequence after Document 20 is read
  const startEndingSequence = useCallback(() => {
    setEndingPhase('READING_DOC_20');

    // 1. Fechar o documento após alguns segundos
    const t1 = window.setTimeout(() => {
      setActiveModal('NONE');

      // 2. Tela apresenta glitches discretos e som ambiente falha
      // 3. Alterar interface para REGISTROS: 20/20 · STATUS DO ARQUIVO: COMPROMETIDO
      setEndingPhase('GLITCHING');
      setIsCompromised(true);
      setGlitchActive(true);
      sound.playGlitch();
      sound.failAmbientHum();

      // 4. Mostrar no centro da tela: VOCÊ DESCOBRIU DEMAIS.
      const t2 = window.setTimeout(() => {
        setEndingPhase('DISCOVERED_TOO_MUCH');
        setEndingMessage('VOCÊ DESCOBRIU DEMAIS.');
        sound.playGlitch();

        // 5. Trocar a mensagem para: LOCALIZANDO USUÁRIO... LUCAS DOS SANTOS PEREIRA: ENCONTRADO.
        const t3 = window.setTimeout(() => {
          setEndingPhase('LOCATING_USER');
          sound.playScannerPing();
          setEndingMessage('LOCALIZANDO USUÁRIO...\nLUCAS DOS SANTOS PEREIRA: ENCONTRADO.');

          // 6. A tela escurece gradualmente. Lucas desaparece do mapa.
          // 7. Exibir apenas silhueta ou marca de interferência no local onde ele estava.
          const t4 = window.setTimeout(() => {
            setEndingPhase('FADING_OUT');
            setEndingMessage(null);
            setIsPlayerVisible(false);
            setPlayerInterferenceMode(true);
            setDarknessLevel(0.75);
            sound.playGlitch();

            // 8. Mensagem final: O ARQUIVO FOI ENCERRADO. NENHUM USUÁRIO ATIVO FOI ENCONTRADO.
            const t5 = window.setTimeout(() => {
              setEndingPhase('FILE_CLOSED');
              setPlayerInterferenceMode(false);
              setGlitchActive(false);
              setDarknessLevel(1.0);
              setEndingMessage('O ARQUIVO FOI ENCERRADO.\nNENHUM USUÁRIO ATIVO FOI ENCONTRADO.');
              sound.playScannerPing();

              // 9. Voltar para a tela inicial do jogo
              const t6 = window.setTimeout(() => {
                // Save state noting ending completion
                saveGameData({
                  version: 1,
                  playerPos,
                  discoveredRecordIds: INITIAL_ARCHIVE_RECORDS.map(r => r.id),
                  readRecordIds: [],
                  settings,
                  hasFinishedEnding: true,
                  lastUpdated: Date.now(),
                });

                setEndingPhase('NONE');
                setEndingMessage(null);
                setDarknessLevel(0);
                setIsCompromised(false);
                setInTitleScreen(true);
              }, 5000);
              endingTimersRef.current.push(t6);
            }, 3000);
            endingTimersRef.current.push(t5);
          }, 3500);
          endingTimersRef.current.push(t4);
        }, 3500);
        endingTimersRef.current.push(t3);
      }, 1500);
      endingTimersRef.current.push(t2);
    }, 4500);
    endingTimersRef.current.push(t1);
  }, [playerPos, settings]);

  // Trigger interaction with the closest object
  const triggerInteraction = useCallback(() => {
    if (!nearbyInteractable || endingPhase !== 'NONE') return;

    // Special handling for Document 20 (Zoológico - Terminal Antigo)
    if (nearbyInteractable.archiveRecordId === 'DOC-20') {
      const otherRecordsCount = discoveredRecordIds.filter(id => id !== 'DOC-20').length;

      // Document 20 requires finding the other 19 documents first!
      if (otherRecordsCount < 19) {
        sound.playAccessDenied();
        setActiveInteractionObject({
          ...nearbyInteractable,
          name: 'TERMINAL ANTIGO DO ZOOLÓGICO',
          message: `SISTEMA BLOQUEADO POR PROTOCOLO DE SEGURANÇA.\n\nACESSO RESTRITO // TERMINAL MONOCROMÁTICO 1983\n\nREQUISITO: 19 REGISTROS DE INVESTIGAÇÃO MUNICIPAL.\nREGISTROS ENCONTRADOS POR LUCAS: ${String(otherRecordsCount).padStart(2, '0')}/19.\n\nCOLETE TODOS OS DOCUMENTOS DE VALE VERDE PARA LIBERAR O ACESSO A ESTE TERMINAL.`,
        });
        setActiveRecord(null);
        setActiveModal('INTERACTION');
        return;
      }

      // Lucas has found all 19 other documents! Unlock Document 20!
      const doc20 = INITIAL_ARCHIVE_RECORDS.find(r => r.id === 'DOC-20')!;
      const nextDiscovered = Array.from(new Set([...discoveredRecordIds, 'DOC-20']));
      setDiscoveredRecordIds(nextDiscovered);
      setActiveInteractionObject(nearbyInteractable);
      setActiveRecord({
        ...doc20,
        status: 'RECUPERADO',
      });
      setActiveModal('INTERACTION');
      sound.playRecordDiscovered();

      // Save full archive
      saveGameData({
        version: 1,
        playerPos,
        discoveredRecordIds: nextDiscovered,
        readRecordIds: [],
        settings,
        lastUpdated: Date.now(),
      });

      // Start the final ending sequence!
      startEndingSequence();
      return;
    }

    sound.playInteract();
    setActiveInteractionObject(nearbyInteractable);

    // If item links to an archive record, check if newly discovered
    if (nearbyInteractable.archiveRecordId) {
      const rec = INITIAL_ARCHIVE_RECORDS.find(r => r.id === nearbyInteractable.archiveRecordId);
      if (rec) {
        setActiveRecord(rec);
        if (!discoveredRecordIds.includes(rec.id)) {
          sound.playRecordDiscovered();
          const nextDiscovered = [...discoveredRecordIds, rec.id];
          setDiscoveredRecordIds(nextDiscovered);

          // If this was the 19th document found, notify player about the ancient terminal!
          if (nextDiscovered.filter(id => id !== 'DOC-20').length === 19) {
            setTimeout(() => {
              setLocationNotification('SINAL DETECTADO NO TERMINAL ANTIGO DO ZOOLÓGICO');
            }, 1000);
          }

          // Auto-save discovered document
          saveGameData({
            version: 1,
            playerPos,
            discoveredRecordIds: nextDiscovered,
            readRecordIds: [],
            settings,
            lastUpdated: Date.now(),
          });
        }
      } else {
        setActiveRecord(null);
      }
    } else {
      setActiveRecord(null);
    }

    setActiveModal('INTERACTION');
  }, [nearbyInteractable, discoveredRecordIds, playerPos, settings, endingPhase, startEndingSequence]);

  // Global Hotkeys (Escape & Tab)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inTitleScreen || endingPhase !== 'NONE') return;

      if (e.key === 'Escape') {
        e.preventDefault();
        if (activeModal !== 'NONE') {
          setActiveModal('NONE');
        } else {
          setActiveModal('PAUSE');
        }
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        if (activeModal === 'ARQUIVO') {
          setActiveModal('NONE');
        } else {
          setActiveModal('ARQUIVO');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inTitleScreen, activeModal, endingPhase]);

  // Periodic Auto-save
  useEffect(() => {
    if (inTitleScreen || endingPhase !== 'NONE') return;

    const interval = setInterval(() => {
      saveGameData({
        version: 1,
        playerPos,
        discoveredRecordIds,
        readRecordIds: [],
        settings,
        lastUpdated: Date.now(),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [inTitleScreen, playerPos, discoveredRecordIds, settings, endingPhase]);

  // Handle Game Start from Title Screen
  const handleGameStart = () => {
    const saved = loadGameData();
    setInTitleScreen(false);

    // 10. Ao iniciar novamente após o encerramento:
    // manter os documentos desbloqueados no Arquivo, mas deixar o mapa vazio, silencioso
    // e sem o personagem visível por alguns segundos antes de restaurar o jogo normal.
    if (saved.hasFinishedEnding) {
      setPostEndingSilentBoot(true);
      setIsPlayerVisible(false);
      setLocationNotification('RESTABELECENDO PARÂMETROS DO MAPA...');

      setTimeout(() => {
        setIsPlayerVisible(true);
        setPostEndingSilentBoot(false);
        setLocationNotification('LUCAS: SINAL DE INVESTIGAÇÃO RECONECTADO');
        if (settings.ambientHum) {
          sound.startAmbientHum();
        }
        // Reset the one-shot flag
        saveGameData({
          ...saved,
          hasFinishedEnding: false,
        });
      }, 5000);
    } else {
      setIsPlayerVisible(true);
      setPostEndingSilentBoot(false);
      handleLocationChange('ZOOLOGICO');
    }
  };

  // Reset Progress handler
  const handleResetProgress = () => {
    clearGameData();
    setPlayerPos(SPAWN_POINT);
    setDiscoveredRecordIds(defaultSaveData.discoveredRecordIds);
    setIsCompromised(false);
    setEndingPhase('NONE');
    setEndingMessage(null);
    setDarknessLevel(0);
    setIsPlayerVisible(true);
    setPostEndingSilentBoot(false);
    setActiveModal('NONE');
    setInTitleScreen(true);
  };

  const currentLocation = LOCATIONS[currentLocationId] || null;

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-[#020702] font-mono select-none ${
        settings.crtFlicker ? 'crt-flicker-active' : ''
      }`}
    >
      {/* Title Screen Modal */}
      {inTitleScreen && (
        <TitleScreen onStart={handleGameStart} />
      )}

      {/* Main Game Canvas (2D Retro Terminal or 3D Low-Poly Third-Person) */}
      {viewMode === '2D' ? (
        <GameCanvas
          playerPos={playerPos}
          onPlayerMove={(pos) => setPlayerPos(pos)}
          onLocationChange={handleLocationChange}
          onNearbyObjectChange={setNearbyInteractable}
          onTriggerInteraction={triggerInteraction}
          touchDirection={touchDirection}
          speedMultiplier={settings.playerSpeed}
          isPaused={inTitleScreen || activeModal !== 'NONE' || endingPhase !== 'NONE'}
          isPlayerVisible={isPlayerVisible}
          playerInterferenceMode={playerInterferenceMode}
          darknessLevel={darknessLevel}
          glitchActive={glitchActive}
          discoveredRecordIds={discoveredRecordIds}
        />
      ) : (
        <GameCanvas3D
          playerPos={playerPos}
          onPlayerMove={(pos) => setPlayerPos(pos)}
          onLocationChange={handleLocationChange}
          onNearbyObjectChange={setNearbyInteractable}
          onTriggerInteraction={triggerInteraction}
          touchDirection={touchDirection}
          speedMultiplier={settings.playerSpeed}
          isPaused={inTitleScreen || activeModal !== 'NONE' || endingPhase !== 'NONE'}
          isPlayerVisible={isPlayerVisible}
          playerInterferenceMode={playerInterferenceMode}
          darknessLevel={darknessLevel}
          glitchActive={glitchActive}
          discoveredRecordIds={discoveredRecordIds}
        />
      )}

      {/* Heads Up Display (HUD) */}
      {!inTitleScreen && (
        <HUD
          currentLocation={currentLocation}
          discoveredCount={discoveredRecordIds.length}
          totalRecordsCount={INITIAL_ARCHIVE_RECORDS.length}
          locationNotification={locationNotification}
          nearbyInteractable={endingPhase === 'NONE' ? nearbyInteractable : null}
          showTouchControls={settings.showTouchControls && endingPhase === 'NONE'}
          isCompromised={isCompromised}
          endingMessage={endingMessage}
          viewMode={viewMode}
          onToggleViewMode={handleToggleViewMode}
          onInteract={triggerInteraction}
          onOpenArchive={() => setActiveModal('ARQUIVO')}
          onOpenPause={() => setActiveModal('PAUSE')}
          onDirectionInput={setTouchDirection}
        />
      )}

      {/* Interactive Item / Terminal Modal */}
      {activeModal === 'INTERACTION' && (
        <InteractionModal
          object={activeInteractionObject}
          record={activeRecord}
          onClose={() => {
            if (endingPhase === 'READING_DOC_20') {
              // If player closes early, proceed to glitch phase immediately
              setActiveModal('NONE');
            } else {
              setActiveModal('NONE');
            }
          }}
          onOpenArchive={() => setActiveModal('ARQUIVO')}
        />
      )}

      {/* ARQUIVO DE INVESTIGAÇÃO Dossier Screen */}
      {activeModal === 'ARQUIVO' && (
        <ArchiveModal
          discoveredIds={discoveredRecordIds}
          onClose={() => setActiveModal('NONE')}
        />
      )}

      {/* Pause & Settings Screen */}
      {activeModal === 'PAUSE' && (
        <PauseModal
          settings={settings}
          viewMode={viewMode}
          onToggleViewMode={handleToggleViewMode}
          onUpdateSettings={(newSettings) => {
            setSettings(newSettings);
            saveGameData({
              version: 1,
              playerPos,
              discoveredRecordIds,
              readRecordIds: [],
              settings: newSettings,
              lastUpdated: Date.now(),
            });
          }}
          onResume={() => setActiveModal('NONE')}
          onOpenArchive={() => setActiveModal('ARQUIVO')}
          onResetProgress={handleResetProgress}
        />
      )}

      {/* CRT Scanline and Vignette Screen Overlays */}
      {settings.crtScanlines && (
        <div className="fixed inset-0 crt-scanlines pointer-events-none z-40" />
      )}
      <div className="fixed inset-0 crt-vignette pointer-events-none z-40" />
    </div>
  );
}
