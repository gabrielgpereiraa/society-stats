import { Users } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SecaoTitulo } from '@/components/shared/SecaoTitulo'
import { Separator } from '@/components/ui/separator'
import { CardJogador } from '@/features/jogadores/components/CardJogador'
import { buscarJogadores, buscarUltimaPartida, buscarEstatisticasJogadorNaPartida } from '@/data/repositorios'
import { Posicao } from '@/types'

const ORDEM_POSICAO: Record<Posicao, number> = {
  'Goleiro':    0,
  'Defensor':   1,
  'Meio-campo': 2,
  'Atacante':   3,
}

export default function JogadoresPage() {
  const jogadores = buscarJogadores()
  const ultimaPartida = buscarUltimaPartida()

  const jogadoresPorPosicao = [...jogadores].sort(
    (a, b) => ORDEM_POSICAO[a.posicao] - ORDEM_POSICAO[b.posicao],
  )

  const posicoes: Posicao[] = ['Goleiro', 'Defensor', 'Meio-campo', 'Atacante']

  return (
    <PageContainer>
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Users className="h-4 w-4" />
          <span>Elenco</span>
        </div>
        <h1 className="font-display text-3xl font-black text-slate-100 lg:text-4xl">
          Jogadores
        </h1>
        <p className="mt-1 text-slate-400">
          {jogadores.length} atletas cadastrados · Temporada 2025
        </p>
      </div>

      <Separator />

      {posicoes.map((posicao) => {
        const grupo = jogadoresPorPosicao.filter((j) => j.posicao === posicao)
        if (grupo.length === 0) return null

        return (
          <section key={posicao}>
            <SecaoTitulo
              titulo={posicao}
              descricao={`${grupo.length} atleta${grupo.length !== 1 ? 's' : ''}`}
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {grupo.map((jogador) => {
                const ultimaStats = ultimaPartida
                  ? buscarEstatisticasJogadorNaPartida(ultimaPartida, jogador.id)
                  : null

                return (
                  <CardJogador
                    key={jogador.id}
                    jogador={jogador}
                    ultimaStats={ultimaStats ?? undefined}
                  />
                )
              })}
            </div>
          </section>
        )
      })}
    </PageContainer>
  )
}
