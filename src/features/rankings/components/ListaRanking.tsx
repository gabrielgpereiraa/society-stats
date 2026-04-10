import Link from 'next/link'
import { AvatarJogador } from '@/components/shared/AvatarJogador'
import { EntradaRanking } from '@/types'
import { cn } from '@/lib/utils'

interface ListaRankingProps {
  entradas: EntradaRanking[]
}

const MEDALHAS = ['🥇', '🥈', '🥉']

export function ListaRanking({ entradas }: ListaRankingProps) {
  if (entradas.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-slate-500">
        Sem dados para este ranking.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {entradas.map((entrada, index) => (
        <Link key={entrada.jogador.id} href={`/jogadores/${entrada.jogador.id}`}>
          <div
            className={cn(
              'flex cursor-pointer items-center gap-4 rounded-xl border p-3 transition-all hover:border-campo-500',
              index === 0
                ? 'border-gol/20 bg-gol-muted'
                : 'border-campo-600/50 bg-campo-800',
            )}
          >
            <span className="w-6 text-center text-lg">{MEDALHAS[index] ?? `${entrada.posicao}°`}</span>

            <AvatarJogador jogador={entrada.jogador} tamanho="md" />

            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-slate-100">{entrada.jogador.apelido}</p>
              <p className="text-xs text-slate-500">{entrada.jogador.posicao}</p>
            </div>

            <div className="text-right">
              <p
                className={cn(
                  'font-display text-lg font-black',
                  index === 0 ? 'text-gol' : 'text-slate-200',
                )}
              >
                {entrada.valor}
              </p>
              <p className="text-xs text-slate-500">{entrada.rotulo.split(' ').slice(1).join(' ')}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
