export type LabelDesempenho =
  | 'Destaque da partida'
  | 'Muito bem'
  | 'Boa atuação'
  | 'Regular'
  | 'Em evolução'

export interface AvaliacaoNota {
  valor: number
  label: LabelDesempenho
  corClasse: string
  corBg: string
}
