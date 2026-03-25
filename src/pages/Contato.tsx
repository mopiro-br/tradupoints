import { useState } from "react";
import Navbar from "@/components/Navbar";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactFormDialog from "@/components/ContactFormDialog";

const ContatoPage = () => {
  const [contactOpen, setContactOpen] = useState(true);

  return (
    <main className="min-h-screen bg-background pt-16">
      <Navbar onRequestQuote={() => setContactOpen(true)} />
      <CTASection onRequestQuote={() => setContactOpen(true)} />
      <Footer />
      <WhatsAppButton />
      <ContactFormDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default ContatoPage;
