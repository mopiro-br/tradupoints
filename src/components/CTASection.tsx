import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section id="contato" className="section-padding bg-navy relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
            Vamos Conversar
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6">
            Seu próximo evento merece{" "}
            <span className="text-gradient-gold">excelência</span>
          </h2>
          <p className="font-body text-muted/60 text-lg leading-relaxed mb-10">
            Entre em contato para discutir as necessidades do seu evento. Nossa
            equipe está pronta para garantir uma comunicação impecável.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" className="text-base px-12">
              Solicitar Orçamento
            </Button>
            <Button variant="gold-outline" size="lg" className="text-base px-12">
              Fale Conosco
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
