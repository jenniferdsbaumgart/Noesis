# Findings Consolidados — Noesis Landing Audit

**Autor:** tech-writer
**Data:** 2026-05-25
**Fonte:** 5 audits (UX, Architecture, QA, Security, Code Review) → **98 findings brutos** deduplicados em **38 temas únicos**

---

## Como ler este documento

Cada **tema** abaixo agrega findings de múltiplos audits sobre o mesmo problema. A coluna **Sources** lista os finding-IDs originais para rastreabilidade.

Severidade consolidada = **a mais alta** entre as fontes.

| Símbolo | Significado |
|---------|-------------|
| 🔴 P0 | Bloqueia algo (deploy, lei, conversão de persona) |
| 🟠 P1 | Reduz drasticamente eficácia |
| 🟡 P2 | Melhoria importante |
| 🟢 P3 | Polimento |

---

## 1. P0 — Críticos (corrigir antes de qualquer outra ação)

### T-01 — Build está quebrado (deploy CI falhará)
- **Sources:** QA Q-CRIT-01, Code Review CR-CRIT-01
- **Problema:** `declare module '*.css'` em `src/app/layout.tsx:5` é sintaxe inválida fora de `.d.ts`
- **Esforço:** 1 minuto (deletar linha)
- **Impacto:** desbloqueia deploy

### T-02 — Link GitHub é placeholder `github.com/your-org/noesis`
- **Sources:** UX C1, QA Q-CRIT-02, Security S-HIGH-PL1
- **Problema:** placeholder no `contact.tsx:29` — clique vai para 404 ou repo desconhecido
- **Impacto:** destrói credibilidade técnica (Caio); risco supply-chain marginal
- **Esforço:** 15 minutos

### T-03 — Email de contato `contact@noesis-platform.io` pode não existir
- **Sources:** UX C3, QA Q-CRIT-03, Security S-CRIT-PL1
- **Problema:** placeholder em `contact.tsx:22`; verificar DNS/mailbox
- **Impacto:** leads bounce silenciosamente
- **Esforço:** 10 minutos

### T-04 — `public/` está completamente vazio (sem favicon, sem og-image, sem robots.txt, sem sitemap.xml)
- **Sources:** Arch SE1, SE2; QA implícito
- **Problema:** assets básicos de marca + SEO + social sharing ausentes
- **Impacto:** browser tab genérica, social shares sem preview visual (CTR 2-3x menor)
- **Esforço:** S (2-3h, depende de ter design)

### T-05 — CTA "Request a Demo" desalinhada com tudo
- **Sources:** UX H1, messaging-map decisão 1; JTBD (todas personas)
- **Problema:** conflita com (a) pré-launch (b) preferência da fundadora por baixo contato (c) Persona Dani que abandona com alto-contato
- **Solução:** substituir por "Join waitlist"
- **Esforço:** XS para copy (depende do form ser implementado — T-13)

### T-06 — Vulnerabilidade Next.js 14.2.35 (2 advisories)
- **Sources:** Arch S1; Security S-CRIT-01
- **Advisory:** GHSA-h25m-26qc-wcjf (HIGH, DoS via RSC), GHSA-9g9p-9gw9-jx7f (MODERATE, DoS via Image Optimizer)
- **Risco real:** baixo na prática (RSC e Image Optimizer não usados em static export)
- **Risco reputacional:** alto (scanners flaggam)
- **Fix:** upgrade Next 14→16 (autorizado pela fundadora)
- **Esforço:** M-L (4-16h)

### T-07 — Vulnerabilidade PostCSS 8.5.8 (XSS)
- **Sources:** Arch S2; Security S-CRIT-02
- **Advisory:** GHSA-qx2v-qp2m-jg93
- **Risco real:** muito baixo (build-time only)
- **Fix:** `npm update postcss`
- **Esforço:** 5 minutos

### T-08 — Privacy policy ausente (blocking para waitlist live)
- **Sources:** Security S-HIGH-PR1
- **Problema:** sem `/privacy`, coletar email viola LGPD Art. 9 + GDPR Art. 13
- **Impacto:** risco legal (multas LGPD até R$50M ou 2% do faturamento)
- **Esforço:** S (3-4h para versão mínima)
- **Quando:** ANTES de waitlist ir live (T-13)

---

## 2. P1 — Altos (próximas 1-2 semanas)

### T-09 — Sem form de waitlist + sem analytics → voando às cegas
- **Sources:** UX CV1, Arch CV4, Arch BE1
- **Problema:** zero captura de leads, zero visibilidade de tráfego
- **Solução combinada:**
  - Form via Resend + Vercel Function proxy
  - Analytics via Vercel Analytics
- **Esforço:** M-L (8-16h total para os 2)

### T-10 — TypeScript `target: es5` infla bundle ~35KB com polyfills
- **Sources:** Arch P2
- **Fix:** mudar para `es2022` em `tsconfig.json`
- **Esforço:** 5 minutos (teste smoke + verify build size)

### T-11 — Mobile nav escondido (<768px = só logo + CTA, sem links)
- **Sources:** UX N4/N5/R1, QA Q-CRIT-04
- **Fix:** hamburger menu com a11y trap focus
- **Esforço:** M (4-6h)

### T-12 — Sem nav para `Pricing` e `Docs` (Dani abandona, Caio frustra)
- **Sources:** UX N1/N2
- **Fix:** 2 novos links + páginas stub
- **Esforço:** S (3-4h)

### T-13 — Numbers em posição errada na narrativa
- **Sources:** UX Nu1, messaging-map decisão 2
- **Fix:** mover para imediatamente após Hero em `page.tsx`
- **Esforço:** 5 minutos

### T-14 — Features = 10 cards diluem os 4 pilares de differentiation
- **Sources:** UX F1/F2, Code Review CR-HIGH-04
- **Fix:** reduzir para 4 pilares principais + subgrid secundário com "também incluso"
- **Esforço:** M (6-8h)

### T-15 — Use Cases não-alinhados com personas
- **Sources:** UX U1/U2/U3
- **Fix:** 3 cenários nomeados (Marina/support, Marina/in-product, Dani/indie)
- **Esforço:** S (4-5h)

### T-16 — Sem CI (GitHub Actions) — build broken passou despercebido
- **Sources:** Arch BD1, Security S-MED-SC2
- **Fix:** workflow simples `npm ci + lint + build` em PR/main
- **Esforço:** S (1-2h)

### T-17 — Sem security headers (Vercel host decidido)
- **Sources:** Arch S3/S4; Security S-HIGH-01/02/03
- **Fix:** `vercel.json` com HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Esforço:** S (2-3h)

### T-18 — Acessibilidade: contraste insuficiente em `text-zinc-600`/`text-zinc-700`
- **Sources:** UX AC1/AC2, QA Q-HIGH-A1
- **Fix:** substituir por zinc-400/500 conforme contexto
- **Esforço:** S (2-3h)

### T-19 — Focus states invisíveis para keyboard nav
- **Sources:** UX AC3, QA Q-HIGH-A2
- **Fix:** `focus-visible:ring-2 focus-visible:ring-accent-400` em interactive elements
- **Esforço:** S (2h)

### T-20 — Sem skip-link
- **Sources:** UX AC4, QA Q-HIGH-A3
- **Fix:** sr-only link + focus reveal
- **Esforço:** 15 minutos

### T-21 — Headline do hero é descritiva, não diferenciadora
- **Sources:** UX H2, messaging-map
- **Fix:** trocar "Strategic Knowledge Platform with AI" por opção candidata A/B/C do positioning
- **Esforço:** decisão + 5 minutos copy

### T-22 — Structured data (JSON-LD) ausente
- **Sources:** Arch SE5
- **Fix:** Organization + SoftwareApplication schema no layout
- **Esforço:** S (1-2h)

### T-23 — i18n da landing (PT-BR + EN inicialmente)
- **Sources:** Arch I1/I2/I3, decisão fundadora
- **Fix:** `next-intl` com subdiretórios para static export
- **Esforço:** L (16-24h — setup + tradução de copy)

### T-24 — Adicionar seção "How it works" (RAG flow)
- **Sources:** messaging-map
- **Fix:** nova seção entre Features e Architecture com diagrama de 4 passos
- **Esforço:** M (6-8h)

### T-25 — Adicionar seção "Pricing preview"
- **Sources:** messaging-map; UX P3 Dani
- **Fix:** seção com 3 tiers placeholder + CTA waitlist
- **Esforço:** S (4-5h)

---

## 3. P2 — Médios (ciclo seguinte)

### T-26 — Atualizar React 18→19
- **Sources:** Arch (recomendado)
- **Esforço:** S (2-4h + smoke test)

### T-27 — Light mode com design tokens semânticos
- **Sources:** UX DM1/DM2/DT1, Code Review CR-HIGH-02
- **Esforço:** L (12-16h)

### T-28 — Padronizar design tokens (spacing, radius, shadows)
- **Sources:** UX DT2/DT3/DT4, Code Review CR-MED-03/04/09
- **Esforço:** M (6-8h)

### T-29 — Ícones custom para os 4 pilares
- **Sources:** UX F4
- **Esforço:** M (8h)

### T-30 — Logos de techs no TechStack + links de docs
- **Sources:** UX T2/T3
- **Esforço:** S (4-6h total)

### T-31 — Refactor Hero em subcomponentes
- **Sources:** Code Review CR-HIGH-03
- **Esforço:** S (2-3h) — só se A/B test for vir

### T-32 — Adicionar Prettier + lint-staged + husky
- **Sources:** Arch BD4/BD5/BD6
- **Esforço:** S (1-2h)

### T-33 — `.env.example` + `.nvmrc` + `engines`
- **Sources:** Arch BD2/BD3, Security S-MED-PL1
- **Esforço:** XS (30 minutos total)

### T-34 — Snyk/Socket.dev no CI + secret scanning
- **Sources:** Security S-MED-SC1/PL2
- **Esforço:** S (1-2h setup)

### T-35 — Métrica de qualidade em Numbers (substitui 1 das 6 atuais)
- **Sources:** UX Nu3
- **Esforço:** XS (decisão + copy)

### T-36 — Privacy/Terms/Status no footer
- **Sources:** UX Fo1/Fo3, Security S-HIGH-PR1
- **Esforço:** S (3-4h cumulativo — depende de T-08 já estar feito)

---

## 4. P3 — Baixos (polimento)

### T-37 — Refinamentos visuais
- Inclui: count-up nos Numbers, scroll-spy no nav, separadores entre features Core/Adjacent, `active:` state em CTAs, remover decorações sem função (terminal preview circles)
- **Sources:** UX Nu4, N6, F5, REC-028 a 032
- **Esforço:** S-M agregado (~10h)

### T-38 — Cross-browser test + Lighthouse CI + Playwright smoke
- **Sources:** QA seção 11
- **Esforço:** M (4-6h setup)

---

## 5. Decisões pendentes restantes (precisam input humano)

| # | Decisão | Recomendação default |
|---|---------|---------------------|
| D1 | Analytics: Vercel Analytics confirmado? | Sim (alinha com host Vercel; sem cookie banner) |
| D2 | Cores em architecture.tsx (indigo/violet/emerald/amber) são intencionais? | Confirmar com designer: se sim, documentar como decisão; se não, alinhar com paleta accent/cyan |

---

## 6. Resumo numérico

| Categoria | Quantidade |
|-----------|------------|
| Findings brutos (5 audits) | 98 |
| Temas únicos consolidados | 38 |
| P0 (críticos) | 8 |
| P1 (altos) | 17 |
| P2 (médios) | 11 |
| P3 (baixos) | 2 (agregados) |
| Esforço total estimado | ~250-300h / ~33-40 dev-days |

---

## 7. Mapping fonte → tema (rastreabilidade)

| Fonte | # de findings | Mapeados em |
|-------|---------------|-------------|
| UX (02) | 32 recs + 32 findings | T-02, T-03, T-05, T-11, T-12, T-13, T-14, T-15, T-18, T-19, T-20, T-21, T-24, T-25, T-26, T-27, T-28, T-29, T-30, T-35, T-36, T-37 |
| Arch (03) | 28 recs + 31 findings | T-01, T-04, T-06, T-07, T-09, T-10, T-16, T-17, T-22, T-23, T-26, T-32, T-33, T-34, T-38 |
| QA (08) | 24 findings | T-01, T-02, T-03, T-11, T-18, T-19, T-20, T-38 |
| Security (09) | 16 findings | T-02, T-03, T-06, T-07, T-08, T-16, T-17, T-33, T-34, T-36 |
| Code Review (11) | 19 findings | T-01, T-04, T-14, T-28, T-31, T-32, decisão D2 |
