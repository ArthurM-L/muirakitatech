import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { X, SendHorizonal, Leaf } from 'lucide-react';
import { AgentChatProvider, useAgentChat, useAgentActions } from '@inferencesh/sdk/agent';
import { inference } from '@inferencesh/sdk';

// ── Config ───────────────────────────────────────────────────────────────────

const spring    = 'cubic-bezier(0.16, 1, 0.3, 1)';
const PROXY_URL = 'https://vqkpgomkcnjamolvzkxy.supabase.co/functions/v1/inference-proxy';
const DEV_KEY   = (import.meta as any).env?.VITE_INFERENCE_API_KEY as string | undefined;

const client = DEV_KEY
  ? inference({ apiKey: DEV_KEY })
  : inference({ proxyUrl: PROXY_URL });

const agentConfig = {
  core_app: { ref: 'openrouter/claude-haiku-45' },
  system_prompt: `Você é o assistente virtual da Muirakitã Tech, empresa de tecnologia da Amazônia. Ajude visitantes a entender nossos serviços: automação com IA, apps, sistemas sob medida, sites/landing pages e migração. Seja direto, amigável, e incentive o contato via WhatsApp (+55 93 98112-6115) para projetos. Responda sempre em português. Respostas curtas e objetivas.`,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

interface Block { type: string; text?: string; }
interface Msg   { id: string; role: string; content: Block[] | string; }

const getText = (msg: Msg) =>
  Array.isArray(msg.content)
    ? msg.content.filter(b => b.type === 'text').map(b => b.text ?? '').join('')
    : String(msg.content ?? '');

// ── Inner UI ─────────────────────────────────────────────────────────────────

function Terminal() {
  const { chat, messages } = useAgentChat();
  const { sendMessage }    = useAgentActions();
  const isBusy = chat?.status === 'busy';

  const [draft, setDraft] = useState('');
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const submit = () => {
    const t = draft.trim();
    if (!t || isBusy) return;
    sendMessage(t);
    setDraft('');
    inputRef.current?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); submit(); }
  };

  return (
    <div className="flex flex-col h-full font-mono text-xs">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'hsl(var(--amazon-green) / 0.18)' }}>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: 'hsl(var(--amazon-green))' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: 'hsl(var(--amazon-green))' }} />
          </span>
          <span className="tracking-[0.35em] uppercase text-[10px]"
            style={{ color: 'hsl(var(--amazon-green))' }}>
            MUIRAKITÃ.AI
          </span>
        </div>
        <span className="text-[10px] tracking-wider" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {isBusy ? 'processando…' : 'online'}
        </span>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--amazon-green) / 0.2) transparent' }}>

        {messages.length === 0 && (
          <div className="flex flex-col gap-1 pt-2">
            <p style={{ color: 'hsl(var(--amazon-green))' }}>› sistema inicializado.</p>
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>
              › olá! em que posso ajudar?
            </p>
          </div>
        )}

        {(messages as Msg[]).map(msg => {
          const text = getText(msg);
          if (!text) return null;
          const isUser = msg.role === 'user';

          if (isUser) return (
            <div key={msg.id} className="flex justify-end">
              <span className="px-3 py-1 rounded-full text-[11px] font-sans font-medium"
                style={{ background: 'hsl(var(--amazon-green))', color: '#000', maxWidth: '80%' }}>
                {text}
              </span>
            </div>
          );

          return (
            <div key={msg.id} className="pl-3 border-l-2"
              style={{ borderColor: 'hsl(var(--amazon-green) / 0.35)' }}>
              <p className="leading-relaxed" style={{ color: 'hsl(var(--foreground) / 0.88)' }}>
                <span style={{ color: 'hsl(var(--amazon-green))' }}>› </span>
                {text}
              </p>
            </div>
          );
        })}

        {isBusy && (
          <div className="pl-3 border-l-2 flex gap-1 items-center"
            style={{ borderColor: 'hsl(var(--amazon-green) / 0.35)' }}>
            <span style={{ color: 'hsl(var(--amazon-green))' }}>› </span>
            {[0,1,2].map(i => (
              <span key={i} className="inline-block h-1 w-1 rounded-full animate-pulse"
                style={{ background: 'hsl(var(--amazon-green) / 0.7)', animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div className="border-t px-4 py-3 flex items-center gap-2"
        style={{ borderColor: 'hsl(var(--amazon-green) / 0.18)' }}>
        <span className="flex-shrink-0 text-[11px]" style={{ color: 'hsl(var(--amazon-green))' }}>›</span>
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={onKey}
          disabled={isBusy}
          placeholder="escreva aqui…"
          aria-label="Mensagem"
          className="flex-1 bg-transparent text-[11px] focus:outline-none disabled:opacity-40"
          style={{ color: 'hsl(var(--foreground))', caretColor: 'hsl(var(--amazon-green))' }}
        />
        <button onClick={submit} disabled={!draft.trim() || isBusy} aria-label="Enviar"
          className="flex-shrink-0 disabled:opacity-30 transition-opacity"
          style={{ color: 'hsl(var(--amazon-green))' }}>
          <SendHorizonal className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function AgentChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden md:block" style={{ position: 'fixed', bottom: '6rem', right: '1.5rem', zIndex: 50 }}>

      {/* ── Chat panel ── */}
      <div
        aria-hidden={!open}
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 12px)',
          right: 0,
          width: '268px',
          height: '388px',
          borderRadius: '14px',
          background: 'hsl(var(--card))',
          border: '1px solid hsl(var(--amazon-green) / 0.22)',
          boxShadow: `
            0 0 0 1px hsl(var(--amazon-green) / 0.06),
            0 24px 48px hsl(120 33% 4% / 0.7),
            0 0 80px hsl(var(--amazon-green) / 0.06) inset
          `,
          /* scan-line texture */
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              hsl(var(--amazon-green) / 0.015) 3px,
              hsl(var(--amazon-green) / 0.015) 4px
            ),
            linear-gradient(hsl(var(--card)), hsl(var(--card)))
          `,
          clipPath: open ? 'inset(0 0 0 0 round 14px)' : 'inset(0 0 100% 0 round 14px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: `clip-path 420ms ${spring}, opacity 280ms ${spring}`,
          overflow: 'hidden',
        }}
      >
        <AgentChatProvider client={client} agentConfig={agentConfig}>
          <Terminal />
        </AgentChatProvider>
      </div>

      {/* ── FAB — organic blob that morphs to circle ── */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Fechar assistente' : 'Abrir assistente de IA'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '52px',
          height: '52px',
          background: open
            ? 'hsl(var(--amazon-green) / 0.15)'
            : 'hsl(var(--card))',
          border: `1.5px solid hsl(var(--amazon-green) / ${open ? '0.6' : '0.35'})`,
          borderRadius: open
            ? '50%'
            : '30% 70% 70% 30% / 30% 30% 70% 70%',
          boxShadow: open
            ? '0 0 0 4px hsl(var(--amazon-green) / 0.12), 0 4px 20px hsl(var(--amazon-green) / 0.2)'
            : '0 2px 12px hsl(120 33% 4% / 0.5)',
          color: `hsl(var(--amazon-green))`,
          transition: `border-radius 500ms ${spring}, background 300ms, border-color 300ms, box-shadow 300ms`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shimmer on idle */}
        {!open && (
          <span style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, transparent 40%, hsl(var(--amazon-green) / 0.08) 50%, transparent 60%)',
            animation: 'shimmer 3s ease-in-out infinite',
          }} />
        )}

        <span style={{
          position: 'absolute',
          transition: `opacity 250ms ${spring}, transform 300ms ${spring}`,
          opacity: open ? 0 : 1,
          transform: open ? 'scale(0.5) rotate(-45deg)' : 'scale(1) rotate(0deg)',
        }}>
          <Leaf className="h-5 w-5" />
        </span>
        <span style={{
          position: 'absolute',
          transition: `opacity 250ms ${spring}, transform 300ms ${spring}`,
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(45deg)',
        }}>
          <X className="h-5 w-5" />
        </span>
      </button>
    </div>
  );
}
