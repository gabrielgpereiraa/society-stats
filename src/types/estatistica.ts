export interface EstatisticasAtaque {
  gols: number
  assistencias: number
  finalizacoesNoGol: number
  finalizacoesTotal: number
  golContra: number
  penaltiConvertido: number
  penaltiPerdido: number
}

export interface EstatisticasPassagem {
  passesCompletos: number
  passesTotal: number
  cruzamentosCompletos: number
  cruzamentosTotal: number
}

export interface EstatisticasDefesa {
  interceptacoes: number
  cortes: number
  desarmes: number
  bloqueios: number
  defesasGoleiro: number
}

export interface EstatisticasPosse {
  bolasGanhas: number
  bolasPerdidas: number
  driblesTotais: number
  driblesCompletos: number
  dividasGanhas: number
  dividasPerdidas: number
}

export interface EstatisticasDisciplina {
  cartoesAmarelos: number
  cartoesVermelhos: number
  faltasCometidas: number
  faltasSofridas: number
  penaltiCometido: number
  penaltiSofrido: number
}

export interface EstatisticasJogador {
  jogadorId: string
  ataque: EstatisticasAtaque
  passagem: EstatisticasPassagem
  defesa: EstatisticasDefesa
  posse: EstatisticasPosse
  disciplina: EstatisticasDisciplina
  minutosJogados: number
  nota: number
}

export interface EstatisticasConsolidadas {
  gols: number
  assistencias: number
  taxaPassagem: number
  passesCompletos: number
  passesTotal: number
  finalizacoesNoGol: number
  finalizacoesTotal: number
  totalDefensivo: number
  bolasGanhas: number
  bolasPerdidas: number
  cartoesAmarelos: number
  cartoesVermelhos: number
  faltasCometidas: number
  golContra: number
  penaltiCometido: number
  penaltiSofrido: number
}
