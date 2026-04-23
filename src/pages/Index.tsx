import { Navbar } from "@/components/muirakita/Navbar";
import { Hero } from "@/components/muirakita/Hero";
import { TechMarquee } from "@/components/muirakita/TechMarquee";
import { Services } from "@/components/muirakita/Services";
import { Process } from "@/components/muirakita/Process";
import { Automation } from "@/components/muirakita/Automation";
import { Story } from "@/components/muirakita/Story";
import { SocialProof } from "@/components/muirakita/SocialProof";
import { ROICalculator } from "@/components/muirakita/ROICalculator";
import { FAQ } from "@/components/muirakita/FAQ";
import { Contact } from "@/components/muirakita/Contact";
import { FinalCTA } from "@/components/muirakita/FinalCTA";
import { Footer } from "@/components/muirakita/Footer";
import { StickyMobileCTA } from "@/components/muirakita/StickyMobileCTA";
import { WhatsAppFAB } from "@/components/muirakita/WhatsAppFAB";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased pb-20 md:pb-0">
      <Navbar />
      <Hero />
      <TechMarquee />
      <Services />
      <Process />
      <Automation />
      <SocialProof />
      <ROICalculator />
      <Story />
      <FAQ />
      <Contact />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
      <WhatsAppFAB />
    </main>
  );
};

export default Index;
