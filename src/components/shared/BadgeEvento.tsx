import { Goal, HandHelping, AlertTriangle, Square, Repeat2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TipoEvento } from '@/types'

interface BadgeEventoProps {
  tipo: TipoEvento
  className?: string
}

const CONFIG_EVENTO: Record<TipoEvento, { label: string; icon: React.ComponentType<{ className?: string }>; classe: string }> = {
  gol:               { label: 'Gol',           icon: Goal,          classe: 'bg-gol-muted text-gol border-gol/30' },
  assistencia:       { label: 'Assistência',    icon: HandHelping,   classe: 'bg-acento-muted text-acento border-acento/30' },
  gol_contra:        { label: 'Gol contra',     icon: Repeat2,       classe: 'bg-alerta-muted text-alerta border-alerta/30' },
  penalti_convertido:{ label: 'Pênalti ✓',     icon: Goal,          classe: 'bg-gol-muted text-gol border-gol/30' },
  penalti_perdido:   { label: 'Pênalti ✗',     icon: Goal,          classe: 'bg-alerta-muted text-alerta border-alerta/30' },
  penalti_sofrido:   { label: 'Pênalti sofrido',icon: AlertTriangle, classe: 'bg-campo-700 text-slate-300 border-campo-500' },
  cartao_amarelo:    { label: 'Amarelo',         icon: Square,        classe: 'bg-gol-muted text-gol border-gol/30' },
  cartao_vermelho:   { label: 'Vermelho',        icon: Square,        classe: 'bg-alerta-muted text-alerta border-alerta/30' },
}

export function BadgeEvento({ tipo, className }: BadgeEventoProps) {
  const config = CONFIG_EVENTO[tipo]
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold',
        config.classe,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}
