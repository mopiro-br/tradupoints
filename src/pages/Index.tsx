import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import SocialProof from "@/components/SocialProof";
import BlogPodcast from "@/components/BlogPodcast";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LGPDNotice from "@/components/LGPDNotice";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Differentials />
      <SocialProof />
      <BlogPodcast />
      <CTASection />
      <Footer />
      <LGPDNotice />
    </main>
  );
};

export default Index;
