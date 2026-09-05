export const revalidate = 3600; // Cache de 1 hora

// Gerador pseudo-aleatório determinístico baseado em seed
function seedRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const SIGNOS = [
  { id: 'aries', nome: 'Áries', periodo: '21/03 a 19/04', elemento: 'Fogo' },
  { id: 'touro', nome: 'Touro', periodo: '20/04 a 20/05', elemento: 'Terra' },
  { id: 'gemeos', nome: 'Gêmeos', periodo: '21/05 a 20/06', elemento: 'Ar' },
  { id: 'cancer', nome: 'Câncer', periodo: '21/06 a 22/07', elemento: 'Água' },
  { id: 'leao', nome: 'Leão', periodo: '23/07 a 22/08', elemento: 'Fogo' },
  { id: 'virgem', nome: 'Virgem', periodo: '23/08 a 22/09', elemento: 'Terra' },
  { id: 'libra', nome: 'Libra', periodo: '23/09 a 22/10', elemento: 'Ar' },
  { id: 'escorpiao', nome: 'Escorpião', periodo: '23/10 a 21/11', elemento: 'Água' },
  { id: 'sagitario', nome: 'Sagitário', periodo: '22/11 a 21/12', elemento: 'Fogo' },
  { id: 'capricornio', nome: 'Capricórnio', periodo: '22/12 a 19/01', elemento: 'Terra' },
  { id: 'aquario', nome: 'Aquário', periodo: '20/01 a 18/02', elemento: 'Ar' },
  { id: 'peixes', nome: 'Peixes', periodo: '19/02 a 20/03', elemento: 'Água' },
];

const PREVISOES_AMOR = [
  "O dia favorece conversas profundas. Se está em uma relação, aproveite para alinhar planos futuros. Solteiros podem ter surpresas em círculos sociais.",
  "Momento de rever expectativas. A energia de hoje pede mais paciência com quem ama. Evite cobrar respostas imediatas de sentimentos complexos.",
  "Sua comunicação estará magnética. É um excelente momento para expressar o que sente. Há grande chance de atração mútua no ar.",
  "Dê espaço para a vulnerabilidade. Conectar-se com os próprios sentimentos trará alívio e fortalecerá os laços afetivos existentes.",
  "Evite disputas de poder na relação. A harmonia virá através do diálogo e da concessão. Solteiros devem focar no amor-próprio hoje.",
  "Uma onda de romance e conexão espiritual toma conta do seu dia. Abra o coração para novas possibilidades e deixe o passado para trás."
];

const PREVISOES_TRABALHO = [
  "Foco e determinação trarão resultados rápidos. Ótimo momento para iniciar novos projetos ou propor ideias inovadoras em equipe.",
  "Evite decisões financeiras por impulso. O dia pede análise e cautela. Planeje seus próximos passos com estratégia e paciência.",
  "Novas parcerias ou contatos profissionais promissores podem surgir hoje. Mantenha seu networking atualizado e esteja aberto a conselhos.",
  "Dia produtivo para organizar tarefas acumuladas. Limpar sua mesa e sua mente abrirá espaço para novas oportunidades de crescimento.",
  "Sua liderança natural estará em evidência. Confie nas suas decisões, mas lembre-se de ouvir o feedback de colegas experientes.",
  "Momento de colheita. Esforços passados começam a ser reconhecidos pela gestão. Mantenha a humildade e continue o bom trabalho."
];

const PREVISOES_SAUDE = [
  "A energia física está em alta. Aproveite para praticar esportes ou fazer caminhadas. Lembre-se de manter a hidratação em dia.",
  "A mente pede descanso. Evite sobrecarga de telas e reserve um momento para meditação ou leitura leve antes de dormir.",
  "Atenção à alimentação. O corpo pede nutrientes e equilíbrio. Evite excesso de cafeína e alimentos ultraprocessados hoje.",
  "Excelente dia para alongamentos ou atividades que conectam corpo e mente, como yoga. Ouça os sinais de cansaço do seu corpo.",
  "Revitalize sua energia com momentos de lazer ao ar livre. O contato com a natureza trará uma sensação de clareza e bem-estar.",
  "Sono e descanso devem ser prioridades hoje. O corpo precisa recarregar as defesas naturais. Evite dormir muito tarde."
];

const CARTAS_TARO = [
  { nome: "O Louco", significado: "Novos começos, liberdade, espontaneidade e fé no futuro.", conselho: "Dê o salto de fé. O momento pede coragem para iniciar uma nova jornada sem medo do desconhecido." },
  { nome: "O Mago", significado: "Poder pessoal, ação, concentração e força de vontade.", conselho: "Você tem todas as ferramentas de que precisa. Concentre sua energia e manifeste seus objetivos." },
  { nome: "A Sacerdotisa", significado: "Intuição, mistério, subconsciente e sabedoria interior.", conselho: "Confie na sua intuição. Nem todas as respostas estão no mundo exterior; silencie e ouça a si mesmo." },
  { nome: "A Imperatriz", significado: "Feminilidade, beleza, natureza, abundância e fertilidade.", conselho: "Nutra seus projetos e conecte-se com o mundo ao seu redor. A criação e o crescimento estão favorecidos." },
  { nome: "O Imperador", significado: "Autoridade, estrutura, estabilidade e proteção.", conselho: "Traga ordem e organização para o seu dia. Estabeleça limites claros e assuma o controle da situação." },
  { nome: "O Hierofante", significado: "Tradição, conformidade, mentoria e sabedoria espiritual.", conselho: "Busque orientação de pessoas experientes ou conecte-se com sistemas de conhecimento estabelecidos." },
  { nome: "Os Enamorados", significado: "Escolhas, amor, harmonia e alinhamento de valores.", conselho: "Tome decisões com base no seu coração e valores morais. Alinhe suas escolhas com o que você realmente acredita." },
  { nome: "O Carro", significado: "Controle, vitória, determinação e superação de obstáculos.", conselho: "Mantenha o foco e a disciplina. Você está no caminho da vitória, mas precisa direcionar suas forças com firmeza." },
  { nome: "A Força", significado: "Coragem, paciência, compaixão e força interior.", conselho: "Domine seus impulsos com suavidade e paciência. A verdadeira força vem do autocontrole e do amor." },
  { nome: "O Eremita", significado: "Introspecção, busca da verdade, solidão e orientação interna.", conselho: "Reserve um tempo para refletir sozinho. Afaste-se do barulho exterior para encontrar a sua própria luz." },
  { nome: "A Roda da Fortuna", significado: "Mudança, ciclos, destino e reviravoltas da vida.", conselho: "Aceite as mudanças com resiliência. A vida é feita de altos e baixos; confie que a roda sempre gira." },
  { nome: "A Justiça", significado: "Equilíbrio, verdade, causa e efeito, responsabilidade.", conselho: "Aja com honestidade e imparcialidade. Pondere todos os lados antes de tomar uma decisão definitiva." }
];

export async function GET(request) {
  const today = new Date();
  const dateStr = today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString();
  const dateSeed = parseInt(dateStr, 10);

  const url = new URL(request.url);
  const signoId = url.searchParams.get('signo');

  if (signoId) {
    const signo = SIGNOS.find(s => s.id === signoId);
    if (!signo) {
      return new Response(JSON.stringify({ error: 'Signo não encontrado' }), { status: 400 });
    }

    const seedAmor = dateSeed + signo.nome.charCodeAt(0);
    const seedTrab = dateSeed + signo.nome.charCodeAt(1) * 2;
    const seedSaude = dateSeed + signo.nome.charCodeAt(2) * 3;

    const idxAmor = Math.floor(seedRandom(seedAmor) * PREVISOES_AMOR.length);
    const idxTrab = Math.floor(seedRandom(seedTrab) * PREVISOES_TRABALHO.length);
    const idxSaude = Math.floor(seedRandom(seedSaude) * PREVISOES_SAUDE.length);

    return new Response(JSON.stringify({
      signo: signo.nome,
      periodo: signo.periodo,
      elemento: signo.elemento,
      previsoes: {
        amor: PREVISOES_AMOR[idxAmor],
        trabalho: PREVISOES_TRABALHO[idxTrab],
        saude: PREVISOES_SAUDE[idxSaude]
      }
    }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, s-maxage=3600' }
    });
  }

  const seedTaro = dateSeed * 7;
  const idxTaro = Math.floor(seedRandom(seedTaro) * CARTAS_TARO.length);

  return new Response(JSON.stringify({
    signos: SIGNOS,
    taroDoDia: CARTAS_TARO[idxTaro]
  }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, s-maxage=3600' }
  });
}
