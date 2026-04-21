import { Navbar } from "@/components/muirakita/Navbar";
import { Hero } from "@/components/muirakita/Hero";
import { Showcase } from "@/components/muirakita/Showcase";
import { Services } from "@/components/muirakita/Services";
import { Automation } from "@/components/muirakita/Automation";
import { Story } from "@/components/muirakita/Story";
import { SocialProof } from "@/components/muirakita/SocialProof";
import { Trust } from "@/components/muirakita/Trust";
import { Contact } from "@/components/muirakita/Contact";
import { FinalCTA } from "@/components/muirakita/FinalCTA";
import { Footer } from "@/components/muirakita/Footer";
import { StickyMobileCTA } from "@/components/muirakita/StickyMobileCTA";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased pb-20 md:pb-0">
      <Navbar />
      <Hero />
      <Showcase />
      <Services />
      <SocialProof />
      <Automation />
      <Story />
      <Trust />
      <Contact />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
};

export default Index;
