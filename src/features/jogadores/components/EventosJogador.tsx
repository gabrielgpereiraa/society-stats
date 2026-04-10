import { Play } from 'lucide-react'
import { BadgeEvento } from '@/components/shared/BadgeEvento'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { formatarMinuto } from '@/lib/formatadores'
import { montarUrlEmbed } from '@/domain/youtube'
import { Evento } from '@/types'

interface EventosJogadorProps {
  eventos: Evento[]
  jogadorId: string
}

export function EventosJogador({ eventos, jogadorId }: EventosJogadorProps) {
  const eventosJogador = eventos
    .filter((e) => e.jogadorId === jogadorId)
    .sort((a, b) => a.minutoJogo - b.minutoJogo)

  if (eventosJogador.length === 0) {
    return (
      <p className="text-sm text-slate-500 italic">
        Nenhum evento registrado nesta partida.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {eventosJogador.map((evento) => (
        <div
          key={evento.id}
          className="flex items-center gap-3 rounded-lg border border-campo-600/50 bg-campo-800 p-3"
        >
          <span className="w-8 shrink-0 font-display text-sm font-bold text-slate-500">
            {formatarMinuto(evento.minutoJogo)}
          </span>
          <BadgeEvento tipo={evento.tipo} />
          <span className="flex-1 text-sm text-slate-400">{evento.descricao}</span>
          {evento.lance && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-acento hover:text-acento-light">
                  <Play className="h-3 w-3" />
                  Ver lance
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                  <DialogTitle>{evento.descricao}</DialogTitle>
                </DialogHeader>
                <div className="aspect-video w-full">
                  <iframe
                    src={montarUrlEmbed(evento.lance)}
                    title={evento.descricao}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      ))}
    </div>
  )
}
