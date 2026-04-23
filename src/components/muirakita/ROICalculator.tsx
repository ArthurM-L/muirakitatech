import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { MessageCircle, TrendingUp } from "lucide-react";
import { WHATSAPP_URL } from "./Navbar";

const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const ROICalculator = () => {
  const [attendances, setAttendances] = useState(800);
  const [costPer, setCostPer] = useState(8);
  const [automationRate, setAutomationRate] = useState(70);

  const { savings, hoursBack } = useMemo(() => {
    const monthlyCost = attendances * costPer;
    const savings = monthlyCost * (automationRate / 100) * 0.85;
    const hoursBack = Math.round((attendances * (automationRate / 100) * 4) / 60);
    return { savings, hoursBack };
  }, [attendances, costPer, automationRate]);

  const waMsg = encodeURIComponent(
    `Olá! Simulei na calculadora e posso economizar ~${fmtBRL(savings)}/mês com automação. Quero validar isso com vocês.`,
  );

  return (
    <section id="roi" className="relative py-20 md:py-28">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amazon/30 bg-amazon/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amazon">
            <TrendingUp className="h-3.5 w-3.5" /> Calculadora de ROI
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl">
            Quanto sua empresa pode <span className="text-gradient-amazon">economizar</span>?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Ajuste os controles e descubra em segundos o impacto da automação Muirakitã.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="glass-card p-6 md:p-8">
            <div className="space-y-8">
              <ControlRow
                label="Atendimentos por mês"
                value={attendances.toLocaleString("pt-BR")}
                min={100}
                max={5000}
                step={50}
                current={attendances}
                onChange={setAttendances}
              />
              <ControlRow
                label="Custo médio por atendimento"
                value={fmtBRL(costPer)}
                min={2}
                max={50}
                step={1}
                current={costPer}
                onChange={setCostPer}
              />
              <ControlRow
                label="% automatizável pela IA"
                value={`${automationRate}%`}
                min={20}
                max={95}
                step={5}
                current={automationRate}
                onChange={setAutomationRate}
              />
            </div>
          </div>

          <div className="glass-card flex flex-col justify-between bg-gradient-to-br from-amazon/15 via-card to-card p-6 md:p-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Economia estimada</p>
              <p className="mt-2 font-display text-4xl text-gradient-amazon md:text-5xl">{fmtBRL(savings)}</p>
              <p className="mt-1 text-sm text-muted-foreground">por mês</p>

              <div className="mt-6 rounded-xl border border-border bg-background/40 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Tempo recuperado</p>
                <p className="mt-1 font-display text-2xl text-gold">{hoursBack}h / mês</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Equivalente a ~{Math.round(hoursBack / 8)} dias úteis liberados.
                </p>
              </div>
            </div>

            <a
              href={`${WHATSAPP_URL}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" /> Validar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ControlRow = ({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (n: number) => void;
}) => (
  <div>
    <div className="mb-3 flex items-baseline justify-between">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="font-display text-lg text-gradient-amazon">{value}</span>
    </div>
    <Slider
      aria-label={label}
      min={min}
      max={max}
      step={step}
      value={[current]}
      onValueChange={(v) => onChange(v[0])}
    />
  </div>
);
