import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatarData, labelResultado, bgResultado } from '@/lib/formatadores'
import { Partida } from '@/types'
import { cn } from '@/lib/utils'

interface ResumoUltimaPartidaProps {
  partida: Partida
}

export function ResumoUltimaPartida({ partida }: ResumoUltimaPartidaProps) {
  const golsTime = partida.eventos.filter((e) => e.tipo === 'gol')

  return (
    <Card className="overflow-hidden">
      <div className="relative bg-campo-gradient p-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-acento blur-3xl" />
        </div>

        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn('rounded-lg px-3 py-1 text-sm font-bold', bgResultado(partida.resultado))}>
                {labelResultado(partida.resultado)}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <CalendarDays className="h-3 w-3" />
                {formatarData(partida.data)}
              </div>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-100">
              {partida.adversario.sigla}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">vs {partida.adversario.nome}</p>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="font-display text-5xl font-black text-slate-100">
                  {partida.placar.nos}
                </span>
                <span className="font-display text-2xl text-slate-600">–</span>
                <span className="font-display text-5xl font-black text-slate-400">
                  {partida.placar.adversario}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500 mb-1">Gols</p>
              {golsTime.map((ev) => {
                const min = ev.minutoJogo
                return (
                  <div key={ev.id} className="text-xs text-slate-300">
                    ⚽ {min}&apos;
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-4">
            <Link href={`/partidas/${partida.id}`}>
              <Button size="sm" variant="outline" className="gap-1.5">
                Ver detalhes
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
