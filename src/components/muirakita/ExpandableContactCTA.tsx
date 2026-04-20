import { useState, useEffect, FormEvent } from "react";
import { X, Check, ArrowRight, Leaf, MessageCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "./Navbar";

interface ExpandableContactCTAProps {
  /** Unique id used for layout animations — must differ between instances on the same page. */
  layoutId: string;
  label?: string;
  className?: string;
}

const services = [
  "Automação com IA",
  "Criação de App",
  "Desenvolvimento de Sistemas",
  "Criação de Site",
  "Migração de Sistemas",
  "Não sei ainda — quero conversar",
];

export const ExpandableContactCTA = ({
  layoutId,
  label = "Entrar em contato",
  className = "",
}: ExpandableContactCTAProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [step, setStep] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: services[0],
    message: "",
    website: "", // honeypot — must stay empty
  });
  const formLoadedAt = useState(() => Date.now())[0];

  const RATE_LIMIT_KEY = "muirakita_last_contact_at";
  const RATE_LIMIT_MS = 30_000; // 30s between submissions

  const handleClose = () => {
    setIsExpanded(false);
    setTimeout(() => setStep("idle"), 500);
  };

  const buildWhatsAppLink = () => {
    const lines = [
      `Olá Muirakitã Tech! Sou ${form.name}.`,
      form.company && `Empresa: ${form.company}`,
      `Interesse: ${form.service}`,
      form.email && `E-mail: ${form.email}`,
      "",
      form.message || "Gostaria de conversar sobre um projeto.",
    ].filter(Boolean);
    return `${WHATSAPP_URL}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Preencha nome e mensagem.");
      return;
    }

    // Honeypot — bots fill hidden fields. Silently fake success.
    if (form.website.trim() !== "") {
      setStep("success");
      return;
    }

    // Time trap — humans take >2s to fill the form.
    if (Date.now() - formLoadedAt < 2000) {
      toast.error("Aguarde um instante e tente novamente.");
      return;
    }

    // Client-side rate limit (best-effort, not abuse-proof).
    try {
      const last = Number(localStorage.getItem(RATE_LIMIT_KEY) || 0);
      const wait = RATE_LIMIT_MS - (Date.now() - last);
      if (wait > 0) {
        toast.error(`Aguarde ${Math.ceil(wait / 1000)}s antes de enviar novamente.`);
        return;
      }
    } catch {
      // ignore storage errors
    }

    setStep("submitting");
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim().slice(0, 200),
      email: form.email.trim().slice(0, 320) || null,
      phone: form.phone.trim().slice(0, 50) || null,
      company: form.company.trim().slice(0, 200) || null,
      message: `[${form.service}] ${form.message.trim()}`.slice(0, 5000),
      source: "website",
    });

    if (error) {
      console.error("contact insert error", error);
      toast.error("Não conseguimos registrar. Vamos te levar pro WhatsApp.");
    } else {
      toast.success("Mensagem registrada! Abrindo WhatsApp…");
      try {
        localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
      } catch {
        // ignore
      }
    }

    setStep("success");
    // Open WhatsApp as fallback / continuation
    setTimeout(() => {
      window.open(buildWhatsAppLink(), "_blank", "noopener,noreferrer");
    }, 600);
  };

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  return (
    <>
      <AnimatePresence initial={false}>
        {!isExpanded && (
          <motion.div className={`relative inline-block ${className}`}>
            <motion.div
              style={{ borderRadius: "100px" }}
              layout
              layoutId={layoutId}
              className="absolute inset-0 bg-gradient-to-r from-amazon via-leaf to-amazon shadow-[0_0_40px_-8px_hsl(var(--amazon-green)/0.6)]"
            />
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsExpanded(true)}
              className="relative inline-flex items-center gap-3 px-8 py-4 text-base font-semibold uppercase tracking-wider text-background hover:opacity-95 sm:text-lg"
            >
              <Leaf className="h-5 w-5" />
              {label}
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4">
            <motion.div
              layoutId={layoutId}
              transition={{ type: "spring", bounce: 0, duration: 0.45 }}
              style={{ borderRadius: "24px" }}
              layout
              className="relative flex h-full w-full overflow-hidden bg-[hsl(var(--deep-jungle))] shadow-2xl sm:rounded-[24px]"
            >
              {/* Animated mesh background — jungle palette */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
              >
                <MeshGradient
                  speed={0.5}
                  colors={["#0D1A0D", "#1A3A1A", "#2D6A12", "#4CAF1E"]}
                  distortion={0.85}
                  swirl={0.15}
                  grainMixer={0.18}
                  grainOverlay={0}
                  style={{ height: "100%", width: "100%" }}
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 leaf-pattern opacity-40" />

              <button
                type="button"
                onClick={handleClose}
                aria-label="Fechar"
                className="absolute right-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-amazon/30 bg-background/40 text-foreground backdrop-blur-md transition-colors hover:bg-background/70 sm:right-6 sm:top-6"
              >
                <X className="h-5 w-5" />
              </button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col overflow-y-auto lg:flex-row lg:overflow-hidden"
              >
                {/* Left: brand story */}
                <div className="flex flex-1 flex-col justify-center gap-8 p-8 text-foreground sm:p-12 lg:p-16">
                  <div className="space-y-4">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amazon/30 bg-background/40 px-3 py-1 text-xs font-medium uppercase tracking-widest text-amazon backdrop-blur">
                      <Sparkles className="h-3.5 w-3.5" /> Da selva para o digital
                    </span>
                    <h2
                      className="font-display uppercase leading-none tracking-wide"
                      style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
                    >
                      Vamos construir <span className="text-gradient-amazon">algo vivo</span>.
                    </h2>
                    <p className="max-w-md text-base text-muted-foreground sm:text-lg">
                      Conta seu projeto. Em minutos a gente responde no WhatsApp com um plano real
                      — sem promessa vazia, sem enrolação.
                    </p>
                  </div>

                  <ul className="space-y-4">
                    {[
                      "Resposta no mesmo dia útil",
                      "Diagnóstico gratuito do seu fluxo",
                      "Proposta clara, sem letras miúdas",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amazon/20 text-amazon">
                          <Check className="h-4 w-4" />
                        </span>
                        <span className="text-sm text-foreground/90 sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto hidden border-t border-amazon/20 pt-6 lg:block">
                    <p className="text-sm text-muted-foreground">Prefere falar agora?</p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 font-display text-2xl tracking-wide text-foreground hover:text-amazon"
                    >
                      <MessageCircle className="h-5 w-5 text-whatsapp" /> {WHATSAPP_DISPLAY}
                    </a>
                  </div>
                </div>

                {/* Right: form */}
                <div className="flex flex-1 items-center justify-center p-4 sm:p-12 lg:p-16">
                  <div className="w-full max-w-md rounded-2xl border border-amazon/25 bg-background/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                    {step === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex min-h-[420px] flex-col items-center justify-center space-y-6 text-center"
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-whatsapp shadow-[0_0_40px_-8px_hsl(var(--whatsapp)/0.7)]">
                          <Check className="h-10 w-10 text-black" />
                        </div>
                        <div>
                          <h3 className="font-display text-3xl uppercase tracking-wide text-foreground">
                            Mensagem registrada!
                          </h3>
                          <p className="mt-2 text-muted-foreground">
                            Estamos te levando ao WhatsApp para continuar a conversa em tempo real.
                          </p>
                        </div>
                        <a
                          href={buildWhatsAppLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-black hover:bg-whatsapp-hover"
                        >
                          <MessageCircle className="h-4 w-4" /> Abrir WhatsApp
                        </a>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          Voltar para o site
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Honeypot — invisible to humans, attractive to bots */}
                        <div
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            left: "-10000px",
                            width: "1px",
                            height: "1px",
                            overflow: "hidden",
                          }}
                        >
                          <label>
                            Não preencha este campo
                            <input
                              type="text"
                              tabIndex={-1}
                              autoComplete="off"
                              value={form.website}
                              onChange={(e) => setForm({ ...form, website: e.target.value })}
                            />
                          </label>
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                            Conta seu projeto
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Preencha — respondemos via WhatsApp.
                          </p>
                        </div>

                        <Field label="Nome completo" required>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Seu nome"
                            className={inputCls}
                          />
                        </Field>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="WhatsApp">
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              placeholder="(00) 00000-0000"
                              className={inputCls}
                            />
                          </Field>
                          <Field label="E-mail">
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="voce@email.com"
                              className={inputCls}
                            />
                          </Field>
                        </div>

                        <Field label="Empresa">
                          <input
                            type="text"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            placeholder="Nome da empresa (opcional)"
                            className={inputCls}
                          />
                        </Field>

                        <Field label="Tipo de projeto">
                          <select
                            value={form.service}
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                            className={`${inputCls} cursor-pointer appearance-none`}
                          >
                            {services.map((s) => (
                              <option key={s} value={s} className="bg-[hsl(var(--bg-card))]">
                                {s}
                              </option>
                            ))}
                          </select>
                        </Field>

                        <Field label="Mensagem" required>
                          <textarea
                            required
                            rows={3}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Conte um pouco sobre o que você precisa…"
                            className={`${inputCls} resize-none`}
                          />
                        </Field>

                        <button
                          type="submit"
                          disabled={step === "submitting"}
                          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-whatsapp-hover disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {step === "submitting" ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/70 border-t-transparent" />
                              Enviando…
                            </>
                          ) : (
                            <>
                              <MessageCircle className="h-4 w-4" />
                              Enviar e abrir WhatsApp
                            </>
                          )}
                        </button>

                        <p className="text-center text-xs text-muted-foreground">
                          Ao enviar, você concorda em ser contactado pela Muirakitã Tech.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const inputCls =
  "w-full rounded-lg border border-amazon/25 bg-[hsl(var(--bg-card))]/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-amazon focus:outline-none focus:ring-2 focus:ring-amazon/40";

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-amazon">
      {label} {required && <span className="text-gold">*</span>}
    </span>
    {children}
  </label>
);
