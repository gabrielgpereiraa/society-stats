export type TipoEvento =
  | 'gol'
  | 'assistencia'
  | 'gol_contra'
  | 'penalti_convertido'
  | 'penalti_perdido'
  | 'penalti_sofrido'
  | 'cartao_amarelo'
  | 'cartao_vermelho'

export interface LanceYoutube {
  videoId: string
  startSeconds: number
}

export interface Evento {
  id: string
  tipo: TipoEvento
  minutoJogo: number
  jogadorId: string
  descricao: string
  lance: LanceYoutube | null
}
