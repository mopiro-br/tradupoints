import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section id="quem-somos" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-red-accent inline-block" />
              <p className="text-gold font-body text-sm tracking-[0.3em] uppercase">
                Quem Somos
              </p>
              <span className="w-8 h-0.5 bg-red-accent inline-block" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              A voz por trás da{" "}
              <span className="text-gradient-gold">sua mensagem</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="space-y-6 text-center"
          >
            <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed">
              A <span className="text-gold font-semibold">Tradupoints</span> nasceu da convicção de que a comunicação multilíngue em eventos de alta complexidade exige muito mais do que fluência — exige{" "}
              <span className="italic">preparo técnico profundo</span>, domínio terminológico e uma compreensão genuína do contexto em que cada palavra será dita.
            </p>

            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              Somos especialistas em tradução simultânea para congressos médicos, científicos e corporativos, onde a precisão não é um diferencial — é um requisito. Atuamos com elaboração de glossários personalizados, técnicas avançadas de interpretação e ferramentas tecnológicas de ponta, incluindo soluções BYOD que ampliam o alcance do seu evento sem comprometer a qualidade.
            </p>

            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              Mais do que traduzir palavras, contextualizamos ideias. Cada projeto começa com imersão no conteúdo, alinhamento com palestrantes e planejamento milimétrico — para que você e seus participantes vivam a experiência do evento sem barreiras linguísticas.
            </p>

            <div className="pt-6 border-t border-border/50 mt-8">
              <p className="font-body text-base text-foreground/70 leading-relaxed italic">
                "Nosso compromisso é ser invisíveis na execução e inesquecíveis no resultado. Quando a comunicação flui com naturalidade, sabemos que cumprimos nossa missão."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
