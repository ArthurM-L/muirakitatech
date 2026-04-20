import { MessageCircle, Instagram } from "lucide-react";
import frog from "@/assets/frog-laptop.png";
import { WHATSAPP_URL } from "./Navbar";

export const FinalCTA = () => {
  return (
    <section id="contato" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 animate-breathe" aria-hidden="true" />
      <div className="container relative mx-auto text-center">
        <img
          src={frog}
          alt="Mascote sapo programando"
          loading="lazy"
          className="mx-auto w-48 animate-float-mascot sm:w-64 md:w-80"
        />
        <h2
          className="mt-6 font-display text-foreground"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          Pronto para evoluir?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Agora que você conhece a <span className="text-amazon font-semibold">Muirakitã Tech</span>,
          está pronto para transformar sua empresa com tecnologia real? Entre em contato e vamos
          construir juntos.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex animate-heartbeat items-center justify-center gap-3 rounded-full bg-whatsapp px-10 py-5 text-base font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 sm:text-lg"
          >
            <MessageCircle className="h-6 w-6" /> Chamar no WhatsApp
          </a>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Ou nos encontre no Instagram:{" "}
          <a
            href="https://instagram.com/muirakitatech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amazon hover:text-gold"
          >
            <Instagram className="h-4 w-4" /> @muirakitatech
          </a>
        </p>
      </div>
    </section>
  );
};
