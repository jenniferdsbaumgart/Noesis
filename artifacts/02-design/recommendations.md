# UX Recommendations — Noesis Landing

**Autor:** ux-designer
**Data:** 2026-05-25
**Para:** project-reporter (fase 13) consolidar no roadmap final
**Baseado em:** [[audit-report]]

---

## Sumário

32 recomendações priorizadas. Cada uma tem: descrição, persona/finding atendido, esforço estimado, impacto esperado, agente sugerido para executar em ciclo futuro.

| Prioridade | Quantidade | Esforço total estimado |
|------------|------------|------------------------|
| 🔥 Critical (P0) | 5 | ~3 dias |
| 🚀 High (P1) | 11 | ~10 dias |
| 📈 Medium (P2) | 11 | ~15 dias |
| 🎨 Low (P3) | 5 | ~5 dias |

---

## P0 — Critical (resolver antes de qualquer outra coisa)

### REC-001 — Substituir CTA "Request a Demo" por "Join the waitlist"
- **Findings:** H1, C2, CV1
- **Personas:** Todas + fundador
- **Mudança:** hero CTA primária + form de waitlist no lugar da seção Contact
- **Justificativa:** alinha pré-launch + preferência do fundador por baixo contato + persona Dani
- **Esforço:** S (4-6h) — copy + componente form + endpoint serverless ou serviço externo (ConvertKit, Mailchimp)
- **Impacto:** captura estruturada de leads desde dia 0; sem isso, 100% da demanda é perdida
- **Agente para executar:** frontend-dev + backend-dev (form action)

### REC-002 — Corrigir link GitHub quebrado
- **Findings:** C1
- **Personas:** P2 (Caio — credibilidade)
- **Mudança:** substituir `github.com/your-org/noesis` por URL real (ou remover se repo da plataforma é privado)
- **Justificativa:** placeholder transmite descuido; pode minar confiança técnica
- **Esforço:** XS (15 min)
- **Impacto:** alta — preserva credibilidade técnica
- **Agente:** frontend-dev

### REC-003 — Corrigir email de contato
- **Findings:** C3
- **Personas:** Todas
- **Mudança:** substituir `contact@noesis-platform.io` por endereço real OU remover mailto e usar só form
- **Justificativa:** se domínio não existe, mailto resulta em bounce
- **Esforço:** XS (10 min)
- **Impacto:** evita leads perdidos por erro técnico
- **Agente:** frontend-dev

### REC-004 — Adicionar "Pricing" e "Docs" no navbar (mesmo que stubs)
- **Findings:** N1, N2
- **Personas:** P2, P3
- **Mudança:** 2 novos links no nav (`/pricing` e `/docs` stub com "Coming soon")
- **Justificativa:** ausência é dealbreaker imediato para Dani e fricção alta para Caio
- **Esforço:** S (3-4h, incluindo páginas stub)
- **Impacto:** muito alto para conversão P3
- **Agente:** frontend-dev

### REC-005 — Renomear seção Contact → Final CTA Waitlist segmentada
- **Findings:** C2, C4, CV1
- **Personas:** Todas
- **Mudança:** form com (1) email (2) radio "what describes you best" (Marina/Caio/Dani/outro) (3) "no spam"
- **Justificativa:** captura intent + segmentação dá inteligência sem 1:1
- **Esforço:** M (6-10h)
- **Impacto:** muito alto — fundamento de validação de demanda
- **Agente:** frontend-dev + backend-dev

---

## P1 — High (próximo ciclo de implementação)

### REC-006 — Reordenar: subir Numbers para imediatamente após Hero
- **Findings:** Nu1
- **Personas:** P1, P2
- **Mudança:** mover `<Numbers />` de entre Architecture e UseCases para imediatamente após `<Hero />`
- **Esforço:** XS (5 min — apenas reordenar imports em `page.tsx`)
- **Impacto:** alto — prova rápida antes do leitor decidir continuar

### REC-007 — Reescrever headline do Hero
- **Findings:** H2
- **Mudança:** trocar "Strategic Knowledge Platform with AI" por opção A/B/C do [[positioning]] (recomendação: A "Knowledge that answers — não só armazena")
- **Esforço:** XS (copy change)
- **Impacto:** médio-alto — promessa específica > descrição genérica

### REC-008 — Reduzir Features de 10 para 4 pilares + 1 grid secundário
- **Findings:** F1, F2
- **Mudança:** seção principal com 4 cards grandes (os 4 pilares de differentiation); subgrid com "também incluso" listando os outros 6
- **Esforço:** M (6-8h)
- **Impacto:** alto — hierarquia clara comunica differentiation

### REC-009 — Reescrever Use Cases alinhados a personas
- **Findings:** U1, U2, U3
- **Mudança:** 3 cards com cenários nomeados:
  - **"Your help center, finally findable"** (Marina/support)
  - **"Smart help inside your product"** (Marina/in-product)
  - **"Ship AI help in an afternoon"** (Dani/indie)
- **Esforço:** S (4-5h — copy + ícones)
- **Impacto:** alto — cada persona se vê

### REC-010 — Adicionar hamburger menu mobile
- **Findings:** N4, N5, R1
- **Mudança:** menu colapsado em <768px com ícone hamburger
- **Esforço:** M (4-6h — incluindo a11y trap focus)
- **Impacto:** alto — mobile representa ~50% do tráfego de landing

### REC-011 — Adicionar form de waitlist (backend ou serviço externo)
- **Findings:** CV1
- **Mudança:** decidir entre (a) endpoint próprio em Vercel/Cloudflare Functions (b) serviço SaaS (ConvertKit, Plunk, Resend)
- **Esforço:** M-L (8-12h dependendo de escolha)
- **Impacto:** crítico para validação de demanda
- **Decisão a tomar:** ver `architect/recommendations.md` para escolha de stack

### REC-012 — Adicionar página Privacy + Terms (mesmo que mínimas)
- **Findings:** Fo1
- **Mudança:** 2 páginas estáticas com texto padrão revisado por advogado depois
- **Esforço:** S (3-4h)
- **Impacto:** compliance (LGPD/GDPR ao coletar email da waitlist)

### REC-013 — Adicionar skip-link e melhorar focus states
- **Findings:** AC3, AC4
- **Mudança:** `<a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>` + focus rings explícitos em todos os links/buttons
- **Esforço:** S (2-3h)
- **Impacto:** acessibilidade — keyboard users + WCAG conformance

### REC-014 — Corrigir contraste de `text-zinc-600` e `text-zinc-700`
- **Findings:** AC1, AC2
- **Mudança:** substituir por `text-zinc-400`/`text-zinc-500` em contexto de texto pequeno
- **Esforço:** S (2h — audit + replace)
- **Impacto:** WCAG AA compliance

### REC-015 — Adicionar 4ª seção "How it works" (diagrama RAG flow)
- **Findings:** mensagem do messaging-map; gap entre claim "RAG" e explicação
- **Mudança:** seção nova entre Features e Architecture com diagrama de 4 passos (Ingest → Index → Query → Answer)
- **Esforço:** M (6-8h — design + componente)
- **Impacto:** alto para Caio; segura Marina na narrativa

### REC-016 — Adicionar "Pricing preview" section
- **Findings:** messaging-map
- **Mudança:** seção com 3 tiers (placeholders) + CTA waitlist
- **Esforço:** S (4-5h)
- **Impacto:** alto para Dani

---

## P2 — Medium (ciclo seguinte)

### REC-017 — Implementar light mode com tokens semânticos
- **Findings:** DM1, DM2, DT1
- **Mudança:** sistema de tokens com `--bg`, `--fg`, `--muted`, `--accent`, `--success`, `--warning`, `--error` em CSS vars; toggle via `prefers-color-scheme` + persistência localStorage
- **Esforço:** L (12-16h)
- **Impacto:** médio — alguns usuários corporativos preferem light

### REC-018 — Substituir ícones Lucide genéricos por ícones personalizados (4 pilares)
- **Findings:** F4
- **Mudança:** 4 SVG custom para "Ready", "Grounded", "Multi-tenant", "i18n"
- **Esforço:** M (8h — design dos SVGs)
- **Impacto:** médio — marca + memorabilidade

### REC-019 — Adicionar logos de techs no TechStack
- **Findings:** T2
- **Mudança:** SVG logo + nome + role
- **Esforço:** S (3-4h)
- **Impacto:** médio — reconhecimento visual instantâneo

### REC-020 — Adicionar links de docs nos itens do TechStack
- **Findings:** T3
- **Mudança:** cada item linkando para doc oficial em nova aba
- **Esforço:** XS (1-2h)
- **Impacto:** baixo-médio — Caio aprecia, conversão indireta

### REC-021 — Adicionar métrica de qualidade nos Numbers
- **Findings:** Nu3
- **Mudança:** substituir 1 das 6 métricas atuais por algo como "97% citation accuracy" ou "0 hallucinations on golden set"
- **Esforço:** XS (decisão + copy)
- **Impacto:** médio — diferencia de "só volume"

### REC-022 — Adicionar status badge "pre-launch / waitlist open" no footer
- **Findings:** Fo3
- **Mudança:** badge discreto no footer
- **Esforço:** XS (30 min)
- **Impacto:** baixo — gerencia expectativa

### REC-023 — Adicionar link do repo público da landing no footer
- **Findings:** Fo2
- **Mudança:** link "Code on GitHub" → URL real
- **Esforço:** XS (15 min)
- **Impacto:** baixo-médio — sinaliza transparência

### REC-024 — Implementar i18n na própria landing (PT-BR + EN + ES)
- **Findings:** AC5
- **Mudança:** integrar `next-intl` (consistente com o app principal); detectar locale; switcher
- **Esforço:** L (16-24h — tradução de copy + setup)
- **Impacto:** médio-alto se Brasil/LATAM são mercados-alvo; baixo se EN-only

### REC-025 — Adicionar analytics (Vercel Analytics ou Plausible)
- **Findings:** CV4
- **Mudança:** integrar serviço; configurar eventos custom (CTA clicks, form submits)
- **Esforço:** S (3-4h)
- **Impacto:** muito alto — sem dado, sem decisão informada
- **Decisão de tooling:** ver `architect/recommendations.md`

### REC-026 — Padronizar design tokens (spacing, radius, shadows)
- **Findings:** DT2, DT3, DT4
- **Mudança:** definir escala semântica em `tailwind.config.ts` (`space-section`, `radius-card`, `shadow-card`, etc.)
- **Esforço:** M (6-8h)
- **Impacto:** médio — sustentabilidade para crescimento

### REC-027 — Adicionar count-up animation nos Numbers
- **Findings:** Nu4
- **Mudança:** animação leve com IntersectionObserver
- **Esforço:** S (3-4h)
- **Impacto:** baixo-médio — engagement visual

---

## P3 — Low (polimento)

### REC-028 — Remover decorações sem função no terminal preview (3 círculos)
- **Findings:** H5
- **Esforço:** XS
- **Impacto:** baixo — limpa visual noise

### REC-029 — Adicionar indicador de seção ativa no nav durante scroll
- **Findings:** N6
- **Esforço:** S (3h — scroll-spy)
- **Impacto:** baixo — qualidade percebida

### REC-030 — Renomear "Stack" → "Tech Stack" no nav
- **Findings:** N7
- **Esforço:** XS
- **Impacto:** baixo

### REC-031 — Adicionar separadores entre features Core vs Adjacent
- **Findings:** F5
- **Esforço:** XS (após REC-008 ter sido feito)
- **Impacto:** baixo

### REC-032 — Adicionar links sociais no footer (LinkedIn, Twitter)
- **Findings:** Fo4
- **Esforço:** XS
- **Impacto:** baixo

---

## Estimativa total

| Esforço unidade | Quantidade | Horas |
|------------------|------------|-------|
| XS | 11 | 15 |
| S | 12 | 50 |
| M | 7 | 50 |
| L | 2 | 36 |
| **Total** | **32** | **~150h** |

**Em dev-days:** ~20 dev-days (1 dev a 7-8h/dia produtiva), ou **~4 semanas para 1 dev**.

Recomendação realista para o roadmap: **fazer P0 (1 dia) + P1 selecionadas (2 semanas)** em primeiro ciclo de implementação; deixar P2 e P3 para ciclo seguinte.

---

## Notas para o ux-designer do próximo ciclo

Quando este roadmap virar fase de implementação:
1. **Antes de qualquer wireframe novo:** validar personas com 5-10 entrevistas reais (item já no roadmap final)
2. **Design tokens semânticos** (REC-026) é pré-requisito para REC-017 (light mode)
3. **Pricing preview** depende de decisão de pricing real — escalar para humano/fundador antes de wireframear
4. **i18n da landing** (REC-024) requer co-decisão com architect — afeta build/routing
