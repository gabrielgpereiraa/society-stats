import { Progress } from '@/components/ui/progress'
import { consolidarEstatisticas } from '@/domain/estatisticas'
import { EstatisticasJogador } from '@/types'

interface ComparacaoTimeProps {
  statsJogador: EstatisticasJogador
  todasStats: EstatisticasJogador[]
}

interface LinhaComparacaoProps {
  label: string
  valorJogador: number
  mediaTime: number
  formatarValor?: (v: number) => string
}

function calcularMedia(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((a, b) => a + b, 0) / values.length
}

function percentualRelativo(valor: number, max: number): number {
  if (max === 0) return 0
  return Math.round((valor / max) * 100)
}

function LinhaComparacao({ label, valorJogador, mediaTime, formatarValor }: LinhaComparacaoProps) {
  const maxValor = Math.max(valorJogador, mediaTime)
  const progressoJogador = percentualRelativo(valorJogador, maxValor * 1.2)
  const progressoMedia = percentualRelativo(mediaTime, maxValor * 1.2)

  const fmt = formatarValor ?? ((v: number) => v.toFixed(1))

  const acimaDaMedia = valorJogador >= mediaTime

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-slate-500">Média: {fmt(mediaTime)}</span>
          <span className={`font-bold ${acimaDaMedia ? 'text-acento' : 'text-slate-300'}`}>
            Você: {fmt(valorJogador)}
          </span>
        </div>
      </div>
      <div className="relative space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-12 shrink-0 text-right text-xs text-slate-600">Você</span>
          <Progress value={progressoJogador} className="h-2 flex-1 [&>div]:bg-acento" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-12 shrink-0 text-right text-xs text-slate-600">Time</span>
          <Progress value={progressoMedia} className="h-2 flex-1 [&>div]:bg-slate-600" />
        </div>
      </div>
    </div>
  )
}

export function ComparacaoTime({ statsJogador, todasStats }: ComparacaoTimeProps) {
  const consolidadoJogador = consolidarEstatisticas(statsJogador)
  const todosConsolidados = todasStats.map(consolidarEstatisticas)

  const mediaPassagem = calcularMedia(todosConsolidados.map((c) => c.taxaPassagem))
  const mediaDefensivo = calcularMedia(todosConsolidados.map((c) => c.totalDefensivo))
  const mediaNota = calcularMedia(todasStats.map((s) => s.nota))

  return (
    <div className="space-y-4">
      <LinhaComparacao
        label="Nota na partida"
        valorJogador={statsJogador.nota}
        mediaTime={mediaNota}
        formatarValor={(v) => v.toFixed(1)}
      />
      <LinhaComparacao
        label="Precisão de passes (%)"
        valorJogador={consolidadoJogador.taxaPassagem}
        mediaTime={mediaPassagem}
        formatarValor={(v) => `${Math.round(v)}%`}
      />
      <LinhaComparacao
        label="Ações defensivas"
        valorJogador={consolidadoJogador.totalDefensivo}
        mediaTime={mediaDefensivo}
        formatarValor={(v) => Math.round(v).toString()}
      />
    </div>
  )
}
