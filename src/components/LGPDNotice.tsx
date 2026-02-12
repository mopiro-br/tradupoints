import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const LGPDNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("lgpd_accepted");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("lgpd_accepted", "true");
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
          <div className="container mx-auto max-w-4xl bg-navy border border-gold/20 rounded-lg p-6 flex flex-col md:flex-row items-center gap-4 shadow-2xl">
            <p className="font-body text-sm text-muted/70 flex-1">
              Utilizamos cookies para melhorar sua experiência. Ao continuar navegando,
              você concorda com nossa{" "}
              <a href="#lgpd" className="text-gold underline">
                Política de Privacidade
              </a>{" "}
              em conformidade com a LGPD (Lei nº 13.709/2018).
            </p>
            <div className="flex gap-3">
              <Button variant="gold" size="sm" onClick={accept}>
                Aceitar
              </Button>
              <Button variant="gold-outline" size="sm" onClick={accept}>
                Configurar
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LGPDNotice;
