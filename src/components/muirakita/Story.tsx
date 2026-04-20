export const Story = () => {
  return (
    <section id="historia" className="relative overflow-hidden py-24 md:py-32">
      {/* Jaguar silhouette */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 hidden h-[80%] -translate-y-1/2 opacity-[0.04] md:block"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M30 120 q 10 -40 50 -50 q 30 -10 60 5 q 10 5 20 0 q 5 -3 10 5 q -5 5 -10 5 q -5 0 -8 5 q 10 10 5 25 q -5 10 -15 15 q -5 25 -25 30 q -25 5 -45 -5 q -15 -5 -25 -10 q -10 -5 -10 -15 q -5 -5 -2 -10 q 5 0 -5 0 z" />
      </svg>

      <div className="container relative mx-auto max-w-3xl">
        {/* Watermark muirakitã */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-12 -z-10 w-[420px] -translate-x-1/2 opacity-[0.12]"
          viewBox="0 0 200 200"
          fill="hsl(var(--amazon-green))"
        >
          <path d="M100 20 C 60 30, 30 70, 40 110 C 30 140, 60 175, 100 175 C 140 175, 170 140, 160 110 C 170 70, 140 30, 100 20 Z M75 80 a 12 12 0 1 0 0.1 0 z M125 80 a 12 12 0 1 0 0.1 0 z M70 130 q 30 25 60 0" stroke="hsl(var(--amazon-green))" strokeWidth="3" fill="none" />
        </svg>

        <div className="reveal-on-scroll text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amazon">
            Nossa História
          </p>
          <h2 className="font-display text-gold" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
            "Com ideias indecisas, loucas, projetos inacabados…"
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-5 text-left text-foreground/90 md:text-lg" style={{ lineHeight: 1.8 }}>
            <p>
              Assim começou a <span className="text-amazon font-semibold">Muirakitã Tech</span>. Com tentativas, erros e a recusa de parar.
              Até termos a clareza de criar algo inovador, criativo, autêntico, sólido e duradouro.
            </p>
            <p>
              Não somos apenas uma empresa de tecnologia — somos parceiros de crescimento. Queremos mais que clientes:
              queremos relações de confiança que trarão benefícios para ambos.
            </p>
          </div>
          <p className="mt-10 font-display text-2xl text-amazon md:text-3xl">
            Da Amazônia para o digital. Com raiz e com futuro.
          </p>
        </div>

        {/* Timeline */}
        <ol className="mx-auto mt-16 grid max-w-2xl gap-8 md:grid-cols-3">
          {[
            { year: "Origem", text: "Da floresta, a primeira linha de código." },
            { year: "Crescer", text: "Sistemas, apps e parcerias que escalam." },
            { year: "Hoje", text: "IA viva, automatizando o futuro." },
          ].map((m) => (
            <li key={m.year} className="relative pl-6">
              <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-amazon shadow-[0_0_16px_hsl(var(--amazon-green))]" />
              <div className="font-display text-xl text-gold">{m.year}</div>
              <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
