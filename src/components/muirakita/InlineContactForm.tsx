import { useState, FormEvent } from "react";
import { Check, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WHATSAPP_URL } from "./Navbar";

const services = [
  "Automação com IA",
  "Criação de App",
  "Desenvolvimento de Sistemas",
  "Criação de Site",
  "Migração de Sistemas",
  "Não sei ainda — quero conversar",
];

const RATE_LIMIT_KEY = "muirakita_last_contact_at";
const RATE_LIMIT_MS = 30_000;

export const InlineContactForm = () => {
  const [step, setStep] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: services[0],
    message: "",
    website: "", // honeypot
  });
  const [formLoadedAt] = useState(() => Date.now());

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
    if (form.website.trim() !== "") {
      setStep("success");
      return;
    }
    if (Date.now() - formLoadedAt < 2000) {
      toast.error("Aguarde um instante e tente novamente.");
      return;
    }
    try {
      const last = Number(localStorage.getItem(RATE_LIMIT_KEY) || 0);
      const wait = RATE_LIMIT_MS - (Date.now() - last);
      if (wait > 0) {
        toast.error(`Aguarde ${Math.ceil(wait / 1000)}s antes de enviar novamente.`);
        return;
      }
    } catch {
      /* ignore */
    }

    setStep("submitting");
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim().slice(0, 200),
      email: form.email.trim().slice(0, 320) || null,
      phone: form.phone.trim().slice(0, 50) || null,
      company: form.company.trim().slice(0, 200) || null,
      message: `[${form.service}] ${form.message.trim()}`.slice(0, 5000),
      source: "website-inline",
    });

    if (error) {
      console.error("contact insert error", error);
      toast.error("Não conseguimos registrar. Vamos te levar pro WhatsApp.");
    } else {
      toast.success("Mensagem registrada! Abrindo WhatsApp…");
      try {
        localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
    }

    setStep("success");
    setTimeout(() => {
      window.open(buildWhatsAppLink(), "_blank", "noopener,noreferrer");
    }, 600);
  };

  if (step === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[420px] flex-col items-center justify-center space-y-5 rounded-2xl border border-amazon/25 bg-background/60 p-8 text-center shadow-2xl backdrop-blur-xl"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp shadow-[0_0_40px_-8px_hsl(var(--whatsapp)/0.7)]">
          <Check className="h-8 w-8 text-black" />
        </div>
        <div>
          <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
            Mensagem registrada!
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Estamos te levando ao WhatsApp para continuar a conversa.
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
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-amazon/25 bg-background/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
    >
      {/* Honeypot */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label>
          Não preencha
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
  );
};

const inputCls =
  "w-full rounded-xl border border-amazon/30 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-amazon focus:ring-2 focus:ring-amazon/30";

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label className="block space-y-1.5">
    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {label}
      {required && <span className="text-amazon"> *</span>}
    </span>
    {children}
  </label>
);
