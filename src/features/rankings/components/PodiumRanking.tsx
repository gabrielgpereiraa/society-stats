import { Trophy } from 'lucide-react'
import { AvatarJogador } from '@/components/shared/AvatarJogador'
import { EntradaRanking } from '@/types'
import { cn } from '@/lib/utils'

interface PodiumRankingProps {
  entradas: EntradaRanking[]
}

const PODIUM_CONFIG = [
  { ordem: 1, altura: 'h-28', bg: 'bg-gol-gradient', corMedal: 'text-gol',     medal: '🥇' },
  { ordem: 2, altura: 'h-20', bg: 'bg-campo-700',    corMedal: 'text-slate-300', medal: '🥈' },
  { ordem: 3, altura: 'h-14', bg: 'bg-campo-800',    corMedal: 'text-slate-500', medal: '🥉' },
]

function PosicaoPodium({ entrada, config }: { entrada: EntradaRanking; config: typeof PODIUM_CONFIG[number] }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <AvatarJogador jogador={entrada.jogador} tamanho={config.ordem === 1 ? 'lg' : 'md'} />
      <div className="text-center">
        <p className={cn('font-display text-sm font-bold', config.ordem === 1 ? 'text-slate-100' : 'text-slate-300')}>
          {entrada.jogador.apelido}
        </p>
        <p className="text-xs text-slate-500">{entrada.rotulo}</p>
      </div>
      <div
        className={cn(
          'flex w-20 items-center justify-center rounded-t-lg',
          config.altura,
          config.bg,
        )}
      >
        <span className="text-2xl">{config.medal}</span>
      </div>
    </div>
  )
}

export function PodiumRanking({ entradas }: PodiumRankingProps) {
  if (entradas.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-500">
        Sem dados suficientes para este ranking.
      </p>
    )
  }

  const primeiro = entradas.find((e) => e.posicao === 1)
  const segundo  = entradas.find((e) => e.posicao === 2)
  const terceiro = entradas.find((e) => e.posicao === 3)

  return (
    <div className="flex items-end justify-center gap-3 pb-2">
      {segundo && (
        <PosicaoPodium entrada={segundo} config={PODIUM_CONFIG[1]} />
      )}
      {primeiro && (
        <PosicaoPodium entrada={primeiro} config={PODIUM_CONFIG[0]} />
      )}
      {terceiro && (
        <PosicaoPodium entrada={terceiro} config={PODIUM_CONFIG[2]} />
      )}
    </div>
  )
}
