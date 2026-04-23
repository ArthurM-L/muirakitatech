import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { BotMessageSquare, X, SendHorizonal } from 'lucide-react';
import { AgentChatProvider, useAgentChat, useAgentActions } from '@inferencesh/sdk/agent';
import { inference } from '@inferencesh/sdk';

// ── Constants ────────────────────────────────────────────────────────────────

const spring = 'cubic-bezier(0.16, 1, 0.3, 1)';

const PROXY_URL = `https://vqkpgomkcnjamolvzkxy.supabase.co/functions/v1/inference-proxy`;

const client = inference({ proxyUrl: PROXY_URL });

const agentConfig = {
  core_app: { ref: 'openrouter/claude-sonnet-46' },
  system_prompt: `Você é o assistente virtual da Muirakitã Tech, uma empresa de tecnologia da Amazônia. Ajude visitantes a entender nossos serviços: automação com IA, criação de apps, sistemas sob medida, sites/landing pages e migração de sistemas. Seja amigável, direto e incentive o contato via WhatsApp (+55 93 98112-6115) para projetos específicos. Responda sempre em português brasileiro.`,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

interface MsgBlock { type: string; text?: string; }
interface Msg { id: string; role: string; content: MsgBlock[] | string; }

const getText = (msg: Msg) =>
  Array.isArray(msg.content)
    ? msg.content.filter((b) => b.type === 'text').map((b) => b.text ?? '').join('')
    : String(msg.content ?? '');

// ── Inner chat UI (inside provider) ─────────────────────────────────────────

function ChatInner() {
  const { chat, messages } = useAgentChat();
  const { sendMessage } = useAgentActions();
  const isBusy = chat?.status === 'busy';

  const [draft, setDraft] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const submit = () => {
    const text = draft.trim();
    if (!text || isBusy) return;
    sendMessage(text);
    setDraft('');
    textareaRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-t-2xl border-b"
        style={{ borderColor: 'hsl(var(--amazon-green) / 0.2)', background: 'hsl(var(--amazon-green) / 0.08)' }}>
        <div className="relative flex items-center justify-center h-9 w-9 rounded-full" style={{ background: 'hsl(var(--amazon-green) / 0.15)' }}>
          <BotMessageSquare className="h-5 w-5 text-amazon" />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2"
            style={{ background: '#22c55e', borderColor: 'hsl(var(--card))' }} />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none text-foreground">Assistente Muirakitã</p>
          <p className="text-xs mt-0.5 text-amazon">Online agora</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--amazon-green) / 0.12)' }}>
              <BotMessageSquare className="h-6 w-6 text-amazon" />
            </div>
            <p className="text-sm text-muted-foreground">Olá! Como posso ajudar você hoje?</p>
          </div>
        ) : (
          (messages as Msg[]).map((msg) => {
            const isUser = msg.role === 'user';
            const text = getText(msg);
            if (!text) return null;
            return (
              <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed break-words"
                  style={
                    isUser
                      ? { background: 'hsl(var(--amazon-green))', color: '#000' }
                      : { background: 'hsl(var(--bg-overlay))', color: 'hsl(var(--foreground))' }
                  }
                >
                  {text}
                </div>
              </div>
            );
          })
        )}
        {isBusy && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-2.5 text-sm flex gap-1" style={{ background: 'hsl(var(--bg-overlay))' }}>
              {[0, 1, 2].map(i => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 pb-3 pt-2 border-t" style={{ borderColor: 'hsl(var(--amazon-green) / 0.15)' }}>
        <div className="flex items-end gap-2 rounded-xl border px-3 py-2" style={{ borderColor: 'hsl(var(--amazon-green) / 0.25)', background: 'hsl(var(--input))' }}>
          <textarea ref={textareaRef} rows={1} value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={onKeyDown} placeholder="Escreva sua mensagem..." disabled={isBusy}
            aria-label="Mensagem"
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
            style={{ maxHeight: '6rem' }} />
          <button onClick={submit} disabled={!draft.trim() || isBusy} aria-label="Enviar mensagem"
            className="flex items-center justify-center h-7 w-7 rounded-lg flex-shrink-0 disabled:opacity-40"
            style={{ background: 'hsl(var(--amazon-green))', color: '#000', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <SendHorizonal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function AgentChatWidget() {
  const [open, setOpen] = useState(false);


  return (
    <div className="hidden md:flex flex-col items-end" style={{ position: 'fixed', bottom: '6rem', right: '1.5rem', zIndex: 50 }}>
      {/* Chat panel */}
      <div
        aria-hidden={!open}
        style={{
          width: '20rem',
          height: '480px',
          marginBottom: '0.75rem',
          borderRadius: '1rem',
          border: '1px solid hsl(var(--amazon-green) / 0.2)',
          background: 'hsl(var(--card))',
          boxShadow: '0 20px 60px hsl(120 33% 4% / 0.6), 0 4px 16px hsl(var(--amazon-green) / 0.12)',
          clipPath: open ? 'inset(0 0 0 0 round 1rem)' : 'inset(100% 0 0 0 round 1rem)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: `clip-path 400ms ${spring}, opacity 300ms ${spring}`,
          overflow: 'hidden',
        }}
      >
        <AgentChatProvider client={client} agentConfig={agentConfig}>
          <ChatInner />
        </AgentChatProvider>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="relative flex items-center justify-center h-14 w-14 rounded-full shadow-lg focus:outline-none focus-visible:ring-2"
        style={{
          background: 'hsl(var(--amazon-green))',
          color: '#000',
          boxShadow: '0 4px 20px hsl(var(--amazon-green) / 0.35)',
          transitionTimingFunction: spring,
          transitionDuration: '300ms',
          transitionProperty: 'box-shadow, transform',
        }}
        aria-label={open ? 'Fechar chat' : 'Abrir chat'}
      >
        <span
          style={{
            position: 'absolute',
            opacity: open ? 0 : 1,
            transform: open ? 'scale(0.6)' : 'scale(1)',
            transition: `opacity 250ms ${spring}, transform 300ms ${spring}`,
          }}
        >
          <BotMessageSquare className="h-6 w-6" />
        </span>
        <span
          style={{
            position: 'absolute',
            opacity: open ? 1 : 0,
            transform: open ? 'scale(1)' : 'scale(0.6)',
            transition: `opacity 250ms ${spring}, transform 300ms ${spring}`,
          }}
        >
          <X className="h-6 w-6" />
        </span>
      </button>
    </div>
  );
}
