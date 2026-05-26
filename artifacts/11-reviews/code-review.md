# Code Review — Noesis Landing

**Autor:** code-reviewer
**Data:** 2026-05-25
**Modo:** Auditoria de qualidade de código (não-implementação)
**Escopo:** todos os arquivos em `src/` (11 .tsx + 1 .css = 710 LOC)

---

## 1. Sumário executivo

Codebase **pequeno, consistente e legível**. Padrões coerentes (todos `export function`, named imports, Tailwind utility classes), separation of concerns adequada (1 componente = 1 arquivo). Mas tem **inconsistências de paleta** com decisão recente, **algumas dívidas técnicas** (target ES5, magic numbers, declare module mal-colocado), e **gaps de robustez** (sem tipos de props, sem testes, sem padrão definido para variantes/composição).

| Severidade | Quantidade |
|------------|------------|
| 🔴 Critical | 1 |
| 🟠 High | 4 |
| 🟡 Medium | 8 |
| 🟢 Low | 6 |

**Score:** **7/10** — código simples, bem-feito; melhorias são marginais e podem esperar.

---

## 2. Análise estrutural

### Organização de arquivos

```
src/
├── app/
│   ├── layout.tsx          (32 LOC) — root, metadata, fonts
│   ├── page.tsx            (25 LOC) — composição da landing
│   └── globals.css         (43 LOC) — base + utilities customizadas
└── components/
    ├── navbar.tsx          (28 LOC)
    ├── hero.tsx            (78 LOC)
    ├── features.tsx        (106 LOC)
    ├── numbers.tsx         (25 LOC)
    ├── architecture.tsx    (141 LOC)  ← maior
    ├── use-cases.tsx       (78 LOC)
    ├── tech-stack.tsx      (84 LOC)
    ├── contact.tsx         (45 LOC)
    └── footer.tsx          (25 LOC)
```

**Avaliação:**
- ✅ Estrutura plana e óbvia — fácil de navegar
- ✅ Naming convention consistente (kebab-case filenames, PascalCase exports)
- ✅ `@/components/*` paths via tsconfig — bom
- 🟡 Sem subfolders por feature/seção — não é problema com 9 componentes, mas se crescer (paginas, layouts variantes), worth re-evaluate
- 🟡 Sem `index.ts` barrel exports — OK porque imports atuais são explícitos

### Padrão de componente

Todos os 9 componentes seguem o mesmo padrão:
- `export function ComponentName() { ... }`
- Zero props
- JSX inline (sem helpers extraídos exceto em architecture.tsx)
- Dados estáticos em const fora do componente quando há listas

**Avaliação:**
- ✅ Consistência total — futuro dev sabe o que esperar
- ✅ Sem state, sem effects, sem hooks — adequado para landing estática
- 🟡 Sem props significa que reuso é zero — quando precisar variantes (light/dark switcher, ou se features virar lista paginada), refactor inevitável

---

## 3. Findings por arquivo

### 3.1 `src/app/layout.tsx`

#### CR-CRIT-01 — `declare module '*.css';` é sintaxe inválida (linha 5)
- Já flagado em [[08-qa/audit-report]] Q-CRIT-01 — **bloqueia build**
- **Fix:** deletar linha 5

#### CR-HIGH-01 — Metadata incompleta
- Falta: `icons` (favicon), `manifest` (PWA), `metadataBase` (URL absoluta para OG resolver imagens relativas)
- Falta: `openGraph.images`, `openGraph.url`, `openGraph.siteName`
- Falta: `twitter.creator`, `twitter.images`
- **Esforço:** S (1-2h quando assets existirem)

#### CR-MED-01 — `lang="en-GB"` hardcoded
- Quando i18n vier, vira computed value
- **Esforço:** mover para `generateMetadata()` ou config dinâmico

#### CR-LOW-01 — Sem comment explicando `declare module` (e nem deveria ter — linha deve sumir)

---

### 3.2 `src/app/page.tsx`

#### CR-MED-02 — Composição declarativa funcional, mas sem encapsulamento
- Atualmente lista 9 componentes em ordem
- **Recomendação:** quando ciclo de implementação for refactorar para incluir seções condicionais (ex: pricing aparece só se config) ou ordering configurável, considerar passar como children/array
- **Esforço:** N/A agora

#### CR-LOW-02 — `min-h-screen` em `<main>` — pode causar scroll desnecessário
- Se footer for menor que viewport, fica espaço vazio entre Contact e Footer
- **Verificação visual:** check com viewport ≥1200px tall

---

### 3.3 `src/app/globals.css`

#### CR-HIGH-02 — CSS vars HSL definidas mas nunca usadas via Tailwind
- `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--border`, `--ring`
- Não há `extend.colors` em `tailwind.config.ts` mapeando para essas vars
- **Resultado:** vars órfãs; código usa `bg-zinc-900` direto
- **Recomendação:** decidir pattern: ou (a) deletar vars (não usadas) ou (b) integrar Tailwind com vars (preparar para light mode)
- **Esforço:** S — limpeza simples; M — integração com tokens semânticos

#### CR-MED-03 — `.glow` utility hardcoda cor (`rgba(6, 182, 212, 0.3)`)
- Mesmo valor de `--ring` em HSL — duplicação
- Quando paleta mudar (já mudou de indigo→cyan), `.glow` ficou correta por sorte
- **Esforço:** XS — usar var

#### CR-MED-04 — `.grid-pattern` hardcoda cor accent
- Mesmo problema que .glow
- **Esforço:** XS — usar var

#### CR-LOW-03 — Sem `@layer` comments documentando intenção
- baixo impacto

---

### 3.4 `src/components/navbar.tsx`

#### CR-MED-05 — Hard-coded breakpoint `md:flex` esconde nav inteiro em mobile
- Já flagado em audit-report N4 e QA Q-CRIT-04
- **Fix:** REC-010 (UX) — hamburger menu

#### CR-MED-06 — Logo "N" em `<div>` em vez de `<svg>` ou imagem
- Hard-coded em CSS — não escalável para SEO/preview de share
- **Recomendação:** SVG file em `public/` quando favicon for adicionado
- **Esforço:** XS (alinha com REC-T02)

#### CR-LOW-04 — `href="#"` no link da logo
- Funciona (scroll-to-top) mas não-semântico
- **Recomendação:** `href="/"` ou JS handler

---

### 3.5 `src/components/hero.tsx`

#### CR-HIGH-03 — JSX inline complexo (78 LOC monolíticos)
- Hero é o componente mais visualmente denso — vale extrair subcomponentes:
  - `<HeroBadge>` (linhas 8-11)
  - `<HeroHeadline>` (linhas 13-17)
  - `<HeroCTAs>` (linhas 25-37)
  - `<TerminalPreview>` (linhas 40-74)
- **Benefício:** facilita teste, A/B test futuro, reuso
- **Esforço:** S (2-3h refactor)

#### CR-MED-07 — Conteúdo de demo (linha 50-71) é **string literal multi-linha**
- Cada linha é um `<p>` separado com cores hardcoded
- **Recomendação:** array de objetos `{ key, value, color }` ou usar syntax highlighter library (mas adiciona peso)
- **Esforço:** S — refactor

#### CR-LOW-05 — `&middot;` em badge (linha 11) — entidade HTML
- Inconsistente com Unicode usado em outros lugares
- **Esforço:** XS

---

### 3.6 `src/components/features.tsx`

#### CR-HIGH-04 — `features` array tem 10 items — falta tag/categoria
- Cada feature seria mais útil com `category: 'core' | 'adjacent'` para permitir agrupamento (recomendado por UX REC-008)
- **Esforço:** XS — adicionar campo

#### CR-MED-08 — Ícones de Lucide importados unstructured
- `import { Search, BrainCircuit, Globe, LayoutGrid, ...10 ícones } from 'lucide-react'`
- Tree-shake funciona, mas import line fica longo
- **Recomendação alternativa:** mapping `{ search: Search, brain: BrainCircuit }` para permitir feature data ser puramente data-driven
- **Esforço:** S — refactor

#### CR-LOW-06 — `key={f.title}` no map
- Funcional, mas títulos são string longa; padrão melhor é `id` slug ou `key={index}` (se ordem nunca mudar) ou (preferido) adicionar `id: string` no objeto
- **Esforço:** XS

---

### 3.7 `src/components/architecture.tsx`

#### CR-HIGH-05 — **Inconsistência de paleta crítica vs decisão recente** 🚨
- Commit recente `e45e8ea` mudou accent de indigo para cyan/turquoise
- **Mas este arquivo ainda usa:**
  - `indigo` para clients (Next.js Dashboard, Lit Widget, External API)
  - `violet` para api
  - `emerald` para services
  - `amber` para data
  - `zinc` para packages
- **Análise:** pode ser **intencional** (cores distintas por camada para diferenciação visual no diagrama) ou **esquecimento**
- **Recomendação:** confirmar com designer/fundadora. Se intencional, **documentar como decisão** (ADR ou comment); se não, alinhar com paleta accent
- **Esforço:** XS (decisão) + S (implementar se mudar)

#### CR-MED-09 — `colourMap` constante poderia ser tokens
- Cores hardcoded como Tailwind classes
- Quando design system formal vier (REC-026), worth extrair para token semântico
- **Esforço:** N/A agora

#### CR-MED-10 — Subcomponentes (`Tag`, `Divider`, `DecisionCard`) inline
- Adequado para uso único, mas se pattern repetir em outros componentes, extrair para `components/ui/`
- **Esforço:** N/A agora

---

### 3.8 `src/components/numbers.tsx`

#### CR-LOW-07 — Strings de métricas hardcoded
- "<200ms" tem char escape que pode confundir; "209" deveria ter formato i18n (BR usa ponto: "209" vs "209.000")
- **Esforço:** baixa prioridade — pequeno quando há 6 itens

---

### 3.9 `src/components/use-cases.tsx`

Já coberto em audit-report U1-U5. Code-wise é limpo.

#### CR-MED-11 — Bullet list usa `<li>` com `<span>` para bullet manual
- Funcional, mas reinventa lista nativa; alternativa: `<ul class="list-disc">` com custom marker
- **Esforço:** XS — só se quiser semântica mais limpa

---

### 3.10 `src/components/tech-stack.tsx`

Já coberto em audit-report T1-T4. Code é limpo.

#### CR-LOW-08 — `layers` array é hardcoded
- Quando refresh de tecnologias for necessário, edit manual
- Considerar: importar de README ou colocar em `data/tech-stack.ts` para facilitar grep
- **Esforço:** baixa

---

### 3.11 `src/components/contact.tsx`

Já coberto em vários audits (C1-C5, S-PL1, S-PL2). Code é limpo, problemas são de conteúdo.

#### CR-MED-12 — Sem state/form — só links
- Quando waitlist for adicionada, este componente é totalmente substituído
- **Recomendação:** quando refactorar, renomear arquivo para `waitlist.tsx`

---

### 3.12 `src/components/footer.tsx`

Já coberto. Code é limpo.

#### CR-LOW-09 — `new Date().getFullYear()` chamado em runtime
- Para static export, isto é executado no build time (e congela). Quando build mudar de ano, requer rebuild para atualizar — aceitável
- Mas: se quiser garantir update automático sem deploy, mover para client-side com `useEffect`
- **Esforço:** N/A — comportamento atual está OK

---

## 4. Cross-cutting findings

### CR-HIGH-CC1 — Sem testes nem fixtures
- Esperado para landing simples, mas:
  - Sem snapshot test = refactor pode causar regressão visual silenciosa
  - Sem Playwright = sem garantia de smoke (page loads, CTAs respondem)
  - Sem axe-core no CI = a11y regressões passam
- **Recomendação:** Playwright + 1 smoke + 1 axe scan = ~4-6h setup
- **Quando fazer:** ciclo de implementação, junto com REC-T09 (GitHub Actions)

### CR-MED-CC1 — Sem JSDoc em components
- Para componentes simples, OK. Mas se virem reutilizáveis (REC-018 ícones custom), JSDoc com `@param` ajuda
- **Esforço:** N/A agora

### CR-MED-CC2 — `target: es5` em tsconfig — anacrônico
- Já flagado em arch (P2)
- **Esforço:** XS — mudar para es2022

### CR-LOW-CC1 — Sem `import type` para imports type-only
- Ex: `import type { Config } from 'tailwindcss'` em `tailwind.config.ts` ✅ — bom, é usado
- Não há outros tipos importados que precisariam
- **Status:** OK

### CR-LOW-CC2 — Sem padrão de Boolean prop / variant
- Não há props ainda, mas worth definir convenção antes de escalar (ex: `variant: 'primary' | 'secondary'` vs `primary: boolean`)

---

## 5. Qualidade vs idade do projeto

Comparando com expectativa de "landing pré-launch em ~1 dev por algumas semanas":

| Aspecto | Esperado | Atual | Avaliação |
|---------|----------|-------|-----------|
| Setup técnico | Decente, pode ter dívidas | Decente com 4 dívidas (target, vars CSS, vulns deps, build broken) | 🟡 |
| Componentização | Plana, 1 arquivo por seção | Idem | ✅ |
| Naming | Consistente | Consistente | ✅ |
| Code reuse | Mínimo | Mínimo, com inline subcomponents | ✅ |
| Test coverage | 0% provável | 0% | ✅ esperado |
| Documentation inline | Mínima | Mínima | ✅ |
| Tooling DX | Algum (lint default) | Só Next default | 🟡 |
| Type safety | Strict mode | Strict ✅ | ✅ |
| Conventions | Consistentes | Consistentes | ✅ |

**Veredito:** está **acima da média** para landing simples; problemas são pontuais, não estruturais.

---

## 6. Recomendações priorizadas

### P0 — Critical
- **CR-FIX-01:** deletar linha 5 de layout.tsx (1 min) — coberto por Q-FIX-01 do QA
- **CR-FIX-02:** confirmar/decidir cores na architecture.tsx (15 min decisão)

### P1 — High
- Metadata completar (CR-HIGH-01) — depende de favicon + og-image (REC-T02, T03)
- Limpar/integrar CSS vars (CR-HIGH-02) — quando light mode for endereçado
- Refactor Hero em subcomponents (CR-HIGH-03) — útil antes de A/B test futuro
- Adicionar `category` em features data (CR-HIGH-04) — pré-requisito para REC-008 (reorganizar features)

### P2 — Medium
- Mover utilities CSS para tokens semânticos (CR-MED-03, -04, -09)
- Adicionar Playwright smoke + axe scan no CI (CR-HIGH-CC1)
- Mudar `target: es2022` no tsconfig (CR-MED-CC2)
- Demais refinos por arquivo

### P3 — Low
- Refinamento de keys, semantic markup (lists), unicode vs entities
- JSDoc quando componentes virarem reutilizáveis

---

## 7. Conclusões para o roadmap

1. **Code quality é o menor dos problemas** do landing — não puxar refactors massivos sem benefício específico (feature flag, A/B test, light mode, etc.)
2. **Build broken e a inconsistência cromática** são as únicas críticas — ambas em < 1 hora juntas
3. **Tooling (CI, Prettier, husky)** vale fazer no primeiro ciclo de implementação — barato e paga dividendos
4. **Refactor para subcomponentes** só vale se forem reutilizáveis ou testáveis isoladamente — não fazer "por boa prática"
