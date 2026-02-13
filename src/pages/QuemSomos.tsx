import { useState } from "react";
import Navbar from "@/components/Navbar";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import LGPDNotice from "@/components/LGPDNotice";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactFormDialog from "@/components/ContactFormDialog";

const QuemSomos = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Navbar onRequestQuote={() => setContactOpen(true)} />
      <div className="pt-16">
        <AboutUs />
      </div>
      <Footer />
      <LGPDNotice />
      <WhatsAppButton />
      <ContactFormDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default QuemSomos;
