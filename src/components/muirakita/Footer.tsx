import { Instagram, MessageCircle, Leaf } from "lucide-react";
import { FrogLogo } from "./FrogLogo";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "./Navbar";

const services = [
  { href: "#servicos", label: "Automação com IA" },
  { href: "#servicos", label: "Criação de Apps" },
  { href: "#servicos", label: "Sistemas Sob Medida" },
  { href: "#servicos", label: "Sites & Landing Pages" },
  { href: "#servicos", label: "Migração de Sistemas" },
];

const navigation = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#historia", label: "História" },
  { href: "#automacao", label: "Automação IA" },
  { href: "#contato", label: "Contato" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-amazon/15 bg-background py-12">
      <div className="container mx-auto grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-start gap-3">
            <FrogLogo className="h-10 w-10 text-foreground" />
            <div>
              <div className="font-display text-2xl tracking-wider">
                Muirakitã <span className="text-amazon">Tech</span>
              </div>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Leaf className="h-3.5 w-3.5 text-amazon" /> Da Amazônia para o digital
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amazon">
            Serviços
          </h3>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-muted-foreground hover:text-amazon">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amazon">
            Navegação
          </h3>
          <ul className="space-y-2 text-sm">
            {navigation.map((n) => (
              <li key={n.label}>
                <a href={n.href} className="text-muted-foreground hover:text-amazon">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amazon">
            Contato
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground hover:text-amazon"
              >
                <MessageCircle className="h-4 w-4 text-whatsapp" /> {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/muirakitatech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground hover:text-amazon"
              >
                <Instagram className="h-4 w-4 text-amazon" /> @muirakitatech
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-10 border-t border-amazon/10 pt-6 text-center text-xs text-muted-foreground">
        © 2026 Muirakitã Tech. Todos os direitos reservados.
      </div>
    </footer>
  );
};
