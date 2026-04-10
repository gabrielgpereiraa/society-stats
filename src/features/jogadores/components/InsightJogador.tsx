import { Sparkles, TrendingUp, Eye } from 'lucide-react'
import { gerarInsight } from '@/domain/insight'
import { consolidarEstatisticas } from '@/domain/estatisticas'
import { EstatisticasJogador, Posicao } from '@/types'

interface InsightJogadorProps {
  stats: EstatisticasJogador
  posicao: Posicao
}

interface BlocoInsightProps {
  icon: React.ComponentType<{ className?: string }>
  titulo: string
  texto: string
  corIcone: string
  corBg: string
}

function BlocoInsight({ icon: Icon, titulo, texto, corIcone, corBg }: BlocoInsightProps) {
  return (
    <div className={`flex gap-3 rounded-xl p-4 ${corBg}`}>
      <div className={`mt-0.5 shrink-0 ${corIcone}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {titulo}
        </p>
        <p className="text-sm leading-relaxed text-slate-300">{texto}</p>
      </div>
    </div>
  )
}

export function InsightJogador({ stats, posicao }: InsightJogadorProps) {
  const consolidado = consolidarEstatisticas(stats)
  const insight = gerarInsight(consolidado, posicao)

  return (
    <div className="space-y-3">
      <BlocoInsight
        icon={Sparkles}
        titulo="Destaque positivo"
        texto={insight.destaquePositivo}
        corIcone="text-gol"
        corBg="bg-gol-muted border border-gol/20"
      />
      <BlocoInsight
        icon={Eye}
        titulo="Contexto da partida"
        texto={insight.contextoEquilibrado}
        corIcone="text-slate-400"
        corBg="bg-campo-800 border border-campo-600/50"
      />
      <BlocoInsight
        icon={TrendingUp}
        titulo="Ponto de evolução"
        texto={insight.oportunidadeEvolucao}
        corIcone="text-acento"
        corBg="bg-acento-muted border border-acento/20"
      />
    </div>
  )
}
