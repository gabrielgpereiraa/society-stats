import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CardKpiProps {
  label: string
  valor: string | number
  icon?: LucideIcon
  destaque?: boolean
  className?: string
  subvalor?: string
}

export function CardKpi({ label, valor, icon: Icon, destaque = false, className, subvalor }: CardKpiProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-xl border border-campo-600/50 bg-campo-800 p-4',
        destaque && 'border-acento/30 bg-acento-muted',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
        {Icon && (
          <Icon
            className={cn('h-4 w-4', destaque ? 'text-acento' : 'text-slate-600')}
          />
        )}
      </div>
      <span
        className={cn(
          'font-display text-2xl font-bold',
          destaque ? 'text-acento' : 'text-slate-100',
        )}
      >
        {valor}
      </span>
      {subvalor && <span className="text-xs text-slate-500">{subvalor}</span>}
    </div>
  )
}
