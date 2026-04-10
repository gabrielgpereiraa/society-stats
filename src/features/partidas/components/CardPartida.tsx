import Link from 'next/link'
import { CalendarDays, MapPin, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatarData, labelResultado, bgResultado } from '@/lib/formatadores'
import { Partida } from '@/types'
import { cn } from '@/lib/utils'

interface CardPartidaProps {
  partida: Partida
}

export function CardPartida({ partida }: CardPartidaProps) {
  const corResultado = bgResultado(partida.resultado)
  const labelRes = labelResultado(partida.resultado)

  return (
    <Link href={`/partidas/${partida.id}`}>
      <Card className="group cursor-pointer transition-all duration-200 hover:border-campo-500 hover:shadow-lg hover:shadow-black/20">
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-4">
            {/* Placar central */}
            <div className="flex flex-1 items-center justify-center gap-4">
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Nós</p>
                <p className="font-display text-4xl font-black text-slate-100">{partida.placar.nos}</p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    'rounded-md px-2.5 py-0.5 text-xs font-bold',
                    corResultado,
                  )}
                >
                  {labelRes}
                </span>
                <span className="text-xs text-slate-600">×</span>
              </div>

              <div className="text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {partida.adversario.sigla}
                </p>
                <p className="font-display text-4xl font-black text-slate-400">
                  {partida.placar.adversario}
                </p>
              </div>
            </div>

            {/* Info lateral */}
            <div className="hidden min-w-[160px] flex-col gap-1.5 sm:flex">
              <p className="font-semibold text-slate-200">{partida.adversario.nome}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CalendarDays className="h-3 w-3" />
                <span>{formatarData(partida.data)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{partida.local}</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {partida.youtubeVideoId && (
                  <Badge variant="secondary" className="text-xs">🎬 Live</Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {partida.eventos.filter((e) => e.tipo === 'gol').length} gols
                </Badge>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
