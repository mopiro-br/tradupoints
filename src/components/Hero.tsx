import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "@/components/WhatsAppButton";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroProps {
  onRequestQuote: () => void;
}

const Hero = ({ onRequestQuote }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover object-left" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/90 to-navy/75" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20">
        <div className="max-w-3xl ml-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-sm tracking-[0.3em] uppercase mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-0.5 bg-red-accent inline-block" />
            <span className="text-gold">Parceira estratégica em eventos</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6"
          >
            Tradução simultânea{" "}
            <span className="text-gradient-gold">técnica e estratégica</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted/70 font-body font-light max-w-2xl mb-10 leading-relaxed"
          >
            Transformamos desafios multilíngues em comunicação clara, precisa e
            contextualizada — para que você se concentre no conteúdo e na
            experiência do seu evento.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="gold" size="lg" className="text-base px-10" onClick={onRequestQuote}>
              Solicitar Orçamento
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
