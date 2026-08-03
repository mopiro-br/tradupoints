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
    question: "As legendas automáticas e a transcrição por IA são 100% fiéis ao conteúdo original?",
    answer:
      "Não. A tecnologia de IA oferece um excelente nível de qualidade, mas ainda pode cometer erros em nomes próprios, siglas, termos técnicos, números, ironias e contextos de baixa audibilidade. Por isso, oferecemos a revisão humana como etapa recomendada — especialmente para eventos médicos, científicos e jurídicos — e orientamos o cliente sobre o cenário mais adequado às suas necessidades.",
  },
  {
    question: "Existe algum atraso (latência) na geração das legendas em tempo real?",
    answer:
      "Sim, há uma latência pequena e natural, normalmente de poucos segundos entre a fala e a exibição do texto. Esse intervalo pode variar conforme a velocidade e a estabilidade da internet no local, a qualidade do áudio capturado, o idioma e o número de falantes simultâneos. Em eventos críticos, avaliamos a infraestrutura de rede antecipadamente e preparamos redundâncias para manter a experiência fluida.",
  },
  {
    question: "Quais são as limitações práticas do serviço de legendas e transcrição?",
    answer:
      "A precisão depende diretamente da qualidade do áudio: ambientes muito barulhentos, microfones distantes, falantes sobrepostos, sotaques muito fortes ou idiomas de baixa representação na base de dados da IA podem reduzir a fidelidade. Além disso, a IA não interpreta intenção, emoção nem duplo sentido. Sempre conversamos sobre as condições reais do evento antes de recomendar a solução ideal.",
  },
  {
    question: "A transcrição automática via app substitui a interpretação simultânea?",
    answer:
      "Não. A transcrição e as legendas são ferramentas de registro e acessibilidade. A interpretação simultânea humana continua sendo a solução mais adequada para eventos multilíngues de alta complexidade, pois transmite nuance, tom, intenção e adaptação cultural. Nossa proposta é justamente combinar tecnologia e expertise humana na medida certa para cada evento.",
  },
  {
    question: "Como a Tradupoints trata a privacidade e a LGPD nesses serviços?",
    answer:
      "Tratamos os dados de áudio e transcrição com sigilo profissional. O conteúdo capturado é usado exclusivamente para entrega do serviço contratado e não é compartilhado com terceiros além dos provedores técnicos essenciais à execução. Obedecemos os princípios da LGPD: finalidade, necessidade, adequação, segurança, retenção limitada e direito dos titulares. Para eventos com informações sensíveis, oferecemos termos de confidencialidade específicos e fluxos de exclusão de dados ao final do prazo contratado.",
  },
  {
    question: "Quanto tempo os áudios e as transcrições ficam armazenados?",
    answer:
      "O prazo de retenção é definido no escopo do projeto e limitado ao necessário para entrega, revisão e eventual suporte. Quando não houver necessidade comercial ou legal de manter o material, aplicamos a exclusão segura. Se o cliente desejar retenção maior ou exclusão imediata, isso pode ser acordado formalmente antes do evento.",
  },
];

const AISolutionsFAQ = () => {
  return (
    <section id="faq-ia" className="section-padding bg-background">
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
            Esclarecemos limitações, qualidade, latência e cuidados com dados sobre legendas automáticas e transcrição via app.
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
