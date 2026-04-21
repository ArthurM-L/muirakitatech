import { Clock, FileCheck2, Github } from "lucide-react";

const pillars = [
  {
    icon: Clock,
    title: "Resposta em 24h",
    body: "Toda mensagem recebe retorno no próximo dia útil — sem deixar você no vácuo.",
  },
  {
    icon: FileCheck2,
    title: "Sem fidelidade",
    body: "Contratos transparentes, sem multa, sem letra miúda. Você fica porque quer.",
  },
  {
    icon: Github,
    title: "Código no seu GitHub",
    body: "Você é dono do código. Entregamos no seu repositório, com documentação clara.",
  },
];

export const Trust = () => {
  return (
    <section className="relative border-t-2 border-amazon bg-card py-16 md:py-20">
      <div className="container mx-auto">
        <header className="mb-10 text-center reveal-on-scroll">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amazon">
            Por que a Muirakitã Tech?
          </p>
          <h2 className="font-display text-foreground" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>
            Compromissos reais, não promessas
          </h2>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="reveal-on-scroll flex flex-col items-start gap-4 rounded-2xl border border-amazon/15 bg-background/40 p-8 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-amazon/40 hover:shadow-[0_10px_30px_-12px_hsl(var(--amazon-green)/0.3)]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-amazon/30 bg-amazon/10 text-amazon">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="font-display text-2xl text-foreground">{p.title}</h3>
                <p className="text-muted-foreground">{p.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
