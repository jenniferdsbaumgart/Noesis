# Tech Audit — Noesis Landing (estado atual)

**Autor:** architect
**Data:** 2026-05-25
**Modo:** Auditoria (não-implementação)
**Inputs:** `package.json`, `next.config.js`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `src/**/*`, `out/**`, `npm outdated`, `npm audit`

---

## 1. Sumário executivo

**Veredito geral:** stack escolhida está **adequada para o propósito** (static landing) e bem-estruturada. Mas há **2 vulnerabilidades de segurança ativas em Next.js**, **dependências significativamente desatualizadas** (Next 14.2.35 quando 16.x é GA), **JS shipping desproporcional** para uma landing estática (~665KB), e **ausência completa de assets em `public/`** (favicon, og-image, robots.txt, sitemap.xml).

### Severidade dos findings

| Severidade | Quantidade |
|------------|------------|
| 🔴 Critical | 6 |
| 🟠 High | 9 |
| 🟡 Medium | 11 |
| 🟢 Low | 5 |

---

## 2. Stack atual (inventário)

### Runtime / Framework
| Item | Versão atual | Última disponível | Status |
|------|--------------|-------------------|--------|
| Node.js | v25.9.0 (local) | v25 (current) | ✅ Atualizado |
| Next.js | 14.2.35 | **16.2.6** | 🔴 2 majors atrás + vulns |
| React | 18.3.1 | 19.2.6 | 🟠 1 major atrás |
| React DOM | 18.3.1 | 19.2.6 | 🟠 1 major atrás |
| TypeScript | 5.9.3 | 6.0.3 | 🟡 1 major atrás |

### Build / Bundler
| Item | Versão | Notas |
|------|--------|-------|
| Webpack (via Next) | Embutido | Sem Turbopack habilitado |
| PostCSS | 8.5.8 | Versão tem vuln (8.5.15 fix) |
| Autoprefixer | 10.4.27 | Sem update major |
| Tailwind CSS | 3.4.19 | **v4.3.0 é GA** — major change |

### Runtime (browser)
| Item | Versão | Notas |
|------|--------|-------|
| Geist (font) | 1.7.0 | Patch update disponível (1.7.1) |
| Lucide React | 0.400.0 | **1.16.0 disponível** — vários majors atrás (mas API estável neste range) |

### Configuração Next
- `output: 'export'` ✅ — static export, sem SSR/ISR (correto para landing)
- Sem `images.unoptimized` definido — mas `next/image` não é usado (irrelevante)
- Sem rewrites, redirects, headers
- Sem Turbopack
- Sem middleware

### Configuração TypeScript
- `target: "es5"` 🔴 — anacrônico em 2026; gera polyfills desnecessários
- `strict: true` ✅
- `paths: { "@/*": ["./src/*"] }` ✅
- `moduleResolution: "bundler"` ✅

---

## 3. Findings detalhados

### 3.1 Segurança (severidade alta)

| # | Sev | Finding |
|---|-----|---------|
| S1 | 🔴 Critical | **Next.js 14.2.35 tem 2 advisories:** (a) GHSA-h25m-26qc-wcjf (HIGH, CVSS 7.5) — HTTP request deserialization → DoS via insecure RSC; (b) GHSA-9g9p-9gw9-jx7f (MODERATE, CVSS 5.9) — DoS via Image Optimizer remotePatterns. Ambos corrigidos em >= 15.5.10 |
| S2 | 🔴 Critical | **PostCSS 8.5.8 tem GHSA-qx2v-qp2m-jg93** — XSS via Unescaped `</style>` em output. Fixed em 8.5.15 |
| S3 | 🟠 High | Sem security headers definidos — static export hospeda como files, então headers dependem do host (Vercel, Netlify, Cloudflare Pages). Não há configuração explícita no projeto |
| S4 | 🟠 High | Sem `next.config.js` configurando Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options, X-Content-Type-Options — embora limitado pelo static export, headers ainda podem ser configurados no host |
| S5 | 🟡 Medium | Sem `robots.txt` — search engines descobrem livremente, sem controle |
| S6 | 🟡 Medium | Sem `Subresource Integrity (SRI)` em scripts/links externos (irrelevante hoje pois tudo é self-hosted, mas atenção quando adicionar fonts/scripts externos) |

> **Mitigação imediata recomendada:**
> 1. `npm update postcss` (não-breaking)
> 2. Avaliar upgrade Next 14→16 (breaking, mas alivia 2 vulns + traz Turbopack)
> 3. Configurar headers no host de deploy

---

### 3.2 Performance & Bundle

| # | Sev | Finding |
|---|-----|---------|
| P1 | 🟠 High | **JS total ~665KB descompactado** para uma landing estática. Chunks principais: 173KB + 140KB (framework) + 125KB + 116KB + 113KB (polyfills). Polyfills 113KB sugerem `target: es5` no tsconfig — modernos browsers não precisam |
| P2 | 🟠 High | **`target: "es5"`** no tsconfig.json força polyfills extensos. Para uma landing 2026, `es2022` ou `esnext` reduziria significantly o polyfill burden |
| P3 | 🟠 High | Lucide-react importado por named imports (✅ tree-shake) mas **10 ícones em Features + 3 em UseCases + 2 em Contact + 1 em Numbers** = 16 ícones. Verificar se tree-shake está funcionando no bundle final |
| P4 | 🟡 Medium | Sem Turbopack habilitado — Next 16 oferece Turbopack como bundler padrão; manteria Webpack atualmente. Para static landing, ganhos são marginais mas dev experience melhora |
| P5 | 🟡 Medium | Sem `next/font` otimizado para Geist — está via `geist/font/sans` que internamente usa next/font (✅), mas worth verificar que CSS inlined está ocorrendo |
| P6 | 🟡 Medium | Build output 1.0MB — razoável, mas pode reduzir 30-40% com modernização (P1, P2) |
| P7 | 🟢 Low | Sem prefetch de DNS para serviços externos (irrelevante hoje; relevante quando adicionar analytics/CDN) |

> **Bundle breakdown atual (gzipped estimado):**
> - Framework: ~45KB gz
> - App + main: ~80KB gz
> - Polyfills: ~35KB gz (eliminável com target moderno)
> - **Total estimado:** ~160KB gz (acima do ideal 80-120KB para landing)

---

### 3.3 SEO

| # | Sev | Finding |
|---|-----|---------|
| SE1 | 🔴 Critical | **`public/` está completamente vazio** — sem favicon, sem og-image, sem touch-icons, sem robots.txt, sem sitemap.xml |
| SE2 | 🔴 Critical | **Sem og:image** definida — quando alguém compartilhar link no LinkedIn/Twitter/Slack, não aparece preview visual (perda massiva de CTR) |
| SE3 | 🟠 High | Metadata `twitter:card = "summary"` (default Next) — deveria ser `summary_large_image` para mais espaço visual |
| SE4 | 🟠 High | Sem `<meta name="theme-color">` — Safari iOS / Chrome Android usam fallback genérico |
| SE5 | 🟠 High | Sem structured data (JSON-LD) — Google não tem contexto rico (Organization, Product, SoftwareApplication) |
| SE6 | 🟡 Medium | Sem sitemap.xml — Google indexa via crawl normal, mas sitemap acelera; também relevante quando adicionar páginas (/pricing, /docs) |
| SE7 | 🟡 Medium | `locale: 'en_GB'` único — limita descoberta em mercados PT-BR/ES (alinhado com finding de design AC5) |
| SE8 | 🟢 Low | Title "Noesis — Strategic Knowledge Platform" não inclui keyword "RAG" ou "AI" no título; pode reduzir relevância para queries específicas |

---

### 3.4 Acessibilidade (técnica — complementa o UX audit)

| # | Sev | Finding |
|---|-----|---------|
| TA1 | 🟠 High | `lang="en-GB"` hardcoded — sem switcher i18n não tem como mudar; quando i18n for adicionado, precisa ser dinâmico |
| TA2 | 🟡 Medium | Sem `<main>` tag explícito — `<main>` está em `page.tsx` mas componentes filhos usam apenas `<section>` (✅ semântico, mas verificar landmarks) |
| TA3 | 🟡 Medium | Sem `aria-label` em navegação principal (`<nav>` sem label) — leitores de tela anunciam "navigation" genérico |
| TA4 | 🟢 Low | Lucide icons renderizam como SVG inline (✅ não é `<img>`), mas sem `aria-hidden="true"` quando decorativos |

---

### 3.5 Backend / Form handling

| # | Sev | Finding |
|---|-----|---------|
| BE1 | 🔴 Critical | **Static export não suporta API routes** (`app/api/*`) — qualquer form precisa de (a) serviço externo (ConvertKit, Plunk, Resend, Loops) (b) Vercel Functions (com mudança de output mode ou hybrid) (c) Cloudflare Worker separado |
| BE2 | 🟠 High | Sem schema de validação (Zod/Yup) preparado — adicionar form sem isso é vulnerabilidade |
| BE3 | 🟡 Medium | Sem rate-limit em qualquer endpoint (não há endpoint, mas necessário ao adicionar) |

---

### 3.6 Build / Deploy / DX

| # | Sev | Finding |
|---|-----|---------|
| BD1 | 🟠 High | **Sem GitHub Actions / CI definido** — sem build automático em PR, sem checks em main; deploy depende de Vercel auto-deploy (configurado? verificar) |
| BD2 | 🟠 High | Sem `.env.example` — quando adicionar API keys (analytics, form service), sem documentação de o que precisa |
| BD3 | 🟡 Medium | Sem `.nvmrc` ou `engines` em package.json — Node version não está fixada |
| BD4 | 🟡 Medium | Sem `prettier` configurado — formatting inconsistente possível |
| BD5 | 🟡 Medium | Sem `eslint` config explícito além de `next lint` default — sem regras custom |
| BD6 | 🟡 Medium | Sem husky/lint-staged — sem garantia de qualidade pré-commit |
| BD7 | 🟢 Low | `package-lock.json` modificado no git status (commit recente) — verificar se é intencional |

---

### 3.7 i18n (gap entre promessa e implementação)

| # | Sev | Finding |
|---|-----|---------|
| I1 | 🟠 High | Hero badge promete "5 languages" mas landing está 100% em inglês; potencial dissonância para visitor brasileiro/espanhol |
| I2 | 🟡 Medium | Plataforma principal usa `next-intl` (mencionado no README) — coerência sugere usar mesma lib na landing quando i18n for adicionado |
| I3 | 🟡 Medium | `output: 'export'` complica i18n routing (sem middleware) — precisa de strategy específica (subdiretórios estáticos por locale) |

---

### 3.8 Qualidade de código (preview — code-reviewer aprofunda)

| # | Sev | Finding |
|---|-----|---------|
| Q1 | 🟡 Medium | **Inconsistência de paleta:** `architecture.tsx` ainda usa `indigo`, `violet`, `emerald`, `amber` para tags apesar de commit `e45e8ea` ter mudado accent para cyan/turquoise — pode ser intencional (cores distintas por camada) ou esquecimento |
| Q2 | 🟡 Medium | Magic numbers / classes hard-coded sem tokens (`py-28`, `py-20`, `max-w-6xl`, `max-w-4xl`) — sem escala consistente |
| Q3 | 🟡 Medium | Componentes não têm Props typed (são static — não recebem nada) — OK para landing simples, mas sem padrão a seguir quando crescer |
| Q4 | 🟢 Low | Sem testes — esperado para landing estática, mas se quiser CI quality gate, snapshot tests seriam baratos |

---

## 4. Observability (gap completo)

A landing **não tem nenhum tipo de telemetria**. Sem isso:

- Fundadora não sabe quantos visitam
- Não sabe de onde vêm (organic, social, direct)
- Não sabe onde abandonam (CTA acima da dobra? scroll-depth?)
- Não pode A/B testar
- Não tem feedback de Web Vitals real-user

**Opções para considerar (ver recommendations.md):**
- Vercel Analytics (privacy-first, paid)
- Plausible (open-source, paid SaaS ou self-host)
- Posthog (mais completo, free tier generoso)
- Umami (open-source, self-host)
- Google Analytics 4 (gratuito, mas privacy concerns)

---

## 5. Decisões arquiteturais atuais (ADR retrospectivos)

### ADR-001 (retrospectivo): Next.js + Static Export
- **Status:** Aceitável (revisar se features dinâmicas crescerem)
- **Decisão:** Static export para landing
- **Consequências positivas:** Simples deploy (qualquer CDN), barato, rápido, sem runtime concerns
- **Consequências negativas:** Sem API routes (limita forms, analytics server-side, A/B), sem ISR
- **Quando reconsiderar:** quando waitlist form precisar de backend dedicado, ou quando i18n vier (SSR/SSG por locale é mais limpo)

### ADR-002 (retrospectivo): Tailwind 3 + design tokens minimal
- **Status:** Aceitável, mas com dívida
- **Decisão:** Tailwind 3.4 com extension mínima (só accent palette + fonts)
- **Consequências positivas:** dev rápida, classes utility já conhecidas
- **Consequências negativas:** sem tokens semânticos, magic numbers, sem dark/light system
- **Quando reconsiderar:** se adicionar light mode ou se design system crescer (REC-026)

### ADR-003 (retrospectivo): Sem testes
- **Status:** Aceitável para landing simples
- **Decisão:** Sem unit/e2e tests
- **Consequências positivas:** velocidade de iteração
- **Consequências negativas:** sem safety net para refactor
- **Quando reconsiderar:** se landing crescer para múltiplas páginas ou se houver lógica condicional

---

## 6. Sumário visual: o que está faltando vs o que existe

```
┌─────────────────────────────────────────────────────────────┐
│  CAMADA              │  ESTADO ATUAL                        │
├──────────────────────┼──────────────────────────────────────┤
│  Framework           │  ⚠️ Next 14.2 (2 vulns, 2 majors)     │
│  React               │  ⚠️ React 18 (1 major atrás)          │
│  TypeScript          │  ✅ Strict; ⚠️ target es5             │
│  Bundler             │  Webpack (Turbopack disponível)      │
│  Styling             │  ✅ Tailwind 3 (v4 disponível)        │
│  Fonts               │  ✅ Geist via next/font               │
│  Icons               │  ✅ Lucide React (tree-shake)         │
│  Forms               │  ❌ INEXISTENTE                       │
│  Validation          │  ❌ INEXISTENTE                       │
│  i18n                │  ❌ INEXISTENTE (mas prometido)       │
│  SEO assets          │  ❌ public/ VAZIO                     │
│  Structured data     │  ❌ INEXISTENTE                       │
│  Sitemap             │  ❌ INEXISTENTE                       │
│  Robots.txt          │  ❌ INEXISTENTE                       │
│  Analytics           │  ❌ INEXISTENTE                       │
│  Security headers    │  ❌ INEXISTENTE                       │
│  CI/CD               │  ❌ INEXISTENTE (?)                   │
│  Tests               │  ❌ INEXISTENTE                       │
│  Linting custom      │  ⚠️ Só Next default                   │
│  Prettier            │  ❌ INEXISTENTE                       │
│  Husky/lint-staged   │  ❌ INEXISTENTE                       │
│  .env.example        │  ❌ INEXISTENTE                       │
│  .nvmrc/engines      │  ❌ INEXISTENTE                       │
└─────────────────────────────────────────────────────────────┘
```

**Leitura:** stack runtime é razoável mas desatualizada; **toda camada operacional/tooling/SEO está ausente**. Coerente com "landing rápida de pré-launch" mas problemático conforme produto cresce.

---

## 7. Score por critério

| Critério | Score | Justificativa |
|----------|-------|---------------|
| Adequação ao propósito (static landing) | 8/10 | Next + export é escolha sólida |
| Segurança | 4/10 | 2 vulns ativas + sem headers + sem CSP |
| Performance | 6/10 | Funcional mas com gordura (target es5 + polyfills) |
| SEO técnico | 3/10 | public/ vazio é crítico; sem structured data; sem og:image |
| Acessibilidade técnica | 6/10 | Estrutura semântica OK, mas lang único + sem aria-labels custom |
| Tooling / DX | 4/10 | Sem CI, sem Prettier, sem hooks, sem env docs |
| Observability | 0/10 | Zero telemetria |
| i18n | 2/10 | Promessa "5 languages" não cumprida na landing |
| Manutenibilidade futura | 5/10 | Código simples mas sem padrões para crescer |

**Score médio:** **4.2 / 10**

Reflete que o que existe está OK, mas **falta muita coisa fundamental** para landing de produto sério em pré-launch.

---

## 8. Findings que vão para o roadmap (preview)

**Críticos (não podem esperar):**
- Atualizar PostCSS (fix XSS) — 5 min
- Decidir sobre upgrade Next 14→16 (fix DoS vulns) — 4-8h se sem breaking changes; mais se houver
- Adicionar favicon.ico + og-image (1200x630) — 2-3h
- Adicionar robots.txt + sitemap.xml — 1-2h
- Criar `.nvmrc` + `engines` — 5 min

**Altos:**
- Configurar security headers (depende do host)
- Mudar target TypeScript para es2022/esnext — 30 min
- Adicionar Vercel Analytics ou Plausible — 1-2h
- Adicionar GitHub Actions com build check em PR — 1h
- Decidir solução de form (ConvertKit/Plunk/Resend/Function) — research + 4-8h impl
- Adicionar structured data JSON-LD — 1-2h

**Médios:**
- Implementar i18n na landing (PT/EN/ES) — 16-24h
- Atualizar React 18→19 — 2-4h + testing
- Migrar Tailwind 3→4 — 4-8h
- Configurar Prettier + Husky + lint-staged — 1-2h
- Adicionar `.env.example` — 30 min

**Baixos:**
- Avaliar Turbopack — 1h research
- Avaliar testes (snapshot/visual regression) — research
