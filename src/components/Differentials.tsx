import { motion } from "framer-motion";
import { Shield, Award, Clock, Users } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Confidencialidade Total",
    description:
      "Sigilo absoluto sobre clientes e conteúdo. Atuamos com discrição e profissionalismo.",
  },
  {
    icon: Award,
    title: "Expertise Técnica",
    description:
      "Especialistas em terminologia médica, científica e técnica de alta complexidade.",
  },
  {
    icon: Clock,
    title: "Zero Imprevistos",
    description:
      "Planejamento rigoroso e equipamentos redundantes para total confiabilidade.",
  },
  {
    icon: Users,
    title: "Parceria Estratégica",
    description:
      "Trabalhamos como extensão da sua equipe, alinhados aos seus objetivos.",
  },
];

const Differentials = () => {
  return (
    <section id="diferenciais" className="section-padding bg-navy">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3">
            Por que a Tradupoints
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-background">
            Diferenciais que fazem a diferença
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                <item.icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-background mb-3">
                {item.title}
              </h3>
              <p className="font-body text-sm text-muted/60 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
