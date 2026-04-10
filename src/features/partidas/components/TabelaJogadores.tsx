import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { NotaFifa } from '@/components/shared/NotaFifa'
import { AvatarJogador } from '@/components/shared/AvatarJogador'
import { Badge } from '@/components/ui/badge'
import { consolidarEstatisticas } from '@/domain/estatisticas'
import { Jogador, EstatisticasJogador } from '@/types'

interface TabelaJogadoresProps {
  jogadores: Jogador[]
  estatisticas: EstatisticasJogador[]
  partidaId: string
}

function CelulaGolAssistencia({ gols, assistencias }: { gols: number; assistencias: number }) {
  if (gols === 0 && assistencias === 0) return <span className="text-slate-600">—</span>

  return (
    <div className="flex items-center gap-1">
      {gols > 0 && (
        <span className="font-bold text-gol">{gols}G</span>
      )}
      {assistencias > 0 && (
        <span className="font-bold text-acento">{assistencias}A</span>
      )}
    </div>
  )
}

function CelulaDisciplina({ amarelos, vermelhos, penaltiCometido, golContra }: {
  amarelos: number; vermelhos: number; penaltiCometido: number; golContra: number
}) {
  const temOcorrencia = amarelos > 0 || vermelhos > 0 || penaltiCometido > 0 || golContra > 0
  if (!temOcorrencia) return <span className="text-slate-600">Limpo</span>

  return (
    <div className="flex flex-wrap items-center gap-1">
      {amarelos > 0 && (
        <span className="inline-block h-3.5 w-2.5 rounded-sm bg-gol" title="Amarelo" />
      )}
      {vermelhos > 0 && (
        <span className="inline-block h-3.5 w-2.5 rounded-sm bg-alerta" title="Vermelho" />
      )}
      {penaltiCometido > 0 && (
        <Badge variant="secondary" className="h-4 px-1 text-xs">P</Badge>
      )}
      {golContra > 0 && (
        <Badge variant="destructive" className="h-4 px-1 text-xs">GC</Badge>
      )}
    </div>
  )
}

export function TabelaJogadores({ jogadores, estatisticas, partidaId }: TabelaJogadoresProps) {
  const rows = estatisticas
    .map((stats) => {
      const jogador = jogadores.find((j) => j.id === stats.jogadorId)
      if (!jogador) return null
      return { jogador, stats, consolidado: consolidarEstatisticas(stats) }
    })
    .filter((row): row is NonNullable<typeof row> => row !== null)
    .sort((a, b) => b.stats.nota - a.stats.nota)

  return (
    <div className="overflow-hidden rounded-xl border border-campo-600/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-44">Jogador</TableHead>
            <TableHead className="w-16 text-center">Nota</TableHead>
            <TableHead>G/A</TableHead>
            <TableHead>Passes</TableHead>
            <TableHead className="hidden md:table-cell">Finaliz.</TableHead>
            <TableHead className="hidden md:table-cell">Defensivo</TableHead>
            <TableHead className="hidden lg:table-cell">Posse</TableHead>
            <TableHead>Disciplina</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ jogador, stats, consolidado }) => (
            <TableRow key={jogador.id}>
              <TableCell>
                <Link
                  href={`/jogadores/${jogador.id}`}
                  className="flex items-center gap-2.5 hover:opacity-80"
                >
                  <AvatarJogador jogador={jogador} tamanho="sm" />
                  <div>
                    <p className="font-semibold text-slate-100">{jogador.apelido}</p>
                    <p className="text-xs text-slate-500">#{jogador.numero} · {jogador.posicao}</p>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <NotaFifa valor={stats.nota} tamanho="sm" />
              </TableCell>
              <TableCell>
                <CelulaGolAssistencia
                  gols={consolidado.gols}
                  assistencias={consolidado.assistencias}
                />
              </TableCell>
              <TableCell>
                <span className="tabular-nums text-slate-300">
                  {consolidado.passesCompletos}/{consolidado.passesTotal}
                </span>
                {consolidado.passesTotal > 0 && (
                  <span className="ml-1 text-xs text-slate-600">
                    ({consolidado.taxaPassagem}%)
                  </span>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell tabular-nums text-slate-300">
                {consolidado.finalizacoesNoGol}/{consolidado.finalizacoesTotal}
              </TableCell>
              <TableCell className="hidden md:table-cell tabular-nums text-slate-300">
                {consolidado.totalDefensivo > 0 ? consolidado.totalDefensivo : <span className="text-slate-600">—</span>}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className="text-sm text-slate-300">
                  {consolidado.bolasGanhas}/{consolidado.bolasPerdidas}
                </span>
              </TableCell>
              <TableCell>
                <CelulaDisciplina
                  amarelos={consolidado.cartoesAmarelos}
                  vermelhos={consolidado.cartoesVermelhos}
                  penaltiCometido={consolidado.penaltiCometido}
                  golContra={consolidado.golContra}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
