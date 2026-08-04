import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(1, "Telefone é obrigatório").max(20),
  eventType: z.string().trim().min(1, "Tipo de evento é obrigatório").max(200),
  eventDate: z.string().trim().max(50).optional(),
  languages: z.string().trim().max(200).optional(),
  participants: z.string().trim().max(50).optional(),
  message: z.string().trim().max(2000).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface ContactFormDialogProps {
  open: boolean;
  onClose: () => void;
}

const ContactFormDialog = ({ open, onClose }: ContactFormDialogProps) => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    languages: "",
    participants: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-quote-request", {
        body: result.data,
      });
      if (error) throw error;

      // GA4: conversão de lead (somente em caso de sucesso)
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          send_to: "G-2MLWN3DE9S",
          event_category: "orcamento",
        });
        console.log("[GA4] evento generate_lead enviado");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error sending quote request:", err);
      setSubmitError("Não foi possível enviar sua solicitação. Tente novamente ou entre em contato pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", eventType: "", eventDate: "", languages: "", participants: "", message: "" });
    setErrors({});
    onClose();
  };

  const inputClass =
    "w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Solicitar Orçamento
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  Conte-nos sobre seu evento
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h4 className="font-display text-xl font-bold text-foreground mb-2">
                    Mensagem Enviada
                  </h4>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    Nossa equipe entrará em contato em breve para discutir as 
                    necessidades do seu evento.
                  </p>
                  <Button variant="gold" onClick={handleClose}>
                    Fechar
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Nome *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Seu nome completo"
                        className={inputClass}
                        maxLength={100}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-accent mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="seu@email.com"
                        className={inputClass}
                        maxLength={255}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-accent mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="(11) 99999-9999"
                        className={inputClass}
                        maxLength={20}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-accent mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Tipo de Evento *
                      </label>
                      <select
                        value={form.eventType}
                        onChange={(e) => handleChange("eventType", e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Selecione</option>
                        <option value="congresso">Congresso Médico/Científico</option>
                        <option value="simposio">Simpósio</option>
                        <option value="treinamento">Treinamento Internacional</option>
                        <option value="lancamento">Lançamento de Produto</option>
                        <option value="roadshow">Roadshow de Investidores</option>
                        <option value="corporativo">Evento Corporativo</option>
                        <option value="outro">Outro</option>
                      </select>
                      {errors.eventType && (
                        <p className="text-xs text-red-accent mt-1">{errors.eventType}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Data do Evento
                      </label>
                      <input
                        type="date"
                        value={form.eventDate}
                        onChange={(e) => handleChange("eventDate", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Idiomas
                      </label>
                      <input
                        type="text"
                        value={form.languages}
                        onChange={(e) => handleChange("languages", e.target.value)}
                        placeholder="Ex: EN, ES"
                        className={inputClass}
                        maxLength={200}
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Participantes
                      </label>
                      <input
                        type="text"
                        value={form.participants}
                        onChange={(e) => handleChange("participants", e.target.value)}
                        placeholder="Estimativa"
                        className={inputClass}
                        maxLength={50}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                      Mensagem
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Conte-nos mais sobre seu evento e suas necessidades..."
                      rows={3}
                      className={`${inputClass} resize-none`}
                      maxLength={2000}
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-accent text-center">{submitError}</p>
                  )}

                  <Button variant="gold" size="lg" className="w-full text-base" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitação
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactFormDialog;
