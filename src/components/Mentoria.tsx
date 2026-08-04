import { motion } from "framer-motion";
import { GraduationCap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Desenvolvimento de técnicas avançadas de interpretação",
  "Preparação para eventos médicos e científicos",
  "Orientação de carreira e posicionamento no mercado",
  "Feedback personalizado e acompanhamento contínuo",
];

const Mentoria = () => {
  return (
    <section id="mentoria" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-gold" />
              <p className="text-gold font-body text-sm tracking-[0.3em] uppercase">
                Mentoria
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Mentoria para Intérpretes de Conferência
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Programa exclusivo para intérpretes que desejam se especializar em
              eventos de alta complexidade. Compartilhamos anos de experiência
              em congressos médicos, científicos e técnicos.
            </p>
            <ul className="space-y-4 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-foreground/80">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
            <Button variant="gold" size="lg">
              Saiba Mais Sobre a Mentoria
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-navy rounded-lg p-10 text-center"
          >
            <GraduationCap className="w-16 h-16 text-gold mx-auto mb-6" />
            <h3 className="font-display text-2xl font-bold text-background mb-4">
              Programa de Mentoria
            </h3>
            <p className="font-body text-muted/60 mb-8 leading-relaxed">
              Formação prática e teórica com profissionais experientes do
              mercado de interpretação de conferência.
            </p>
            <div className="border-t border-gold/20 pt-6">
              <p className="text-xs text-gold/80 font-body tracking-widest uppercase">
                Vagas Limitadas. Inscreva-se
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mentoria;
