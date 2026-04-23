import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quanto custa um projeto com a Muirakitã?",
    a: "O investimento varia conforme escopo. Projetos de automação começam em torno de R$ 2.500 e sistemas/apps a partir de R$ 8.000. Fazemos um diagnóstico gratuito antes de qualquer proposta.",
  },
  {
    q: "Em quanto tempo meu projeto fica pronto?",
    a: "Automações simples saem em 1–2 semanas. Sistemas e apps completos variam de 4 a 12 semanas, com entregas semanais para você acompanhar a evolução.",
  },
  {
    q: "Vocês atendem clientes fora de Manaus / da Amazônia?",
    a: "Sim. Atendemos o Brasil inteiro 100% remoto. Nossa raiz é amazônica, mas nossos clientes estão em todo o país.",
  },
  {
    q: "E depois da entrega? Tem suporte?",
    a: "Sim. Oferecemos planos de suporte e evolução contínua, com SLA combinado e canal direto no WhatsApp para emergências.",
  },
  {
    q: "Posso começar com algo pequeno e crescer depois?",
    a: "Com certeza — recomendamos. Geralmente começamos por uma automação ou MVP, validamos resultado, e expandimos a partir daí.",
  },
  {
    q: "Os dados do meu negócio ficam seguros?",
    a: "Sim. Trabalhamos com infraestrutura criptografada, conformidade LGPD e NDA quando necessário.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amazon">Perguntas frequentes</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">
            Tira <span className="text-gradient-amazon">dúvidas</span> antes de falar
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="glass-card !border-border px-5"
            >
              <AccordionTrigger className="text-left font-display text-base hover:no-underline md:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
