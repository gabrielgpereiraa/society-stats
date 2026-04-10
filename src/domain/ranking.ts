import { Jogador, Ranking, EstatisticasJogador } from '@/types'

interface JogadorComStats {
  jogador: Jogador
  stats: EstatisticasJogador
}

function ordenarDesc(items: JogadorComStats[], getValue: (s: EstatisticasJogador) => number) {
  return [...items].sort((a, b) => getValue(b.stats) - getValue(a.stats))
}

function top3ComValor(
  items: JogadorComStats[],
  getValue: (s: EstatisticasJogador) => number,
  formatarRotulo: (valor: number) => string,
): Ranking['entradas'] {
  return ordenarDesc(items, getValue)
    .filter((item) => getValue(item.stats) > 0)
    .slice(0, 3)
    .map((item, index) => ({
      posicao: index + 1,
      jogador: item.jogador,
      valor: getValue(item.stats),
      rotulo: formatarRotulo(getValue(item.stats)),
    }))
}

export function gerarRankingArtilharia(items: JogadorComStats[]): Ranking {
  return {
    categoria: 'artilharia',
    titulo: 'Artilharia',
    descricao: 'Maiores goleadores da temporada',
    entradas: top3ComValor(
      items,
      (s) => s.ataque.gols,
      (v) => `${v} gol${v !== 1 ? 's' : ''}`,
    ),
  }
}

export function gerarRankingAssistencias(items: JogadorComStats[]): Ranking {
  return {
    categoria: 'assistencias',
    titulo: 'Assistências',
    descricao: 'Melhores garçons do time',
    entradas: top3ComValor(
      items,
      (s) => s.ataque.assistencias,
      (v) => `${v} assist${v !== 1 ? 's' : ''}`,
    ),
  }
}

export function gerarRankingPasses(items: JogadorComStats[]): Ranking {
  const comTaxa = items.map((item) => ({
    ...item,
    taxa:
      item.stats.passagem.passesTotal > 0
        ? Math.round((item.stats.passagem.passesCompletos / item.stats.passagem.passesTotal) * 100)
        : 0,
  }))

  return {
    categoria: 'passes',
    titulo: 'Precisão de passes',
    descricao: 'Melhor circulação de bola',
    entradas: comTaxa
      .filter((item) => item.stats.passagem.passesTotal >= 3 && item.taxa > 0)
      .sort((a, b) => b.taxa - a.taxa)
      .slice(0, 3)
      .map((item, index) => ({
        posicao: index + 1,
        jogador: item.jogador,
        valor: item.taxa,
        rotulo: `${item.taxa}% (${item.stats.passagem.passesCompletos}/${item.stats.passagem.passesTotal})`,
      })),
  }
}

export function gerarRankingDefensivo(items: JogadorComStats[]): Ranking {
  return {
    categoria: 'defensivo',
    titulo: 'Líderes defensivos',
    descricao: 'Mais ações de recuperação e corte',
    entradas: top3ComValor(
      items,
      (s) => s.defesa.interceptacoes + s.defesa.cortes + s.defesa.desarmes,
      (v) => `${v} ações defensivas`,
    ),
  }
}

export function gerarRankingDisciplina(items: JogadorComStats[]): Ranking {
  const comScore = items.map((item) => ({
    ...item,
    score:
      100 -
      item.stats.disciplina.cartoesAmarelos * 20 -
      item.stats.disciplina.cartoesVermelhos * 50 -
      item.stats.disciplina.faltasCometidas * 5,
  }))

  return {
    categoria: 'disciplina',
    titulo: 'Mais disciplinados',
    descricao: 'Jogadores com maior controle nas disputas',
    entradas: comScore
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item, index) => ({
        posicao: index + 1,
        jogador: item.jogador,
        valor: Math.max(0, item.score),
        rotulo:
          item.stats.disciplina.cartoesAmarelos === 0 &&
          item.stats.disciplina.faltasCometidas === 0
            ? 'Jogo limpo'
            : `${item.stats.disciplina.faltasCometidas} falta${item.stats.disciplina.faltasCometidas !== 1 ? 's' : ''}`,
      })),
  }
}

export function gerarTodosRankings(items: JogadorComStats[]): Ranking[] {
  return [
    gerarRankingArtilharia(items),
    gerarRankingAssistencias(items),
    gerarRankingPasses(items),
    gerarRankingDefensivo(items),
    gerarRankingDisciplina(items),
  ]
}
