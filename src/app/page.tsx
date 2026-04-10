import Link from 'next/link'
import { ArrowRight, Trophy, Users, CalendarDays } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SecaoTitulo } from '@/components/shared/SecaoTitulo'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ResumoUltimaPartida } from '@/features/dashboard/components/ResumoUltimaPartida'
import { LideresTime } from '@/features/dashboard/components/LideresTime'
import { DestaqueRecente } from '@/features/dashboard/components/DestaqueRecente'
import {
  buscarUltimaPartida,
  buscarJogadores,
  buscarJogadoresComStats,
} from '@/data/repositorios'

export default function DashboardPage() {
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

  const destaque = jogadoresComStats.reduce<typeof jogadoresComStats[number] | null>(
    (melhor, atual) => (!melhor || atual.stats.nota > melhor.stats.nota ? atual : melhor),
    null,
  )

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
            Temporada 2026
          </p>
          <h1 className="font-display text-3xl font-black text-slate-100 lg:text-4xl">
            Hub de Estatísticas
          </h1>
          <p className="mt-1 text-slate-400">CR Vasco da Gama</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/partidas">
            <Button variant="outline" size="sm" className="gap-1.5">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Partidas</span>
            </Button>
          </Link>
          <Link href="/rankings">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Rankings</span>
            </Button>
          </Link>
        </div>
      </div>

      <Separator />

      {/* Destaque da partida */}
      {destaque && (
        <section>
          <SecaoTitulo
            titulo="Destaque da última partida"
            descricao="O jogador com melhor desempenho no jogo mais recente"
          />
          <div className="mt-4">
            <DestaqueRecente jogador={destaque.jogador} stats={destaque.stats} />
          </div>
        </section>
      )}

      {/* Última partida + Líderes */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <SecaoTitulo
            titulo="Última partida"
            acao={
              <Link href="/partidas">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  Ver todas
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            }
          />
          <div className="mt-4">
            <ResumoUltimaPartida partida={ultimaPartida} />
          </div>
        </section>

        <section>
          <SecaoTitulo
            titulo="Líderes do jogo"
            descricao="Melhores desempenhos individuais"
          />
          <div className="mt-4">
            <LideresTime
              jogadores={jogadores}
              estatisticas={ultimaPartida.estatisticas}
            />
          </div>
        </section>
      </div>

      {/* Atalhos */}
      <section>
        <SecaoTitulo titulo="Acesso rápido" />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link href="/jogadores">
            <div className="flex cursor-pointer items-center gap-4 rounded-xl border border-campo-600/50 bg-campo-800 p-4 transition-all hover:border-campo-500">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-acento/10">
                <Users className="h-5 w-5 text-acento" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-100">Jogadores</p>
                <p className="text-xs text-slate-500">{jogadores.length} atletas</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-slate-600" />
            </div>
          </Link>

          <Link href="/partidas">
            <div className="flex cursor-pointer items-center gap-4 rounded-xl border border-campo-600/50 bg-campo-800 p-4 transition-all hover:border-campo-500">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gol/10">
                <CalendarDays className="h-5 w-5 text-gol" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-100">Partidas</p>
                <p className="text-xs text-slate-500">Histórico completo</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-slate-600" />
            </div>
          </Link>

          <Link href="/rankings">
            <div className="flex cursor-pointer items-center gap-4 rounded-xl border border-campo-600/50 bg-campo-800 p-4 transition-all hover:border-campo-500">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-campo-700">
                <Trophy className="h-5 w-5 text-slate-300" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-100">Rankings</p>
                <p className="text-xs text-slate-500">Destaques positivos</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-slate-600" />
            </div>
          </Link>
        </div>
      </section>
    </PageContainer>
  )
}
