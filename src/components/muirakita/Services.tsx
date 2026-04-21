import { Cpu, Smartphone, Code2, Globe, ArrowLeftRight, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "./Navbar";
import CardFlip from "@/components/ui/flip-card";

const cards = [
  {
    icon: Cpu,
    title: "Automação com IA",
    subtitle: "Agentes que trabalham 24h por você",
    description:
      "Agentes de IA que respondem leads, qualificam clientes e integram sistemas — sem pausas, sem esquecimentos.",
    features: ["Atendimento 24/7", "Integração WhatsApp", "Qualificação de leads", "Relatórios automáticos"],
    accent: "gold" as const,
  },
  {
    icon: Smartphone,
    title: "Criação de Apps",
    subtitle: "Mobile e web sob medida",
    description: "Aplicativos sob medida — do protótipo ao deploy, com foco em usabilidade e performance.",
    features: ["iOS + Android", "Design intuitivo", "Backend escalável", "Deploy nas lojas"],
    accent: "amazon" as const,
  },
  {
    icon: Code2,
    title: "Sistemas Sob Medida",
    subtitle: "Automatize, organize e escale",
    description: "Sistemas personalizados que se moldam à sua operação — não o contrário.",
    features: ["Painéis personalizados", "Automação de fluxos", "Multi-usuário", "Integrações via API"],
    accent: "amazon" as const,
  },
  {
    icon: Globe,
    title: "Sites e Landing Pages",
    subtitle: "Identidade forte, foco em conversão",
    description: "Sites institucionais, landing pages e e-commerce com identidade visual forte e SEO desde o dia 1.",
    features: ["SEO técnico", "Performance A+", "CMS editável", "Analytics integrado"],
    accent: "gold" as const,
  },
  {
    icon: ArrowLeftRight,
    title: "Migração de Sistemas",
    subtitle: "Modernize sem perder dados",
    description: "Migramos sistemas legados com segurança, zero downtime e plano de rollback.",
    features: ["Diagnóstico técnico", "Migração de dados", "Zero downtime", "Treinamento da equipe"],
    accent: "amazon" as const,
  },
];

export const Services = () => {
  return (
    <section id="servicos" className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 leaf-pattern opacity-40" aria-hidden="true" />
      <div className="container relative mx-auto">
        <header className="mb-12 max-w-3xl reveal-on-scroll">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amazon">Serviços</p>
          <h2 className="font-display text-gold" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>
            O que a Muirakitã Tech faz
          </h2>
          <p className="mt-4 text-muted-foreground">
            Da <span className="text-amazon font-semibold">automação com IA</span> ao app completo —
            passe o mouse nos cards para ver os detalhes.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <CardFlip
              key={c.title}
              icon={c.icon}
              title={c.title}
              subtitle={c.subtitle}
              description={c.description}
              features={c.features}
              accent={c.accent}
              ctaLabel="Quero esse serviço"
              onCtaClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
            />
          ))}
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
