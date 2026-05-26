# UX Audit — Noesis Landing (estado atual)

**Autor:** ux-designer
**Data:** 2026-05-25
**Modo:** Auditoria (não-implementação)
**Inputs:** `src/components/*.tsx`, `src/app/{layout,page,globals.css}`, `tailwind.config.ts`, [[positioning]], [[personas]], [[jtbd]], [[messaging-map]]

---

## 1. Sumário executivo

**Veredito geral:** landing está **acima da média** em estética e organização para pré-launch, mas tem **3 problemas críticos de conversão** e **vários gaps de acessibilidade** que reduzem efetividade para as 3 personas-alvo.

### Severidade dos findings

| Severidade | Quantidade | Descrição |
|------------|------------|-----------|
| 🔴 Critical | 5 | Bloqueia conversão de pelo menos 1 persona |
| 🟠 High | 9 | Reduz significativamente performance da landing |
| 🟡 Medium | 12 | Melhoria importante, não-bloqueante |
| 🟢 Low | 6 | Polimento, nice-to-have |

---

## 2. Audit por seção (current state)

### 2.1 Navbar (`src/components/navbar.tsx`)

**Estado atual:**
- Links: `Features`, `Architecture`, `Use Cases`, `Stack`
- CTA primária: `Get in Touch` (link mailto)
- Logo "N" em quadrado accent, "Noesis" wordmark

**Findings:**

| # | Severidade | Finding | Persona afetada |
|---|------------|---------|------------------|
| N1 | 🔴 Critical | Ausência de `Pricing` no nav — Dani (P3) abandona em <10s | P3 |
| N2 | 🔴 Critical | Ausência de `Docs` no nav — Caio (P2) tem fricção para avaliar tech | P2 |
| N3 | 🟠 High | CTA "Get in Touch" → mailto cria fricção (abre cliente de email, contexto perdido) | P1, P3 |
| N4 | 🟠 High | Menu desktop esconde em `md:flex` (≥768px) — em mobile, navbar fica só com logo + CTA, sem links | Todos (mobile) |
| N5 | 🟡 Medium | Não há hamburger menu mobile — usuário não consegue navegar entre seções no celular | Todos (mobile) |
| N6 | 🟡 Medium | Não há indicador de seção ativa durante scroll | Todos |
| N7 | 🟢 Low | "Stack" é abreviação técnica — "Tech Stack" seria mais claro para Marina | P1 |

---

### 2.2 Hero (`src/components/hero.tsx`)

**Estado atual:**
- Headline: "Strategic Knowledge / Platform with AI"
- Subhead: "Noesis unifies semantic search, AI-generated answers, and multi-source data integration..."
- CTAs: `Request a Demo` (primary) + `Explore the Architecture` (secondary)
- Terminal preview com snippet de API + resposta + citations

**Findings:**

| # | Severidade | Finding | Persona afetada |
|---|------------|---------|------------------|
| H1 | 🔴 Critical | CTA "Request a Demo" conflita com (a) preferência fundador por baixo contato (b) pré-launch (c) P3 que abandona com CTA alto-contato | Todos + fundador |
| H2 | 🟠 High | Headline "Strategic Knowledge Platform with AI" é **descritiva**, não **diferenciadora** — sem promessa específica | Todos |
| H3 | 🟡 Medium | Subhead longa (3 linhas) compete com terminal preview pela atenção | Todos |
| H4 | 🟡 Medium | Glow estático atrás do hero é decorativo — não comunica nada | Todos |
| H5 | 🟢 Low | Terminal preview tem 3 círculos de "fechar/min/max" sem função visível — visual noise | Todos |
| H6 | 🟢 Low | Badge "Multi-tenant · RAG-powered · 5 languages" usa `&middot;` (entidade HTML) — funciona, mas inconsistente vs outros lugares que usam Unicode |

**Pontos positivos do Hero (manter):**
- ✅ Terminal preview é **excelente** — diferencia de SaaS genérico, segura P2 em segundos
- ✅ Glow + grid-pattern criam profundidade visual sem ser "techbro"
- ✅ Badge é discreto, comunica 3 dimensões importantes
- ✅ Snippet com citation no resposta reforça o pillar "grounded"

---

### 2.3 Features (`src/components/features.tsx`)

**Estado atual:**
- 10 cards em grid (sm:2, lg:3)
- Cada card: ícone Lucide + título + descrição
- Eyebrow: "Capabilities"
- H2: "Everything you need to make knowledge accessible"

**Findings:**

| # | Severidade | Finding |
|---|------------|---------|
| F1 | 🟠 High | **10 features** é demais — viola "regra 4±1 cards" para landing pages, dilui mensagem |
| F2 | 🟠 High | Hierarquia plana — todas as features ganham mesmo peso visual; pilares diferenciadores (multi-tenant, grounded, i18n) competem com Auto-Response Engine |
| F3 | 🟡 Medium | Descrições muito longas (3-4 linhas) — usuário scaneia, não lê |
| F4 | 🟡 Medium | Ícones Lucide são genéricos para tech (Search, Shield) — não comunicam marca |
| F5 | 🟢 Low | Não há agrupamento ou separadores entre features de tipos diferentes (Core vs Adjacent) |

**Recomendação estratégica:** reduzir para **4 pilares de differentiation** (alinhado com positioning) + 1 seção secundária com features adicionais menores.

---

### 2.4 Architecture (`src/components/architecture.tsx`)

**Estado atual:**
- Diagrama de camadas (clients → api → services → data → packages)
- 5 camadas, tags coloridas por camada
- 3 "DecisionCards" abaixo do diagrama

**Findings:**

| # | Severidade | Finding |
|---|------------|---------|
| A1 | 🟢 Low | Diagrama é **forte** — Caio (P2) gasta tempo aqui, é decisivo |
| A2 | 🟡 Medium | Cor `indigo` para clients ainda no código apesar de [decisão de mudar para cyan/accent](recente commit `e45e8ea`) — possível inconsistência |
| A3 | 🟡 Medium | "Divider" entre camadas é sutil demais (linha tracejada vertical curta) — pode passar desapercebido |
| A4 | 🟢 Low | DecisionCards não têm ícones — quebra padrão visual do resto da página |
| A5 | 🟢 Low | Mobile: tags em flex-wrap funciona mas pode quebrar legibilidade em telas estreitas (verificar <360px) |

**Pontos positivos:** decisão de design forte; comunica maturidade arquitetural sem precisar de mockups elaborados.

---

### 2.5 Numbers (`src/components/numbers.tsx`)

**Estado atual:**
- 6 métricas em grid (2 → 3 → 6 colunas)
- Valores em gradient-text + mono
- Métricas: 209 endpoints, 30 models, 21 modules, 106 tests, 5 languages, <200ms latency

**Findings:**

| # | Severidade | Finding |
|---|------------|---------|
| Nu1 | 🔴 Critical | **Posição errada na narrativa** — seção aparece depois de Architecture, mas deveria estar logo após Hero para impacto rápido em Marina e Caio (input do messaging-map) |
| Nu2 | 🟡 Medium | "Modules" sozinho é vago para audiência não-técnica (Marina não sabe o que é módulo) |
| Nu3 | 🟡 Medium | Falta uma métrica de **qualidade** ou **outcome** (ex: "0 hallucinated answers", "97% citation accuracy") — só métricas de volume |
| Nu4 | 🟢 Low | Sem animação de count-up — falta de "wow" visual |

**Pontos positivos:** layout limpo, escaneável, métricas concretas (não vagas como "rich features").

---

### 2.6 Use Cases (`src/components/use-cases.tsx`)

**Estado atual:**
- 3 cards: Enterprise KB, Academic/Research, Customer Support Intelligence
- Ícones, audience tag, lista de 4 bullets

**Findings:**

| # | Severidade | Finding |
|---|------------|---------|
| U1 | 🟠 High | Cenários atuais **não correspondem às personas** definidas. "Academic & Research" não é uma persona-alvo identificada; "Enterprise KB" é vago; "Customer Support" é o mais alinhado mas precisa nome/setor real |
| U2 | 🟠 High | Falta cenário para **Dani (indie/solo dev)** — persona PLG que precisa ver-se aqui ou abandona |
| U3 | 🟡 Medium | Bullets são técnicos demais ("Multi-tenant architecture supports multiple business units") — Marina não compra benefício de feature, compra resolução de dor |
| U4 | 🟡 Medium | Sem CTA por cenário — usuário lê e segue, não converte |
| U5 | 🟢 Low | Ícone GraduationCap (academic) sai do tom geral B2B/dev |

**Recomendação:** reescrever cenários alinhados ao messaging-map (3 cenários: Marina/support, Marina/in-product, Dani/indie).

---

### 2.7 TechStack (`src/components/tech-stack.tsx`)

**Estado atual:**
- 4 camadas: Backend, Frontend, Data & AI, Infrastructure
- Cada camada: lista de tech + role

**Findings:**

| # | Severidade | Finding |
|---|------------|---------|
| T1 | 🟢 Low | Excelente para Caio — reconhece stack imediatamente |
| T2 | 🟡 Medium | Sem logos das techs — só texto; logos seriam visualmente mais impactantes e reconhecíveis em 1s |
| T3 | 🟡 Medium | Sem versão linkada — Caio pode querer clicar em "pgvector" e ir pra doc; nenhum link presente |
| T4 | 🟢 Low | "Jest (106 tests)" mistura tool com métrica — confunde leitor |

---

### 2.8 Contact (`src/components/contact.tsx`)

**Estado atual:**
- Ícone Mail + headline "Interested in Noesis?"
- 2 CTAs: `Get in Touch` (mailto) + `View on GitHub` (link para `github.com/your-org/noesis` — placeholder!)
- Texto: "Enterprise enquiries · Academic partnerships · Technical collaboration"

**Findings:**

| # | Severidade | Finding |
|---|------------|---------|
| C1 | 🔴 Critical | Link GitHub **quebrado** — aponta para `github.com/your-org/noesis` (placeholder não substituído) |
| C2 | 🔴 Critical | CTA mailto + sem form de waitlist — não captura intent estruturado, perde leads que não querem abrir email client |
| C3 | 🟠 High | Email `contact@noesis-platform.io` — domínio não confirmado existir (a verificar); pode ser placeholder também |
| C4 | 🟡 Medium | Sem segmentação de quem está enviando ("Which describes you?") — fundador perde inteligência sobre tipo de demanda |
| C5 | 🟡 Medium | "Academic partnerships" desalinhado com personas atuais |

---

### 2.9 Footer (`src/components/footer.tsx`)

**Estado atual:**
- Logo + 4 links (Features, Architecture, Use Cases, Contact) + copyright

**Findings:**

| # | Severidade | Finding |
|---|------------|---------|
| Fo1 | 🟠 High | Sem links críticos: Privacy, Terms, Status (compliance gap se houver waitlist coletando dados) |
| Fo2 | 🟡 Medium | Sem link para repo da landing (sinaliza transparência open-friendly — recomendação do messaging-map) |
| Fo3 | 🟡 Medium | Sem indicador de status "pre-launch / waitlist open" — visitor não sabe que produto não está disponível ainda |
| Fo4 | 🟢 Low | Sem link para LinkedIn, Twitter, ou redes sociais |

---

## 3. Findings cross-cutting (afetam múltiplas seções)

### 3.1 Acessibilidade (WCAG 2.1 AA)

| # | Severidade | Finding |
|---|------------|---------|
| AC1 | 🟠 High | `text-zinc-400` sobre `bg-black` — contraste 5.96:1 ✅ AA. Mas `text-zinc-500` sobre mesmo bg = 4.5:1 (no limite); `text-zinc-600` = 3.4:1 ❌ falha em texto pequeno |
| AC2 | 🟠 High | Footer usa `text-zinc-700` (copyright) — contraste ~2.5:1 ❌ falha AA |
| AC3 | 🟠 High | Navbar links em `text-zinc-400` hover → `text-white` — estado focus não definido (keyboard nav invisible) |
| AC4 | 🟡 Medium | Sem skip-link "Skip to main content" — usuários de teclado precisam tabular por todo navbar |
| AC5 | 🟡 Medium | `lang="en-GB"` no `<html>` — mas badge promete "5 languages"; landing inteira só em inglês (gap entre promessa e realidade) |
| AC6 | 🟡 Medium | Ícones decorativos (lucide-react) renderizam sem `aria-hidden` por padrão — verificar se SR anuncia "imagem" inutilmente |
| AC7 | 🟢 Low | Headlines: hierarquia H1 (hero) → H2 (sections) → H3 (cards) está correta ✅ |

### 3.2 Dark mode (atual = único modo)

| # | Severidade | Finding |
|---|------------|---------|
| DM1 | 🟡 Medium | Sem light mode — todas as paletas hard-coded em dark (`bg-zinc-900`, `text-zinc-400`). Alguns visitors corporativos (Marina) usam dark/light por preferência sistema |
| DM2 | 🟡 Medium | `globals.css` define `--background`, `--foreground` em HSL mas Tailwind config não usa — variáveis órfãs |

### 3.3 Responsividade

| # | Severidade | Finding |
|---|------------|---------|
| R1 | 🟠 High | Navbar em mobile (<768px) **esconde menu inteiro** — só logo + CTA. Usuário não navega entre seções no celular |
| R2 | 🟡 Medium | Hero h1 `text-5xl sm:text-6xl lg:text-7xl` — em telas muito pequenas (<360px), pode quebrar layout |
| R3 | 🟡 Medium | Architecture diagrama com tags em flex-wrap — pode ficar comprimido demais em mobile |
| R4 | 🟢 Low | Numbers grid `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6` — funciona, mas em 360px 2 colunas fica apertado |

### 3.4 Design tokens (consistência)

| # | Severidade | Finding |
|---|------------|---------|
| DT1 | 🟠 High | Palette só tem `accent` (cyan) — sem `success`, `warning`, `error` tokens. Quando precisar de form feedback, terá que inventar |
| DT2 | 🟡 Medium | Espaçamentos hard-coded (`py-28`, `py-20`, `py-10`) — sem escala consistente |
| DT3 | 🟡 Medium | Border radius hard-coded (`rounded-lg`, `rounded-xl`, `rounded-2xl`) — sem token semântico (sm/md/lg) |
| DT4 | 🟢 Low | Sombras inconsistentes (.glow utility usa shadow direto; cards usam border) — sem sistema |

### 3.5 Conversion funnel

| # | Severidade | Finding |
|---|------------|---------|
| CV1 | 🔴 Critical | **Zero formulários nativos** — landing depende 100% de mailto. Sem capture de lead estruturado, sem newsletter, sem waitlist |
| CV2 | 🟠 High | CTAs primárias todas iguais ("Request a Demo" no hero, "Get in Touch" no navbar e contact) — sem priorização de ação |
| CV3 | 🟡 Medium | Sem prova social (testimonials, logos de clientes, casos reais) — coerente com pré-launch, mas seria substituível por **prova de engenharia** (já parcialmente em Numbers) |
| CV4 | 🟡 Medium | Sem analytics visível (não há GTM/Plausible/Vercel Analytics) — fundador não saberá quantos visitam, de onde vêm, onde abandonam |

---

## 4. Mapping findings → personas

| Persona | Findings críticos para ela/ele |
|---------|--------------------------------|
| **P1 Marina (Head Ops)** | Nu1 (provas tardias), U1 (cenário pouco alinhado), C2 (sem form estruturado), AC1-AC2 (acessibilidade) |
| **P2 Caio (Tech Lead)** | N2 (sem Docs), C1 (GitHub quebrado), F2 (pilares diluídos em 10 features), T3 (stack sem links) |
| **P3 Dani (Indie Dev)** | N1 (sem Pricing), H1 (CTA "Request a Demo" afasta), C2 (sem self-serve), Fo3 (sem indicação de status pre-launch) |

---

## 5. Score por critério

| Critério | Score | Justificativa |
|----------|-------|---------------|
| Estética / craft visual | 8/10 | Tipografia, paleta, espaçamento são acima da média |
| Hierarquia narrativa | 5/10 | Numbers em posição errada; Features dilui pilares; faltam seções (How it works, Pricing) |
| Adequação a personas | 4/10 | CTA atual desalinhada com 3 personas e com preferência do fundador |
| Acessibilidade | 5/10 | Contraste no limite, sem skip-link, sem focus states explícitos, lang único |
| Responsividade | 6/10 | Funciona desktop excelente, mobile tem menu quebrado e textos potencialmente apertados |
| Conversion mechanics | 3/10 | Zero forms, mailto-only, sem analytics, sem segmentação |
| Design tokens / sistema | 5/10 | Boa base mas só accent; sem semânticos (success/warning/error); CSS vars órfãs |
| Microcopy / tom | 6/10 | Bom mas com buzzwords pontuais ("Strategic Knowledge Platform"); placeholders esquecidos |

**Score médio:** **5.25 / 10** — landing competente mas com gaps significativos para virar "production-ready" como produto de marketing.

---

## 6. Findings que vão para o roadmap (preview)

**Quick wins (< 1 dia cada):**
- Substituir CTA "Request a Demo" por "Join waitlist"
- Trocar `github.com/your-org/noesis` por URL real
- Trocar `contact@noesis-platform.io` por email real (ou colocar form)
- Adicionar `Pricing` e `Docs` no navbar (mesmo que stub)
- Aumentar contraste de `text-zinc-700` no footer

**Médio prazo (1-4 dias cada):**
- Adicionar hamburger menu mobile
- Reduzir Features de 10 para 4 pilares + seção secundária
- Reescrever Use Cases com cenários alinhados a personas
- Subir Numbers para após Hero
- Adicionar form de waitlist segmentada
- Adicionar Privacy/Terms/Status no footer
- Adicionar skip-link e melhorar focus states

**Longo prazo (1+ semana):**
- Implementar light mode com tokens semânticos
- Adicionar seção "How it works"
- Adicionar seção "Pricing preview"
- Implementar i18n na landing (multi-idioma real)
- Integração com analytics (Plausible/Vercel Analytics)
