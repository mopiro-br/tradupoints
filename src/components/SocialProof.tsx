import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Profissionalismo impecável. A equipe da Tradupoints garantiu que nosso congresso internacional acontecesse sem nenhum problema de comunicação.",
    role: "Coordenador de Congresso Científico",
    stars: 5,
  },
  {
    quote:
      "Parceiros de confiança há anos. A precisão técnica na terminologia médica é excepcional, e a discrição da equipe é um diferencial enorme.",
    role: "Diretora de Eventos Corporativos",
    stars: 5,
  },
  {
    quote:
      "Desde o planejamento até a execução, tudo foi perfeito. Equipamentos de ponta e intérpretes altamente qualificados.",
    role: "Gerente de Marketing Farmacêutico",
    stars: 5,
  },
];

const stats = [
  { value: "500+", label: "Eventos Realizados" },
  { value: "15+", label: "Anos de Experiência" },
  { value: "98%", label: "Taxa de Satisfação" },
  { value: "12+", label: "Idiomas Atendidos" },
];

const SocialProof = () => {
  return (
    <section id="depoimentos" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3">
            Confiança Comprovada
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            O que dizem nossos parceiros
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <p className="font-display text-4xl md:text-5xl font-bold text-gold mb-2">
                {stat.value}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-card border border-border rounded-lg p-8 hover:border-gold/30 transition-colors duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star
                    key={si}
                    className="w-4 h-4 fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="font-body text-sm text-foreground/80 leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <p className="font-body text-xs text-muted-foreground tracking-wide uppercase">
                {t.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
