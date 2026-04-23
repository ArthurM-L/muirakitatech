import { useEffect, useRef, useState } from "react";
import { Activity, Clock, Bot, Heart } from "lucide-react";

const useCountUp = (target: number, duration = 1500, decimals = 0) => {
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("pt-BR");
};

export const LiveDashboard = () => {
  const conversations = useCountUp(238);
  const response = useCountUp(1.2, 1500, 1);
  const resolved = useCountUp(78);
  const satisfaction = useCountUp(96);

  const rows = [
    { icon: Activity, label: "Conversas ativas", value: conversations, color: "text-amazon" },
    { icon: Clock, label: "Tempo de resposta", value: `${response}s`, color: "text-gold" },
    { icon: Bot, label: "Resolvido pela IA", value: `${resolved}%`, color: "text-amazon" },
    { icon: Heart, label: "Satisfação", value: `${satisfaction}%`, color: "text-gold" },
  ];

  return (
    <div className="glass-card w-full max-w-sm p-5 shadow-[0_20px_60px_-20px_hsl(var(--amazon-green)/0.5)]">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-whatsapp" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-whatsapp">Ao vivo</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Painel IA</span>
      </div>
      <ul className="mt-4 space-y-3">
        {rows.map(({ icon: Icon, label, value, color }) => (
          <li key={label} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Icon className={`h-4 w-4 ${color}`} />
              {label}
            </div>
            <span className={`font-display text-lg font-bold ${color} tabular-nums`}>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
