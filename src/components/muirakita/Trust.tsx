import { Zap, Handshake, Leaf } from "lucide-react";

const pillars = [
  { icon: Zap, title: "Entrega Rápida", body: "Do briefing ao deploy com agilidade e sem burocracia." },
  { icon: Handshake, title: "Parceria Real", body: "Relacionamentos de confiança, não apenas contratos. Crescemos juntos." },
  { icon: Leaf, title: "Raiz Amazônica", body: "Autenticidade e resiliência em cada linha de código. Nossa origem é nossa força." },
];

export const Trust = () => {
  return (
    <section className="relative border-t-2 border-amazon bg-card py-24 md:py-28">
      <div className="container mx-auto">
        <header className="mb-12 text-center reveal-on-scroll">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amazon">
            Por que a Muirakitã Tech?
          </p>
          <h2 className="font-display text-foreground" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>
            Nossa força vem da raiz
          </h2>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="reveal-on-scroll flex flex-col items-start gap-4 rounded-2xl border border-amazon/15 bg-background/40 p-8 transition-all hover:border-amazon/40"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-amazon/30 bg-amazon/10 text-amazon">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="font-display text-3xl text-gold">{p.title}</h3>
                <p className="text-muted-foreground">{p.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
