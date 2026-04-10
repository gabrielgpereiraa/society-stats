import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { AvatarJogador } from '@/components/shared/AvatarJogador'
import { NotaFifa } from '@/components/shared/NotaFifa'
import { Badge } from '@/components/ui/badge'
import { Jogador, EstatisticasJogador } from '@/types'

interface CardJogadorProps {
  jogador: Jogador
  ultimaStats?: EstatisticasJogador
}

export function CardJogador({ jogador, ultimaStats }: CardJogadorProps) {
  return (
    <Link href={`/jogadores/${jogador.id}`}>
      <Card className="group cursor-pointer transition-all duration-200 hover:border-campo-500 hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AvatarJogador jogador={jogador} tamanho="lg" />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs font-bold text-slate-600">
                  #{jogador.numero}
                </span>
                <p className="font-display text-base font-bold text-slate-100 truncate">
                  {jogador.apelido}
                </p>
              </div>
              <p className="text-xs text-slate-500 truncate">{jogador.nome}</p>
              <Badge variant="secondary" className="mt-1.5 text-xs">
                {jogador.posicao}
              </Badge>
            </div>

            {ultimaStats && (
              <NotaFifa valor={ultimaStats.nota} tamanho="sm" exibirLabel={false} />
            )}
          </div>

          {ultimaStats && (
            <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-campo-900/60 p-2">
              <div className="text-center">
                <p className="font-display text-base font-bold text-gol">
                  {ultimaStats.ataque.gols}
                </p>
                <p className="text-xs text-slate-600">Gols</p>
              </div>
              <div className="text-center">
                <p className="font-display text-base font-bold text-acento">
                  {ultimaStats.ataque.assistencias}
                </p>
                <p className="text-xs text-slate-600">Assist.</p>
              </div>
              <div className="text-center">
                <p className="font-display text-base font-bold text-slate-300">
                  {ultimaStats.passagem.passesCompletos}
                </p>
                <p className="text-xs text-slate-600">Passes</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
