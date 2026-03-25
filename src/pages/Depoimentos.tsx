import { useState } from "react";
import Navbar from "@/components/Navbar";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactFormDialog from "@/components/ContactFormDialog";

const DepoimentosPage = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background pt-16">
      <Navbar onRequestQuote={() => setContactOpen(true)} />
      <SocialProof />
      <Footer />
      <WhatsAppButton />
      <ContactFormDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default DepoimentosPage;
