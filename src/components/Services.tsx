import { motion } from "framer-motion";
import { Languages, FileText, Headphones, Music, Mic2, Radio, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const otherServices = [
  {
    icon: FileText,
    title: "Tradução Escrita",
    description:
      "Tradução técnica e especializada de documentos médicos, científicos e corporativos com rigor terminológico.",
  },
  {
    icon: Headphones,
    title: "Transcrição Audiovisual",
    description:
      "Transcrição profissional de materiais audiovisuais com fidelidade absoluta ao conteúdo original.",
  },
  {
    icon: Music,
    title: "Sonorização & DJ",
    description:
      "Sonorização de alto padrão para eventos corporativos, festas empresariais e celebrações exclusivas.",
  },
  {
    icon: Mic2,
    title: "Mestre de Cerimônia",
    description:
      "Condução sofisticada de eventos com elegância, pontualidade e domínio de palco impecável.",
  },
  {
    icon: Radio,
    title: "Palestra Silenciosa",
    description:
      "Equipamentos de transmissão de última geração — tecnologia e discrição para seu evento.",
  },
  {
    icon: GraduationCap,
    title: "Mentoria para Intérpretes",
    description:
      "Programa exclusivo de formação para intérpretes que desejam atuar em eventos de alta complexidade.",
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

const Services = () => {
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
            Soluções sob medida para{" "}
            <span className="text-gradient-gold">cada evento</span>
          </h2>
        </motion.div>

        {/* Hero Service — Tradução Simultânea */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-navy rounded-2xl p-10 md:p-14 mb-16 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
                <Languages className="w-4 h-4 text-gold" />
                <span className="text-xs font-body text-gold tracking-widest uppercase font-medium">
                  Especialidade Principal
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-background mb-4 leading-tight">
                Tradução Simultânea
              </h3>
              <p className="font-body text-muted/70 leading-relaxed mb-6 max-w-lg">
                Interpretação de conferência para simpósios, congressos científicos, 
                treinamentos internacionais e lançamentos de produtos. Precisão 
                absoluta em terminologia médica e técnica de alta complexidade.
              </p>
              <ul className="space-y-3 mb-8">
                {["Congressos médicos e científicos", "Treinamentos internacionais", "Eventos farmacêuticos e lançamentos", "Equipamentos profissionais inclusos"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span className="font-body text-sm text-background/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="gold" size="lg" className="text-base">
                Solicitar Orçamento
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

        {/* Other Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-body text-sm text-muted-foreground tracking-wide">
            Conheça também nossas outras soluções
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherServices.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group p-7 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-lg transition-all duration-300"
            >
              <service.icon
                className="w-9 h-9 mb-4 text-gold/70 group-hover:text-gold transition-colors"
                strokeWidth={1.5}
              />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
