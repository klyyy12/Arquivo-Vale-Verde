import React, { useState, useEffect } from 'react';
import { GameSettings } from '../types';
import { sound } from '../services/sound';

interface PauseModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onResume: () => void;
  onOpenArchive: () => void;
  onResetProgress: () => void;
  viewMode?: '2D' | '3D';
  onToggleViewMode?: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  settings,
  onUpdateSettings,
  onResume,
  onOpenArchive,
  onResetProgress,
  viewMode = '2D',
  onToggleViewMode,
}) => {
  const [activeTab, setActiveTab] = useState<'MENU' | 'SETTINGS' | 'CONFIRM_RESET'>('MENU');

  useEffect(() => {
    sound.playTerminalOpen();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (activeTab === 'MENU') {
          onResume();
        } else {
          setActiveTab('MENU');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, onResume]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 select-none"
      onClick={onResume}
    >
      <div
        className="w-full max-w-md border-2 border-[#26E85A] bg-[#020702] text-[#7CFF8B] font-mono shadow-[0_0_35px_rgba(38,232,90,0.3)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b-2 border-[#26E85A] bg-[#051405] px-4 py-2.5 text-xs text-[#55FF6A]">
          <span className="font-bold tracking-wider">
            {activeTab === 'MENU' && 'TERMINAL DO SISTEMA — PAUSA'}
            {activeTab === 'SETTINGS' && 'CONFIGURAÇÕES DO SISTEMA'}
            {activeTab === 'CONFIRM_RESET' && 'AVISO: REINICIALIZAÇÃO TOTAL'}
          </span>
          <button
            onClick={onResume}
            className="px-2 py-0.5 border border-[#26E85A] text-[#7CFF8B] hover:bg-[#55FF6A] hover:text-[#020702] text-xs font-bold transition-colors cursor-pointer"
          >
            [ ESC ] VOLTAR
          </button>
        </div>

        {/* Content based on sub-tab */}
        {activeTab === 'MENU' && (
          <div className="p-6 space-y-4">
            <div className="text-center pb-2 border-b border-[#26E85A]/30">
              <h2 className="text-lg font-bold text-[#55FF6A] phosphor-glow">
                ARQUIVO VALE VERDE
              </h2>
              <p className="text-xs text-[#478C50] mt-1">SISTEMA MUNICIPAL SUSPENSO</p>
            </div>

            <div className="flex flex-col space-y-3 pt-2">
              <button
                onClick={() => {
                  sound.playKeyClick();
                  onResume();
                }}
                className="w-full py-2.5 px-4 border border-[#26E85A] bg-[#051405] hover:bg-[#55FF6A] hover:text-[#020702] text-sm font-bold text-left tracking-wider transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>&gt; CONTINUAR EXPLORAÇÃO</span>
                <span className="text-xs text-[#478C50]">[ ESC ]</span>
              </button>

              <button
                onClick={() => {
                  sound.playKeyClick();
                  onOpenArchive();
                }}
                className="w-full py-2.5 px-4 border border-[#26E85A] bg-[#051405] hover:bg-[#55FF6A] hover:text-[#020702] text-sm font-bold text-left tracking-wider transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>&gt; ARQUIVO DE INVESTIGAÇÃO</span>
                <span className="text-xs text-[#478C50]">[ TAB ]</span>
              </button>

              {onToggleViewMode && (
                <button
                  onClick={() => {
                    sound.playKeyClick();
                    onToggleViewMode();
                  }}
                  className="w-full py-2.5 px-4 border border-[#26E85A] bg-[#051405] hover:bg-[#55FF6A] hover:text-[#020702] text-sm font-bold text-left tracking-wider transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>&gt; VISÃO: ALTERNAR PARA {viewMode === '2D' ? '3D (TERCEIRA PESSOA)' : '2D (TERMINAL 1983)'}</span>
                  <span className="text-xs text-[#55FF6A] font-bold">[ V ]</span>
                </button>
              )}

              <button
                onClick={() => {
                  sound.playKeyClick();
                  setActiveTab('SETTINGS');
                }}
                className="w-full py-2.5 px-4 border border-[#26E85A] bg-[#051405] hover:bg-[#55FF6A] hover:text-[#020702] text-sm font-bold text-left tracking-wider transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>&gt; CONFIGURAÇÕES DO MONITOR</span>
                <span className="text-xs text-[#478C50]">[ CRT ]</span>
              </button>

              <button
                onClick={() => {
                  sound.playAccessDenied();
                  setActiveTab('CONFIRM_RESET');
                }}
                className="w-full py-2.5 px-4 border border-[#FF3B4D]/60 bg-[#140505] hover:bg-[#FF3B4D] hover:text-white text-sm font-bold text-left tracking-wider transition-colors cursor-pointer text-[#FF3B4D] flex items-center justify-between"
              >
                <span>&gt; REINICIAR PROGRESSO</span>
                <span className="text-xs text-[#FF3B4D]">[ RESET ]</span>
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'SETTINGS' && (
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#55FF6A] border-b border-[#26E85A]/30 pb-2">
              PARÂMETROS DO MONITOR & ÁUDIO
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between cursor-pointer p-2 border border-[#26E85A]/30 hover:border-[#55FF6A]">
                <span>EFEITO SCANLINES (LINHAS CRT)</span>
                <input
                  type="checkbox"
                  checked={settings.crtScanlines}
                  onChange={(e) => {
                    sound.playKeyClick();
                    onUpdateSettings({ ...settings, crtScanlines: e.target.checked });
                  }}
                  className="accent-[#55FF6A]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-2 border border-[#26E85A]/30 hover:border-[#55FF6A]">
                <span>FLICKER RETRO (PULSO DE FÓSFORO)</span>
                <input
                  type="checkbox"
                  checked={settings.crtFlicker}
                  onChange={(e) => {
                    sound.playKeyClick();
                    onUpdateSettings({ ...settings, crtFlicker: e.target.checked });
                  }}
                  className="accent-[#55FF6A]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-2 border border-[#26E85A]/30 hover:border-[#55FF6A]">
                <span>ZUMBIDO AMBIENTE 60Hz CRT</span>
                <input
                  type="checkbox"
                  checked={settings.ambientHum}
                  onChange={(e) => {
                    sound.playKeyClick();
                    const newHum = e.target.checked;
                    onUpdateSettings({ ...settings, ambientHum: newHum });
                    if (newHum) sound.startAmbientHum();
                    else sound.stopAmbientHum();
                  }}
                  className="accent-[#55FF6A]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-2 border border-[#26E85A]/30 hover:border-[#55FF6A]">
                <span>SILENCIAR ÁUDIO GERAL</span>
                <input
                  type="checkbox"
                  checked={settings.audioMuted}
                  onChange={(e) => {
                    sound.playKeyClick();
                    const muted = e.target.checked;
                    sound.setMuted(muted);
                    onUpdateSettings({ ...settings, audioMuted: muted });
                  }}
                  className="accent-[#FF3B4D]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-2 border border-[#26E85A]/30 hover:border-[#55FF6A]">
                <span>CONTROLES DE TOQUE (TOUCH / MOBILE)</span>
                <input
                  type="checkbox"
                  checked={settings.showTouchControls}
                  onChange={(e) => {
                    sound.playKeyClick();
                    onUpdateSettings({ ...settings, showTouchControls: e.target.checked });
                  }}
                  className="accent-[#55FF6A]"
                />
              </label>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  sound.playKeyClick();
                  setActiveTab('MENU');
                }}
                className="w-full py-2 bg-[#55FF6A] text-[#020702] font-bold text-xs tracking-wider hover:bg-white transition-colors cursor-pointer"
              >
                [ SALVAR E RETORNAR ]
              </button>
            </div>
          </div>
        )}

        {/* Confirm Reset Tab */}
        {activeTab === 'CONFIRM_RESET' && (
          <div className="p-6 space-y-4">
            <div className="border border-[#FF3B4D] bg-[#1a0507] p-4 text-xs space-y-2 text-[#FF3B4D]">
              <p className="font-bold text-sm">ATENÇÃO: APAGAR DADOS LOCAIS?</p>
              <p className="text-[#FFB000]">
                Todos os registros encontrados, anotações de exploração e posição do jogador serão redefinidos para os valores de fábrica (1983).
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playKeyClick();
                  setActiveTab('MENU');
                }}
                className="flex-1 py-2 border border-[#26E85A] text-[#7CFF8B] font-bold text-xs hover:bg-[#26E85A] hover:text-[#020702] transition-colors cursor-pointer"
              >
                CANCELAR
              </button>
              <button
                onClick={() => {
                  sound.playAccessDenied();
                  onResetProgress();
                }}
                className="flex-1 py-2 bg-[#FF3B4D] text-white font-bold text-xs hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                CONFIRMAR RESET
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[#26E85A]/40 bg-[#051405] text-[11px] text-[#478C50] text-center">
          ARQUIVO MUNICIPAL DE VALE VERDE — ANO BASE 1983
        </div>
      </div>
    </div>
  );
};
