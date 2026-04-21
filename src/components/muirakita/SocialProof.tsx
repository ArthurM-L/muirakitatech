import { Rocket, Users, Star, Clock } from "lucide-react";

const stats = [
  { icon: Rocket, value: "12+", label: "Projetos entregues" },
  { icon: Users, value: "8+", label: "Empresas atendidas" },
  { icon: Star, value: "100%", label: "Clientes satisfeitos" },
  { icon: Clock, value: "24h", label: "Tempo médio de resposta" },
];

export const SocialProof = () => {
  return (
    <section className="relative overflow-hidden border-y border-amazon/15 bg-card/30 py-12 md:py-16">
      <div className="absolute inset-0 leaf-pattern opacity-30" aria-hidden="true" />
      <div className="container relative mx-auto">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-amazon">
          Resultados que falam
        </p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amazon/15 text-amazon">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="font-display text-3xl text-foreground md:text-4xl">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground md:text-sm">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
