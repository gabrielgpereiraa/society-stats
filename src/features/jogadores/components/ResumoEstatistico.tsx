import { Goal, Shield, Shuffle, TrendingUp, AlertTriangle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { consolidarEstatisticas } from '@/domain/estatisticas'
import { EstatisticasJogador } from '@/types'

interface ResumoEstatisticoProps {
  stats: EstatisticasJogador
}

interface GrupoStatProps {
  titulo: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}

function GrupoStat({ titulo, icon: Icon, children }: GrupoStatProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-slate-500" />
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{titulo}</p>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

interface LinhaStatProps {
  label: string
  valor: string | number
  progresso?: number
  destaque?: boolean
}

function LinhaStat({ label, valor, progresso, destaque = false }: LinhaStatProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">{label}</span>
        <span className={`font-display text-sm font-bold ${destaque ? 'text-acento' : 'text-slate-200'}`}>
          {valor}
        </span>
      </div>
      {progresso !== undefined && (
        <Progress value={progresso} className="h-1.5" />
      )}
    </div>
  )
}

export function ResumoEstatistico({ stats }: ResumoEstatisticoProps) {
  const c = consolidarEstatisticas(stats)

  return (
    <div className="space-y-5">
      <GrupoStat titulo="Ataque" icon={Goal}>
        <LinhaStat label="Gols" valor={c.gols} destaque={c.gols > 0} />
        <LinhaStat label="Assistências" valor={c.assistencias} destaque={c.assistencias > 0} />
        <LinhaStat
          label="Finalizações"
          valor={`${c.finalizacoesNoGol} / ${c.finalizacoesTotal}`}
          progresso={c.finalizacoesTotal > 0 ? Math.round((c.finalizacoesNoGol / c.finalizacoesTotal) * 100) : 0}
        />
        {c.golContra > 0 && <LinhaStat label="Gol contra" valor={c.golContra} />}
      </GrupoStat>

      <Separator />

      <GrupoStat titulo="Passes" icon={Shuffle}>
        <LinhaStat
          label="Passes completos"
          valor={`${c.passesCompletos} / ${c.passesTotal}`}
          progresso={c.taxaPassagem}
          destaque={c.taxaPassagem >= 80}
        />
        <LinhaStat label="Precisão" valor={c.passesTotal > 0 ? `${c.taxaPassagem}%` : '—'} />
        {stats.passagem.cruzamentosTotal > 0 && (
          <LinhaStat
            label="Cruzamentos"
            valor={`${stats.passagem.cruzamentosCompletos} / ${stats.passagem.cruzamentosTotal}`}
          />
        )}
      </GrupoStat>

      <Separator />

      <GrupoStat titulo="Defensivo" icon={Shield}>
        <LinhaStat label="Interceptações" valor={stats.defesa.interceptacoes} />
        <LinhaStat label="Cortes" valor={stats.defesa.cortes} />
        <LinhaStat label="Desarmes" valor={stats.defesa.desarmes} />
        <LinhaStat label="Bloqueios" valor={stats.defesa.bloqueios} />
        {stats.defesa.defesasGoleiro > 0 && (
          <LinhaStat label="Defesas (goleiro)" valor={stats.defesa.defesasGoleiro} destaque />
        )}
        <LinhaStat label="Total defensivo" valor={c.totalDefensivo} destaque={c.totalDefensivo >= 3} />
      </GrupoStat>

      <Separator />

      <GrupoStat titulo="Posse de bola" icon={TrendingUp}>
        <LinhaStat label="Bolas ganhas" valor={c.bolasGanhas} />
        <LinhaStat label="Bolas perdidas" valor={c.bolasPerdidas} />
        <LinhaStat
          label="Dribles"
          valor={`${stats.posse.driblesCompletos} / ${stats.posse.driblesTotais}`}
          progresso={stats.posse.driblesTotais > 0
            ? Math.round((stats.posse.driblesCompletos / stats.posse.driblesTotais) * 100)
            : 0}
        />
        <LinhaStat
          label="Divididas"
          valor={`${stats.posse.dividasGanhas}G / ${stats.posse.dividasPerdidas}P`}
        />
      </GrupoStat>

      <Separator />

      <GrupoStat titulo="Disciplina" icon={AlertTriangle}>
        <LinhaStat label="Faltas cometidas" valor={c.faltasCometidas} />
        <LinhaStat label="Faltas sofridas" valor={stats.disciplina.faltasSofridas} destaque={stats.disciplina.faltasSofridas > 0} />
        <LinhaStat label="Cartões amarelos" valor={c.cartoesAmarelos} />
        {c.cartoesVermelhos > 0 && (
          <LinhaStat label="Cartões vermelhos" valor={c.cartoesVermelhos} />
        )}
        {c.penaltiCometido > 0 && (
          <LinhaStat label="Pênalti cometido" valor={c.penaltiCometido} />
        )}
        {c.penaltiSofrido > 0 && (
          <LinhaStat label="Pênalti sofrido" valor={c.penaltiSofrido} destaque />
        )}
      </GrupoStat>
    </div>
  )
}
