import { Instagram, Mail, MessageCircle } from "lucide-react";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "./Navbar";
import { FancyContactButton } from "@/components/ui/fancy-contact-button";

export const EMAIL_ADDRESS = "agenciamuirakita@gmail.com";
export const EMAIL_URL = `mailto:${EMAIL_ADDRESS}`;
export const INSTAGRAM_URL = "https://instagram.com/muirakitatech";

export const FinalCTA = () => {
  return (
    <section id="contato-final" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 animate-breathe" aria-hidden="true" />
      <div className="container relative mx-auto flex flex-col items-center text-center">
        <h2
          className="font-display text-gradient-amazon"
          style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)" }}
        >
          Seu próximo projeto começa<br className="hidden md:block" /> com uma conversa.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground md:text-lg">
          Sem compromisso, sem formulário robótico.{" "}
          <span className="text-foreground font-medium">Fale agora com a Muirakitã Tech</span>{" "}
          e descubra, em minutos, o que a tecnologia pode desbloquear no seu negócio.
        </p>

        <div className="mt-12 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
          <FancyContactButton
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            icon={<MessageCircle />}
            title="WhatsApp"
            subtitle={WHATSAPP_DISPLAY}
            gradientFrom="from-whatsapp/30"
            gradientVia="via-amazon/30"
            gradientTo="to-leaf/40"
          />
          <FancyContactButton
            href={EMAIL_URL}
            icon={<Mail />}
            title="E-mail"
            subtitle={EMAIL_ADDRESS}
            gradientFrom="from-amazon/40"
            gradientVia="via-leaf/35"
            gradientTo="to-gold/45"
          />
          <FancyContactButton
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            icon={<Instagram />}
            title="Instagram"
            subtitle="@muirakitatech"
            gradientFrom="from-orange/40"
            gradientVia="via-gold/35"
            gradientTo="to-amazon/45"
            className="sm:col-span-2 sm:max-w-md sm:mx-auto"
          />
        </div>
      </div>
    </section>
  );
};
