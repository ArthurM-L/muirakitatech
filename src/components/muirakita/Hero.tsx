import { useEffect, useRef } from "react";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Fireflies } from "./Fireflies";
import jungle from "@/assets/jungle-hero.jpg";
import { WHATSAPP_URL } from "./Navbar";

export const Hero = () => {
  const imgRef = useRef<HTMLImageElement>(null);
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
      className="relative flex min-h-[78svh] w-full items-center overflow-hidden pt-24 pb-12 md:min-h-[85svh] md:pt-28 md:pb-16"
    >
      {/* Parallax background */}
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
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
            <span className="block overflow-hidden">
              <span className="block animate-clip-reveal text-foreground">
                Tecnologia que
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="block animate-clip-reveal"
                style={{ animationDelay: "0.15s" }}
              >
                <span className="text-gradient-amazon">transforma</span>{" "}
                <span className="text-foreground">seu negócio.</span>
              </span>
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl animate-clip-reveal text-base text-muted-foreground sm:text-lg md:text-xl"
            style={{ animationDelay: "0.7s" }}
          >
            Desenvolvemos <span className="text-amazon font-semibold">sistemas</span>, automatizamos
            processos com <span className="text-gold font-semibold">inteligência artificial</span> e
            criamos <span className="text-amazon font-semibold">apps</span> que transformam negócios.
            Da Amazônia para o digital.
          </p>

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
              <MessageCircle className="h-5 w-5" /> Chamar no WhatsApp
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-amazon px-7 py-4 text-sm font-semibold text-foreground transition-all hover:bg-amazon/10 sm:text-base"
            >
              Ver nossos serviços
            </a>
          </div>
        </div>
      </div>

      <a
        href="#servicos"
        aria-label="Rolar para serviços"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-amazon"
      >
        <ArrowDown className="h-6 w-6 animate-scroll-bounce" />
      </a>
    </section>
  );
};
