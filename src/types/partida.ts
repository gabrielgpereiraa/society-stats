import { EstatisticasJogador } from './estatistica'
import { Evento } from './evento'

export type ResultadoPartida = 'vitoria' | 'derrota' | 'empate'

export interface TimeAdversario {
  nome: string
  sigla: string
  escudoUrl: string | null
}

export interface PlacarPartida {
  nos: number
  adversario: number
}

export interface Partida {
  id: string
  data: string
  adversario: TimeAdversario
  placar: PlacarPartida
  resultado: ResultadoPartida
  local: string
  descricao: string | null
  estatisticas: EstatisticasJogador[]
  eventos: Evento[]
  youtubeVideoId: string | null
}
