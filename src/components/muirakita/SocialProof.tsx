import { useEffect, useRef, useState } from "react";
import { Rocket, Users, Star, Clock } from "lucide-react";

const stats = [
  { icon: Rocket, value: "12+", num: 12, suffix: "+", label: "Projetos entregues no prazo" },
  { icon: Users,  value: "8+",  num: 8,  suffix: "+", label: "Empresas desbloqueadas" },
  { icon: Star,   value: "100%",num: 100,suffix: "%", label: "Taxa de retenção de clientes" },
  { icon: Clock,  value: "24h", num: 24, suffix: "h", label: "Resposta garantida" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);
  const start = useRef<number>(0);
  const duration = 1600;

  useEffect(() => {
    if (!active) return;
    start.current = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start.current) / duration, 1);
      // ease out expo
      const ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setVal(Math.floor(ease * target));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target]);

  return <>{val}{suffix}</>;
}

export const SocialProof = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFired(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-amazon/15 bg-card/30 py-12 md:py-16">
      <div className="absolute inset-0 leaf-pattern opacity-30" aria-hidden="true" />
      <div ref={ref} className="container relative mx-auto">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-amazon">
          Números que importam
        </p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 text-center"
                style={{
                  opacity: fired ? 1 : 0,
                  transform: fired ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                }}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amazon/15 text-amazon">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="font-display text-3xl text-foreground md:text-4xl tabular-nums">
                  <CountUp target={s.num} suffix={s.suffix} active={fired} />
                </div>
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
