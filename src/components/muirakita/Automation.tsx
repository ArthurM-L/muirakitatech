import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "./Navbar";

const nodes = [
  { emoji: "🌿", label: "Lead Recebido" },
  { emoji: "🧠", label: "IA Analisa" },
  { emoji: "⚡", label: "Sistema Age" },
  { emoji: "📲", label: "Cliente Notificado" },
  { emoji: "✅", label: "Resultado Entregue" },
];

export const Automation = () => {
  const radius = 140;
  return (
    <section id="automacao" className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Bioluminescent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, hsl(160 70% 30% / 0.18), transparent 45%), radial-gradient(circle at 80% 70%, hsl(96 71% 24% / 0.22), transparent 50%), radial-gradient(circle at 50% 100%, hsl(44 80% 46% / 0.08), transparent 60%)",
        }}
      />

      {/* River SVG decoration */}
      <svg
        className="absolute right-0 top-1/4 hidden h-[60%] w-1/2 opacity-[0.08] lg:block"
        viewBox="0 0 400 600"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M50 0 C 200 100, 100 250, 250 350 S 150 550, 350 600"
          stroke="hsl(var(--leaf))"
          strokeWidth="60"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="container relative mx-auto grid items-center gap-16 lg:grid-cols-2">
        <div className="reveal-on-scroll">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amazon">
            Automação com IA
          </p>
          <h2 className="font-display text-foreground" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            A floresta nunca dorme
          </h2>
          <p className="mt-4 font-display text-2xl text-amazon md:text-3xl">
            E a sua empresa também não precisa.
          </p>
          <p className="mt-6 text-muted-foreground">
            Assim como o ecossistema amazônico funciona 24 horas por dia em perfeita harmonia, criamos
            <span className="text-gold font-semibold"> automações com IA</span> que mantêm seu negócio
            operando sem parar — integrando áreas, respondendo clientes, processando dados e gerando
            resultados enquanto você descansa.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-4 text-sm font-semibold text-black transition-transform hover:scale-105 sm:text-base"
          >
            <MessageCircle className="h-5 w-5" /> Quero automação para meu negócio
          </a>
        </div>

        {/* Ecosystem diagram */}
        <div className="relative mx-auto aspect-square w-full max-w-[420px]">
          <div className="absolute inset-0 animate-spin-slow">
            <svg viewBox="-200 -200 400 400" className="h-full w-full">
              {nodes.map((_, i) => {
                const next = (i + 1) % nodes.length;
                const a1 = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
                const a2 = (next / nodes.length) * Math.PI * 2 - Math.PI / 2;
                return (
                  <line
                    key={i}
                    x1={Math.cos(a1) * radius}
                    y1={Math.sin(a1) * radius}
                    x2={Math.cos(a2) * radius}
                    y2={Math.sin(a2) * radius}
                    stroke="hsl(var(--amazon-green))"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow-dash"
                    style={{ animationDelay: `${i * 0.3}s`, opacity: 0.6 }}
                  />
                );
              })}
              <circle r="60" fill="hsl(var(--amazon-green) / 0.08)" stroke="hsl(var(--amazon-green) / 0.3)" />
            </svg>
          </div>

          {/* Center label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="font-display text-2xl text-gold">IA</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Muirakitã</div>
          </div>

          {/* Nodes (counter-rotated to stay upright relative to viewport) */}
          {nodes.map((n, i) => {
            const angle = (i / nodes.length) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            return (
              <div
                key={n.label}
                className="absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amazon/40 bg-card text-2xl shadow-[0_0_20px_hsl(var(--amazon-green)/0.4)]">
                  {n.emoji}
                </div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {n.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
