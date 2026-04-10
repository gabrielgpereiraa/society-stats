import { Play } from 'lucide-react'
import { BadgeEvento } from '@/components/shared/BadgeEvento'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { formatarMinuto } from '@/lib/formatadores'
import { montarUrlEmbed } from '@/domain/youtube'
import { Evento, Jogador } from '@/types'

interface TimelineEventosProps {
  eventos: Evento[]
  jogadores: Jogador[]
}

interface ItemEventoProps {
  evento: Evento
  jogador: Jogador | undefined
}

function BotaoVerLance({ evento }: { evento: Evento }) {
  if (!evento.lance) return null

  const urlEmbed = montarUrlEmbed(evento.lance)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
          <Play className="h-3 w-3" />
          Ver lance
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>
            {evento.descricao} — {formatarMinuto(evento.minutoJogo)}
          </DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe
            src={urlEmbed}
            title={evento.descricao}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ItemEvento({ evento, jogador }: ItemEventoProps) {
  return (
    <div className="flex items-start gap-4">
      {/* Minuto */}
      <div className="flex h-8 w-12 shrink-0 items-center justify-center rounded-md bg-campo-800 font-display text-sm font-bold text-slate-400">
        {formatarMinuto(evento.minutoJogo)}
      </div>

      {/* Linha vertical */}
      <div className="relative mt-2 flex flex-col items-center">
        <div className="h-2 w-2 rounded-full bg-campo-600" />
        <div className="flex-1 w-px bg-campo-700" />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-wrap items-center gap-2 pb-4">
        <BadgeEvento tipo={evento.tipo} />
        {jogador && (
          <span className="font-medium text-slate-200">{jogador.apelido}</span>
        )}
        <span className="text-sm text-slate-500">{evento.descricao}</span>
        <BotaoVerLance evento={evento} />
      </div>
    </div>
  )
}

export function TimelineEventos({ eventos, jogadores }: TimelineEventosProps) {
  const eventosOrdenados = [...eventos].sort((a, b) => a.minutoJogo - b.minutoJogo)

  const encontrarJogador = (id: string) => jogadores.find((j) => j.id === id)

  return (
    <div className="space-y-0">
      {eventosOrdenados.map((evento) => (
        <ItemEvento
          key={evento.id}
          evento={evento}
          jogador={encontrarJogador(evento.jogadorId)}
        />
      ))}
    </div>
  )
}
