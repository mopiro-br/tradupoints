import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Cookie } from "lucide-react";

type ConsentState = "pending" | "accepted" | "rejected";

const LGPDNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: ConsentState) => {
    localStorage.setItem("cookie_consent", choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container mx-auto max-w-4xl bg-navy border border-gold/20 rounded-xl p-6 shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-gold shrink-0" />
                <Shield className="w-4 h-4 text-red-accent shrink-0" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-background mb-1">
                  Cookies & Privacidade
                </h3>
                <p className="font-body text-xs text-muted/60 leading-relaxed">
                  Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos
                  (Google Analytics, Meta Pixel, LinkedIn Insight) para melhorar sua experiência e
                  medir o desempenho das nossas campanhas. Ao aceitar, você concorda com o uso de
                  todos os cookies. Ao rejeitar, apenas cookies essenciais serão mantidos.
                </p>
                <p className="font-body text-xs text-muted/50 mt-2">
                  Em conformidade com a{" "}
                  <span className="text-gold">LGPD (Lei nº 13.709/2018)</span>. Saiba mais em nossa{" "}
                  <a href="/politica-de-privacidade" className="text-gold underline hover:text-red-accent transition-colors">
                    Política de Privacidade
                  </a>{" "}
                  e{" "}
                  <a href="/politica-de-cookies" className="text-gold underline hover:text-red-accent transition-colors">
                    Política de Cookies
                  </a>.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="gold-outline"
                size="sm"
                onClick={() => handleConsent("rejected")}
                className="text-xs"
              >
                Rejeitar opcionais
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={() => handleConsent("accepted")}
                className="text-xs"
              >
                Aceitar todos
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LGPDNotice;
