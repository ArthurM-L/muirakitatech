

## Análise dos sites de referência

### 🟢 HyperOn (`hyperon.com.br`) — destaques
1. **Hero minimalista com logo gigante animado** ao centro + grid sutil de fundo (estilo "tech grid").
2. **Métricas em destaque** (50+, 300%, 5 anos) logo abaixo do hero — prova social numérica imediata.
3. **Calculadora de ROI interativa** — ferramenta que engaja o lead e o leva a converter ("descubra seu lucro potencial").
4. **Stack tecnológica visual** — grade com logos das ferramentas usadas (Google Ads, Figma, n8n, Notion…) agrupadas por categoria.
5. **Portfólio em cards** com tag de tipo de serviço (Branding, Landing Page + ADS…).
6. **Selos de parceria** (Google Partner, Meta Partner) → autoridade.

### 🟠 Moara Group (`site-site...`) — destaques
1. **Dashboard "ao vivo" no hero** mostrando métricas falsas mas convincentes (conversas ativas, NPS, tempo de resposta) — sensação de produto real funcionando.
2. **Carrossel infinito de logos de clientes** ("Empresas que confiam em…").
3. **Processo numerado 01 → 04** com timeline vertical/horizontal.
4. **FAQ accordion** abaixo da CTA final — tira objeções antes do contato.
5. **Formulário de contato dual-pane**: dados de contato (WhatsApp, Instagram, site) à esquerda + formulário à direita, com badge "Resposta em até 2h".
6. **Política de Privacidade LGPD** profissional → transmite seriedade.
7. **Tipografia "fat display"** (Unbounded-style) com palavras coloridas no meio da frase.

---

## O que faltam no seu site (Muirakitã Tech) e geram mais valor

Priorizando por impacto × esforço, eu proponho implementar estes **6 incrementos**:

### 🥇 Top 3 — Alto impacto

**1. Mini-dashboard "ao vivo" no Hero (estilo Moara)**
- Card flutuante ao lado/abaixo do mascote mostrando métricas animadas:
  - "Atendimentos 24/7 ativos: 238"
  - "Tempo médio de resposta: 1.2s"
  - "Resolvidos pela IA: 78%"
- Números fazem countup + pulse dot verde "AO VIVO".
- Vende automação **mostrando**, não só falando.

**2. Calculadora de ROI / Economia interativa (estilo HyperOn)**
- Nova seção `<ROICalculator />` antes do Contato.
- Sliders: "Quantos atendimentos/mês?", "Custo médio por atendente?", "Taxa de conversão atual?"
- Output em tempo real: "Você economizaria R$ X/mês com automação Muirakitã".
- CTA: "Quero validar esses números no WhatsApp".
- **Maior gerador de leads qualificados que existe**: o lead se auto-vende.

**3. Carrossel infinito de logos / stack tecnológica**
- Faixa horizontal com auto-scroll (CSS `animation: marquee`).
- Duas variantes:
  - **"Tecnologias que dominamos"**: React, Supabase, n8n, OpenAI, WhatsApp API, Figma…
  - **"Clientes / parceiros"**: placeholders por enquanto.
- Quebra a verticalidade da página e dá autoridade técnica.

### 🥈 Refinamentos visuais

**4. Tipografia "highlight word" no Hero**
- Em vez do título atual, usar padrão Hyperon/Moara: frase em branco com **uma palavra colorida no meio** com gradient amazon→gold:
  - Ex: "Tecnologia que **transforma** seu negócio"
  - Ex: "Automatize, **escale** e cresça"

**5. Processo numerado "01 → 04" (Como trabalhamos)**
- Nova seção curta entre Services e Story:
  - 01 Diagnóstico → 02 Estratégia → 03 Desenvolvimento → 04 Entrega + Evolução
- Layout em 4 colunas (desktop) / stack vertical com linha conectora (mobile).
- Conecta visualmente os passos com SVG dashed line animada (já existe `animate-flow-dash`).

**6. FAQ accordion antes do FinalCTA**
- 5–6 perguntas que matam objeções:
  - "Quanto custa um projeto?"
  - "Em quanto tempo fica pronto?"
  - "Vocês atendem fora de Manaus?"
  - "E depois da entrega, tem suporte?"
  - "Posso começar com algo pequeno?"
- Usa `@/components/ui/accordion` (já instalado).

---

## Detalhes técnicos

### Novos componentes
```
src/components/muirakita/
├── LiveDashboard.tsx        # mini-dashboard no Hero (item 1)
├── ROICalculator.tsx        # nova seção (item 2)
├── TechMarquee.tsx          # carrossel infinito (item 3)
├── Process.tsx              # 01→04 timeline (item 5)
└── FAQ.tsx                  # accordion (item 6)
```

### Mudanças em arquivos existentes
- **`Hero.tsx`** — novo headline com palavra-destaque + integrar `<LiveDashboard />` no lado direito (desktop) ou abaixo (mobile).
- **`Index.tsx`** — nova ordem:
  ```
  Navbar → Hero → TechMarquee → Services → Process →
  Automation → SocialProof → ROICalculator →
  Story → Trust → FAQ → Contact → FinalCTA → Footer
  ```
- **`tailwind.config.ts`** — adicionar keyframes `marquee` (scroll infinito) e `count-up`.

### Estilo / consistência
- Reaproveitar `text-gradient-amazon`, `glass-card`, `leaf-pattern` já existentes.
- Calculadora usa `Slider` do shadcn (já instalado).
- Marquee em CSS puro (sem libs novas) para performance.
- Countup feito com `useEffect` + `requestAnimationFrame` (sem dependências).

### Acessibilidade
- Marquee respeita `prefers-reduced-motion` → para de scrollar.
- Sliders com `aria-label` e teclado.
- Accordion já vem acessível via Radix.

---

## ASCII da nova estrutura do Hero

```text
┌─────────────────────────────────────────────────────────┐
│  [navbar]                                               │
│                                                         │
│   Tecnologia que    ┌─────────────────────────┐        │
│   transforma        │ ● AO VIVO               │        │
│   seu negócio       │ Conversas ativas    238 │        │
│                     │ Tempo resposta     1.2s │        │
│   [WhatsApp] [...]  │ Resolvido por IA    78% │        │
│                     │ Satisfação          96% │        │
│   🐸 mascote        └─────────────────────────┘        │
└─────────────────────────────────────────────────────────┘
```

---

**Próximo passo**: aprove o plano e eu implemento na ordem dos Top 3 primeiro (mini-dashboard, calculadora ROI, marquee), depois 4–6. Posso entregar tudo em um único passo ou dividir em duas entregas se preferir revisar entre elas.

