import { useEffect, useRef, useState } from "react";
import { Clock, Puzzle, UserX, TrendingDown } from "lucide-react";

const pains = [
  {
    icon: Clock,
    title: "Horas perdidas em tarefas repetitivas",
    desc: "Planilha por planilha, cópia-cola por cópia-cola. Sua equipe gasta tempo precioso em tarefas que uma automação resolve em segundos.",
  },
  {
    icon: Puzzle,
    title: "Software genérico que não encaixa",
    desc: "ERP caro demais, WhatsApp de limite, Google Sheets no limite. Nenhuma ferramenta pronta foi feita para o jeito que o seu negócio funciona.",
  },
  {
    icon: UserX,
    title: "Desenvolvedor que sumiu no projeto",
    desc: "Você pagou, esperou meses, e ficou com metade de uma solução e zero de suporte. Terceirizar dev virou sinônimo de risco.",
  },
  {
    icon: TrendingDown,
    title: "Cresceu — mas o processo não acompanhou",
    desc: "A operação que funcionava com 3 pessoas trava com 10. Escalar sem automação é jogar gente no gargalo que deveria ser código.",
  },
];

export const Problem = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setFired(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="problema" className="relative py-20 md:py-28">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amazon">Você se reconhece aqui?</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">
            O que trava o seu negócio{" "}
            <span className="text-gradient-amazon">não é falta de esforço.</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            São processos quebrados, ferramentas inadequadas e tecnologia que nunca foi pensada para o seu caso.
          </p>
        </div>

        <div ref={ref} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="glass-card flex flex-col gap-4 p-6"
              style={{
                opacity: fired ? 1 : 0,
                clipPath: fired ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, clip-path 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
              }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-base leading-snug">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Se pelo menos um desses soa familiar,{" "}
          <span className="text-amazon font-semibold">você está no lugar certo.</span>
        </p>
      </div>
    </section>
  );
};
