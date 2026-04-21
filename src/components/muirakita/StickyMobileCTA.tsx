import { MessageCircle, Send } from "lucide-react";
import { WHATSAPP_URL } from "./Navbar";

export const StickyMobileCTA = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-amazon/20 bg-background/95 backdrop-blur-xl shadow-[0_-8px_24px_-8px_hsl(var(--amazon-green)/0.3)] md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2 px-3 py-2.5">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-black active:scale-95 transition-transform"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <a
          href="#contato"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-amazon px-4 py-3 text-sm font-semibold text-foreground active:scale-95 transition-transform"
        >
          <Send className="h-4 w-4" /> Formulário
        </a>
      </div>
      {/* Safe area for iOS home indicator */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
};
