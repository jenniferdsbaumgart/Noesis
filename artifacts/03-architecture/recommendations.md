# Tech Recommendations — Noesis Landing

**Autor:** architect
**Data:** 2026-05-25
**Para:** project-reporter (fase 13) consolidar no roadmap final
**Baseado em:** [[tech-audit]]

---

## Sumário

28 recomendações técnicas priorizadas. Algumas dependem de decisões a tomar primeiro (marcadas como **DECISÃO PENDENTE**).

| Prioridade | Quantidade | Esforço total estimado |
|------------|------------|------------------------|
| 🔥 P0 Critical | 6 | ~12h |
| 🚀 P1 High | 9 | ~30h |
| 📈 P2 Medium | 8 | ~50h |
| 🎨 P3 Low | 5 | ~10h |

---

## P0 — Critical (resolver na próxima semana)

### REC-T01 — Atualizar PostCSS (corrige XSS GHSA-qx2v-qp2m-jg93)
- **Mudança:** `npm update postcss` (8.5.8 → 8.5.15, não-breaking)
- **Esforço:** XS (5 min)
- **Impacto:** elimina vuln conhecida
- **Risco:** quase zero — patch update

### REC-T02 — Adicionar favicon.ico (mínimo + variantes modernas)
- **Mudança:** colocar em `public/`: `favicon.ico` (32x32), `icon.svg`, `apple-touch-icon.png` (180x180)
- **Esforço:** S (1-2h — design ou geração via tool)
- **Impacto:** ALTO — sem favicon, browser tab fica genérico; transmite descuido
- **Notas:** Next 14+ detecta automaticamente arquivos com nomes `favicon`/`icon`/`apple-icon` em `app/` ou `public/`

### REC-T03 — Adicionar og-image.png (1200x630)
- **Mudança:** asset visual para `public/og-image.png` + referenciar em `app/layout.tsx` metadata
- **Esforço:** S (2-3h — design)
- **Impacto:** MUITO ALTO — quando alguém compartilhar link em LinkedIn/Twitter/Slack, preview visual aumenta CTR 2-3x
- **Sugestão de conteúdo:** logo + tagline + screenshot do snippet de API (mantém consistência com hero)

### REC-T04 — Adicionar robots.txt
- **Mudança:** `public/robots.txt` simples permitindo tudo + apontando para sitemap
- **Esforço:** XS (15 min)
- **Impacto:** médio — sinaliza controle a search engines
- **Conteúdo recomendado:**
  ```
  User-agent: *
  Allow: /

  Sitemap: https://noesis-platform.io/sitemap.xml
  ```

### REC-T05 — Adicionar sitemap.xml
- **Mudança:** Next 14+ tem `app/sitemap.ts` que gera estaticamente; criar com URLs canônicas
- **Esforço:** XS (30 min)
- **Impacto:** médio — Google indexação otimizada

### REC-T06 — Adicionar `.nvmrc` + campo `engines` no package.json
- **Mudança:** `.nvmrc` com `25` (ou versão LTS preferida); `engines: { "node": ">=20" }` no package.json
- **Esforço:** XS (5 min)
- **Impacto:** baixo, mas evita "works on my machine" para colaboradores

---

## P1 — High (próxima sprint)

### REC-T07 — Atualizar TypeScript target para `es2022`
- **Mudança:** em `tsconfig.json`, `target: "es5"` → `target: "es2022"`
- **Esforço:** XS (5 min testar)
- **Impacto:** ALTO — elimina polyfills desnecessários, reduz bundle ~30-40KB
- **Risco:** baixo — Next 14+ suporta; todos browsers modernos suportam ES2022

### REC-T08 — Configurar security headers (depende do host)
- **Mudança:** dependendo do host:
  - **Vercel:** `vercel.json` com `headers` array
  - **Netlify:** `_headers` file
  - **Cloudflare Pages:** `_headers` file
- **Headers mínimos:** `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` mínima, opcional `Content-Security-Policy` (avaliar fricção)
- **Esforço:** S (2-3h)
- **Impacto:** alto — proteção XSS, clickjacking, MITM
- **DECISÃO PENDENTE:** qual host está sendo usado?

### REC-T09 — Adicionar GitHub Actions: build + lint em PRs
- **Mudança:** `.github/workflows/ci.yml` rodando `npm ci`, `npm run lint`, `npm run build` em PRs e main
- **Esforço:** S (1-2h)
- **Impacto:** alto — evita merge de código que quebra build

### REC-T10 — Adicionar Vercel Analytics OU Plausible
- **Mudança:** integrar (recomendação: **Vercel Analytics** se deploy é Vercel — script único, privacy-first, sem cookie banner necessário em alguns mercados)
- **Esforço:** S (1-2h)
- **Impacto:** ALTO — sem analytics, sem decisão informada
- **DECISÃO PENDENTE:** Vercel Analytics (paid após free tier) vs Plausible (paid SaaS) vs Posthog (free tier generoso) vs Umami (self-host)

### REC-T11 — Adicionar structured data (JSON-LD)
- **Mudança:** Schema.org `Organization` + `SoftwareApplication` no layout.tsx
- **Esforço:** S (1-2h)
- **Impacto:** alto para SEO orgânico — Google entende contexto rico

### REC-T12 — Decidir solução de form de waitlist (DECISÃO PENDENTE)
- **Opções a avaliar:**
  - **A — Vercel Functions + sua própria DB** (Vercel KV / Vercel Postgres / Neon) — controle total, mais setup
  - **B — Resend** (transactional email — tem audience features simples) — bom se quiser email transacional também
  - **C — Plunk** (open-source-ish, simple, focused em waitlist/notify) — alinhado com filosofia indie
  - **D — ConvertKit** (mais estabelecido, mas mais caro e creator-focused)
  - **E — Loops** (moderna, simples) — bom UX para fundador
  - **F — Formspree / Tally** (formulário sem backend próprio) — mais rápido para começar
- **Esforço dependendo de escolha:**
  - F: XS (1-2h)
  - B/E: S (3-5h)
  - C: S (4-6h)
  - A: M-L (8-16h)
- **Impacto:** crítico — sem isso, REC-001 (UX) não conclui
- **Recomendação inicial:** **B (Resend)** ou **E (Loops)** — combinam waitlist + envio de email de boas-vindas + analytics simples; baratos no início

### REC-T13 — Adicionar `.env.example` documentando keys necessárias
- **Mudança:** arquivo `.env.example` listando variáveis (analytics, form service, etc.)
- **Esforço:** XS (15 min — começa vazio, cresce com cada integração)
- **Impacto:** médio — onboarding de colaboradores

### REC-T14 — Adicionar Prettier + lint-staged + husky pre-commit
- **Mudança:** padrão simples; `.prettierrc` + script no package.json
- **Esforço:** S (1-2h)
- **Impacto:** médio — consistência de formato

### REC-T15 — Decidir sobre upgrade Next 14→16 (DECISÃO PENDENTE)
- **Mudança avaliada:** Next 14.2.35 → Next 16.x
- **Esforço:** M-L (4-16h dependendo de breaking changes encontradas)
- **Impacto:** ALTO — corrige 2 vulns + traz Turbopack default + Cache Components + várias melhorias
- **Risco:** Médio — código atual é simples (só Server Components estáticos + tailwind), deve ter migration limpa. Mas necessário rodar codemods e testar build.
- **Recomendação:** fazer upgrade Next 14→15 primeiro (mais conservador), depois 15→16. Codemods automatizam parte: `npx @next/codemod@latest`
- **DECISÃO PENDENTE:** janela para fazer este upgrade

---

## P2 — Medium (ciclo seguinte)

### REC-T16 — Atualizar React 18→19
- **Mudança:** `npm install react@19 react-dom@19 @types/react@19 @types/react-dom@19`
- **Esforço:** S-M (2-4h + smoke test)
- **Impacto:** médio — moderniza, prep para Next 16
- **Risco:** baixo — código não usa nada que mudou na API

### REC-T17 — Avaliar migração Tailwind 3→4
- **Mudança:** Tailwind 4 mudou config para CSS-first; major change
- **Esforço:** M (4-8h)
- **Impacto:** médio — performance build melhor, configuração mais limpa
- **Risco:** médio — config atual tem extends de cor que precisa migrar; recomenda-se rodar codemod oficial

### REC-T18 — Implementar i18n na landing (PT-BR + EN + ES)
- **Mudança:** integrar `next-intl` (consistente com app principal); strategy para static export é subdiretórios por locale (`/pt-br/`, `/en/`, `/es/`)
- **Esforço:** L (16-24h)
- **Impacto:** ALTO se Brasil/LATAM são prioridade; médio se EN-only basta no início
- **DECISÃO PENDENTE:** confirmar prioridade de mercados
- **Dependência:** alinhar com REC-T08 (security headers podem precisar mudar com subdiretórios)

### REC-T19 — Migrar para Vercel (ou confirmar host atual)
- **Mudança:** DECISÃO PENDENTE — qual host está em uso?
- **Esforço:** S (1-3h se mudar de host)
- **Impacto:** habilita REC-T08 e REC-T10 com integração simples
- **Recomendação:** **Vercel** se ainda não está — best DX com Next, analytics, preview deploys, edge functions caso REC-T12 vá para opção A

### REC-T20 — Adicionar Lucide React update review
- **Mudança:** lucide-react@0.400 → 1.16
- **Esforço:** S (1-2h smoke test — verificar nomes de ícones)
- **Impacto:** baixo — alguns ícones podem ter renomeado
- **Risco:** baixo

### REC-T21 — Adicionar `vercel.json` ou `next.config.js` redirects/rewrites placeholder
- **Mudança:** preparar para adicionar redirects (ex: `/docs` → docs site externo se não fizer página própria)
- **Esforço:** XS (15 min)
- **Impacto:** baixo até precisar

### REC-T22 — Modularizar metadata (separar OG, Twitter, JSON-LD em utils)
- **Mudança:** quando estrutura crescer (REC-T11 + REC-T18), centralizar geração de metadata
- **Esforço:** S (2-3h)
- **Impacto:** baixo-médio — manutenibilidade

### REC-T23 — Adicionar testes (snapshot ou Playwright básico)
- **Mudança:** opcional — Playwright para smoke test (landing carrega + CTA funciona)
- **Esforço:** M (4-6h setup + casos)
- **Impacto:** baixo — landing é simples; safety net se tiver paginação/i18n depois

---

## P3 — Low (polimento técnico)

### REC-T24 — Avaliar Turbopack
- **Mudança:** habilitar Turbopack após upgrade Next 16 (`next dev --turbo`)
- **Esforço:** XS (1h research)
- **Impacto:** baixo para landing simples — gain ~30% no dev server start

### REC-T25 — Adicionar `meta name="theme-color"` por locale/scheme
- **Mudança:** match com cor accent-600 (`#0891b2`)
- **Esforço:** XS (10 min)
- **Impacto:** baixo

### REC-T26 — Atualizar @types/node, @types/react patch versions
- **Mudança:** `npm update @types/node @types/react @types/react-dom`
- **Esforço:** XS (5 min)
- **Impacto:** baixo

### REC-T27 — Avaliar code-splitting da página
- **Mudança:** dado que tudo está em components carregados de uma vez, considerar `dynamic()` para Architecture (componente maior)
- **Esforço:** S (1-2h research + medir)
- **Impacto:** baixo — landing é pequena; provavelmente não compensa

### REC-T28 — Adicionar bundle analyzer
- **Mudança:** `@next/bundle-analyzer` para visibilidade de chunks
- **Esforço:** XS (30 min setup)
- **Impacto:** baixo — útil ocasionalmente

---

## Decisões pendentes (consolidado)

| Decisão | Recomendação inicial | Quem decide | Quando |
|---------|---------------------|-------------|--------|
| Qual host? (Vercel/Netlify/CF Pages) | Vercel (melhor DX com Next) | Fundadora | Antes de REC-T08, T10, T19 |
| Solução de form (REC-T12) | Resend ou Loops (simples + email transactional) | Fundadora | Antes de implementar REC-001 (UX) |
| Solução de analytics (REC-T10) | Vercel Analytics se Vercel; Plausible se prefere open-source | Fundadora | Junto com decisão de host |
| Janela para upgrade Next 14→16 (REC-T15) | Fazer em janela própria, antes de qualquer feature nova | Fundadora | Ideal: ciclo de implementação 1 |
| Prioridade de mercados (PT/EN/ES vs só EN) (REC-T18) | Definir antes de comprometer com i18n | Fundadora | Antes de ciclo de implementação 2 |

---

## Estimativa total

| Esforço unidade | Quantidade | Horas |
|------------------|------------|-------|
| XS | 11 | ~6 |
| S | 11 | ~25 |
| M | 4 | ~20 |
| L | 2 | ~50 |
| **Total** | **28** | **~100h** |

**Em dev-days:** ~13 dev-days (1 dev a 7-8h/dia produtiva), ou **~2.5 semanas para 1 dev**.

Recomendação: **P0 (1 dia) + P1 essenciais (1 semana)** = primeiro ciclo de implementação técnico. P2+P3 = ciclo seguinte ou conforme aparecerem.

---

## Notas para o architect do próximo ciclo

1. **Antes de qualquer feature nova:** completar P0 (segurança + assets SEO mínimos)
2. **Upgrade Next deve preceder** qualquer adição de form/analytics — evita refazer integração
3. **Decisão de host é gargalo** — sem ela, REC-T08, T10, T19 ficam parados
4. **i18n na landing** é grande compromisso — confirmar com fundadora que vale o investimento antes de fazer
5. **Não over-engineer:** landing simples deve permanecer simples. Sem k8s, sem microsserviços, sem 5 envs.
