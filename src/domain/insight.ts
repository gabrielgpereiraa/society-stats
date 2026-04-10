import { EstatisticasConsolidadas, Posicao } from '@/types'

export interface InsightJogador {
  destaquePositivo: string
  contextoEquilibrado: string
  oportunidadeEvolucao: string
}

function insightGoleiro(stats: EstatisticasConsolidadas): InsightJogador {
  const defesas = 0
  void defesas

  return {
    destaquePositivo:
      stats.gols > 0
        ? 'Contribuiu no ataque com uma participação incomum para um goleiro.'
        : 'Manteve o time organizado na saída de bola, sendo efetivo sob pressão.',
    contextoEquilibrado:
      'O goleiro é o último recurso da defesa e cada intervenção tem peso enorme no resultado.',
    oportunidadeEvolucao:
      'Trabalhar a distribuição com os pés pode ser um diferencial que poucos goleiros têm na categoria.',
  }
}

function insightDefensor(stats: EstatisticasConsolidadas): InsightJogador {
  if (stats.totalDefensivo >= 5) {
    return {
      destaquePositivo: `Liderança defensiva na partida com ${stats.totalDefensivo} ações defensivas — um dos pilares da contenção do time.`,
      contextoEquilibrado: 'A sólida atuação defensiva deu liberdade para o meio campo criar as jogadas ofensivas.',
      oportunidadeEvolucao: 'Investir na saída de bola limpa pode transformar boas recuperações em contra-ataques perigosos.',
    }
  }

  if (stats.passesTotal >= 10) {
    return {
      destaquePositivo: `Circulação de bola consistente com ${stats.passesCompletos} passes certos — organização saindo de trás.`,
      contextoEquilibrado: 'A construção pelo setor defensivo é fundamental para o time não perder a posse facilmente.',
      oportunidadeEvolucao: 'Aumentar as intervenções defensivas em duelos diretos pode elevar seu impacto nas partidas.',
    }
  }

  return {
    destaquePositivo: 'Manteve posicionamento tático e garantiu segurança à linha defensiva.',
    contextoEquilibrado: 'Mesmo em partidas com menos ações registradas, a presença física faz diferença no espaço.',
    oportunidadeEvolucao: 'Buscar participação ativa na marcação e na saída de bola vai ampliar sua relevância no sistema de jogo.',
  }
}

function insightMeioCampo(stats: EstatisticasConsolidadas): InsightJogador {
  if (stats.gols >= 1) {
    return {
      destaquePositivo: `Decisivo! ${stats.gols} gol${stats.gols > 1 ? 's' : ''} marcado${stats.gols > 1 ? 's' : ''} e participação ativa em toda a partida.`,
      contextoEquilibrado: 'O meio-campo que produz e defende é o mais valioso para qualquer time de society.',
      oportunidadeEvolucao: 'Continuar combinando produtividade ofensiva com consistência nos passes vai tornar sua atuação ainda mais completa.',
    }
  }

  if (stats.passesTotal >= 15) {
    return {
      destaquePositivo: `Volume de jogo impressionante: ${stats.passesCompletos}/${stats.passesTotal} passes — motor da construção no meio.`,
      contextoEquilibrado: 'Um meio-campo que movimenta a bola com eficiência reduz o cansaço do time inteiro.',
      oportunidadeEvolucao: 'Arriscar mais finalizações a gol pode transformar uma atuação de construção em atuação decisiva.',
    }
  }

  if (stats.totalDefensivo >= 3) {
    return {
      destaquePositivo: `Trabalho defensivo sólido com ${stats.totalDefensivo} ações de recuperação — proteção importante para o time.`,
      contextoEquilibrado: 'A função defensiva do meio é muitas vezes invisível nos placares, mas crucial para o resultado.',
      oportunidadeEvolucao: 'Equilibrar a função defensiva com mais participação ofensiva pode ampliar sua influência.',
    }
  }

  return {
    destaquePositivo: 'Manteve boa movimentação e presença nas disputas, ajudando a equilibrar o setor.',
    contextoEquilibrado: 'O meio-campo é a zona de maior intensidade e cada recuperação contribui para o controle da partida.',
    oportunidadeEvolucao: 'Aumentar o volume de passes e ações defensivas vai fazer seu impacto ser mais visível nos números.',
  }
}

function insightAtacante(stats: EstatisticasConsolidadas): InsightJogador {
  if (stats.gols >= 1 && stats.assistencias >= 1) {
    return {
      destaquePositivo: `Atuação completa no setor ofensivo: ${stats.gols} gol e ${stats.assistencias} assistência — envolvido em todas as frentes do ataque.`,
      contextoEquilibrado: 'Atacantes que marcam e assistem são os mais difíceis de marcar individualmente.',
      oportunidadeEvolucao: 'Manter essa constância ao longo das partidas é o próximo patamar para quem já possui a capacidade técnica.',
    }
  }

  if (stats.gols >= 1) {
    return {
      destaquePositivo: `Gol marcado — o atacante faz o que mais importa. Decisivo no placar.`,
      contextoEquilibrado: 'A eficiência do atacante não está só nos números de finalizações, mas em ser letal no momento certo.',
      oportunidadeEvolucao: 'Adicionar assistências ao jogo pode tornar você ainda mais imprevisível para as defesas.',
    }
  }

  if (stats.finalizacoesTotal >= 2) {
    return {
      destaquePositivo: `Pressionou a defesa adversária com ${stats.finalizacoesTotal} finalizações — criou perigo constante.`,
      contextoEquilibrado: 'Atacantes que exigem o goleiro forçam erros defensivos e cansam os marcadores.',
      oportunidadeEvolucao: 'Converter pelo menos uma das chances criadas vai ser o diferencial na próxima partida.',
    }
  }

  return {
    destaquePositivo: 'Movimentação inteligente na área criou espaço para os companheiros de ataque.',
    contextoEquilibrado: 'Nem todas as contribuições ofensivas aparecem nos gols — o trabalho de criação de espaço tem valor real.',
    oportunidadeEvolucao: 'Aumentar a frequência de finalizações e combinações com a meia vão amplificar seu impacto nas partidas.',
  }
}

export function gerarInsight(stats: EstatisticasConsolidadas, posicao: Posicao): InsightJogador {
  switch (posicao) {
    case 'Goleiro':
      return insightGoleiro(stats)
    case 'Defensor':
      return insightDefensor(stats)
    case 'Meio-campo':
      return insightMeioCampo(stats)
    case 'Atacante':
      return insightAtacante(stats)
  }
}
