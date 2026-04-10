import { Goal, Shield, Shuffle, AlertTriangle } from 'lucide-react'
import { CardKpi } from '@/components/shared/CardKpi'
import { EstatisticasJogador } from '@/types'

interface KpisColetivosProps {
  estatisticas: EstatisticasJogador[]
  golsTime: number
}

function somarCampo<T extends EstatisticasJogador, K extends keyof T>(
  stats: T[],
  getter: (s: T) => number,
): number {
  return stats.reduce((acc, s) => acc + getter(s), 0)
}

export function KpisColetivos({ estatisticas, golsTime }: KpisColetivosProps) {
  const totalPassesC = somarCampo(estatisticas, (s) => s.passagem.passesCompletos)
  const totalPassesT = somarCampo(estatisticas, (s) => s.passagem.passesTotal)
  const taxaPassagem = totalPassesT > 0 ? Math.round((totalPassesC / totalPassesT) * 100) : 0

  const totalDefensivo = somarCampo(
    estatisticas,
    (s) => s.defesa.interceptacoes + s.defesa.cortes + s.defesa.desarmes,
  )

  const totalAmarelos = somarCampo(estatisticas, (s) => s.disciplina.cartoesAmarelos)
  const totalFaltas = somarCampo(estatisticas, (s) => s.disciplina.faltasCometidas)

  const totalFinalizacoes = somarCampo(estatisticas, (s) => s.ataque.finalizacoesTotal)

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <CardKpi
        label="Gols marcados"
        valor={golsTime}
        icon={Goal}
        destaque
      />
      <CardKpi
        label="Precisão de passe"
        valor={`${taxaPassagem}%`}
        icon={Shuffle}
        subvalor={`${totalPassesC}/${totalPassesT} passes`}
      />
      <CardKpi
        label="Ações defensivas"
        valor={totalDefensivo}
        icon={Shield}
        subvalor="Cortes, interc. e desarmes"
      />
      <CardKpi
        label="Finalizações"
        valor={totalFinalizacoes}
        icon={AlertTriangle}
        subvalor={`${totalAmarelos} amarelo${totalAmarelos !== 1 ? 's' : ''} · ${totalFaltas} faltas`}
      />
    </div>
  )
}
