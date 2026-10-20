import React, { useState, useEffect } from 'react';
import { ArchiveRecord, RecordStatus } from '../types';
import { INITIAL_ARCHIVE_RECORDS } from '../data/records';
import { sound } from '../services/sound';

interface ArchiveModalProps {
  discoveredIds: string[];
  onClose: () => void;
}

export const ArchiveModal: React.FC<ArchiveModalProps> = ({
  discoveredIds,
  onClose,
}) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'TODOS' | RecordStatus>('TODOS');
  const [searchQuery, setSearchQuery] = useState('');

  // Discoverable records list
  const allRecords = INITIAL_ARCHIVE_RECORDS;
  const discoveredRecords = allRecords.filter(r => discoveredIds.includes(r.id));

  useEffect(() => {
    sound.playTerminalOpen();
    if (discoveredRecords.length > 0 && !selectedRecordId) {
      setSelectedRecordId(discoveredRecords[0].id);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredRecords = discoveredRecords.filter(r => {
    const matchesStatus = statusFilter === 'TODOS' || r.status === statusFilter;
    const matchesQuery =
      searchQuery === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.classification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const selectedRecord = allRecords.find(r => r.id === selectedRecordId) || discoveredRecords[0] || null;

  const getStatusBadge = (status: RecordStatus) => {
    switch (status) {
      case 'RECUPERADO':
        return <span className="text-[#55FF6A] border border-[#55FF6A] px-1.5 py-0.5 text-[10px] font-bold">RECUPERADO</span>;
      case 'PARCIAL':
        return <span className="text-[#FFB000] border border-[#FFB000] px-1.5 py-0.5 text-[10px] font-bold">PARCIAL</span>;
      case 'CORROMPIDO':
        return <span className="text-[#FF3B4D] border border-[#FF3B4D] px-1.5 py-0.5 text-[10px] font-bold">CORROMPIDO</span>;
      case 'BLOQUEADO':
        return <span className="text-[#478C50] border border-[#478C50] px-1.5 py-0.5 text-[10px] font-bold">BLOQUEADO</span>;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 md:p-6 select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl h-[88vh] border-2 border-[#26E85A] bg-[#020702] text-[#7CFF8B] font-mono shadow-[0_0_40px_rgba(38,232,90,0.3)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b-2 border-[#26E85A] bg-[#051405] px-4 py-2.5 text-xs text-[#55FF6A]">
          <div className="flex items-center gap-2 font-bold tracking-wider">
            <span className="w-2.5 h-2.5 bg-[#55FF6A] inline-block animate-pulse"></span>
            <span>ARQUIVO DE INVESTIGAÇÃO — VALE VERDE (1983)</span>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-0.5 border border-[#26E85A] text-[#7CFF8B] hover:bg-[#55FF6A] hover:text-[#020702] text-xs font-bold transition-colors cursor-pointer"
          >
            [ ESC ] FECHAR
          </button>
        </div>

        {/* Toolbar & Filters */}
        <div className="p-3 md:p-4 border-b border-[#26E85A]/40 bg-[#020902] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Status filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#478C50] mr-1">STATUS:</span>
            {(['TODOS', 'RECUPERADO', 'PARCIAL', 'CORROMPIDO', 'BLOQUEADO'] as const).map(st => (
              <button
                key={st}
                onClick={() => {
                  sound.playKeyClick();
                  setStatusFilter(st);
                }}
                className={`px-2.5 py-1 text-xs border transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'border-[#55FF6A] bg-[#55FF6A] text-[#020702] font-bold'
                    : 'border-[#478C50] text-[#7CFF8B] hover:border-[#55FF6A]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search box & Stats */}
          <div className="flex items-center gap-4">
            <span className="text-[#478C50]">
              TOTAL: <strong className="text-[#55FF6A]">{discoveredRecords.length}</strong> / {allRecords.length}
            </span>
            <input
              type="text"
              placeholder="BUSCAR NO ARQUIVO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#051405] border border-[#26E85A] px-2.5 py-1 text-xs text-[#7CFF8B] focus:outline-none focus:border-[#55FF6A] placeholder-[#478C50]"
            />
          </div>
        </div>

        {/* Two-pane File Browser & Document Reader */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Document List */}
          <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-[#26E85A]/40 overflow-y-auto">
            {filteredRecords.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#478C50] italic">
                Nenhum registro encontrado para este filtro.
              </div>
            ) : (
              <div className="divide-y divide-[#26E85A]/20">
                {filteredRecords.map(record => {
                  const isSelected = record.id === selectedRecordId;
                  return (
                    <div
                      key={record.id}
                      onClick={() => {
                        sound.playKeyClick();
                        setSelectedRecordId(record.id);
                      }}
                      className={`p-3 text-xs cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#0a280d] border-l-4 border-l-[#55FF6A] text-white'
                          : 'hover:bg-[#041a06] text-[#7CFF8B]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] text-[#478C50] font-bold tracking-wider">{record.id}</span>
                        {getStatusBadge(record.status)}
                      </div>
                      <h4 className="font-bold text-[#FFFFFF] text-xs truncate mb-1">
                        {record.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-[#478C50]">
                        <span className="truncate">{record.location}</span>
                        <span>{record.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Detailed Document Viewer */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#010501]">
            {selectedRecord ? (
              <>
                {/* Document metadata banner */}
                <div className="p-4 border-b border-[#26E85A]/40 bg-[#020b02]">
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#478C50] mb-2">
                    <span>REGISTRO: <strong className="text-[#55FF6A]">{selectedRecord.id}</strong></span>
                    <span>DATA: <strong className="text-[#7CFF8B]">{selectedRecord.date}</strong></span>
                    <span>ORIGEM: <strong className="text-[#55FF6A]">{selectedRecord.location}</strong></span>
                  </div>
                  <h3 className="text-base font-bold text-[#FFFFFF] phosphor-glow mb-1">
                    {selectedRecord.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#478C50]">
                    <span>CLASSIFICAÇÃO: <span className="text-[#7CFF8B]">{selectedRecord.classification}</span></span>
                    {getStatusBadge(selectedRecord.status)}
                  </div>
                </div>

                {/* Document text content */}
                <div className="p-4 md:p-6 overflow-y-auto flex-1 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap text-[#7CFF8B]">
                  {selectedRecord.status === 'BLOQUEADO' ? (
                    <div className="border border-[#478C50] bg-[#030d04] p-6 space-y-3 text-center my-auto">
                      <div className="text-[#FFB000] font-bold text-sm tracking-wider">
                        [ ARQUIVO BLOQUEADO ]
                      </div>
                      <div className="text-xs text-[#7CFF8B] leading-relaxed max-w-md mx-auto">
                        ACESSO RESTRITO POR PROTOCOLO DE SEGURANÇA.
                        ESTE DOCUMENTO SÓ PODERÁ SER ABERTO FUTURAMENTE QUANDO A HISTÓRIA PRINCIPAL FOR DEFINIDA.
                      </div>
                      <div className="text-[11px] text-[#478C50] pt-2">
                        REGISTRO IDENTIFICADO · SISTEMA ARQUIVO VALE VERDE (1983)
                      </div>
                    </div>
                  ) : (
                    selectedRecord.content
                  )}
                </div>

                {/* Footer notes */}
                <div className="p-3 border-t border-[#26E85A]/40 bg-[#051405] text-[11px] text-[#478C50] flex items-center justify-between">
                  <span>SISTEMA MUNICIPAL DE ARQUIVAMENTO — ANO BASE 1983</span>
                  <span>CONFIDENCIALIDADE: NÍVEL 2</span>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-[#478C50]">
                SELECIONE UM DOCUMENTO NO DIRETÓRIO À ESQUERDA
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-3 border-t-2 border-[#26E85A] bg-[#051405] flex items-center justify-between text-xs text-[#478C50]">
          <span>Pressione [ESC] para retornar ao mapa de exploração</span>
          <button
            onClick={onClose}
            className="px-4 py-1 bg-[#55FF6A] text-[#020702] font-bold text-xs hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            [ RETORNAR AO JOGO ]
          </button>
        </div>
      </div>
    </div>
  );
};
