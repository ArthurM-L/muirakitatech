import { Search, Lightbulb, Code2, Rocket } from "lucide-react";

const steps = [
  { n: "01", icon: Search, title: "Diagnóstico", desc: "Entendemos seu negócio, dores e oportunidades de automação." },
  { n: "02", icon: Lightbulb, title: "Estratégia", desc: "Desenhamos a solução sob medida com escopo, prazos e ROI claros." },
  { n: "03", icon: Code2, title: "Desenvolvimento", desc: "Construímos com tecnologia de ponta e entregas semanais." },
  { n: "04", icon: Rocket, title: "Entrega + Evolução", desc: "Lançamento, acompanhamento e melhoria contínua ao seu lado." },
];

export const Process = () => {
  return (
    <section id="processo" className="relative py-20 md:py-28">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amazon">Como trabalhamos</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">
            Do <span className="text-gradient-amazon">briefing ao boom</span> em 4 passos
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-4">
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-10 hidden md:block"
            height="2"
            width="100%"
          >
            <line
              x1="6%" y1="1" x2="94%" y2="1"
              stroke="hsl(var(--amazon-green) / 0.4)"
              strokeWidth="2"
              strokeDasharray="6 8"
              className="animate-flow-dash"
            />
          </svg>

          {steps.map(({ n, icon: Icon, title, desc }) => (
            <div key={n} className="relative">
              <div className="glass-card relative z-10 flex h-full flex-col items-start gap-4 p-6">
                <div className="flex w-full items-center justify-between">
                  <span className="font-display text-3xl text-gradient-amazon">{n}</span>
                  <Icon className="h-6 w-6 text-amazon" />
                </div>
                <h3 className="font-display text-xl">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
