import { cn } from '@/lib/utils'

interface SecaoTituloProps {
  titulo: string
  descricao?: string
  acao?: React.ReactNode
  className?: string
}

export function SecaoTitulo({ titulo, descricao, acao, className }: SecaoTituloProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div>
        <h2 className="font-display text-xl font-bold text-slate-100">{titulo}</h2>
        {descricao && <p className="mt-0.5 text-sm text-slate-500">{descricao}</p>}
      </div>
      {acao && <div className="shrink-0">{acao}</div>}
    </div>
  )
}
