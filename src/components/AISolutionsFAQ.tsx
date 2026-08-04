import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Com quanta antecedência devo contratar a tradução simultânea do meu evento?",
    answer:
      "O ideal é de 3 a 6 semanas de antecedência, principalmente para eventos médicos, científicos e técnicos, que exigem estudo prévio de conteúdo e elaboração de glossários. Ainda assim, atendemos demandas urgentes sempre que houver disponibilidade de equipe e equipamento.",
  },
  {
    question: "Quantos intérpretes são necessários por idioma?",
    answer:
      "Como regra profissional, trabalhamos com dois intérpretes por idioma em sessões acima de uma hora, revezando-se para manter a qualidade e a precisão. Sessões curtas e reuniões pontuais podem ser atendidas por um único profissional, conforme avaliação técnica prévia.",
  },
  {
    question: "Quais materiais preciso enviar antes do evento?",
    answer:
      "Programação, apresentações, nomes e currículos dos palestrantes, siglas internas, glossários existentes e qualquer material técnico de referência. Quanto mais completo o material, maior a precisão terminológica. Todo conteúdo recebido é tratado com sigilo profissional.",
  },
  {
    question: "Vocês fornecem os equipamentos ou apenas os intérpretes?",
    answer:
      "Fornecemos a solução completa: cabines, consoles, receptores, sonorização, técnico em sala e suporte durante todo o evento. Também oferecemos a modalidade BYOD, na qual o participante ouve a tradução pelo próprio smartphone, sem receptores físicos.",
  },
  {
    question: "É possível fazer tradução simultânea em eventos online e híbridos?",
    answer:
      "Sim. Atendemos em Zoom, Teams, Google Meet e plataformas de streaming, com canais de idioma separados. Em eventos híbridos, integramos o áudio da sala com a transmissão para que público presencial e remoto recebam a mesma experiência.",
  },
  {
    question: "Como funciona a tradução escrita e quais são os prazos?",
    answer:
      "Trabalhamos com tradução técnica, científica e corporativa, com revisão e padronização terminológica. O prazo depende do volume, do par de idiomas e da complexidade do texto. Enviamos estimativa de prazo e investimento junto da proposta.",
  },
  {
    question: "Como é calculado o investimento de uma proposta?",
    answer:
      "Consideramos duração e formato do evento, número de idiomas, quantidade de intérpretes, equipamentos, deslocamento e nível de preparo técnico exigido. Cada proposta é personalizada, sem pacotes genéricos.",
  },
  {
    question: "As legendas automáticas e a transcrição por IA são 100% fiéis ao conteúdo original?",
    answer:
      "Não. A tecnologia de IA oferece um excelente nível de qualidade, mas ainda pode cometer erros em nomes próprios, siglas, termos técnicos, números, ironias e contextos de baixa audibilidade. Por isso, oferecemos a revisão humana como etapa recomendada, especialmente para eventos médicos, científicos e jurídicos.",
  },
  {
    question: "Existe atraso nas legendas em tempo real e a IA substitui o intérprete humano?",
    answer:
      "Há uma latência natural de poucos segundos, que varia conforme a estabilidade da internet, a qualidade do áudio, o idioma e o número de falantes simultâneos. As legendas e a transcrição são ferramentas de registro e acessibilidade: para eventos multilíngues de alta complexidade, a interpretação humana continua sendo a solução mais adequada, pois transmite nuance, intenção e adaptação cultural.",
  },
  {
    question: "Como a Tradupoints trata a confidencialidade e a LGPD?",
    answer:
      "Todo conteúdo de áudio, texto e transcrição é tratado com sigilo profissional e usado exclusivamente para entrega do serviço contratado. Seguimos os princípios da LGPD: finalidade, necessidade, segurança, retenção limitada e direitos dos titulares. Para eventos sensíveis, oferecemos termos de confidencialidade específicos e exclusão segura dos dados ao final do prazo acordado.",
  },
];

const AISolutionsFAQ = () => {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-gold font-body text-xs tracking-[0.25em] uppercase mb-3">
            Transparência
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            Dúvidas Frequentes
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
            Prazos, equipe, equipamentos, eventos online, tradução escrita, investimento e cuidados com dados e IA.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full border-y border-border">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border"
              >
                <AccordionTrigger
                  icon={<Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />}
                  className="font-display text-sm md:text-base font-medium text-foreground text-left py-5 hover:text-gold hover:no-underline gap-4"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <p className="font-body text-sm text-muted-foreground">
              Ainda tem dúvidas?{" "}
              <a
                href="mailto:comercial@tradupoints.com.br"
                className="text-gold hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Fale com nosso time
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AISolutionsFAQ;
