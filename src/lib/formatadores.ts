import { ResultadoPartida } from '@/types'

export function formatarData(isoString: string): string {
  return new Date(isoString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function formatarDataCurta(isoString: string): string {
  return new Date(isoString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  })
}

export function formatarPorcentagem(numerador: number, denominador: number): string {
  if (denominador === 0) return '—'
  return `${Math.round((numerador / denominador) * 100)}%`
}

export function formatarNota(valor: number): string {
  return valor.toFixed(1)
}

export function formatarMinuto(minuto: number): string {
  return `${minuto}'`
}

export function labelResultado(resultado: ResultadoPartida): string {
  const mapa: Record<ResultadoPartida, string> = {
    vitoria: 'Vitória',
    derrota: 'Derrota',
    empate: 'Empate',
  }
  return mapa[resultado]
}

export function corResultado(resultado: ResultadoPartida): string {
  const mapa: Record<ResultadoPartida, string> = {
    vitoria: 'text-acento',
    derrota: 'text-alerta',
    empate: 'text-gol',
  }
  return mapa[resultado]
}

export function bgResultado(resultado: ResultadoPartida): string {
  const mapa: Record<ResultadoPartida, string> = {
    vitoria: 'bg-acento-muted text-acento',
    derrota: 'bg-alerta-muted text-alerta',
    empate: 'bg-gol-muted text-gol',
  }
  return mapa[resultado]
}

export function inicialNome(nome: string): string {
  return nome
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}
