import { InlineContactForm } from "./InlineContactForm";
import { Leaf, Sparkles, ShieldCheck } from "lucide-react";

export const Contact = () => {
  return (
    <section
      id="contato"
      className="relative overflow-hidden border-y border-amazon/15 py-20 md:py-28"
    >
      <div className="absolute inset-0 leaf-pattern opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--bg-card))]/40 to-background"
        aria-hidden="true"
      />

      <div className="container relative mx-auto grid gap-12 md:grid-cols-2 md:items-start">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amazon/30 bg-background/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amazon">
            <Sparkles className="h-3.5 w-3.5" /> Fale com a gente
          </span>
          <h2
            className="mt-5 font-display uppercase leading-[0.95] tracking-wide text-foreground"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
          >
            Tem uma ideia?{" "}
            <span className="text-gradient-amazon">A floresta escuta.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
            Conta o que você quer construir. Registramos sua mensagem e abrimos o WhatsApp para
            continuar a conversa em tempo real — sem formulário robótico, sem auto-resposta vazia.
          </p>

          <ul className="mt-8 space-y-3 text-sm sm:text-base">
            {[
              { icon: Leaf, text: "Diagnóstico inicial gratuito" },
              { icon: ShieldCheck, text: "Suas informações ficam seguras" },
              { icon: Sparkles, text: "Resposta no mesmo dia útil" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-foreground/90">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amazon/15 text-amazon">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-8 rounded-3xl bg-amazon/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <InlineContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
