# QA Audit — Noesis Landing

**Autor:** qa-engineer
**Data:** 2026-05-25
**Modo:** Auditoria (sem servidor live — heurística + build estático)
**Inputs:** código fonte, `out/` (build anterior), npm run build (atual), `package.json`, [[02-design/audit-report]], [[03-architecture/tech-audit]]

---

## ⚠️ Disclaimer

Não foi possível rodar Lighthouse/axe-core/Pa11y em produção live (sem servidor rodando nesta auditoria). Findings de **performance** e **a11y** quantitativos abaixo são **heurísticos** baseados em análise estática + build artifacts. Recomendado validar com tooling real antes da fase de implementação.

---

## 1. Sumário executivo

**Build atual: ❌ QUEBRADO.** Erro de TypeScript impede `npm run build` de completar. O `out/` no repo é de versão anterior. Sem isso resolvido, deploy CI falhará.

| Severidade | Quantidade |
|------------|------------|
| 🔴 Critical | 4 |
| 🟠 High | 7 |
| 🟡 Medium | 9 |
| 🟢 Low | 4 |

---

## 2. 🚨 Build & Type-check

### Q-CRIT-01 — Build quebrado: type error em `src/app/layout.tsx:5`

**Erro:**
```
Type error: Invalid module name in augmentation, module '*.css' cannot be found.

 3 | import { GeistMono } from 'geist/font/mono';
 4 |
 5 | declare module '*.css';
   |                ^
```

**Causa:** `declare module '*.css'` é uma global augmentation que só funciona em arquivos `.d.ts` declarations. Em `layout.tsx`, viola a regra de TypeScript.

**Fix recomendado:**
- **Opção A (correta):** mover declaração para `src/types/css.d.ts` (ou similar). Ou simplesmente remover — Next 14 já tipa CSS imports.
- **Opção B (quick):** apenas remover a linha 5 — `import './globals.css'` funciona sem declarar o módulo manualmente.

**Severidade:** 🔴 Critical — bloqueia deploy

**Esforço de fix:** XS (1 min — deletar 1 linha)

**Notas:** o fato de `out/` existir e ter build válido sugere que esta regressão é recente. Worth fazer git blame para entender quando foi introduzida.

---

## 3. Performance (heurística — sem Lighthouse live)

### Q-HIGH-01 — Bundle JS total ~665KB descompactado (~160KB gz estimado)
- **Source:** [[tech-audit]] — chunks principais somam 665KB
- **Para landing estática:** acima do ideal (target: <120KB gz para landing simples)
- **Causa principal:** `target: "es5"` em tsconfig (~35KB de polyfills)
- **Lighthouse estimado:** Performance score provavelmente 70-85 (heurístico); LCP em conexão 4G pode passar de 2.5s
- **Validação necessária:** rodar Lighthouse em build local + Vercel preview deploy

### Q-HIGH-02 — Sem `next/image` (sem otimização automática de imagens)
- **Source:** análise de componentes
- **Status:** OK porque atualmente **não há imagens** na landing
- **Risco:** ao adicionar og-image, screenshots, logos — usar `next/image` (com `unoptimized` no static export) ou fornecer múltiplos formatos manualmente (.webp + fallback)

### Q-HIGH-03 — Sem preload/preconnect para assets externos
- **Source:** `out/index.html`
- **Status atual:** sem externos críticos (fonts via geist embutido); irrelevante hoje
- **Relevante quando:** adicionar Vercel Analytics (preconnect a `vitals.vercel-insights.com`), Resend (form), etc.

### Q-MED-01 — Sem Web Vitals tracking
- **Source:** sem analytics
- **Sem isso:** não há visibilidade de LCP/INP/CLS real-user
- **Resolvido por:** REC-T10 (Vercel Analytics) — captura Web Vitals automaticamente

### Q-MED-02 — `<html>` sem `dir="ltr"` explícito
- **Source:** layout.tsx
- **Impacto baixo:** ltr é default; relevante quando i18n for adicionado (PT-BR/EN são ltr; quando adicionar AR/HE seria crítico)

---

## 4. Acessibilidade (heurística + WCAG 2.1 AA checklist)

### Q-HIGH-A1 — Contraste insuficiente em texto pequeno
- **Source:** confirma [[audit-report]] AC1, AC2
- **Detalhes:**
  - `text-zinc-700` sobre `bg-black` ≈ 2.5:1 ❌ falha AA (mínimo 4.5:1 normal, 3:1 large)
  - `text-zinc-600` sobre `bg-black` ≈ 3.4:1 ❌ falha AA para texto normal
  - `text-zinc-500` sobre `bg-black` ≈ 4.4:1 — borderline (text-sm); ✅ se large
  - `text-zinc-400` sobre `bg-black` ≈ 5.96:1 ✅
- **Onde corrigir:** footer copyright (`text-zinc-700`), terminal preview comments (`text-zinc-500`/`text-zinc-600`), DecisionCards e UseCases descriptions
- **Esforço:** S (2-3h — replace + re-check)

### Q-HIGH-A2 — Focus states invisíveis para keyboard nav
- **Source:** confirma AC3
- **Detalhes:** links e botões usam apenas `hover:` — sem `focus:` ou `focus-visible:` explícitos
- **Default Tailwind:** browser default ring (azul) que pode estar suprimido por outline:none implícito
- **Esforço:** S (2h — adicionar `focus-visible:ring-2 focus-visible:ring-accent-400` em interactive elements)

### Q-HIGH-A3 — Sem skip-link "Skip to main content"
- **Source:** confirma AC4
- **Impacto:** keyboard users precisam tab por todo navbar (5 tabs no desktop) antes de chegar no conteúdo
- **Esforço:** XS (15 min — sr-only link + focus reveal)

### Q-MED-A1 — Imagens decorativas sem `aria-hidden`
- **Source:** ícones Lucide em Features (10x), UseCases (3x), Contact (2x), Numbers (0x — texto)
- **Status:** Lucide renderiza como SVG inline; verificar se SR anuncia "graphic" indevidamente
- **Esforço:** S (1-2h — `aria-hidden="true"` em cada ícone decorativo)

### Q-MED-A2 — `<nav>` sem `aria-label`
- **Source:** confirma TA3
- **Detalhes:** se houvesse multiple navs (footer + main), SR confundiria; só um nav hoje, então impact é menor
- **Esforço:** XS (5 min)

### Q-MED-A3 — Headings semânticos — falta verificar com SR real
- **Source:** análise estática
- **Estrutura atual:** h1 em hero ✅, h2 em sections ✅, h3 em cards ✅ — hierarquia correta
- **Risco:** algum heading visualmente similar mas semanticamente diferente pode confundir leitor de tela
- **Validação:** screen reader test (VoiceOver/NVDA) no build live

### Q-MED-A4 — Touch targets verificar mínimo 44x44px
- **Source:** análise visual
- **Risco:** badge no hero (`px-4 py-1.5`) é decorativo, mas links no footer usam `text-sm` em flex-row — pode ficar apertado no mobile (verificar com Lighthouse mobile tap targets)
- **Esforço:** S (1-2h — verificação + ajuste)

### Q-MED-A5 — Sem `prefers-reduced-motion` respeitado
- **Source:** análise de globals.css + componentes
- **Detalhes:** transitions em hover (`transition`, `transition hover:bg-accent-500`) — não respeitam `prefers-reduced-motion`
- **Impacto:** baixo (animações são mínimas), mas é boa prática
- **Esforço:** XS (adicionar `motion-safe:` ou media query)

---

## 5. Links & navegação

### Q-CRIT-02 — Link GitHub quebrado: `github.com/your-org/noesis`
- **Source:** confirma [[audit-report]] C1
- **Severidade:** crítica para credibilidade técnica (Caio veria, descartaria)
- **Esforço:** XS — atualizar para URL real ou remover

### Q-CRIT-03 — Email placeholder: `contact@noesis-platform.io`
- **Source:** confirma [[audit-report]] C3
- **Validação:** verificar se domínio existe (DNS lookup) e mailbox ativa antes de manter
- **Esforço:** XS — confirmar/substituir

### Q-HIGH-LK1 — Anchor links (`#features`, `#architecture`, etc.) — verificar smooth scroll funciona
- **Source:** análise — `html { scroll-behavior: smooth }` em globals.css ✅
- **Status:** funciona, mas verificar no Safari (suporte foi tardio) e respeitando reduced-motion
- **Esforço:** XS (smoke test)

### Q-MED-LK1 — Sem 404 page customizada além do default
- **Source:** `out/404.html` existe (Next auto-gera)
- **Risco:** página 404 default é genérica; quando criar páginas como `/pricing` `/docs` stubs, 404 ainda será relevante
- **Esforço:** S (1-2h — criar `app/not-found.tsx`)

---

## 6. Responsividade

### Q-CRIT-04 — Navbar mobile sem menu (hamburger ausente)
- **Source:** confirma [[audit-report]] N4, N5, R1
- **Detalhes:** em <768px, navbar mostra só logo + CTA "Get in Touch"; usuário não navega entre seções
- **Severidade:** critical em mobile (estimativa: ~50% do tráfego)
- **Esforço:** M (4-6h — componente collapse + a11y trap focus)

### Q-HIGH-R1 — Verificar quebra em telas muito estreitas (<360px)
- **Source:** análise estática
- **Componentes suspeitos:**
  - Hero h1 `text-5xl` (48px) — pode quebrar em ~340px
  - Architecture diagrama com tags flex-wrap — pode comprimir
  - Numbers grid `grid-cols-2` — apertado
- **Validação:** Chrome DevTools 320px width ou Lighthouse mobile
- **Esforço:** S (validação + fix se quebrar)

### Q-MED-R1 — Sem `meta viewport` customizado
- **Source:** Next 14 inclui `<meta name="viewport" content="width=device-width, initial-scale=1" />` por default ✅
- **Status:** OK

### Q-MED-R2 — Verificar landscape em tablet (não-óbvio)
- **Esforço:** S (smoke test em 1024x768)

---

## 7. SEO técnico (complementa arch audit)

### Q-HIGH-SE1 — Sem `<link rel="canonical">` por página
- **Source:** análise de layout.tsx
- **Impacto:** quando i18n e múltiplas páginas forem adicionados, canonical evita duplicate content
- **Esforço:** XS para landing single-page; S quando crescer

### Q-MED-SE1 — Sem `hreflang` (necessário quando i18n vier)
- **Source:** análise
- **Esforço:** S quando adicionar PT-BR

### Q-MED-SE2 — Sem `prev/next` page meta (não relevante para landing)
- **Status:** N/A

---

## 8. Cross-browser

**Sem capacidade de testar nesta auditoria.** Recomendações:

- Testar manualmente em Safari 17+ (macOS + iOS), Chrome 121+, Firefox 124+, Edge
- Atenção especial: `text-wrap: balance`, `backdrop-blur-xl`, gradient text — features modernas
- Recomendação: BrowserStack ou similar quando for fase de implementação

---

## 9. Funcional / Behavioral

### Q-MED-F1 — Sem teste de formulário (não há form, mas planejado)
- **Quando adicionar form de waitlist:** testar fluxo (sucesso, validação, erro, double-submit, rate-limit, email format)
- **Esforço:** M (4-6h ao implementar)

### Q-MED-F2 — Anchor scroll desktop vs mobile
- **Verificar:** scroll-padding-top necessário para navbar fixa não cobrir conteúdo ao clicar em link
- **Esforço:** XS — adicionar `scroll-padding-top: 4rem` em html

### Q-MED-F3 — Sem feedback visual em CTA clicks
- **Observação:** CTAs primárias só têm `hover` — sem indicação de "click" (active state)
- **Esforço:** XS — adicionar `active:scale-95` ou similar

---

## 10. Recomendações priorizadas (resumo)

### P0 — Crítico imediato
- **Q-FIX-01:** Corrigir build quebrado em `layout.tsx:5` — 1 min
- **Q-FIX-02:** Link GitHub quebrado — 15 min
- **Q-FIX-03:** Email placeholder — 10 min
- **Q-FIX-04:** Hamburger menu mobile — 4-6h

### P1 — Alto (próximo sprint)
- Aumentar contraste de zinc-600/700 — 2-3h
- Adicionar focus-visible em interactive elements — 2h
- Adicionar skip-link — 15 min
- Validar bundle + Lighthouse em produção real
- Adicionar `aria-hidden="true"` em ícones decorativos — 1-2h
- Verificar quebras em <360px — 1h

### P2 — Médio (ciclo seguinte)
- 404 page customizada
- `scroll-padding-top` para anchor scroll respeitar navbar
- `active:` states em CTAs
- `prefers-reduced-motion`

### P3 — Baixo
- `aria-label` em `<nav>`
- Cross-browser test suite

---

## 11. Validações que precisam de tooling/ambiente live

Esta lista deve ser feita pelo qa-engineer/devops do ciclo de implementação:

| Validação | Tool sugerida | Quando |
|-----------|---------------|--------|
| Lighthouse Performance/SEO/Best Practices/A11y scores | Lighthouse CI ou Chrome DevTools | Após cada deploy |
| Axe-core a11y violations completas | `@axe-core/playwright` | CI por PR |
| Color contrast por componente | Stark (Figma) ou Lighthouse | One-shot + CI |
| Real-user Web Vitals | Vercel Analytics ou web-vitals.js | Produção |
| Cross-browser smoke | BrowserStack/Playwright | One-shot + antes de release maior |
| Mobile real device test | iPhone SE + Android low-end | One-shot |
| Screen reader test | VoiceOver (macOS), NVDA (Windows) | One-shot |
| Link checker | broken-link-checker npm | CI semanal |

---

## 12. Métricas finais

| Categoria | Findings | Score estimado |
|-----------|----------|----------------|
| Build & deploy | 1 critical, blocker | 0/10 (build quebrado) |
| Performance (heurístico) | 3 high | 7/10 |
| Acessibilidade | 3 high, 5 med | 5/10 |
| Links | 2 critical, 2 outros | 4/10 |
| Responsividade | 1 critical, 1 high | 5/10 |
| SEO técnico | 2 a 3 | 6/10 |
| Cross-browser | não testado | n/a |
| Funcional | 3 medium | 7/10 |

**Score médio quantificável:** ~5/10 (com penalidade severa por build quebrado)
