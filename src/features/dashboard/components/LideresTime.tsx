import Link from 'next/link'
import { Goal, Shuffle, Shield, Star } from 'lucide-react'
import { AvatarJogador } from '@/components/shared/AvatarJogador'
import { NotaFifa } from '@/components/shared/NotaFifa'
import { Jogador, EstatisticasJogador } from '@/types'
import { consolidarEstatisticas } from '@/domain/estatisticas'

interface LideresTimeProps {
  jogadores: Jogador[]
  estatisticas: EstatisticasJogador[]
}

interface ItemLiderProps {
  label: string
  icon: React.ComponentType<{ className?: string }>
  jogador: Jogador
  valor: string
  corIcone: string
}

function ItemLider({ label, icon: Icon, jogador, valor, corIcone }: ItemLiderProps) {
  return (
    <Link href={`/jogadores/${jogador.id}`}>
      <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-campo-600/50 bg-campo-800 p-3 transition-all hover:border-campo-500">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-campo-700 ${corIcone}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="font-display font-bold text-slate-100 truncate">{jogador.apelido}</p>
        </div>
        <span className={`font-display text-lg font-black ${corIcone}`}>{valor}</span>
      </div>
    </Link>
  )
}

function encontrarLider(
  stats: EstatisticasJogador[],
  jogadores: Jogador[],
  getter: (s: EstatisticasJogador) => number,
): { jogador: Jogador; stats: EstatisticasJogador } | null {
  const ordenado = [...stats].sort((a, b) => getter(b) - getter(a))
  const top = ordenado[0]
  if (!top) return null
  const jogador = jogadores.find((j) => j.id === top.jogadorId)
  if (!jogador) return null
  return { jogador, stats: top }
}

export function LideresTime({ jogadores, estatisticas }: LideresTimeProps) {
  const liderNota = encontrarLider(estatisticas, jogadores, (s) => s.nota)
  const liderGols = encontrarLider(estatisticas, jogadores, (s) => s.ataque.gols)
  const liderPasses = encontrarLider(estatisticas, jogadores, (s) => {
    const c = consolidarEstatisticas(s)
    return c.taxaPassagem * (s.passagem.passesTotal >= 5 ? 1 : 0)
  })
  const liderDefensivo = encontrarLider(
    estatisticas,
    jogadores,
    (s) => s.defesa.interceptacoes + s.defesa.cortes + s.defesa.desarmes,
  )

  return (
    <div className="space-y-2">
      {liderNota && (
        <ItemLider
          label="Melhor nota"
          icon={Star}
          jogador={liderNota.jogador}
          valor={liderNota.stats.nota.toFixed(1)}
          corIcone="text-gol"
        />
      )}
      {liderGols && liderGols.stats.ataque.gols > 0 && (
        <ItemLider
          label="Artilheiro"
          icon={Goal}
          jogador={liderGols.jogador}
          valor={`${liderGols.stats.ataque.gols}G`}
          corIcone="text-acento"
        />
      )}
      {liderPasses && (
        <ItemLider
          label="Melhor passe"
          icon={Shuffle}
          jogador={liderPasses.jogador}
          valor={`${consolidarEstatisticas(liderPasses.stats).taxaPassagem}%`}
          corIcone="text-slate-300"
        />
      )}
      {liderDefensivo && (
        <ItemLider
          label="Liderança defensiva"
          icon={Shield}
          jogador={liderDefensivo.jogador}
          valor={String(
            liderDefensivo.stats.defesa.interceptacoes +
            liderDefensivo.stats.defesa.cortes +
            liderDefensivo.stats.defesa.desarmes,
          )}
          corIcone="text-slate-300"
        />
      )}
    </div>
  )
}
