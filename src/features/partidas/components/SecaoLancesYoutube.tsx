import { Play, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { montarUrlEmbed, formatarTempoLive } from '@/domain/youtube'
import { formatarMinuto } from '@/lib/formatadores'
import { Evento, Jogador } from '@/types'

interface SecaoLancesYoutubeProps {
  eventos: Evento[]
  jogadores: Jogador[]
}

interface CardLanceProps {
  evento: Evento
  jogador: Jogador | undefined
}

function CardLance({ evento, jogador }: CardLanceProps) {
  if (!evento.lance) return null

  const urlEmbed = montarUrlEmbed(evento.lance)

  return (
    <Dialog>
      <div className="flex items-center gap-4 rounded-xl border border-campo-600/50 bg-campo-800 p-4">
        {/* Thumbnail simulado */}
        <div className="relative flex h-16 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-campo-700">
          <Youtube className="h-6 w-6 text-alerta" />
          <DialogTrigger asChild>
            <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                <Play className="h-4 w-4 fill-campo-950 text-campo-950" />
              </div>
            </button>
          </DialogTrigger>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge variant="gol">⚽ Gol</Badge>
            <span className="text-xs text-slate-500">{formatarMinuto(evento.minutoJogo)} do jogo</span>
          </div>
          <p className="font-semibold text-slate-100">{evento.descricao}</p>
          {jogador && (
            <p className="text-sm text-slate-400">{jogador.apelido}</p>
          )}
          <p className="mt-0.5 text-xs text-slate-600">
            Live: {formatarTempoLive(evento.lance.startSeconds)}
          </p>
        </div>

        <DialogTrigger asChild>
          <Button size="sm" className="shrink-0 gap-1.5">
            <Play className="h-3.5 w-3.5" />
            Ver lance
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <span>⚽</span>
            {evento.descricao}
            <span className="text-sm font-normal text-slate-400">— {formatarMinuto(evento.minutoJogo)}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe
            src={urlEmbed}
            title={`Lance: ${evento.descricao}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function SecaoLancesYoutube({ eventos, jogadores }: SecaoLancesYoutubeProps) {
  const golsComLance = eventos.filter(
    (e) => e.tipo === 'gol' && e.lance !== null,
  )

  if (golsComLance.length === 0) return null

  const encontrarJogador = (id: string) => jogadores.find((j) => j.id === id)

  return (
    <div className="space-y-3">
      {golsComLance.map((evento) => (
        <CardLance
          key={evento.id}
          evento={evento}
          jogador={encontrarJogador(evento.jogadorId)}
        />
      ))}
    </div>
  )
}
