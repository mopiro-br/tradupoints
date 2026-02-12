import { motion } from "framer-motion";
import { Languages, FileText, Headphones, Music, Mic2, Radio, BookOpen } from "lucide-react";

const services = [
  {
    icon: Languages,
    title: "Tradução Simultânea",
    description:
      "Interpretação de conferência para simpósios, congressos científicos, treinamentos internacionais e lançamentos de produtos com total precisão.",
    featured: true,
  },
  {
    icon: FileText,
    title: "Tradução Escrita",
    description:
      "Tradução técnica e especializada de documentos médicos, científicos e corporativos.",
  },
  {
    icon: Headphones,
    title: "Transcrição Audiovisual",
    description:
      "Transcrição profissional de materiais audiovisuais com rigor e fidelidade ao conteúdo original.",
  },
  {
    icon: Music,
    title: "Sonorização & DJ",
    description:
      "Sonorização profissional para eventos corporativos, festas empresariais e casamentos.",
  },
  {
    icon: Mic2,
    title: "Mestre de Cerimônia",
    description:
      "Condução profissional de eventos com elegância, pontualidade e domínio de palco.",
  },
  {
    icon: Radio,
    title: "Palestra Silenciosa",
    description:
      "Equipamentos de transmissão para palestras silenciosas — tecnologia e discrição para seu evento.",
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
            Soluções completas para seu evento
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`group p-8 rounded-lg border transition-all duration-300 hover:shadow-xl ${
                service.featured
                  ? "bg-navy border-gold/30 hover:border-gold col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-1"
                  : "bg-card border-border hover:border-gold/40"
              }`}
            >
              <service.icon
                className={`w-10 h-10 mb-5 ${
                  service.featured
                    ? "text-gold"
                    : "text-gold/70 group-hover:text-gold"
                } transition-colors`}
                strokeWidth={1.5}
              />
              <h3
                className={`font-display text-xl font-semibold mb-3 ${
                  service.featured ? "text-background" : "text-foreground"
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`font-body text-sm leading-relaxed ${
                  service.featured
                    ? "text-muted/70"
                    : "text-muted-foreground"
                }`}
              >
                {service.description}
              </p>
              {service.featured && (
                <span className="inline-block mt-4 text-xs tracking-widest uppercase text-gold border border-gold/30 rounded-full px-4 py-1">
                  Especialidade Principal
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
