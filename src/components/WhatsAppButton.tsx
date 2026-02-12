import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5512997089897";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Gostaria de saber mais sobre os serviços da Tradupoints."
);

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1DA851] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" strokeWidth={0} />
    </a>
  );
};

export const getWhatsAppUrl = (message?: string) => {
  const msg = encodeURIComponent(
    message || "Olá! Gostaria de saber mais sobre os serviços da Tradupoints."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
};

export default WhatsAppButton;
