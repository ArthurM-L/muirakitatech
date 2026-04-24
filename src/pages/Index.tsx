import { Navbar } from "@/components/muirakita/Navbar";
import { Hero } from "@/components/muirakita/Hero";
import { TechMarquee } from "@/components/muirakita/TechMarquee";
import { Problem } from "@/components/muirakita/Problem";
import { Services } from "@/components/muirakita/Services";
import { Process } from "@/components/muirakita/Process";
import { Automation } from "@/components/muirakita/Automation";
import { SocialProof } from "@/components/muirakita/SocialProof";
import { ROICalculator } from "@/components/muirakita/ROICalculator";
import { Story } from "@/components/muirakita/Story";
import { FAQ } from "@/components/muirakita/FAQ";
import { Contact } from "@/components/muirakita/Contact";
import { FinalCTA } from "@/components/muirakita/FinalCTA";
import { Footer } from "@/components/muirakita/Footer";
import { StickyMobileCTA } from "@/components/muirakita/StickyMobileCTA";
import { WhatsAppFAB } from "@/components/muirakita/WhatsAppFAB";
import { CustomCursor } from "@/components/muirakita/CustomCursor";
import AgentChatWidget from "@/components/muirakita/AgentChatWidget";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased pb-20 md:pb-0">
      <CustomCursor />
      <Navbar />

      {/* 1. Hook — Impress immediately */}
      <Hero />

      {/* 2. Credibility signal — tech stack logos */}
      <TechMarquee />

      {/* 3. Problem — create empathy before pitching */}
      <Problem />

      {/* 4. Social proof — numbers to validate after problem recognition */}
      <SocialProof />

      {/* 5. Services — what we do */}
      <Services />

      {/* 6. How we work — reduce risk in the mind of the buyer */}
      <Process />

      {/* 7. Automation — differentiated value prop */}
      <Automation />

      {/* 8. ROI Calculator — make cost/benefit concrete */}
      <ROICalculator />

      {/* 9. Story — humanise the brand */}
      <Story />

      {/* 10. FAQ — clear final objections */}
      <FAQ />

      {/* 11. Contact — ready to convert */}
      <Contact />

      {/* 12. Final CTA — last push */}
      <FinalCTA />

      <Footer />
      <StickyMobileCTA />
      <WhatsAppFAB />
      <AgentChatWidget />
    </main>
  );
};

export default Index;
