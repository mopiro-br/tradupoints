import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getWhatsAppUrl } from "@/components/WhatsAppButton";
import ContactFormDialog from "@/components/ContactFormDialog";
import { useState } from "react";

const courses = [
  {
    title: "Escritório Inteligente para Intérpretes",
    description:
      "Aprenda a estruturar um escritório digital eficiente, otimizando processos administrativos, financeiros e de produtividade para a carreira de intérprete. Inclui rotinas com IA e interfaces customizáveis criadas especialmente para intérpretes.",
    whatsappMessage:
      "Olá! Tenho interesse no curso Escritório Inteligente para Intérpretes. Gostaria de mais informações.",
  },
  {
    title: "Ferramentas Tecnológicas: Um Kit para Intérpretes",
    description:
      "Domine as ferramentas digitais essenciais para a interpretação moderna: plataformas, softwares de glossário, IA aplicada e recursos que elevam sua performance.",
    whatsappMessage:
      "Olá! Tenho interesse no curso Ferramentas Tecnológicas para Intérpretes. Gostaria de mais informações.",
  },
];

const Cursos = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Navbar onRequestQuote={() => setContactOpen(true)} />

      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
              Aprimoramento Profissional
            </p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6">
              Cursos para{" "}
              <span className="text-gradient-gold">intérpretes</span>
            </h1>
            <p className="font-body text-muted/60 text-lg leading-relaxed">
              Capacitação prática e estratégica para intérpretes que desejam se
              destacar no mercado com ferramentas modernas e gestão profissional.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-12 lg:gap-16">
            {courses.map((course, idx) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-card border border-border rounded-2xl p-8 md:p-12 hover:border-gold/30 transition-colors duration-300"
              >
                <div className="inline-flex items-center gap-2 bg-red-accent/10 border border-red-accent/30 rounded-full px-4 py-1.5 mb-5">
                  <BookOpen className="w-4 h-4 text-red-accent" />
                  <span className="text-xs font-body text-red-accent tracking-widest uppercase font-medium">
                    8 Aulas
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                  {course.title}
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  {course.description}
                </p>
                <Button variant="gold" size="lg" className="text-base" asChild>
                  <a
                    href={getWhatsAppUrl(course.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saiba Mais
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <ContactFormDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default Cursos;
