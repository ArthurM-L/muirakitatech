import { Search, Lightbulb, Code2, Rocket } from "lucide-react";

const steps = [
  { n: "01", icon: Search, title: "Diagnóstico gratuito", badge: "em até 24h", desc: "Você conta o que precisa. A gente escuta de verdade e identifica onde a tecnologia pode te destravar." },
  { n: "02", icon: Lightbulb, title: "Escopo fechado", badge: "em 3 dias", desc: "Proposta clara: o que será feito, quanto vai custar, quando entrega. Sem surpresas no meio do caminho." },
  { n: "03", icon: Code2, title: "Entregas semanais", badge: "você acompanha tudo", desc: "Desenvolvimento com check-ins regulares. Você vê o projeto crescer — e pode ajustar a rota enquanto constrói." },
  { n: "04", icon: Rocket, title: "No ar e evoluindo", badge: "suporte real incluso", desc: "Lançamos, monitoramos e continuamos ao seu lado. Suporte direto no WhatsApp — sem ticket, sem fila." },
];

export const Process = () => {
  return (
    <section id="processo" className="relative py-20 md:py-28">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amazon">Como trabalhamos</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">
            Do diagnóstico ao{" "}
            <span className="text-gradient-amazon">resultado real</span>
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

          {steps.map(({ n, icon: Icon, title, badge, desc }) => (
            <div key={n} className="relative">
              <div className="glass-card relative z-10 flex h-full flex-col items-start gap-4 p-6">
                <div className="flex w-full items-center justify-between">
                  <span className="font-display text-3xl text-gradient-amazon">{n}</span>
                  <Icon className="h-6 w-6 text-amazon" />
                </div>
                <h3 className="font-display text-xl">{title}</h3>
                <span className="rounded-full border border-amazon/30 bg-amazon/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amazon">{badge}</span>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
