import { ArchiveRecord } from '../types';

export const INITIAL_ARCHIVE_RECORDS: ArchiveRecord[] = [
  // 1. LOCAL: LAGO
  {
    id: 'DOC-01',
    title: 'RELATÓRIO DE MANUTENÇÃO DA MARGEM',
    location: 'LAGO',
    locationId: 'LAGO',
    classification: 'DEPARTAMENTO DE ÁGUAS // PROTOCOLO',
    date: '03/06/1983',
    status: 'RECUPERADO',
    unlockedByDefault: false,
    content: `A limpeza da margem foi suspensa às 16h40. A equipe relatou ruídos vindos da água, embora não houvesse embarcações no local. Nenhum equipamento foi deixado para trás.`,
  },

  // 2. LOCAL: LAGO
  {
    id: 'DOC-02',
    title: 'BILHETE ENCONTRADO',
    location: 'LAGO',
    locationId: 'LAGO',
    classification: 'DOCUMENTO AVULSO // MANUSCRITO',
    date: 'SEM DATA',
    status: 'PARCIAL',
    unlockedByDefault: false,
    content: `Não volte ao lago depois que as luzes do zoológico apagarem. Não é a água que está se movendo.`,
  },

  // 3. LOCAL: POSTO DE SAÚDE
  {
    id: 'DOC-03',
    title: 'REGISTRO DE ATENDIMENTO',
    location: 'POSTO DE SAÚDE',
    locationId: 'POSTO_SAUDE',
    classification: 'PRONTUÁRIO CLÍNICO MUNICIPAL',
    date: '11/08/1983',
    status: 'PARCIAL',
    unlockedByDefault: false,
    content: `Paciente apresentou insônia, náusea e afirma ter ouvido uma gravação repetindo seu nome. Encaminhamento recusado pelo responsável.`,
  },

  // 4. LOCAL: FARMÁCIA
  {
    id: 'DOC-04',
    title: 'CONTROLE DE ESTOQUE',
    location: 'FARMÁCIA',
    locationId: 'FARMACIA',
    classification: 'LIVRO DE ENTRADA E SAÍDA',
    date: '12/08/1983',
    status: 'RECUPERADO',
    unlockedByDefault: false,
    content: `Itens recebidos: analgésicos, gaze, antissépticos e caixas sem identificação. As caixas sem identificação foram recolhidas por funcionários do Parque Zoológico Vale Verde.`,
  },

  // 5. LOCAL: PREFEITURA
  {
    id: 'DOC-05',
    title: 'COMUNICADO INTERNO',
    location: 'PREFEITURA',
    locationId: 'PREFEITURA',
    classification: 'GABINETE DO EXECUTIVO // CONFIDENCIAL',
    date: '14/09/1983',
    status: 'RECUPERADO',
    unlockedByDefault: false,
    content: `A visita técnica ao Parque Zoológico Vale Verde foi adiada. Não divulgar o motivo. Todos os registros relacionados ao setor de pesquisa devem permanecer arquivados.`,
  },

  // 6. LOCAL: PREFEITURA
  {
    id: 'DOC-06',
    title: 'DESPACHO MUNICIPAL',
    location: 'PREFEITURA',
    locationId: 'PREFEITURA',
    classification: 'OFÍCIO ADMINISTRATIVO',
    date: '16/09/1983',
    status: 'CORROMPIDO',
    unlockedByDefault: false,
    content: `Solicitação aprovada para isolamento temporário da área próxima ao zoológico. Motivo declarado: [DADOS ILEGÍVEIS].`,
  },

  // 7. LOCAL: LOJA
  {
    id: 'DOC-07',
    title: 'RECIBO DE COMPRA',
    location: 'LOJA',
    locationId: 'LOJAS',
    classification: 'COMPROVANTE FISCAL COMERCIAL',
    date: '20/09/1983',
    status: 'RECUPERADO',
    unlockedByDefault: false,
    content: `Comprador: Centro de Conservação e Pesquisa. Itens: cabos, fita magnética, lâmpadas, pilhas e peças para monitor.`,
  },

  // 8. LOCAL: SUPERMERCADO
  {
    id: 'DOC-08',
    title: 'LISTA DE COMPRAS ESQUECIDA',
    location: 'SUPERMERCADO',
    locationId: 'SUPERMERCADO',
    classification: 'ANOTAÇÃO EM PAPEL DE RASCUNHO',
    date: 'SEM DATA',
    status: 'RECUPERADO',
    unlockedByDefault: false,
    content: `Pão, leite, café, ração, fita cassete, pilhas, não esquecer de perguntar sobre o portão.`,
  },

  // 9. LOCAL: ESCOLA
  {
    id: 'DOC-09',
    title: 'BOLETIM ESCOLAR',
    location: 'ESCOLA',
    locationId: 'ESCOLA',
    classification: 'COORDENAÇÃO PEDAGÓGICA // AVISO',
    date: '22/09/1983',
    status: 'PARCIAL',
    unlockedByDefault: false,
    content: `Atividade cancelada: visita ao Parque Zoológico Vale Verde. Motivo informado: manutenção inesperada. Observação escrita à mão: ‘Mas ninguém viu obra nenhuma.’`,
  },

  // 10. LOCAL: ESCOLA
  {
    id: 'DOC-10',
    title: 'REDAÇÃO SEM NOME',
    location: 'ESCOLA',
    locationId: 'ESCOLA',
    classification: 'EXERCÍCIO DE LÍNGUA PORTUGUESA',
    date: '1983',
    status: 'RECUPERADO',
    unlockedByDefault: false,
    content: `Meu pai diz que os animais sabem coisas que a gente não sabe. Ontem um deles ficou olhando para a janela da nossa casa por muito tempo.`,
  },

  // 11. LOCAL: BIBLIOTECA
  {
    id: 'DOC-11',
    title: 'REGISTRO DE EMPRÉSTIMO',
    location: 'BIBLIOTECA',
    locationId: 'BIBLIOTECA',
    classification: 'FICHA DE CONTROLE BIBLIOGRÁFICO',
    date: '25/09/1983',
    status: 'RECUPERADO',
    unlockedByDefault: false,
    content: `Obra retirada: ‘Comportamento Animal e Resposta a Estímulos Sonoros’. Devolução prevista para 02/10/1983. Usuário: [ACESSO RESTRITO].`,
  },

  // 12. LOCAL: BIBLIOTECA
  {
    id: 'DOC-12',
    title: 'RECORTE DE JORNAL',
    location: 'BIBLIOTECA',
    locationId: 'BIBLIOTECA',
    classification: 'HEMEROTECA // GAZETA MUNICIPAL',
    date: '28/09/1983',
    status: 'PARCIAL',
    unlockedByDefault: false,
    content: `Feira de Invenções atrai visitantes à região. Entre os destaques, o Parque Zoológico Vale Verde apresentaria uma demonstração experimental. A apresentação foi removida da programação horas antes do evento.`,
  },

  // 13. LOCAL: CÂMARA MUNICIPAL
  {
    id: 'DOC-13',
    title: 'ATA DA REUNIÃO',
    location: 'CÂMARA MUNICIPAL',
    locationId: 'CAMARA_MUNICIPAL',
    classification: 'LIVRO DE ATAS LEGISLATIVAS',
    date: '30/09/1983',
    status: 'RECUPERADO',
    unlockedByDefault: false,
    content: `Foi discutido o aumento de gastos com energia elétrica no Parque Zoológico Vale Verde. A administração declarou que os equipamentos estavam desligados durante a noite.`,
  },

  // 14. LOCAL: CÂMARA MUNICIPAL
  {
    id: 'DOC-14',
    title: 'GRAVAÇÃO TRANSCRITA',
    location: 'CÂMARA MUNICIPAL',
    locationId: 'CAMARA_MUNICIPAL',
    classification: 'TRANSCRIÇÃO DE ÁUDIO MAGNÉTICO',
    date: '30/09/1983',
    status: 'CORROMPIDO',
    unlockedByDefault: false,
    content: `— O sinal veio de onde?
— Do setor antigo.
— Mas aquele setor foi fechado.
— Eu sei.
[FIM DO REGISTRO]`,
  },

  // 15. LOCAL: CLÍNICA
  {
    id: 'DOC-15',
    title: 'RELATÓRIO CLÍNICO',
    location: 'CLÍNICA',
    locationId: 'CLINICA',
    classification: 'AVALIAÇÃO OCUPACIONAL',
    date: '01/10/1983',
    status: 'PARCIAL',
    unlockedByDefault: false,
    content: `Funcionário do zoológico apresenta forte estresse, lapsos de memória e recusa-se a retornar ao laboratório. Relata que ‘os computadores continuaram ligados’.`,
  },

  // 16. LOCAL: ÁREA RESIDENCIAL
  {
    id: 'DOC-16',
    title: 'DIÁRIO DE MORADOR',
    location: 'ÁREA RESIDENCIAL',
    locationId: 'RESIDENCIAL_SUL',
    classification: 'CADERNO PESSOAL',
    date: '02/10/1983',
    status: 'RECUPERADO',
    unlockedByDefault: false,
    content: `23h17. As luzes do zoológico acenderam outra vez. Não vi ninguém entrando. Ouvi um som metálico, como se algo muito grande estivesse sendo arrastado.`,
  },

  // 17. LOCAL: ZOOLÓGICO
  {
    id: 'DOC-17',
    title: 'AVISO AOS VISITANTES',
    location: 'ZOOLÓGICO',
    locationId: 'ZOOLOGICO',
    classification: 'CARTAZ OFICIAL DO PARQUE',
    date: '1983',
    status: 'RECUPERADO',
    unlockedByDefault: false,
    content: `Para sua segurança, permaneça nas áreas autorizadas. Não alimente os animais. Não se aproxime de instalações identificadas como RESTRITAS.`,
  },

  // 18. LOCAL: ZOOLÓGICO — ADMINISTRAÇÃO
  {
    id: 'DOC-18',
    title: 'COMUNICADO DE SERVIÇO',
    location: 'ZOOLÓGICO — ADMINISTRAÇÃO',
    locationId: 'ZOOLOGICO',
    classification: 'MEMORANDO ADMINISTRATIVO',
    date: '03/10/1983',
    status: 'PARCIAL',
    unlockedByDefault: false,
    content: `O acesso ao Laboratório 01 foi suspenso até segunda ordem. Os funcionários devem evitar comentar o ocorrido com visitantes ou moradores.`,
  },

  // 19. LOCAL: ZOOLÓGICO — ÁREA DE PESQUISA
  {
    id: 'DOC-19',
    title: 'REGISTRO DE SISTEMA',
    location: 'ZOOLÓGICO — ÁREA DE PESQUISA',
    locationId: 'ZOOLOGICO',
    classification: 'LOG DE TERMINAL MAINFRAME',
    date: '04/10/1983',
    status: 'CORROMPIDO',
    unlockedByDefault: false,
    content: `INICIALIZANDO ARQUIVO V.V.
ORIGEM DO SINAL: DESCONHECIDA
TENTATIVA DE DESLIGAMENTO: FALHOU
USUÁRIO DETECTADO: NÃO IDENTIFICADO`,
  },

  // 20. LOCAL: ZOOLÓGICO — TERMINAL ANTIGO
  {
    id: 'DOC-20',
    title: 'MENSAGEM SEM REMETENTE',
    location: 'ZOOLÓGICO — TERMINAL ANTIGO',
    locationId: 'ZOOLOGICO',
    classification: 'TRANSMISSÃO CRIPTOGRAFADA',
    date: 'SEM DATA',
    status: 'BLOQUEADO',
    unlockedByDefault: false, // Liberado somente após encontrar os outros 19
    content: `SE VOCÊ ENCONTROU ISTO, NÃO CONFIE NOS REGISTROS OFICIAIS.`,
  },
];
