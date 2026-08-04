import { motion } from "framer-motion";
import { Languages, FileText, Headphones, Music, Mic2, Radio, GraduationCap, Smartphone, ArrowRight, Sparkles, Captions, MonitorPlay, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/components/WhatsAppButton";

interface ServicesProps {
  onRequestQuote: () => void;
}

const otherServices = [
  {
    icon: FileText,
    title: "Tradução Escrita Especializada",
    description: "Tradução técnica de documentos médicos, científicos e corporativos com rigor terminológico e revisão criteriosa.",
  },
  {
    icon: Headphones,
    title: "Transcrição Audiovisual",
    description: "Transcrição profissional com fidelidade absoluta ao conteúdo original, preservando nuances técnicas e contextuais.",
  },
  {
    icon: Smartphone,
    title: "Tecnologia BYOD",
    description: "Sistema inovador que substitui receptores tradicionais: discreto, sustentável e sem filas. Modernidade integrada à tradição da interpretação.",
  },
  {
    icon: Music,
    title: "Sonorização & DJ",
    description: "Sonorização de alto padrão para eventos corporativos e celebrações exclusivas, com equipamentos de última geração.",
  },
  {
    icon: Mic2,
    title: "Mestre de Cerimônia",
    description: "Condução sofisticada de eventos com elegância, pontualidade e domínio de palco para experiências memoráveis.",
  },
  {
    icon: Radio,
    title: "Palestra Silenciosa",
    description: "Equipamentos de transmissão de última geração, com tecnologia e discrição que elevam a experiência do participante.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const Services = ({ onRequestQuote }: ServicesProps) => {
  return (
    <section id="servicos" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3">
            Nossos Serviços
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Expertise que vai além da{" "}
            <span className="text-gradient-gold">tradução simples</span>
          </h2>
        </motion.div>

        {/* Hero Service: Tradução Simultânea */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-navy rounded-2xl p-6 sm:p-10 md:p-14 mb-16 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div className="min-w-0">

              <div className="inline-flex items-center gap-2 bg-red-accent/10 border border-red-accent/30 rounded-full px-4 py-1.5 mb-6">
                <Languages className="w-4 h-4 text-red-accent" />
                <span className="text-xs font-body text-red-accent tracking-widest uppercase font-medium">
                  Especialidade
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-on-navy mb-4 leading-tight">
                Tradução Simultânea Premium
              </h3>
              <p className="font-body text-on-navy/70 leading-relaxed mb-6 max-w-lg">
                Não apenas traduzimos palavras: facilitamos diálogos estratégicos,
                conectamos pessoas e ideias, transformando complexidade em clareza
                e confiança. Preparação meticulosa com estudo prévio de conteúdos
                e glossários técnicos personalizados.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Congressos médicos e científicos de alta complexidade",
                  "Roadshows de investidores e eventos corporativos",
                  "Simpósios, treinamentos internacionais e lançamentos",
                  "Glossários proprietários e preparo técnico dedicado",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-accent flex-shrink-0" />
                    <span className="font-body text-sm text-on-navy/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="gold" size="lg" className="text-base w-full sm:w-auto" onClick={onRequestQuote}>
                Fale Com Nossa Equipe
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>

            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full border border-gold/20 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-gold/15 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gold/10 flex items-center justify-center">
                      <Languages className="w-14 h-14 text-gold" strokeWidth={1.2} />
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold/20" />
                <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-gold/10" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Outras soluções para empresas e eventos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-12 mb-16 overflow-hidden hover:border-gold/30 transition-colors duration-300"
        >
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />

          <div className="relative z-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
              Outras soluções para empresas e eventos
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed max-w-3xl mb-8">
              Serviços que completam a experiência multilíngue do seu evento,
              desde a preparação de materiais até a sonorização e condução do palco.
              Tudo integrado para que você tenha apenas um ponto de contato.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {otherServices.map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group flex flex-col md:flex-row gap-4 md:gap-5 p-6 rounded-xl border border-border bg-background hover:border-red-accent/50 transition-all duration-300"
                >
                  <item.icon
                    className="w-8 h-8 flex-shrink-0 text-gold/70 group-hover:text-red-accent transition-colors duration-300 mb-2 md:mb-0"
                    strokeWidth={1.5}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-base font-semibold text-foreground mb-1.5">
                      {item.title}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Button variant="gold-outline" size="lg" className="text-base w-full sm:w-auto" onClick={onRequestQuote}>
                Solicitar Proposta
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Comunicação Aumentada por IA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-12 mb-16 overflow-hidden hover:border-gold/30 transition-colors duration-300"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/3" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-red-accent" />
              <span className="text-xs font-body text-red-accent tracking-widest uppercase font-medium">
                Comunicação Aumentada
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
              Soluções com Inteligência Artificial
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed max-w-3xl mb-8">
              Tecnologia integrada com propósito: recursos de IA que ampliam alcance,
              acessibilidade e registro do seu evento, combinados, quando necessário,
              com interpretação humana, sempre com orientação técnica sobre a melhor
              composição para cada contexto.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Languages,
                  title: "Tradução Simultânea por IA",
                  description:
                    "Interpretação simultânea conduzida por inteligência artificial, com áudio em tempo real no smartphone dos participantes, sem cabines nem receptores.",
                },
                {
                  icon: Captions,
                  title: "Legendas Automáticas em Tempo Real",
                  description:
                    "Legendagem gerada por IA para transmissões ao vivo e conteúdo gravado, exibida na tela dos participantes via plataforma dedicada.",
                },
                {
                  icon: MonitorPlay,
                  title: "Closed Caption Projetado em Tela",
                  description:
                    "Captions ao vivo na tela de projeção ou nos monitores do evento, garantindo alta acessibilidade para participantes surdos, ensurdecidos ou em ambientes com áudio limitado.",
                },
                {
                  icon: AudioLines,
                  title: "Transcrição Automática em Tempo Real via App",
                  description:
                    "Transcrição do áudio do evento gerada automaticamente durante a sessão.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group flex flex-col sm:flex-row gap-4 p-6 rounded-xl border border-border bg-background hover:border-red-accent/50 transition-all duration-300"
                >
                  <item.icon
                    className="w-8 h-8 flex-shrink-0 text-gold/70 group-hover:text-red-accent transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-base font-semibold text-foreground mb-1.5">
                      {item.title}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Button variant="gold-outline" size="lg" className="text-base w-full sm:w-auto" onClick={onRequestQuote}>
                Solicitar Proposta
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Mentoria Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-16 bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-12 overflow-hidden group hover:border-gold/30 transition-colors duration-300"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-accent/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />

          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-red-accent" />
                <span className="text-xs font-body text-red-accent tracking-widest uppercase font-medium">
                  Para Intérpretes Profissionais
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
                Mentoria para Intérpretes de Conferência
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed max-w-2xl mb-6">
                Programa exclusivo para intérpretes que desejam se especializar em eventos 
                médicos, científicos e de alta complexidade. Compartilhamos anos de 
                experiência com preparação meticulosa, elaboração de glossários, técnicas avançadas e ferramentas tecnológicas de ponta.
              </p>
              <ul className="flex flex-wrap gap-3">
                {["Técnicas avançadas", "Eventos médicos", "Orientação de carreira", "Acompanhamento contínuo"].map((tag) => (
                  <li key={tag} className="font-body text-xs tracking-wide text-muted-foreground border border-border rounded-full px-4 py-1.5">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <Button variant="gold-outline" size="lg" className="text-base w-full sm:w-auto" asChild>
                <a href={getWhatsAppUrl("Olá! Tenho interesse na mentoria para intérpretes de conferência.")} target="_blank" rel="noopener noreferrer">
                  Saiba Mais
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
