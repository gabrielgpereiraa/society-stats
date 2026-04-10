import { CalendarDays } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SecaoTitulo } from '@/components/shared/SecaoTitulo'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { CardPartida } from '@/features/partidas/components/CardPartida'
import { buscarPartidas } from '@/data/repositorios'
import { labelResultado } from '@/lib/formatadores'

export default function PartidasPage() {
  const partidas = buscarPartidas()

  const vitorias = partidas.filter((p) => p.resultado === 'vitoria').length
  const empates  = partidas.filter((p) => p.resultado === 'empate').length
  const derrotas = partidas.filter((p) => p.resultado === 'derrota').length

  return (
    <PageContainer>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays className="h-4 w-4" />
          <span>Brasileirão 2026</span>
        </div>
        <h1 className="font-display text-3xl font-black text-slate-100 lg:text-4xl">
          Partidas
        </h1>
      </div>

      {/* Resumo da temporada */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-campo-600/50 bg-campo-800 p-4">
        <span className="text-sm font-medium text-slate-400">
          {partidas.length} partida{partidas.length !== 1 ? 's' : ''} registrada{partidas.length !== 1 ? 's' : ''}
        </span>
        <Separator orientation="vertical" className="h-4" />
        <Badge variant="success">{vitorias} vitória{vitorias !== 1 ? 's' : ''}</Badge>
        {empates > 0 && (
          <Badge variant="gol">{empates} empate{empates !== 1 ? 's' : ''}</Badge>
        )}
        {derrotas > 0 && (
          <Badge variant="destructive">{derrotas} derrota{derrotas !== 1 ? 's' : ''}</Badge>
        )}
      </div>

      <Separator />

      <section>
        <SecaoTitulo
          titulo="Histórico"
          descricao="Clique em uma partida para ver o detalhamento completo"
        />
        <div className="mt-4 space-y-3">
          {partidas.map((partida) => (
            <CardPartida key={partida.id} partida={partida} />
          ))}
        </div>
      </section>
    </PageContainer>
  )
}
