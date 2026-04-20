import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-amazon/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between md:h-20">
        <a href="#inicio" className="flex items-center gap-2 text-foreground">
          <FrogLogo className="h-9 w-9 text-foreground" />
          <span className="font-display text-xl tracking-wider md:text-2xl">
            Muirakitã <span className="text-amazon">Tech</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-amazon"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-black transition-all hover:scale-105 hover:bg-whatsapp-hover md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </a>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-amazon/30 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col gap-2 bg-background/98 px-6 pb-10 pt-8 backdrop-blur-xl lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[56px] items-center border-b border-amazon/10 font-display text-2xl tracking-wide text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-base font-semibold text-black"
          >
            <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
};
