import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { FrogLogo } from "./FrogLogo";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#historia", label: "Nossa História" },
  { href: "#automacao", label: "Automação IA" },
  { href: "#contato", label: "Contato" },
];

export const WHATSAPP_URL = "https://wa.me/5593981126115";
export const WHATSAPP_DISPLAY = "(93) 98112-6115";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#inicio");
  const [scrollPct, setScrollPct] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll state: backdrop + progress bar
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (y / docH) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      ref={menuRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-amazon/20"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="scroll-progress-bar"
        style={{ width: `${scrollPct}%` }}
      />

      <nav className="container mx-auto flex h-16 items-center justify-between md:h-20">
        <a href="#inicio" className="flex items-center gap-2 text-foreground">
          <FrogLogo className="h-9 w-9 text-foreground" />
          <span className="font-display text-xl tracking-wider md:text-2xl">
            Muirakitã <span className="text-amazon">Tech</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative text-sm font-medium transition-colors duration-300 hover:text-amazon ${
                    isActive ? "text-amazon" : "text-muted-foreground"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-amazon transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-whatsapp-hover md:inline-flex active:scale-95"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </a>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-amazon/30 text-foreground transition-all duration-300 lg:hidden active:scale-90"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <span
              className="absolute transition-all duration-300"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <X className="h-5 w-5" />
            </span>
            <span
              className="absolute transition-all duration-300"
              style={{
                opacity: open ? 0 : 1,
                transform: open ? "rotate(90deg) scale(0.5)" : "rotate(0deg) scale(1)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Menu className="h-5 w-5" />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu — animated via clip-path + opacity */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className="fixed inset-0 top-16 z-40 flex flex-col gap-2 bg-background/98 px-6 pb-10 pt-8 backdrop-blur-xl lg:hidden"
        style={{
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`flex min-h-[56px] items-center border-b border-amazon/10 font-display text-2xl tracking-wide transition-colors ${
              active === l.href ? "text-amazon" : "text-foreground"
            }`}
            style={{
              transform: open ? "translateX(0)" : "translateX(-24px)",
              opacity: open ? 1 : 0,
              transition: `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s, opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s`,
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-base font-semibold text-black active:scale-95"
          style={{
            transform: open ? "translateX(0)" : "translateX(-24px)",
            opacity: open ? 1 : 0,
            transition: `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${links.length * 0.06}s, opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${links.length * 0.06}s`,
          }}
          onClick={() => setOpen(false)}
        >
          <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
        </a>
      </div>
    </header>
  );
};
