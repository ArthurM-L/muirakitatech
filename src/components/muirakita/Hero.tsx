import { useEffect, useRef } from "react";
import { ArrowDown, MessageCircle, Zap } from "lucide-react";
import { Fireflies } from "./Fireflies";
import jungle from "@/assets/jungle-hero.jpg";
import { WHATSAPP_URL } from "./Navbar";

export const Hero = () => {
  const imgRef  = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (imgRef.current)  imgRef.current.style.transform  = `translateY(${y * 0.32}px)`;
      if (textRef.current) textRef.current.style.transform = `translateY(${y * 0.12}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[78svh] w-full items-center overflow-hidden pt-24 pb-12 md:min-h-[90svh] md:pt-28 md:pb-20"
    >
      <img
        ref={imgRef}
        src={jungle}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        width="1920"
        height="1080"
        className="absolute inset-0 h-[115%] w-full object-cover opacity-70 will-change-transform"
        style={{ top: "-7.5%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      <Fireflies count={14} />

      <div ref={textRef} className="container relative z-20 mx-auto will-change-transform">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

          {/* Eyebrow */}
          <div
            className="mb-6 inline-flex animate-clip-reveal items-center gap-2 rounded-full border border-amazon/30 bg-amazon/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amazon"
            style={{ animationDelay: "0.05s" }}
          >
            <Zap className="h-3 w-3" />
            Tecnologia da Amazônia para o Brasil inteiro
          </div>

          {/* Headline */}
          <h1 className="font-display" style={{ fontSize: "clamp(2.1rem, 5.5vw, 5rem)" }}>
            <span className="block overflow-hidden">
              <span className="block animate-clip-reveal text-foreground" style={{ animationDelay: "0.15s" }}>
                Automatize o que te trava.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block animate-clip-reveal" style={{ animationDelay: "0.3s" }}>
                <span className="text-gradient-amazon">Escale o que funciona.</span>
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="mx-auto mt-6 max-w-2xl animate-clip-reveal text-base text-muted-foreground sm:text-lg md:text-xl"
            style={{ animationDelay: "0.7s" }}
          >
            Desenvolvemos <span className="text-amazon font-semibold">sistemas</span>, criamos{" "}
            <span className="text-amazon font-semibold">apps</span> e automatizamos com{" "}
            <span className="text-gold font-semibold">inteligência artificial</span> —
            100% sob medida, em semanas, com suporte real.
          </p>

          {/* CTAs */}
          <div
            className="mt-8 flex animate-scale-pop flex-col gap-3 sm:flex-row sm:gap-4"
            style={{ animationDelay: "0.9s" }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-4 text-sm font-semibold text-black shadow-[0_0_24px_-6px_hsl(var(--whatsapp)/0.7)] transition-transform hover:scale-105 sm:text-base"
            >
              <MessageCircle className="h-5 w-5" /> Diagnóstico gratuito agora
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-amazon px-7 py-4 text-sm font-semibold text-foreground transition-all hover:bg-amazon/10 sm:text-base"
            >
              Ver o que fazemos
            </a>
          </div>

          {/* Trust micro-copy */}
          <p
            className="mt-5 animate-clip-reveal text-xs text-muted-foreground"
            style={{ animationDelay: "1.1s" }}
          >
            Sem compromisso · Resposta em até 24h · 100% personalizado
          </p>
        </div>
      </div>

      <a
        href="#problema"
        aria-label="Rolar para próxima seção"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-amazon"
      >
        <ArrowDown className="h-6 w-6 animate-scroll-bounce" />
      </a>
    </section>
  );
};
