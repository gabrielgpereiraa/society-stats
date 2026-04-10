import { CalendarDays, MapPin, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatarData, labelResultado, bgResultado } from '@/lib/formatadores'
import { Partida } from '@/types'
import { cn } from '@/lib/utils'

interface HeaderPartidaProps {
  partida: Partida
}

export function HeaderPartida({ partida }: HeaderPartidaProps) {
  const totalGolsTimes = partida.placar.nos + partida.placar.adversario

  return (
    <div className="relative overflow-hidden rounded-2xl border border-campo-600/40 bg-campo-gradient p-6 lg:p-8">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-acento blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-gol blur-3xl" />
      </div>

      <div className="relative">
        {/* Meta da partida */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span
            className={cn(
              'rounded-lg px-3 py-1 text-sm font-bold',
              bgResultado(partida.resultado),
            )}
          >
            {labelResultado(partida.resultado)}
          </span>
          <div className="flex items-center gap-1.5 text-sm text-slate-400">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{formatarData(partida.data)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-400">
            <MapPin className="h-3.5 w-3.5" />
            <span>{partida.local}</span>
          </div>
        </div>

        {/* Placar principal */}
        <div className="flex items-center justify-between gap-6">
          {/* Time da casa */}
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-acento/10 ring-1 ring-acento/20">
              <Shield className="h-7 w-7 text-acento" />
            </div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-acento">
              Os Crias
            </p>
          </div>

          {/* Placar */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-3">
              <span className="font-display text-6xl font-black text-slate-100 lg:text-7xl">
                {partida.placar.nos}
              </span>
              <span className="font-display text-3xl font-light text-slate-600">–</span>
              <span className="font-display text-6xl font-black text-slate-400 lg:text-7xl">
                {partida.placar.adversario}
              </span>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-600">
              {totalGolsTimes} gols no total
            </span>
          </div>

          {/* Adversário */}
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-campo-700 ring-1 ring-campo-600">
              <Shield className="h-7 w-7 text-slate-500" />
            </div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-slate-400">
              {partida.adversario.sigla}
            </p>
          </div>
        </div>

        {partida.descricao && (
          <p className="mt-5 text-center text-sm text-slate-400">{partida.descricao}</p>
        )}
      </div>
    </div>
  )
}
