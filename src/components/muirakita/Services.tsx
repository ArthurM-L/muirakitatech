import { useEffect, useRef, useState } from "react";
import { Cpu, Smartphone, Code2, Globe, ArrowLeftRight, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "./Navbar";
import CardFlip from "@/components/ui/flip-card";
import { useScramble } from "@/hooks/use-scramble";

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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);
  const scrambled = useScramble("O que a Muirakitã Tech faz", visible, 50);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="servicos" className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 leaf-pattern opacity-40" aria-hidden="true" />
      <div className="container relative mx-auto">
        <header className="mb-12 max-w-3xl reveal-on-scroll">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amazon">Serviços</p>
          <h2 ref={headingRef} className="font-display text-gradient-amazon" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>
            {scrambled}
          </h2>
          <p className="mt-4 text-muted-foreground">
            Da <span className="text-amazon font-semibold">automação com IA</span> ao app completo —
            <span className="hidden sm:inline"> passe o mouse nos cards para ver os detalhes.</span>
            <span className="sm:hidden"> toque nos cards para ver os detalhes.</span>
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amazon/30 bg-amazon/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amazon">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amazon opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amazon" />
            </span>
            <span className="hidden sm:inline">Passe o mouse · Interativo</span>
            <span className="sm:hidden">Toque para interagir</span>
          </div>
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
