import { Navbar } from "@/components/muirakita/Navbar";
import { Hero } from "@/components/muirakita/Hero";
import { Services } from "@/components/muirakita/Services";
import { Automation } from "@/components/muirakita/Automation";
import { Story } from "@/components/muirakita/Story";
import { Trust } from "@/components/muirakita/Trust";
import { Contact } from "@/components/muirakita/Contact";
import { FinalCTA } from "@/components/muirakita/FinalCTA";
import { Footer } from "@/components/muirakita/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <Hero />
      <Services />
      <Automation />
      <Story />
      <Trust />
      <Contact />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
