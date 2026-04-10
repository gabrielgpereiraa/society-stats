import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Youtube } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SecaoTitulo } from '@/components/shared/SecaoTitulo'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HeaderPartida } from '@/features/partidas/components/HeaderPartida'
import { TimelineEventos } from '@/features/partidas/components/TimelineEventos'
import { KpisColetivos } from '@/features/partidas/components/KpisColetivos'
import { TabelaJogadores } from '@/features/partidas/components/TabelaJogadores'
import { SecaoLancesYoutube } from '@/features/partidas/components/SecaoLancesYoutube'
import { buscarPartidaPorId, buscarJogadores } from '@/data/repositorios'

interface Props {
  params: { id: string }
}

export default function DetalhePartidaPage({ params }: Props) {
  const partida = buscarPartidaPorId(params.id)
  if (!partida) notFound()

  const jogadores = buscarJogadores()
  const temLancesYoutube = partida.eventos.some((e) => e.tipo === 'gol' && e.lance !== null)

  return (
    <PageContainer>
      {/* Voltar */}
      <Link href="/partidas">
        <Button variant="ghost" size="sm" className="gap-1.5 text-slate-400 hover:text-slate-100">
          <ArrowLeft className="h-4 w-4" />
          Partidas
        </Button>
      </Link>

      {/* Header com placar */}
      <HeaderPartida partida={partida} />

      {/* KPIs coletivos */}
      <section>
        <SecaoTitulo titulo="Números do jogo" />
        <div className="mt-4">
          <KpisColetivos
            estatisticas={partida.estatisticas}
            golsTime={partida.placar.nos}
          />
        </div>
      </section>

      <Separator />

      {/* Tabs: Jogadores / Timeline / Lances */}
      <Tabs defaultValue="jogadores">
        <TabsList>
          <TabsTrigger value="jogadores">Jogadores</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          {temLancesYoutube && (
            <TabsTrigger value="lances" className="gap-1.5">
              <Youtube className="h-3.5 w-3.5" />
              Lances
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="jogadores">
          <div className="space-y-3">
            <p className="text-sm text-slate-500">
              Clique no jogador para ver o perfil completo.
            </p>
            <TabelaJogadores
              jogadores={jogadores}
              estatisticas={partida.estatisticas}
              partidaId={partida.id}
            />
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <div className="rounded-xl border border-campo-600/50 bg-campo-800 p-5">
            <TimelineEventos
              eventos={partida.eventos}
              jogadores={jogadores}
            />
          </div>
        </TabsContent>

        {temLancesYoutube && (
          <TabsContent value="lances">
            <div className="space-y-3">
              <p className="text-sm text-slate-500">
                Assista aos momentos decisivos diretamente da live gravada.
              </p>
              <SecaoLancesYoutube
                eventos={partida.eventos}
                jogadores={jogadores}
              />
            </div>
          </TabsContent>
        )}
      </Tabs>
    </PageContainer>
  )
}
