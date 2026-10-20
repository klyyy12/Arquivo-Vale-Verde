import React from 'react';
import { GameLocation, InteractableObject } from '../types';

interface HUDProps {
  currentLocation: GameLocation | null;
  discoveredCount: number;
  totalRecordsCount: number;
  locationNotification: string | null;
  nearbyInteractable: InteractableObject | null;
  showTouchControls: boolean;
  isCompromised?: boolean;
  endingMessage?: string | null;
  viewMode?: '2D' | '3D';
  onToggleViewMode?: () => void;
  onInteract: () => void;
  onOpenArchive: () => void;
  onOpenPause: () => void;
  onDirectionInput: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null) => void;
}

export const HUD: React.FC<HUDProps> = ({
  currentLocation,
  discoveredCount,
  totalRecordsCount,
  locationNotification,
  nearbyInteractable,
  showTouchControls,
  isCompromised = false,
  endingMessage = null,
  viewMode = '2D',
  onToggleViewMode,
  onInteract,
  onOpenArchive,
  onOpenPause,
  onDirectionInput,
}) => {
  const paddedCount = String(discoveredCount).padStart(2, '0');
  const paddedTotal = String(totalRecordsCount).padStart(2, '0');

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none flex flex-col justify-between p-4 md:p-6 font-mono text-xs">
      {/* Top Bar / Status */}
      <div className="flex items-start justify-between">
        {/* Discrete Institutional Corner Status with Lucas dos Santos Pereira */}
        <div className="bg-[#020702]/95 border-2 border-[#26E85A] p-3 text-[#7CFF8B] shadow-[0_0_15px_rgba(38,232,90,0.2)] max-w-sm">
          {isCompromised ? (
            <div className="space-y-1">
              <div className="text-[11px] md:text-xs text-[#FF3B4D] font-bold tracking-wider animate-pulse">
                STATUS DO ARQUIVO: COMPROMETIDO
              </div>
              <div className="text-[11px] md:text-xs text-[#FFB000]">
                REGISTROS: <span className="font-bold tabular-nums">20/20</span>
              </div>
            </div>
          ) : (
            <div className="space-y-0.5">
              <div className="text-[11px] md:text-xs text-[#FFFFFF]">
                NOME: <strong className="text-[#FFFFFF] font-bold">LUCAS DOS SANTOS PEREIRA</strong>
              </div>
              <div className="text-[11px] md:text-xs text-[#7CFF8B]">
                OBJETIVO: <strong className="text-[#55FF6A]">INVESTIGAR VALE VERDE</strong>
              </div>
              <div className="text-[11px] md:text-xs text-[#478C50]">
                REGISTROS: <span className="font-bold text-[#55FF6A] tabular-nums">{paddedCount}/{paddedTotal}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {viewMode === '3D' && (
            <div className="flex items-center gap-1 border border-[#26E85A]/70 bg-[#020702]/95 px-1.5 py-1 text-[#7CFF8B] shadow-[0_0_10px_rgba(38,232,90,0.2)]">
              <span className="text-[10px] text-[#478C50] px-0.5 font-bold">CÂMERA:</span>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('turnCamera3D', { detail: { deltaYaw: -0.35 } }))}
                className="px-2 py-0.5 border border-[#26E85A] bg-[#051405] text-[#55FF6A] hover:bg-[#26E85A] hover:text-[#020702] active:bg-[#55FF6A] font-extrabold text-xs cursor-pointer transition-colors"
                title="Girar câmera para a esquerda (Tecla Q)"
              >
                ⟲ Q
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('turnCamera3D', { detail: { deltaYaw: 0.35 } }))}
                className="px-2 py-0.5 border border-[#26E85A] bg-[#051405] text-[#55FF6A] hover:bg-[#26E85A] hover:text-[#020702] active:bg-[#55FF6A] font-extrabold text-xs cursor-pointer transition-colors"
                title="Girar câmera para a direita (Tecla E)"
              >
                E ⟳
              </button>
            </div>
          )}

          {onToggleViewMode && (
            <button
              onClick={onToggleViewMode}
              className="px-3 py-1.5 border border-[#26E85A] bg-[#020702]/90 text-[#7CFF8B] hover:bg-[#26E85A] hover:text-[#020702] font-bold text-xs tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-[0_0_10px_rgba(38,232,90,0.25)]"
              title="Alternar entre visão 2D e 3D (Tecla V)"
            >
              <span className="text-[#55FF6A] font-extrabold">[V]</span> MODO: <span className="text-white font-black bg-[#1b3d22] px-1.5 py-0.5">{viewMode}</span>
            </button>
          )}
          <button
            onClick={onOpenArchive}
            className="px-3 py-1.5 border border-[#26E85A] bg-[#020702]/90 text-[#55FF6A] hover:bg-[#55FF6A] hover:text-[#020702] font-bold text-xs tracking-wider transition-colors cursor-pointer"
          >
            [TAB] ARQUIVO
          </button>
          <button
            onClick={onOpenPause}
            className="px-3 py-1.5 border border-[#26E85A] bg-[#020702]/90 text-[#7CFF8B] hover:bg-[#26E85A] hover:text-[#020702] font-bold text-xs tracking-wider transition-colors cursor-pointer"
          >
            [ESC] PAUSA
          </button>
        </div>
      </div>

      {viewMode === '3D' && !endingMessage && (
        <div className="absolute top-20 right-6 pointer-events-none hidden md:block text-right">
          <span className="bg-[#020702]/85 border border-[#26E85A]/40 px-2.5 py-1 text-[10px] text-[#7CFF8B]/80 font-mono tracking-wide">
            [Mouse Drag / Q-E]: Girar Câmera &bull; [Scroll]: Zoom
          </span>
        </div>
      )}

      {/* Ending sequence centered message */}
      {endingMessage && (
        <div className="self-center my-auto pointer-events-none text-center p-6 md:p-8 max-w-2xl bg-[#020702]/95 border-2 border-[#26E85A] shadow-[0_0_50px_rgba(85,255,106,0.5)] animate-pulse">
          <div className="text-base md:text-2xl font-bold text-[#55FF6A] phosphor-glow tracking-widest whitespace-pre-line">
            {endingMessage}
          </div>
        </div>
      )}

      {/* Center: Location banner announcement (Mandatory requirement) */}
      {!endingMessage && locationNotification && (
        <div className="self-center -mt-24 pointer-events-none">
          <div className="bg-[#020702]/95 border-2 border-[#55FF6A] px-6 py-3 text-center shadow-[0_0_30px_rgba(85,255,106,0.35)] animate-fade-in">
            <div className="text-[10px] md:text-xs tracking-widest text-[#478C50] mb-0.5">
              &gt;&gt; RECONHECIMENTO CARTOGRÁFICO 1983 &lt;&lt;
            </div>
            <div className="text-sm md:text-base font-bold text-[#55FF6A] tracking-wider phosphor-glow">
              LOCALIZAÇÃO IDENTIFICADA: {locationNotification}
            </div>
          </div>
        </div>
      )}

      {/* Interaction Prompt (Floating banner when near interactive entity) */}
      {nearbyInteractable && (
        <div className="self-center mb-6 pointer-events-auto">
          <button
            onClick={onInteract}
            className="group px-6 py-3 border-2 border-[#55FF6A] bg-[#020702] text-[#55FF6A] font-bold text-sm tracking-wider shadow-[0_0_25px_rgba(85,255,106,0.5)] hover:bg-[#55FF6A] hover:text-[#020702] transition-all cursor-pointer flex items-center gap-3 animate-pulse"
          >
            <span className="w-2.5 h-2.5 bg-[#55FF6A] group-hover:bg-[#020702] inline-block"></span>
            <span>[E] INTERAGIR</span>
            <span className="text-xs text-[#7CFF8B] group-hover:text-[#020702]">({nearbyInteractable.name})</span>
          </button>
        </div>
      )}

      {/* Bottom Row / Mobile Virtual Controls */}
      {showTouchControls && (
        <div className="flex items-end justify-between pointer-events-auto pb-2">
          {/* Virtual D-Pad */}
          <div className="relative w-36 h-36 bg-[#020702]/80 border border-[#26E85A]/50 rounded-lg p-1">
            {/* UP */}
            <button
              onPointerDown={() => onDirectionInput('UP')}
              onPointerUp={() => onDirectionInput(null)}
              onPointerLeave={() => onDirectionInput(null)}
              onPointerCancel={() => onDirectionInput(null)}
              className="absolute top-1 left-12 w-12 h-10 border border-[#26E85A] bg-[#051405] text-[#55FF6A] font-bold active:bg-[#55FF6A] active:text-[#020702]"
              aria-label="Mover para cima"
            >
              ▲
            </button>
            {/* DOWN */}
            <button
              onPointerDown={() => onDirectionInput('DOWN')}
              onPointerUp={() => onDirectionInput(null)}
              onPointerLeave={() => onDirectionInput(null)}
              onPointerCancel={() => onDirectionInput(null)}
              className="absolute bottom-1 left-12 w-12 h-10 border border-[#26E85A] bg-[#051405] text-[#55FF6A] font-bold active:bg-[#55FF6A] active:text-[#020702]"
              aria-label="Mover para baixo"
            >
              ▼
            </button>
            {/* LEFT */}
            <button
              onPointerDown={() => onDirectionInput('LEFT')}
              onPointerUp={() => onDirectionInput(null)}
              onPointerLeave={() => onDirectionInput(null)}
              onPointerCancel={() => onDirectionInput(null)}
              className="absolute top-12 left-1 w-10 h-12 border border-[#26E85A] bg-[#051405] text-[#55FF6A] font-bold active:bg-[#55FF6A] active:text-[#020702]"
              aria-label="Mover para esquerda"
            >
              ◀
            </button>
            {/* RIGHT */}
            <button
              onPointerDown={() => onDirectionInput('RIGHT')}
              onPointerUp={() => onDirectionInput(null)}
              onPointerLeave={() => onDirectionInput(null)}
              onPointerCancel={() => onDirectionInput(null)}
              className="absolute top-12 right-1 w-10 h-12 border border-[#26E85A] bg-[#051405] text-[#55FF6A] font-bold active:bg-[#55FF6A] active:text-[#020702]"
              aria-label="Mover para direita"
            >
              ▶
            </button>
          </div>

          {/* Action and 3D Camera buttons */}
          <div className="flex flex-col gap-2 items-end">
            {viewMode === '3D' && (
              <div className="flex gap-2">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('turnCamera3D', { detail: { deltaYaw: -0.4 } }))}
                  className="w-11 h-11 border border-[#26E85A] bg-[#020702]/90 text-[#55FF6A] font-extrabold text-base flex items-center justify-center active:bg-[#26E85A] active:text-[#020702] shadow-[0_0_8px_rgba(38,232,90,0.3)]"
                  aria-label="Girar câmera para esquerda"
                  title="Girar câmera esquerda"
                >
                  ⟲
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('turnCamera3D', { detail: { deltaYaw: 0.4 } }))}
                  className="w-11 h-11 border border-[#26E85A] bg-[#020702]/90 text-[#55FF6A] font-extrabold text-base flex items-center justify-center active:bg-[#26E85A] active:text-[#020702] shadow-[0_0_8px_rgba(38,232,90,0.3)]"
                  aria-label="Girar câmera para direita"
                  title="Girar câmera direita"
                >
                  ⟳
                </button>
              </div>
            )}
            <button
              onClick={onInteract}
              disabled={!nearbyInteractable}
              className={`w-24 h-14 border-2 font-bold text-xs tracking-wider transition-colors cursor-pointer ${
                nearbyInteractable
                  ? 'border-[#55FF6A] bg-[#55FF6A] text-[#020702]'
                  : 'border-[#478C50] bg-[#020702] text-[#478C50]'
              }`}
            >
              [E] INTERAGIR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
