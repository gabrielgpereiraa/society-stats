import { Trophy } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SecaoTitulo } from '@/components/shared/SecaoTitulo'
import { Separator } from '@/components/ui/separator'
import { TabsRanking } from '@/features/rankings/components/TabsRanking'
import { gerarTodosRankings } from '@/domain/ranking'
import { buscarUltimaPartida, buscarJogadores, buscarJogadoresComStats } from '@/data/repositorios'

export default function RankingsPage() {
  const ultimaPartida = buscarUltimaPartida()
  const jogadores = buscarJogadores()

  if (!ultimaPartida) {
    return (
      <PageContainer>
        <p className="text-slate-500">Nenhuma partida registrada ainda.</p>
      </PageContainer>
    )
  }

  const jogadoresComStats = buscarJogadoresComStats(ultimaPartida)
  const rankings = gerarTodosRankings(jogadoresComStats)

  return (
    <PageContainer>
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Trophy className="h-4 w-4" />
          <span>Última partida</span>
        </div>
        <h1 className="font-display text-3xl font-black text-slate-100 lg:text-4xl">
          Rankings
        </h1>
        <p className="mt-1 text-slate-400">
          Destaques positivos da última partida
        </p>
      </div>

      {/* Banner informativo */}
      <div className="flex items-start gap-3 rounded-xl border border-acento/20 bg-acento-muted p-4">
        <span className="text-lg">⭐</span>
        <div>
          <p className="font-semibold text-acento">Rankings de destaque</p>
          <p className="mt-0.5 text-sm text-slate-400">
            Aqui você encontra apenas os rankings que celebram desempenho positivo.
            O objetivo é reconhecer e valorizar cada aspecto do jogo.
          </p>
        </div>
      </div>

      <Separator />

      <section>
        <SecaoTitulo
          titulo="Líderes por categoria"
          descricao="Top 3 em cada dimensão do jogo"
        />
        <div className="mt-4">
          <TabsRanking rankings={rankings} />
        </div>
      </section>
    </PageContainer>
  )
}
