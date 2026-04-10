'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import { montarDimensoesRadar } from '@/domain/estatisticas'
import { EstatisticasJogador } from '@/types'

interface GraficoDimensoesProps {
  stats: EstatisticasJogador
}

export function GraficoDimensoes({ stats }: GraficoDimensoesProps) {
  const dimensoes = montarDimensoesRadar(stats)

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={dimensoes} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke="#1e3a5f" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="dimensao"
            tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'Barlow, sans-serif', fontWeight: 600 }}
          />
          <Radar
            name="Desempenho"
            dataKey="valor"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.15}
            strokeWidth={2}
            dot={{ fill: '#10b981', strokeWidth: 0, r: 4 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
