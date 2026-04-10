import { EstatisticasConsolidadas, EstatisticasJogador } from '@/types'

export function consolidarEstatisticas(stats: EstatisticasJogador): EstatisticasConsolidadas {
  const totalDefensivo =
    stats.defesa.interceptacoes + stats.defesa.cortes + stats.defesa.desarmes

  const taxaPassagem =
    stats.passagem.passesTotal > 0
      ? Math.round((stats.passagem.passesCompletos / stats.passagem.passesTotal) * 100)
      : 0

  return {
    gols: stats.ataque.gols,
    assistencias: stats.ataque.assistencias,
    taxaPassagem,
    passesCompletos: stats.passagem.passesCompletos,
    passesTotal: stats.passagem.passesTotal,
    finalizacoesNoGol: stats.ataque.finalizacoesNoGol,
    finalizacoesTotal: stats.ataque.finalizacoesTotal,
    totalDefensivo,
    bolasGanhas: stats.posse.bolasGanhas,
    bolasPerdidas: stats.posse.bolasPerdidas,
    cartoesAmarelos: stats.disciplina.cartoesAmarelos,
    cartoesVermelhos: stats.disciplina.cartoesVermelhos,
    faltasCometidas: stats.disciplina.faltasCometidas,
    golContra: stats.ataque.golContra,
    penaltiCometido: stats.disciplina.penaltiCometido,
    penaltiSofrido: stats.disciplina.penaltiSofrido,
  }
}

export interface DimensaoRadar {
  dimensao: string
  valor: number
  fullMark: number
}

export function montarDimensoesRadar(stats: EstatisticasJogador): DimensaoRadar[] {
  const taxaPassagem =
    stats.passagem.passesTotal > 0
      ? (stats.passagem.passesCompletos / stats.passagem.passesTotal) * 100
      : 0

  const ataque = Math.min(
    ((stats.ataque.gols * 25 +
      stats.ataque.assistencias * 15 +
      stats.ataque.finalizacoesNoGol * 10) /
      100) *
      100,
    100,
  )

  const criacao = Math.min(
    (taxaPassagem * 0.6 +
      stats.passagem.passesTotal * 1.5 +
      stats.passagem.cruzamentosCompletos * 5),
    100,
  )

  const defesa = Math.min(
    ((stats.defesa.interceptacoes +
      stats.defesa.cortes +
      stats.defesa.desarmes +
      stats.defesa.bloqueios) *
      12),
    100,
  )

  const posseValor = Math.min(
    (stats.posse.bolasGanhas * 12 +
      stats.posse.driblesCompletos * 8 +
      stats.posse.dividasGanhas * 8),
    100,
  )

  const disciplinaBase = 100
  const penalidades =
    stats.disciplina.cartoesAmarelos * 20 +
    stats.disciplina.cartoesVermelhos * 50 +
    stats.disciplina.faltasCometidas * 5
  const disciplinaValor = Math.max(disciplinaBase - penalidades, 0)

  return [
    { dimensao: 'Ataque',     valor: Math.round(ataque),         fullMark: 100 },
    { dimensao: 'Criação',    valor: Math.round(criacao),        fullMark: 100 },
    { dimensao: 'Defesa',     valor: Math.round(defesa),         fullMark: 100 },
    { dimensao: 'Posse',      valor: Math.round(posseValor),     fullMark: 100 },
    { dimensao: 'Disciplina', valor: Math.round(disciplinaValor),fullMark: 100 },
  ]
}

export function calcularMediaNota(notas: number[]): number {
  if (notas.length === 0) return 0
  const soma = notas.reduce((acc, n) => acc + n, 0)
  return Math.round((soma / notas.length) * 10) / 10
}
