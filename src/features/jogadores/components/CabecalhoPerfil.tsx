import { AvatarJogador } from '@/components/shared/AvatarJogador'
import { NotaFifa } from '@/components/shared/NotaFifa'
import { Badge } from '@/components/ui/badge'
import { Jogador, EstatisticasJogador } from '@/types'
import { montarAvaliacaoNota } from '@/domain/nota'

interface CabecalhoPerfilProps {
  jogador: Jogador
  stats: EstatisticasJogador
}

export function CabecalhoPerfil({ jogador, stats }: CabecalhoPerfilProps) {
  const avaliacao = montarAvaliacaoNota(stats.nota)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-campo-600/40 bg-campo-gradient p-6 lg:p-8">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute -right-8 -top-8 font-display text-[180px] font-black leading-none text-white/5 select-none"
          aria-hidden
        >
          {jogador.numero}
        </div>
      </div>

      <div className="relative flex flex-wrap items-center gap-6">
        {/* Avatar + número */}
        <div className="relative">
          <AvatarJogador jogador={jogador} tamanho="xl" />
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-campo-700 ring-2 ring-campo-900">
            <span className="font-display text-xs font-bold text-slate-300">{jogador.numero}</span>
          </div>
        </div>

        {/* Info do jogador */}
        <div className="flex-1 min-w-0">
          <p className="font-display text-3xl font-black text-slate-100 lg:text-4xl">
            {jogador.apelido}
          </p>
          <p className="text-sm text-slate-400">{jogador.nome}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{jogador.posicao}</Badge>
            <Badge variant="outline" className={avaliacao.corClasse}>
              {avaliacao.label}
            </Badge>
            <span className="text-xs text-slate-600">
              {stats.minutosJogados} min jogados
            </span>
          </div>
        </div>

        {/* Nota destaque */}
        <div className="flex flex-col items-center gap-1">
          <NotaFifa valor={stats.nota} tamanho="xl" exibirLabel />
        </div>
      </div>
    </div>
  )
}
