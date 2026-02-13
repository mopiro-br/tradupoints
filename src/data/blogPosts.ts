export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "bastidores-congresso-medico-internacional",
    title: "Bastidores de um congresso médico internacional",
    excerpt:
      "Como a preparação meticulosa — estudo de artigos, glossários técnicos e simulações — garante interpretação impecável em eventos de alta complexidade.",
    content: `A tradução simultânea em congressos médicos internacionais vai muito além da fluência em idiomas. É um trabalho que exige preparação meticulosa, estudo aprofundado e conhecimento técnico especializado.

## Preparação antes do evento

Semanas antes do congresso, nossa equipe recebe os materiais — artigos científicos, apresentações, pôsteres e glossários. Cada termo é estudado, contextualizado e discutido entre os intérpretes.

## No dia do evento

A cabine de tradução simultânea é o epicentro de um trabalho invisível, mas fundamental. Enquanto o palestrante apresenta dados complexos sobre novos tratamentos oncológicos, nossa equipe traduz em tempo real, mantendo a precisão terminológica e o ritmo da apresentação.

## O diferencial da especialização

Intérpretes generalistas podem traduzir palavras. Intérpretes especializados traduzem conhecimento. Essa é a diferença que faz a Tradupoints ser a escolha de referência para eventos médicos e científicos de alto nível.`,
    category: "Expertise",
    date: "2025-01-15",
    readTime: "5 min",
  },
  {
    slug: "tecnologia-byod-futuro-traducao-simultanea",
    title: "Tecnologia BYOD: o futuro da tradução simultânea",
    excerpt:
      "Conheça o sistema que substitui receptores tradicionais com discrição, sustentabilidade e modernidade — sem filas constrangedoras.",
    content: `O sistema BYOD (Bring Your Own Device) está revolucionando a forma como eventos internacionais oferecem tradução simultânea aos participantes.

## O que é BYOD?

Em vez de distribuir receptores físicos — com filas, logística complexa e custos adicionais —, o BYOD permite que cada participante use seu próprio smartphone para acessar a tradução simultânea via streaming de áudio.

## Vantagens do BYOD

- **Eliminação de filas**: sem distribuição e devolução de equipamentos
- **Sustentabilidade**: menos plástico e eletrônicos descartáveis
- **Discrição**: cada pessoa usa seus próprios fones de ouvido
- **Escalabilidade**: funciona para 50 ou 5.000 participantes

## Como a Tradupoints implementa

Nossa equipe configura toda a infraestrutura técnica, garantindo qualidade de áudio profissional e latência mínima. O participante simplesmente escaneia um QR Code e escolhe o idioma desejado.`,
    category: "Inovação",
    date: "2025-01-08",
    readTime: "4 min",
  },
  {
    slug: "contextualizacao-tecnica-alem-traducao-literal",
    title: "Contextualização técnica: além da tradução literal",
    excerpt:
      "Por que dominar a terminologia médica e científica é apenas o começo. A verdadeira expertise está na contextualização estratégica.",
    content: `Traduzir literalmente é o nível mais básico da interpretação. A verdadeira excelência está na contextualização — entender o que o palestrante quer comunicar e transmitir essa mensagem com precisão e naturalidade.

## O perigo da tradução literal

Um termo médico traduzido literalmente pode mudar completamente o sentido de uma frase. Em contextos clínicos e científicos, isso pode gerar confusão, mal-entendidos e até riscos para pacientes.

## Contextualização estratégica

Nossa equipe não apenas traduz palavras — contextualiza conceitos. Isso significa:

- Entender o público-alvo da apresentação
- Adaptar o registro linguístico ao contexto
- Manter a intenção comunicativa do palestrante
- Preservar nuances culturais e científicas

## Resultado para o cliente

Quando a tradução é contextualizada, o público não percebe que está ouvindo uma tradução. A mensagem flui naturalmente, como se o palestrante estivesse falando diretamente no idioma do ouvinte.`,
    category: "Conhecimento",
    date: "2024-12-20",
    readTime: "4 min",
  },
];

export default blogPosts;
