export type Posicao = 'Goleiro' | 'Defensor' | 'Meio-campo' | 'Atacante'

export interface Jogador {
  id: string
  nome: string
  apelido: string
  numero: number
  posicao: Posicao
  avatarUrl: string | null
}
