import { Jogador } from './jogador'

export type CategoriaRanking =
  | 'artilharia'
  | 'assistencias'
  | 'passes'
  | 'defensivo'
  | 'disciplina'
  | 'consistencia'

export interface EntradaRanking {
  posicao: number
  jogador: Jogador
  valor: number
  rotulo: string
}

export interface Ranking {
  categoria: CategoriaRanking
  titulo: string
  descricao: string
  entradas: EntradaRanking[]
}
