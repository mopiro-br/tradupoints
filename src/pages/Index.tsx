import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import AboutUs from "@/components/AboutUs";
import SocialProof from "@/components/SocialProof";
import BlogPodcast from "@/components/BlogPodcast";
import CTASection from "@/components/CTASection";

import Footer from "@/components/Footer";
import LGPDNotice from "@/components/LGPDNotice";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactFormDialog from "@/components/ContactFormDialog";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Navbar onRequestQuote={() => setContactOpen(true)} />
      <Hero onRequestQuote={() => setContactOpen(true)} />
      <Services onRequestQuote={() => setContactOpen(true)} />
      <Differentials />
      <AboutUs />
      <SocialProof />
      <CTASection onRequestQuote={() => setContactOpen(true)} />
      <BlogPodcast />
      
      <Footer />
      <LGPDNotice />
      <WhatsAppButton />
      <ContactFormDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default Index;
