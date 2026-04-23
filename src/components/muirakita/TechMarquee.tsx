const techs = [
  "React", "TypeScript", "Supabase", "Node.js", "Next.js", "n8n",
  "OpenAI", "Gemini", "WhatsApp API", "Figma", "PostgreSQL", "Tailwind",
  "Vite", "Stripe", "Vercel", "Lovable",
];

export const TechMarquee = () => {
  const loop = [...techs, ...techs];
  return (
    <section aria-label="Tecnologias" className="relative overflow-hidden border-y border-border bg-card/40 py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Tecnologias que dominamos
      </p>
      <div className="group flex overflow-hidden">
        <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 motion-reduce:animate-none">
          {loop.map((t, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-2xl font-semibold text-muted-foreground transition-colors hover:text-gradient-amazon md:text-3xl"
            >
              {t}
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 motion-reduce:animate-none"
        >
          {loop.map((t, i) => (
            <span
              key={`b-${i}`}
              className="whitespace-nowrap font-display text-2xl font-semibold text-muted-foreground md:text-3xl"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
