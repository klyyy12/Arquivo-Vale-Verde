import React, { useEffect, useState } from 'react';
import { ArchiveRecord, InteractableObject } from '../types';
import { sound } from '../services/sound';

interface InteractionModalProps {
  object: InteractableObject | null;
  record: ArchiveRecord | null;
  onClose: () => void;
  onOpenArchive: () => void;
}

export const InteractionModal: React.FC<InteractionModalProps> = ({
  object,
  record,
  onClose,
  onOpenArchive,
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullText = record?.status === 'BLOQUEADO'
    ? '[ ARQUIVO BLOQUEADO // ACESSO RESTRITO ]\n\nACESSO RESTRITO POR PROTOCOLO DE SEGURANÇA.\nESTE DOCUMENTO SÓ PODERÁ SER ABERTO FUTURAMENTE QUANDO A HISTÓRIA PRINCIPAL FOR DEFINIDA.\n\nO REGISTRO FOI INDEXADO AUTOMATICAMENTE NO SEU MENU ARQUIVO.'
    : record?.content || object?.message || 'REGISTRO AINDA NÃO DISPONÍVEL.\nARQUIVO EM PROCESSO DE RECUPERAÇÃO.';

  useEffect(() => {
    sound.playTerminalOpen();

    let currentIndex = 0;
    setDisplayedContent('');
    setIsTypingComplete(false);

    // Fast typewriter effect
    const interval = setInterval(() => {
      currentIndex += 4;
      if (currentIndex >= fullText.length) {
        setDisplayedContent(fullText);
        setIsTypingComplete(true);
        clearInterval(interval);
      } else {
        setDisplayedContent(fullText.slice(0, currentIndex));
        if (currentIndex % 12 === 0) {
          sound.playKeyClick();
        }
      }
    }, 15);

    return () => {
      clearInterval(interval);
      sound.playTerminalClose();
    };
  }, [fullText]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || ((e.key === 'e' || e.key === 'E' || e.key === 'Enter') && isTypingComplete)) {
        e.preventDefault();
        onClose();
      } else if ((e.key === ' ' || e.key === 'e' || e.key === 'E' || e.key === 'Enter') && !isTypingComplete) {
        e.preventDefault();
        // Fast skip typewriter
        setDisplayedContent(fullText);
        setIsTypingComplete(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isTypingComplete, fullText]);

  if (!object) return null;

  const statusColor =
    record?.status === 'RECUPERADO'
      ? 'text-[#55FF6A] border-[#55FF6A]'
      : record?.status === 'PARCIAL'
      ? 'text-[#FFB000] border-[#FFB000]'
      : record?.status === 'CORROMPIDO'
      ? 'text-[#FF3B4D] border-[#FF3B4D]'
      : 'text-[#478C50] border-[#478C50]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-none p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl border-2 border-[#26E85A] bg-[#020702] text-[#7CFF8B] font-mono shadow-[0_0_35px_rgba(38,232,90,0.25)] flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b-2 border-[#26E85A] bg-[#051405] px-4 py-2.5 text-xs text-[#55FF6A]">
          <div className="flex items-center gap-2 font-bold tracking-wider">
            <span className="w-2.5 h-2.5 bg-[#55FF6A] inline-block animate-pulse"></span>
            <span>{record ? 'ARQUIVO MUNICIPAL — REGISTRO 1983' : 'TERMINAL DE CAMPO // OBJETO'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-0.5 border border-[#26E85A] text-[#7CFF8B] hover:bg-[#55FF6A] hover:text-[#020702] text-xs font-bold transition-colors cursor-pointer"
          >
            [ ESC ] FECHAR
          </button>
        </div>

        {/* Dossier Header */}
        <div className="p-4 md:p-6 border-b border-[#26E85A]/40 bg-[#020902] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-[#478C50]">LOCAL: <strong className="text-[#55FF6A]">{record?.location || object.locationId}</strong></span>
            {record?.date && (
              <span className="text-[#478C50]">DATAÇÃO: <strong className="text-[#7CFF8B]">{record.date}</strong></span>
            )}
          </div>

          <h2 className="text-base md:text-lg font-bold text-[#FFFFFF] tracking-wide phosphor-glow">
            {record?.title || object.name}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
            <span className="text-[#478C50]">CLASSIFICAÇÃO: <span className="text-[#7CFF8B]">{record?.classification || 'DOCUMENTO SEM CLASSIFICAÇÃO'}</span></span>
            {record?.status && (
              <span className={`px-2 py-0.5 border text-[11px] font-bold ${statusColor}`}>
                STATUS: {record.status}
              </span>
            )}
          </div>
        </div>

        {/* Document Content Box */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-mono text-[#7CFF8B] selection:bg-[#26E85A] selection:text-[#020702]">
          {displayedContent}
          {!isTypingComplete && (
            <span className="inline-block w-2 h-4 bg-[#55FF6A] ml-1 animate-pulse"></span>
          )}
        </div>

        {/* Footer actions */}
        <div className="border-t border-[#26E85A] px-4 py-3 bg-[#051405] flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-[#478C50]">
            {isTypingComplete ? 'LEITURA CONCLUÍDA' : 'PRESSIONE [ESPAÇO] PARA PULAR DIGITAÇÃO'}
          </span>

          <div className="flex items-center gap-2">
            {record && (
              <button
                onClick={() => {
                  onClose();
                  onOpenArchive();
                }}
                className="px-3 py-1.5 border border-[#26E85A] text-[#55FF6A] hover:bg-[#26E85A] hover:text-[#020702] font-bold transition-colors cursor-pointer"
              >
                [ VER NO ARQUIVO DE INVESTIGAÇÃO ]
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-[#55FF6A] text-[#020702] border border-[#55FF6A] font-bold hover:bg-white hover:border-white transition-colors cursor-pointer"
            >
              [ OK ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
