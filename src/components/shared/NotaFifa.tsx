import { montarAvaliacaoNota } from '@/domain/nota'
import { formatarNota } from '@/lib/formatadores'
import { cn } from '@/lib/utils'

interface NotaFifaProps {
  valor: number
  tamanho?: 'sm' | 'md' | 'lg' | 'xl'
  exibirLabel?: boolean
  className?: string
}

const tamanhoClasses = {
  sm: { numero: 'text-xl',  container: 'w-10 h-10', label: 'text-xs' },
  md: { numero: 'text-2xl', container: 'w-14 h-14', label: 'text-xs' },
  lg: { numero: 'text-3xl', container: 'w-18 h-18', label: 'text-sm' },
  xl: { numero: 'text-5xl', container: 'w-24 h-24', label: 'text-base' },
}

export function NotaFifa({ valor, tamanho = 'md', exibirLabel = false, className }: NotaFifaProps) {
  const avaliacao = montarAvaliacaoNota(valor)
  const classes = tamanhoClasses[tamanho]

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-lg font-display font-black',
          classes.container,
          classes.numero,
          avaliacao.corBg,
          avaliacao.corClasse,
        )}
      >
        {formatarNota(valor)}
      </div>
      {exibirLabel && (
        <span className={cn('font-medium', classes.label, avaliacao.corClasse)}>
          {avaliacao.label}
        </span>
      )}
    </div>
  )
}
