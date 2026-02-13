import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5512997089897";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Gostaria de saber mais sobre os serviços da Tradupoints."
);

const trackWhatsAppClick = () => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: 'whatsapp_button',
    });
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Contact', { method: 'whatsapp' });
  }

  // LinkedIn Insight Tag
  if (typeof window !== 'undefined' && (window as any).lintrk) {
    (window as any).lintrk('track', { conversion_id: 9552593 });
  }

  // GTM dataLayer
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'whatsapp_click',
      eventCategory: 'engagement',
      eventLabel: 'whatsapp_button',
    });
  }
};

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      onClick={trackWhatsAppClick}
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
