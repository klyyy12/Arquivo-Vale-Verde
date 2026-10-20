import React, { useEffect, useState } from 'react';
import { sound } from '../services/sound';

interface TitleScreenProps {
  onStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  const [booting, setBooting] = useState(false);
  const [bootLog, setBootLog] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        triggerStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [booting]);

  const triggerStart = () => {
    if (booting) return;
    setBooting(true);
    sound.playTerminalOpen();

    const logs = [
      '>> VERIFICANDO DIRETÓRIOS MUNICIPAIS...',
      '>> CARREGANDO COORDENADAS: PARQUE ZOOLÓGICO (SETOR LESTE)',
      '>> CALIBRANDO TERMINAIS MONOCROMÁTICOS 1983...',
      '>> ACESSO AUTORIZADO — BEM-VINDO A VALE VERDE.',
    ];

    logs.forEach((msg, i) => {
      setTimeout(() => {
        sound.playKeyClick();
        setBootLog(prev => [...prev, msg]);
      }, (i + 1) * 350);
    });

    setTimeout(() => {
      sound.playLocationIdentified();
      onStart();
    }, (logs.length + 1) * 350 + 200);
  };

  return (
    <div
      onClick={triggerStart}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020702] text-[#7CFF8B] font-mono cursor-pointer select-none p-6"
    >
      <div className="max-w-2xl w-full border-2 border-[#26E85A] p-8 md:p-12 relative shadow-[0_0_40px_rgba(38,232,90,0.2)] bg-[#020702]">
        {/* Header decor */}
        <div className="flex items-center justify-between border-b border-[#26E85A] pb-3 mb-8 text-xs text-[#478C50]">
          <span>TERMINAL DE ACESSO PÚBLICO // ANO 1983</span>
          <span className="tracking-widest">SIS-ARQ v1.0</span>
        </div>

        {/* Mandatory Title & Description Block from User Prompt */}
        <div className="space-y-4 mb-10">
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-[#55FF6A] phosphor-glow">
            PARQUE ZOOLÓGICO VALE VERDE
          </h1>
          <p className="text-sm md:text-base text-[#7CFF8B] tracking-wide">
            CENTRO DE CONSERVAÇÃO E PESQUISA — ARQUIVO 1983
          </p>

          <div className="pt-6 space-y-2 text-sm text-[#478C50]">
            <p className="flex items-center gap-2">
              <span className="text-[#26E85A]">&gt;</span> CARREGANDO MAPA MUNICIPAL...
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#26E85A]">&gt;</span> STATUS: <span className="text-[#FFB000] phosphor-glow-alert font-bold">ACESSO PARCIAL</span>
            </p>
          </div>
        </div>

        {/* Boot sequence logs or CTA prompt */}
        {booting ? (
          <div className="border border-[#26E85A] p-4 bg-[#051405] space-y-2 text-xs md:text-sm text-[#55FF6A]">
            {bootLog.map((line, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span>{line}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-[#7CFF8B] animate-pulse">
              <span>Carregando interface gráfica...</span>
              <span className="inline-block w-2.5 h-4 bg-[#55FF6A]"></span>
            </div>
          </div>
        ) : (
          <div className="border-t border-[#26E85A] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm md:text-base font-bold text-[#55FF6A] phosphor-glow animate-pulse">
              <span>PRESSIONE ENTER PARA INICIAR</span>
              <span className="inline-block w-2.5 h-4 bg-[#55FF6A]"></span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerStart();
              }}
              className="px-5 py-2.5 border-2 border-[#55FF6A] text-[#020702] bg-[#55FF6A] font-bold text-xs tracking-wider hover:bg-white hover:border-white transition-colors cursor-pointer text-center"
            >
              [ INICIAR ]
            </button>
          </div>
        )}

        {/* Controls footer tip */}
        <div className="mt-8 pt-4 border-t border-[#478C50]/40 flex flex-wrap items-center justify-between text-[11px] text-[#478C50]">
          <span>CONTROLES: WASD / SETAS · [E] INTERAGIR · [V] VISÃO 2D/3D · [ESC] MENU</span>
          <span>ARQUIVO MUNICIPAL DE VALE VERDE</span>
        </div>
      </div>
    </div>
  );
};
