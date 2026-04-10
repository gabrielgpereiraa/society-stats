import { AvaliacaoNota, LabelDesempenho } from '@/types'
import { EstatisticasJogador } from '@/types'

const LIMITES_LABEL: { minimo: number; label: LabelDesempenho; corClasse: string; corBg: string }[] = [
  { minimo: 8.5, label: 'Destaque da partida', corClasse: 'text-gol', corBg: 'bg-gol-muted' },
  { minimo: 7.5, label: 'Muito bem',            corClasse: 'text-acento', corBg: 'bg-acento-muted' },
  { minimo: 6.5, label: 'Boa atuação',          corClasse: 'text-acento', corBg: 'bg-acento-muted' },
  { minimo: 5.5, label: 'Regular',              corClasse: 'text-slate-400', corBg: 'bg-slate-700/40' },
  { minimo: 0,   label: 'Em evolução',          corClasse: 'text-slate-500', corBg: 'bg-slate-800/60' },
]

export function resolverLabelNota(valor: number): Omit<AvaliacaoNota, 'valor'> {
  const entrada = LIMITES_LABEL.find((l) => valor >= l.minimo)
  return entrada
    ? { label: entrada.label, corClasse: entrada.corClasse, corBg: entrada.corBg }
    : { label: 'Em evolução', corClasse: 'text-slate-500', corBg: 'bg-slate-800/60' }
}

export function montarAvaliacaoNota(valor: number): AvaliacaoNota {
  return { valor, ...resolverLabelNota(valor) }
}

// Cálculo de nota com base nas estatísticas do jogador
export function calcularNota(stats: EstatisticasJogador): number {
  let nota = 5.5

  nota += stats.ataque.gols * 1.0
  nota += stats.ataque.assistencias * 0.5
  nota -= stats.ataque.golContra * 0.8
  nota -= stats.ataque.penaltiPerdido * 0.4

  const taxaPassagem =
    stats.passagem.passesTotal > 0
      ? stats.passagem.passesCompletos / stats.passagem.passesTotal
      : 0
  if (taxaPassagem >= 0.8 && stats.passagem.passesTotal >= 8) nota += 0.4
  else if (taxaPassagem >= 0.7 && stats.passagem.passesTotal >= 5) nota += 0.2

  if (stats.passagem.passesTotal >= 15) nota += 0.3
  else if (stats.passagem.passesTotal >= 10) nota += 0.15

  const totalDefensivo =
    stats.defesa.interceptacoes + stats.defesa.cortes + stats.defesa.desarmes
  nota += Math.min(totalDefensivo * 0.1, 0.5)

  nota += Math.min(stats.defesa.bloqueios * 0.1, 0.2)
  nota += Math.min(stats.defesa.defesasGoleiro * 0.12, 0.6)

  nota += Math.min(stats.posse.bolasGanhas * 0.08, 0.24)
  nota -= Math.min(Math.max(stats.posse.bolasPerdidas - 3, 0) * 0.06, 0.24)

  nota += Math.min(stats.posse.dividasGanhas * 0.08, 0.24)
  nota -= Math.min(stats.posse.dividasPerdidas * 0.05, 0.15)

  nota -= stats.disciplina.cartoesAmarelos * 0.3
  nota -= stats.disciplina.cartoesVermelhos * 1.0
  nota -= stats.disciplina.penaltiCometido * 0.3

  if (stats.ataque.finalizacoesNoGol >= 2) nota += 0.2
  else if (stats.ataque.finalizacoesNoGol === 1) nota += 0.1

  return Math.round(Math.max(4.5, Math.min(9.9, nota)) * 10) / 10
}
