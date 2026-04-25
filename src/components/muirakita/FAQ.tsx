import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "E se eu não souber exatamente o que preciso?",
    a: "Essa é a situação mais comum — e mais bem-vinda. O diagnóstico gratuito existe exatamente para isso: você conta o problema, a gente traduz em solução. Não precisa chegar com especificação técnica, precisa chegar com a dor.",
  },
  {
    q: "Quanto custa um projeto?",
    a: "Automações pontuais começam em R$ 2.500. Sistemas e apps a partir de R$ 8.000. O que define o preço é escopo — e o escopo fechamos juntos, com clareza total, antes de assinar qualquer coisa.",
  },
  {
    q: "Em quanto tempo fica pronto?",
    a: "Automações simples: 1–2 semanas. Sistemas completos: 4–12 semanas, com entregas semanais. Você nunca fica esperando no escuro — acompanha o progresso em tempo real.",
  },
  {
    q: "Atendem fora de Santarém, Manaus e Belém?",
    a: "Atendemos o Brasil inteiro, 100% remoto. Nossa raiz é amazônica — Santarém, Manaus, Belém — mas nossos clientes estão de São Paulo ao Acre. A floresta tem fibra óptica.",
  },
  {
    q: "E depois da entrega, ficam sumidos?",
    a: "Não. Suporte direto no WhatsApp, SLA combinado em contrato, e planos de evolução contínua para quem quer crescer. Você não vai receber um email automático quando der problema.",
  },
  {
    q: "Posso começar pequeno e expandir depois?",
    a: "Essa é a abordagem que a gente recomenda. Começamos com o que resolve a dor mais urgente, validamos o resultado juntos, e construímos sobre uma base que já funciona.",
  },
  {
    q: "Os dados do meu negócio ficam seguros?",
    a: "Sim. Infraestrutura criptografada, conformidade com a LGPD e NDA assinado quando necessário. Seus dados são seus — e continuam sendo.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amazon">Perguntas frequentes</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">
            Perguntas que todo{" "}
            <span className="text-gradient-amazon">cliente faz primeiro</span>
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
