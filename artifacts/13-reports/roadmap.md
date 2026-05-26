# 🗺️ Roadmap — Noesis Landing

**Autor:** project-reporter
**Data:** 2026-05-25
**Versão:** 1.0 — primeiro ciclo de auditoria
**Source:** [[findings-consolidated]] (38 temas, 98 findings brutos)

---

## Como ler este roadmap

3 horizontes temporais:

| Horizonte | Quando | Objetivo |
|-----------|--------|----------|
| 🚀 **Quick Wins** | Próximos 7 dias | Eliminar bloqueadores e descuidos visíveis |
| 📈 **Médio Prazo** | 2-6 semanas | Atingir landing "produção" para validação séria de demanda |
| 🌱 **Longo Prazo** | 2-6 meses | Maturidade operacional + i18n + experiments |

Cada item tem:
- **Justificativa** — por que fazer agora
- **Esforço** — XS (<1h), S (1-4h), M (4-8h), L (8-16h)
- **Impacto** — Crítico / Alto / Médio / Baixo
- **Agente sugerido** — quem executa no ciclo de implementação
- **Depende de** — pré-requisitos (se houver)

---

## 🚀 Quick Wins (próximos 7 dias)

> Objetivo: zerar dívidas visíveis, desbloquear deploy, eliminar placeholders.
> Total estimado: **~6h** (1 dia de trabalho focado)

### QW-1 — Corrigir build quebrado 🔥
- **Tema:** T-01
- **Ação:** deletar linha 5 de `src/app/layout.tsx` (`declare module '*.css';`)
- **Justificativa:** sem isso, `npm run build` falha; CI futuro vai falhar; deploy bloqueado
- **Esforço:** XS (1 min)
- **Impacto:** **Crítico** — desbloqueia tudo
- **Agente:** qualquer dev

### QW-2 — Atualizar PostCSS (corrige XSS vuln)
- **Tema:** T-07
- **Ação:** `npm update postcss`
- **Esforço:** XS (5 min)
- **Impacto:** Alto — elimina vuln conhecida sem risco

### QW-3 — Substituir placeholders no Contact
- **Tema:** T-02, T-03
- **Ação:** trocar `github.com/your-org/noesis` e `contact@noesis-platform.io` por valores reais
- **Esforço:** XS (15 min total)
- **Impacto:** **Crítico** para credibilidade

### QW-4 — Atualizar CTA do hero para "Join the waitlist"
- **Tema:** T-05 (parte 1)
- **Ação:** mudar texto + href para `#waitlist` (anchor para nova seção que substituirá Contact)
- **Esforço:** XS (10 min) — ainda sem form funcional, só anchor
- **Impacto:** Alto — alinha com pré-launch + preferência fundadora

### QW-5 — Reordenar `page.tsx` para subir Numbers
- **Tema:** T-13
- **Ação:** mover `<Numbers />` para imediatamente após `<Hero />`
- **Esforço:** XS (5 min)
- **Impacto:** Alto — provas técnicas chegam ao Marina e Caio em segundos

### QW-6 — Adicionar `.nvmrc` + `engines` em package.json
- **Tema:** T-33 (parte)
- **Ação:** `.nvmrc` com `20` (LTS); `engines: { "node": ">=20" }`
- **Esforço:** XS (5 min)
- **Impacto:** Baixo, mas evita "works on my machine"

### QW-7 — Mudar tsconfig `target: "es5"` → `target: "es2022"`
- **Tema:** T-10
- **Ação:** editar `tsconfig.json` + rebuild + medir bundle (esperado: -30 a -40KB)
- **Esforço:** XS (5 min + verificação)
- **Impacto:** Alto — perf gratuita

### QW-8 — Adicionar favicon + apple-touch-icon
- **Tema:** T-04 (parte)
- **Ação:** gerar favicon.ico (32x32), icon.svg, apple-touch-icon.png (180x180); colocar em `public/` (ou `app/` para auto-detect Next 14+)
- **Esforço:** S (1-2h — incluindo design simples baseado no "N")
- **Impacto:** Alto — landing parece "completa"

### QW-9 — Adicionar `robots.txt` + sitemap mínimo
- **Tema:** T-04 (parte)
- **Ação:** `public/robots.txt` simples; `app/sitemap.ts` listando `/` (e futuras páginas conforme adicionadas)
- **Esforço:** XS (30 min)
- **Impacto:** Médio — SEO friendly

---

## 📈 Médio Prazo (2-6 semanas)

> Objetivo: landing pronta para validação séria — captura leads, mede tráfego, comunica differentiation claramente, atende compliance.
> Total estimado: **~80-120h** (2-3 semanas para 1 dev produtivo)

### Sprint 1 (semana 1-2) — Infra + segurança + captura

#### MP-1 — Upgrade Next.js 14→16
- **Tema:** T-06
- **Ação:** rodar codemods `npx @next/codemod@latest`; testar build; smoke test landing
- **Esforço:** M (4-8h se sem breakage; L se houver)
- **Impacto:** **Crítico** — elimina 2 vulns + traz Cache Components + Turbopack
- **Agente:** architect + frontend-dev
- **Autorizado:** ✅ pela fundadora
- **Risco:** médio (codebase simples → fix esperado fácil)

#### MP-2 — Configurar GitHub Actions CI
- **Tema:** T-16
- **Ação:** `.github/workflows/ci.yml` com `npm ci + lint + build` em PR/main
- **Esforço:** S (1-2h)
- **Impacto:** Alto — garante que nunca mais build broken passa silenciosamente
- **Agente:** devops

#### MP-3 — Configurar `vercel.json` com security headers
- **Tema:** T-17
- **Ação:** HSTS + X-Content-Type-Options + Referrer-Policy + Permissions-Policy + CSP permissive
- **Esforço:** S (2-3h)
- **Impacto:** Alto — proteção XSS/clickjacking/MITM
- **Agente:** security-analyst + devops

#### MP-4 — Implementar form de waitlist (Resend + Vercel Function)
- **Tema:** T-05 (parte 2), T-09 (parte)
- **Ação:** Vercel Function recebendo email + persona; envio via Resend; armazenar (Vercel KV ou Resend Audiences); email de boas-vindas
- **Esforço:** L (8-12h)
- **Impacto:** **Crítico** — começa captura de leads estruturada
- **Agente:** backend-dev + frontend-dev
- **Depende de:** MP-5 (privacy policy obrigatória antes)

#### MP-5 — Escrever Privacy Policy mínima + página `/privacy`
- **Tema:** T-08
- **Ação:** página estática cobrindo: o que coletamos, por quê, retenção, direitos, contato
- **Esforço:** S (3-4h)
- **Impacto:** **Crítico** (legal) — sem isso, MP-4 viola LGPD/GDPR
- **Agente:** tech-writer + frontend-dev

#### MP-6 — Integrar Vercel Analytics
- **Tema:** T-09 (parte)
- **Ação:** `npm install @vercel/analytics` + componente em layout
- **Esforço:** S (1-2h)
- **Impacto:** **Crítico** — dá visibilidade pra primeira vez
- **Agente:** frontend-dev

#### MP-7 — Adicionar og-image (1200x630)
- **Tema:** T-04 (parte)
- **Ação:** design da imagem (logo + tagline + snippet de API estilizado) + metadata
- **Esforço:** S (2-3h)
- **Impacto:** Alto — social shares finalmente convertem

### Sprint 2 (semana 3-4) — Conversão + a11y + estrutura

#### MP-8 — Substituir Contact por seção Waitlist segmentada
- **Tema:** T-05 (finalização)
- **Ação:** form com email + radio "what describes you" + consent checkbox + no-spam message
- **Esforço:** S (4-5h) — depende de MP-4
- **Impacto:** Alto — captura intent estruturado
- **Agente:** frontend-dev

#### MP-9 — Hamburger menu mobile
- **Tema:** T-11
- **Ação:** componente collapse + trap focus + a11y
- **Esforço:** M (4-6h)
- **Impacto:** Alto — mobile ~50% do tráfego
- **Agente:** frontend-dev

#### MP-10 — Adicionar `Pricing` + `Docs` no navbar (com páginas stub)
- **Tema:** T-12
- **Ação:** 2 links + páginas `/pricing` e `/docs` com "Coming soon"
- **Esforço:** S (3-4h)
- **Impacto:** Alto — Dani não abandona; Caio não frustra
- **Agente:** frontend-dev

#### MP-11 — Reduzir Features para 4 pilares + grid secundário
- **Tema:** T-14
- **Ação:** 4 cards grandes (pilares de differentiation) + subgrid "também incluso"
- **Esforço:** M (6-8h)
- **Impacto:** Alto — hierarquia narrativa
- **Agente:** ux-designer + frontend-dev

#### MP-12 — Reescrever Use Cases alinhados a personas
- **Tema:** T-15
- **Ação:** 3 cenários nomeados (Marina/support, Marina/in-product, Dani/indie)
- **Esforço:** S (4-5h)
- **Impacto:** Alto — cada persona se vê
- **Agente:** product-strategist + frontend-dev

#### MP-13 — Acessibilidade: contraste + focus + skip-link
- **Temas:** T-18, T-19, T-20
- **Ação:** substituir text-zinc-600/700 por 400/500; adicionar `focus-visible:ring`; adicionar skip-link
- **Esforço:** S (3-4h cumulativo)
- **Impacto:** Alto — WCAG AA conformance
- **Agente:** frontend-dev + qa-engineer

#### MP-14 — Reescrever headline do Hero (eliminar "Strategic Knowledge Platform with AI")
- **Tema:** T-21
- **Ação:** decidir entre A/B/C do positioning; recomendação inicial: A "Knowledge that answers — não só armazena"
- **Esforço:** XS (decisão + 5 min copy)
- **Impacto:** Médio-Alto
- **Agente:** product-strategist + frontend-dev

### Sprint 3 (semana 5-6) — SEO + seções novas

#### MP-15 — Structured data JSON-LD (Organization + SoftwareApplication)
- **Tema:** T-22
- **Esforço:** S (1-2h)
- **Impacto:** Médio-Alto (SEO orgânico)
- **Agente:** frontend-dev

#### MP-16 — Adicionar seção "How it works" (RAG flow diagrama)
- **Tema:** T-24
- **Esforço:** M (6-8h)
- **Impacto:** Alto para Caio (desmistifica)
- **Agente:** ux-designer + frontend-dev

#### MP-17 — Adicionar seção "Pricing preview"
- **Tema:** T-25
- **Esforço:** S (4-5h)
- **Impacto:** Alto para Dani
- **Agente:** ux-designer + frontend-dev

#### MP-18 — Configurar Prettier + lint-staged + husky
- **Tema:** T-32
- **Esforço:** S (1-2h)
- **Impacto:** Médio (DX)
- **Agente:** devops

#### MP-19 — `.env.example` + ativar secret scanning GitHub
- **Temas:** T-33 (parte), T-34 (parte)
- **Esforço:** XS (30 min cumulativo)
- **Impacto:** Médio (segurança preventiva)
- **Agente:** security-analyst

---

## 🌱 Longo Prazo (2-6 meses)

> Objetivo: maturidade operacional, internacionalização, experimentos, design system.
> Total estimado: **~80-120h** distribuídos ao longo de 2-6 meses

### LP-1 — i18n da landing (PT-BR + EN)
- **Tema:** T-23
- **Ação:** integrar `next-intl` com subdiretórios para static export; traduzir copy; switcher discreto no nav
- **Esforço:** L (16-24h)
- **Impacto:** Alto (mercado BR/LATAM)
- **Agente:** frontend-dev + tech-writer (tradução) + product-strategist (revisão de tom em PT)
- **Autorizado:** ✅ pela fundadora

### LP-2 — Design system formal + light mode
- **Temas:** T-27, T-28
- **Ação:** definir tokens semânticos (`--bg`, `--fg`, `--accent`, `--success`, `--warning`, `--error`); migrar globals.css; toggle light/dark
- **Esforço:** L (12-20h)
- **Impacto:** Médio
- **Agente:** ux-designer + frontend-dev

### LP-3 — Ícones custom para os 4 pilares
- **Tema:** T-29
- **Ação:** SVGs custom em vez de Lucide genéricos
- **Esforço:** M (8h)
- **Impacto:** Médio (marca + memorabilidade)
- **Agente:** ux-designer

### LP-4 — Logos das techs + links de docs no TechStack
- **Tema:** T-30
- **Esforço:** S (4-6h)
- **Impacto:** Médio (Caio aprecia)

### LP-5 — Snyk/Socket.dev no CI
- **Tema:** T-34
- **Esforço:** S (1-2h setup)
- **Impacto:** Médio (segurança preventiva)
- **Agente:** security-analyst

### LP-6 — Métrica de qualidade nos Numbers
- **Tema:** T-35
- **Ação:** substituir 1 das 6 métricas por algo como "97% citation accuracy"
- **Esforço:** XS (decisão + copy)
- **Impacto:** Médio (diferencia volume → qualidade)
- **Agente:** product-strategist

### LP-7 — Footer completo (Privacy/Terms/Status/Repo)
- **Tema:** T-36
- **Esforço:** S (3-4h)
- **Impacto:** Médio (profissionalismo)
- **Agente:** frontend-dev

### LP-8 — Polimento visual (count-up, scroll-spy, active states, etc)
- **Tema:** T-37
- **Esforço:** S-M (~10h agregado)
- **Impacto:** Baixo individualmente, médio coletivo
- **Agente:** ux-designer + frontend-dev

### LP-9 — Test suite (Playwright smoke + axe-core + Lighthouse CI)
- **Tema:** T-38
- **Esforço:** M (4-6h setup)
- **Impacto:** Médio (garante quality gate)
- **Agente:** qa-engineer + devops

### LP-10 — Refactor Hero em subcomponentes (preparação para A/B testing)
- **Tema:** T-31
- **Ação:** só fazer se vier A/B test ou variantes; senão "premature abstraction"
- **Esforço:** S (2-3h)
- **Impacto:** Baixo (até A/B test surgir)
- **Agente:** frontend-dev

### LP-11 — Validar personas com 5-10 entrevistas qualitativas
- **Source:** product-strategist risk (não é finding de audit, mas é compromisso)
- **Ação:** rodar entrevistas com candidatos a Marina/Caio/Dani; iterar personas
- **Esforço:** ~15h (5 entrevistas × 1h + transcript/synthesis)
- **Impacto:** **Alto** (toda copy/decisão de produto é baseada em hipóteses não-validadas hoje)
- **Agente:** product-strategist + fundadora
- **Nota crítica:** sem isso, a confiança no positioning permanece especulativa

### LP-12 — Avaliar Tailwind 3→4 + Lucide → 1.x
- **Sources:** Arch P2 medium
- **Esforço:** M (6-10h total)
- **Impacto:** Baixo-Médio
- **Quando:** quando design system formal (LP-2) for endereçado

---

## 📊 Resumo de esforço por horizonte

| Horizonte | Itens | Esforço | Calendário |
|-----------|-------|---------|------------|
| 🚀 Quick Wins | 9 | ~6h | 1 dia focado |
| 📈 Médio Prazo | 19 (3 sprints) | ~80-120h | 2-6 semanas |
| 🌱 Longo Prazo | 12 | ~80-120h | 2-6 meses |
| **Total** | **40** | **~170-250h** | **2-7 meses** |

### Recomendação realista para fundador solo
Se uma única pessoa (a fundadora) executar:
- **Quick Wins:** 1 sábado focado
- **MP Sprint 1:** 2 semanas em paralelo com trabalho da plataforma
- **MP Sprint 2:** 2 semanas
- **MP Sprint 3:** 2 semanas
- **Longo Prazo:** distribuído conforme prioridades evoluem

Se contratar 1 dev por algumas semanas: **MP completo em 3 semanas** + delegação dos LP.

---

## 🎯 Métricas de sucesso pós-roadmap

Quando MP completo, esperar:

| Métrica | Antes | Depois (esperado) |
|---------|-------|-------------------|
| Build status | ❌ broken | ✅ verde no CI |
| Vulns Next/PostCSS | 3 ativas | 0 |
| Lighthouse Perf (estimado) | 70-85 | 90+ |
| Lighthouse A11y | ~70 | 95+ |
| SEO (rich preview) | 0 | ✅ og-image + JSON-LD |
| Conversion infra | 0 (mailto) | Form estruturado + analytics |
| Mobile UX | nav quebrado | ✅ hamburger + responsivo |
| LGPD/GDPR ready | ❌ | ✅ (privacy + consent) |
| Leads capturáveis | 0 | quantidade visível em dashboard |
| Visibilidade de tráfego | 0 | Vercel Analytics rodando |

---

## 🚧 Riscos do roadmap

| Risco | Mitigação |
|-------|-----------|
| Upgrade Next 14→16 traz breakage maior que estimado | MP-1 tem buffer; rodar codemods; pode pausar e voltar |
| Resend/Vercel Function tem fricção de setup que estoura tempo | Trocar para Formspree/Tally como fallback (impacto: menos controle) |
| i18n da landing (LP-1) é mais trabalhoso que estimado pelo static export | Aceitar como L+; ou adiar se PT-BR ainda não é prioridade absoluta |
| Personas se revelem erradas nas entrevistas (LP-11) | É o propósito — re-investir em discovery v2 |
| Design system completo (LP-2) atrasa porque não é "produto" | OK postergar; landing vive bem com tokens minimal por mais 6+ meses |

---

## 🔄 Quando reauditar?

Sugerido: rodar novo ciclo de auditoria **3-6 meses após MP completar** ou quando atingir um dos triggers:

- ✅ 100 leads na waitlist (validação inicial — re-rodar discovery para iterar)
- ✅ Lançamento da plataforma para beta (mudar landing de "pre-launch" para "early access")
- ✅ Decisão de pricing tomada (refazer messaging + Pricing page real)
- ⚠️ Lighthouse Perf cair abaixo de 80 em produção (perf regression)
- ⚠️ Bounce rate > 70% (sinal de mensagem desalinhada)

---

## 📝 Decisões pendentes residuais

Estas decisões não bloqueiam o roadmap, mas precisam input em algum momento:

| # | Decisão | Quando |
|---|---------|--------|
| D1 | Vercel Analytics confirmado vs Plausible/Posthog? | Antes de MP-6 |
| D2 | Cores em architecture.tsx (intencional?) | Antes de MP-11 (se for redesign) |
| D3 | Pricing real (US$X/Y/Z) | Antes de MP-17 sair de "preview" para real |
| D4 | Repo público da landing — manter publicado? | Decisão de marca/transparência |
| D5 | Light mode é prioridade? | Antes de LP-2 |
