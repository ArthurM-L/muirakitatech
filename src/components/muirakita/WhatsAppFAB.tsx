import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "./Navbar";

export const WhatsAppFAB = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        hidden md:inline-flex
        h-14 w-14 items-center justify-center
        rounded-full bg-whatsapp text-black
        shadow-[0_4px_24px_hsl(var(--whatsapp)/0.5)]
        animate-heartbeat
        transition-transform duration-300 hover:scale-110 active:scale-95
      "
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};
