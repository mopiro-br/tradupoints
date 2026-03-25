import { useState } from "react";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactFormDialog from "@/components/ContactFormDialog";

const ServicosPage = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background pt-16">
      <Navbar onRequestQuote={() => setContactOpen(true)} />
      <Services onRequestQuote={() => setContactOpen(true)} />
      <Footer />
      <WhatsAppButton />
      <ContactFormDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default ServicosPage;
