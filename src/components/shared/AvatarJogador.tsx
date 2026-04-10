import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { inicialNome } from '@/lib/formatadores'
import { cn } from '@/lib/utils'
import { Jogador } from '@/types'

interface AvatarJogadorProps {
  jogador: Jogador
  tamanho?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const tamanhoClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-xl',
}

export function AvatarJogador({ jogador, tamanho = 'md', className }: AvatarJogadorProps) {
  return (
    <Avatar className={cn(tamanhoClasses[tamanho], className)}>
      {jogador.avatarUrl && <AvatarImage src={jogador.avatarUrl} alt={jogador.apelido} />}
      <AvatarFallback className="bg-campo-600 font-bold text-acento">
        {inicialNome(jogador.nome)}
      </AvatarFallback>
    </Avatar>
  )
}
