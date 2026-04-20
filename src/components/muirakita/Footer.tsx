import { Instagram } from "lucide-react";
import { FrogLogo } from "./FrogLogo";

export const Footer = () => {
  return (
    <footer className="border-t border-amazon/15 bg-background py-12">
      <div className="container mx-auto grid gap-8 md:grid-cols-2">
        <div className="flex items-start gap-3">
          <FrogLogo className="h-10 w-10 text-foreground" />
          <div>
            <div className="font-display text-2xl tracking-wider">
              Muirakitã <span className="text-amazon">Tech</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Da Amazônia para o digital 🐸</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground md:justify-end">
            <a href="#inicio" className="hover:text-amazon">Início</a>
            <a href="#servicos" className="hover:text-amazon">Serviços</a>
            <a href="#historia" className="hover:text-amazon">História</a>
            <a href="#automacao" className="hover:text-amazon">Automação IA</a>
            <a href="#contato" className="hover:text-amazon">Contato</a>
          </nav>
          <a
            href="https://instagram.com/muirakitatech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-amazon hover:text-gold"
          >
            <Instagram className="h-4 w-4" /> @muirakitatech
          </a>
        </div>
      </div>
      <div className="container mx-auto mt-10 border-t border-amazon/10 pt-6 text-center text-xs text-muted-foreground">
        © 2026 Muirakitã Tech. Todos os direitos reservados.
      </div>
    </footer>
  );
};
