import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { AvatarJogador } from '@/components/shared/AvatarJogador'
import { NotaFifa } from '@/components/shared/NotaFifa'
import { montarAvaliacaoNota } from '@/domain/nota'
import { Jogador, EstatisticasJogador } from '@/types'
import { cn } from '@/lib/utils'

interface DestaqueRecenteProps {
  jogador: Jogador
  stats: EstatisticasJogador
}

export function DestaqueRecente({ jogador, stats }: DestaqueRecenteProps) {
  const avaliacao = montarAvaliacaoNota(stats.nota)

  const conquistas: string[] = []
  if (stats.ataque.gols > 0)
    conquistas.push(`${stats.ataque.gols} gol${stats.ataque.gols > 1 ? 's' : ''}`)
  if (stats.ataque.assistencias > 0)
    conquistas.push(`${stats.ataque.assistencias} assist.`)
  const totalDef = stats.defesa.interceptacoes + stats.defesa.cortes + stats.defesa.desarmes
  if (totalDef >= 3) conquistas.push(`${totalDef} ações def.`)
  if (stats.passagem.passesTotal >= 10) {
    const taxa = Math.round((stats.passagem.passesCompletos / stats.passagem.passesTotal) * 100)
    conquistas.push(`${taxa}% passes`)
  }

  return (
    <Link href={`/jogadores/${jogador.id}`}>
      <div className="relative overflow-hidden cursor-pointer rounded-2xl border border-gol/20 bg-gol-muted p-5 transition-all hover:border-gol/40">
        {/* Badge destaque */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-gol/20 px-2.5 py-1">
          <Sparkles className="h-3 w-3 text-gol" />
          <span className="text-xs font-bold text-gol">Destaque</span>
        </div>

        <div className="flex items-center gap-4">
          <AvatarJogador jogador={jogador} tamanho="xl" />

          <div className="flex-1 min-w-0">
            <p className="font-display text-2xl font-black text-slate-100">{jogador.apelido}</p>
            <p className="text-sm text-slate-400">{jogador.posicao}</p>

            {conquistas.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {conquistas.map((c) => (
                  <span
                    key={c}
                    className="rounded-md bg-campo-800/60 px-2 py-0.5 text-xs font-medium text-slate-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}

            <p className={cn('mt-2 text-xs font-semibold', avaliacao.corClasse)}>
              {avaliacao.label}
            </p>
          </div>

          <NotaFifa valor={stats.nota} tamanho="lg" exibirLabel={false} />
        </div>
      </div>
    </Link>
  )
}
