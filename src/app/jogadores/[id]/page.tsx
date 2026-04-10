import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SecaoTitulo } from '@/components/shared/SecaoTitulo'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CabecalhoPerfil } from '@/features/jogadores/components/CabecalhoPerfil'
import { ResumoEstatistico } from '@/features/jogadores/components/ResumoEstatistico'
import { GraficoDimensoes } from '@/features/jogadores/components/GraficoDimensoes'
import { InsightJogador } from '@/features/jogadores/components/InsightJogador'
import { EventosJogador } from '@/features/jogadores/components/EventosJogador'
import { ComparacaoTime } from '@/features/jogadores/components/ComparacaoTime'
import {
  buscarJogadorPorId,
  buscarUltimaPartida,
  buscarEstatisticasJogadorNaPartida,
} from '@/data/repositorios'

interface Props {
  params: { id: string }
}

export default function PerfilJogadorPage({ params }: Props) {
  const jogador = buscarJogadorPorId(params.id)
  if (!jogador) notFound()

  const ultimaPartida = buscarUltimaPartida()
  const stats = ultimaPartida
    ? buscarEstatisticasJogadorNaPartida(ultimaPartida, jogador.id)
    : null

  if (!stats || !ultimaPartida) {
    return (
      <PageContainer>
        <Link href="/jogadores">
          <Button variant="ghost" size="sm" className="gap-1.5 text-slate-400 hover:text-slate-100">
            <ArrowLeft className="h-4 w-4" />
            Jogadores
          </Button>
        </Link>
        <div className="rounded-xl border border-campo-600/50 bg-campo-800 p-8 text-center">
          <p className="text-slate-400">Nenhuma estatística registrada para este jogador.</p>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {/* Voltar */}
      <Link href="/jogadores">
        <Button variant="ghost" size="sm" className="gap-1.5 text-slate-400 hover:text-slate-100">
          <ArrowLeft className="h-4 w-4" />
          Jogadores
        </Button>
      </Link>

      {/* Cabeçalho com avatar, nota e label */}
      <CabecalhoPerfil jogador={jogador} stats={stats} />

      {/* Insight principal — destaque positivo */}
      <section>
        <SecaoTitulo
          titulo="Análise da partida"
          descricao="Visão construtiva sobre sua atuação"
        />
        <div className="mt-4">
          <InsightJogador stats={stats} posicao={jogador.posicao} />
        </div>
      </section>

      <Separator />

      {/* Tabs: Stats / Gráfico / Eventos / Comparação */}
      <Tabs defaultValue="stats">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          <TabsTrigger value="grafico">Gráfico</TabsTrigger>
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
          <TabsTrigger value="comparacao">vs Time</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <div className="rounded-xl border border-campo-600/50 bg-campo-800 p-5">
            <ResumoEstatistico stats={stats} />
          </div>
        </TabsContent>

        <TabsContent value="grafico">
          <div className="rounded-xl border border-campo-600/50 bg-campo-800 p-5">
            <SecaoTitulo
              titulo="Dimensões de jogo"
              descricao="Radar de desempenho nas 5 dimensões principais"
            />
            <div className="mt-4">
              <GraficoDimensoes stats={stats} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="eventos">
          <div className="rounded-xl border border-campo-600/50 bg-campo-800 p-5">
            <SecaoTitulo
              titulo="Seus eventos na partida"
              descricao="Momentos registrados durante o jogo"
            />
            <div className="mt-4">
              <EventosJogador
                eventos={ultimaPartida.eventos}
                jogadorId={jogador.id}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="comparacao">
          <div className="rounded-xl border border-campo-600/50 bg-campo-800 p-5">
            <SecaoTitulo
              titulo="Comparação com o time"
              descricao="Seu desempenho em relação à média dos jogadores"
            />
            <div className="mt-4">
              <ComparacaoTime
                statsJogador={stats}
                todasStats={ultimaPartida.estatisticas}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}
