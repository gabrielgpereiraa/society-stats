import { Jogador, Partida, EstatisticasJogador } from '@/types'
import { JOGADORES } from './jogadores'
import { PARTIDAS } from './partidas'

export function buscarJogadores(): Jogador[] {
  return JOGADORES
}

export function buscarJogadorPorId(id: string): Jogador | null {
  return JOGADORES.find((j) => j.id === id) ?? null
}

export function buscarPartidas(): Partida[] {
  return [...PARTIDAS].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
  )
}

export function buscarPartidaPorId(id: string): Partida | null {
  return PARTIDAS.find((p) => p.id === id) ?? null
}

export function buscarUltimaPartida(): Partida | null {
  return buscarPartidas()[0] ?? null
}

export function buscarEstatisticasJogadorNaPartida(
  partida: Partida,
  jogadorId: string,
): EstatisticasJogador | null {
  return partida.estatisticas.find((e) => e.jogadorId === jogadorId) ?? null
}

export function buscarHistoricoJogador(jogadorId: string): EstatisticasJogador[] {
  return PARTIDAS.flatMap((p) =>
    p.estatisticas.filter((e) => e.jogadorId === jogadorId),
  )
}

export function buscarJogadoresComStats(
  partida: Partida,
): Array<{ jogador: Jogador; stats: EstatisticasJogador }> {
  return partida.estatisticas
    .map((stats) => {
      const jogador = buscarJogadorPorId(stats.jogadorId)
      return jogador ? { jogador, stats } : null
    })
    .filter((item): item is { jogador: Jogador; stats: EstatisticasJogador } => item !== null)
}
