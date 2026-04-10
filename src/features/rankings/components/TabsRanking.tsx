'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PodiumRanking } from './PodiumRanking'
import { ListaRanking } from './ListaRanking'
import { Ranking } from '@/types'

interface TabsRankingProps {
  rankings: Ranking[]
}

const ICONE_CATEGORIA: Record<string, string> = {
  artilharia:  '⚽',
  assistencias: '🎯',
  passes:      '🔄',
  defensivo:   '🛡️',
  disciplina:  '📋',
  consistencia:'📈',
}

export function TabsRanking({ rankings }: TabsRankingProps) {
  return (
    <Tabs defaultValue={rankings[0]?.categoria ?? 'artilharia'}>
      <TabsList className="h-auto flex-wrap gap-1 p-1">
        {rankings.map((ranking) => (
          <TabsTrigger key={ranking.categoria} value={ranking.categoria} className="gap-1.5">
            <span>{ICONE_CATEGORIA[ranking.categoria]}</span>
            <span className="hidden sm:inline">{ranking.titulo}</span>
            <span className="sm:hidden">{ranking.titulo.split(' ')[0]}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {rankings.map((ranking) => (
        <TabsContent key={ranking.categoria} value={ranking.categoria}>
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-100">{ranking.titulo}</h3>
              <p className="text-sm text-slate-500">{ranking.descricao}</p>
            </div>

            {ranking.entradas.length >= 3 ? (
              <>
                <PodiumRanking entradas={ranking.entradas} />
                <ListaRanking entradas={ranking.entradas} />
              </>
            ) : (
              <ListaRanking entradas={ranking.entradas} />
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
