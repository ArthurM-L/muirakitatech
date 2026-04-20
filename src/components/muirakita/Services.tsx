import { Cpu, Smartphone, Code2, Globe, ArrowLeftRight, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "./Navbar";

type Card = {
  icon: React.ElementType;
  title: string;
  body: string;
  span?: string;
  accent?: "gold" | "amazon";
};

const cards: Card[] = [
  {
    icon: Cpu,
    title: "Automações com Inteligência Artificial",
    body: "Agentes de IA que trabalham 24h: respondem leads, qualificam clientes, disparam mensagens e integram sistemas — sem pausas, sem esquecimentos.",
    span: "md:col-span-2",
    accent: "gold",
  },
  {
    icon: Smartphone,
    title: "Criação de Apps",
    body: "Aplicativos mobile e web sob medida. Do protótipo ao deploy, com foco em usabilidade e performance.",
    span: "md:col-span-2 lg:col-span-1 lg:row-span-2",
    accent: "amazon",
  },
  { icon: Code2, title: "Desenvolvimento de Sistemas", body: "Sistemas personalizados que automatizam, organizam e escalam sua operação." },
  { icon: Globe, title: "Criação de Sites", body: "Landing pages, sites institucionais e e-commerce com identidade forte e foco em conversão." },
  { icon: ArrowLeftRight, title: "Migração de Sistemas", body: "Modernize sua infraestrutura com segurança. Migramos sistemas legados sem perda de dados." },
];

export const Services = () => {
  return (
    <section id="servicos" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 leaf-pattern opacity-40" aria-hidden="true" />
      <div className="container relative mx-auto">
        <header className="mb-12 max-w-3xl reveal-on-scroll">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amazon">Serviços</p>
          <h2 className="font-display text-gold" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>
            O que a Muirakitã Tech faz
          </h2>
          <p className="mt-4 text-muted-foreground">
            Da <span className="text-amazon font-semibold">automação com IA</span> ao app completo —
            entregamos tecnologia real para negócios reais.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className={`glass-card group relative flex flex-col gap-4 p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-amazon/40 hover:shadow-[0_12px_40px_-12px_hsl(var(--amazon-green)/0.35)] md:p-8 ${c.span ?? ""}`}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-amazon/30 bg-amazon/10 text-amazon transition-colors duration-300 group-hover:border-amazon group-hover:text-gold">
                  <Icon className="h-6 w-6" />
                </span>
                <h3
                  className={`font-display text-2xl md:text-3xl ${
                    c.accent === "gold" ? "text-gold" : "text-foreground"
                  }`}
                >
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{c.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-4 text-sm font-semibold text-black transition-transform hover:scale-105 sm:text-base"
          >
            <MessageCircle className="h-5 w-5" /> Quero contratar um serviço
          </a>
        </div>
      </div>
    </section>
  );
};
