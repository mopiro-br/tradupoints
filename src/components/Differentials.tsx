import { motion } from "framer-motion";
import { Shield, Award, Clock, Users } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Confidencialidade absoluta",
    description:
      "Sua marca e seus dados sensíveis são tratados com sigilo profissional, do primeiro contato à entrega final.",
  },
  {
    icon: Award,
    title: "Expertise técnica profunda",
    description:
      "Domínio sólido da terminologia médica, científica e técnica, com glossários personalizados para cada evento.",
  },
  {
    icon: Clock,
    title: "Execução impecável",
    description:
      "Planejamento milimétrico e infraestrutura redundante para antecipar necessidades e resolver antes de virarem desafios.",
  },
  {
    icon: Users,
    title: "Parceria estratégica",
    description:
      "Atuamos como extensão da sua equipe, alinhando linguagem e contexto para que você foque no evento.",
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
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-0.5 bg-red-accent inline-block" />
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase">
              Por que nos escolher
            </p>
            <span className="w-8 h-0.5 bg-red-accent inline-block" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-on-navy">
            Quando o evento não admite{" "}
            <span className="text-gradient-gold">soluções comuns</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative flex items-start gap-5 sm:block sm:text-center p-5 md:p-6 rounded-xl border border-gold/10 bg-on-navy/5 backdrop-blur-sm hover:bg-on-navy/10 hover:border-gold/30 transition-all duration-300"
            >
              <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 sm:mx-auto sm:mb-5 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-red-accent/10 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-gold group-hover:text-red-accent transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 w-full">
                <h3 className="font-display text-base md:text-lg font-semibold text-on-navy mb-2 md:mb-3 break-words hyphens-auto">
                  {item.title}
                </h3>
                <p className="font-body text-sm md:text-[0.95rem] text-on-navy/80 leading-relaxed break-words hyphens-auto">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
