# Execution Plan — Noesis Landing: Auditoria & Roadmap

**Autor:** squad-manager
**Data:** 2026-05-25
**Modo:** Auditoria + Roadmap (não-implementação)
**Entregável final:** `artifacts/13-reports/roadmap.md`

---

## 1. Objetivo

Avaliar o estado atual do landing page do Noesis (Next.js 14 estático) sob 4 lentes — **produto**, **design**, **arquitetura**, **qualidade/segurança** — e consolidar os findings em um roadmap acionável priorizado.

**Não fazemos neste ciclo:**
- Reescrita de código (frontend, backend, AI, data)
- Mudanças de deploy ou infraestrutura
- Implementação de features novas

**Fazemos neste ciclo:**
- Discovery atualizado (positioning, personas, jobs-to-be-done para audiência mista B2B+dev)
- Audits documentados (design, arquitetura, QA, segurança, code review)
- Roadmap final em `13-reports/roadmap.md` com itens priorizados, esforço e impacto

---

## 2. Pipeline customizado

```
┌─────────────────────────────────────────────────────────────┐
│  00 squad-manager  ──►  plano + delegação                   │
│                                                             │
│  01 product-strategist                                      │
│      └─► JTBD revalidado, personas B2B+dev, value-prop      │
│          (USA: README atual como input de positioning)      │
│                                                             │
│  ────────────── G1: humano aprova discovery ───────────     │
│                                                             │
│  02 ux-designer        03 architect          (paralelo)     │
│      └─► design audit       └─► arch audit                  │
│                                                             │
│  ────────────── G2: humano aprova audits base ─────────     │
│                                                             │
│  08 qa-engineer    09 security-analyst    11 code-reviewer  │
│      (paralelo — 3 audits independentes)                    │
│                                                             │
│  ────────────── G3: humano aprova findings ────────────     │
│                                                             │
│  12 tech-writer    ──►  documenta findings + decisões       │
│  13 project-reporter ──► ROADMAP CONSOLIDADO ⭐ (final)     │
└─────────────────────────────────────────────────────────────┘
```

### Fases puladas (justificativa)

| Fase | Por que pular |
|------|---------------|
| 04 frontend-dev | Sem implementação neste ciclo |
| 05 backend-dev | Landing é estático, sem backend |
| 06 ai-engineer | Sem componente de IA na landing |
| 07 data-engineer | Sem persistência |
| 10 devops | Sem mudança de deploy |
| 14 eval-engineer | Sem IA para avaliar |
| 15 prompt-engineer | Sem prompts |

---

## 3. Detalhamento por fase

### Fase 01 — product-strategist
**Inputs:** `README.md`, `PROJECT.md`, código atual em `src/`
**Entregáveis:**
- `artifacts/01-discovery/positioning.md` — proposta de valor para audiência mista
- `artifacts/01-discovery/personas.md` — 2-3 personas (decisor B2B + tech lead/dev)
- `artifacts/01-discovery/jtbd.md` — jobs-to-be-done por persona
- `artifacts/01-discovery/messaging-map.md` — mensagem por seção do landing por persona
- `artifacts/01-discovery/handoff.yaml`

**Gate G1:** humano aprova antes de 02+03 iniciarem.

---

### Fase 02 — ux-designer (paralelo com 03)
**Inputs:** discovery (01), código em `src/`, screenshots do landing atual
**Entregáveis:**
- `artifacts/02-design/audit-report.md` — análise da landing atual: hierarquia visual, fluxo de leitura, CTAs, conversão, mobile, a11y visual
- `artifacts/02-design/recommendations.md` — sugestões priorizadas (quick wins / médio prazo)
- `artifacts/02-design/handoff.yaml`

---

### Fase 03 — architect (paralelo com 02)
**Inputs:** `package.json`, `next.config.js`, `tsconfig.json`, `tailwind.config.ts`, código em `src/`
**Entregáveis:**
- `artifacts/03-architecture/tech-audit.md` — Next.js setup, build, SSR/SSG, perf budget, bundle size, SEO técnico
- `artifacts/03-architecture/recommendations.md` — sugestões técnicas priorizadas
- `artifacts/03-architecture/handoff.yaml`

**Gate G2:** humano aprova design + arch audits antes de QA/Security/Review.

---

### Fase 08 — qa-engineer (paralelo com 09 e 11)
**Inputs:** todos os audits anteriores, código atual, site em build local
**Entregáveis:**
- `artifacts/08-qa/audit-report.md` — checklist a11y (WCAG AA), Lighthouse scores, links quebrados, responsividade (mobile/tablet/desktop), cross-browser
- `artifacts/08-qa/handoff.yaml`

---

### Fase 09 — security-analyst (paralelo com 08 e 11)
**Inputs:** `package.json`, código, headers do site, deps
**Entregáveis:**
- `artifacts/09-security/audit-report.md` — `npm audit`, CSP/security headers, exposição de dados, dependências desatualizadas, supply chain
- `artifacts/09-security/handoff.yaml`

---

### Fase 11 — code-reviewer (paralelo com 08 e 09)
**Inputs:** código em `src/`
**Entregáveis:**
- `artifacts/11-reviews/code-review.md` — padrões, organização, naming, dead code, TS strictness, comentários
- `artifacts/11-reviews/handoff.yaml`

**Gate G3:** humano aprova findings antes de consolidação em roadmap.

---

### Fase 12 — tech-writer
**Inputs:** todos os handoffs anteriores
**Entregáveis:**
- `artifacts/12-docs/findings-consolidated.md` — sumarização cross-fase dos findings, sem duplicação, agrupados por tema

---

### Fase 13 — project-reporter ⭐
**Inputs:** findings consolidados (12) + todos os handoffs
**Entregáveis:**
- `artifacts/13-reports/roadmap.md` — **ENTREGÁVEL FINAL** com:
  - Quick wins (< 1 semana)
  - Médio prazo (1-4 semanas)
  - Longo prazo (estratégico)
  - Cada item: justificativa, esforço estimado, impacto esperado, agente sugerido para executar em ciclo futuro
- `artifacts/13-reports/executive-summary.md` — 1 página para stakeholder não-técnico

---

## 4. Cronograma estimado

| Fase(s) | Duração estimada |
|---------|------------------|
| 01 discovery | 1-2 sessões |
| 02 + 03 (paralelo) | 1-2 sessões |
| 08 + 09 + 11 (paralelo) | 2-3 sessões |
| 12 + 13 (sequencial) | 1 sessão |
| **Total** | **5-8 sessões** |

---

## 5. Riscos identificados

| Risco | Mitigação |
|-------|-----------|
| Discovery pode descobrir que positioning precisa mudar antes de qualquer audit visual | Aceitar — G1 existe para humano decidir se segue com audit ou re-planeja |
| Site estático limita audits dinâmicos (sem runtime logs) | Audits focam em código, build, perf estática, headers — adequado |
| Audits podem listar mais itens do que o realista para o roadmap | tech-writer (12) deduplica; project-reporter (13) prioriza |
| Humano pode querer começar a implementar antes do roadmap pronto | Squad-manager bloqueia transição para fase de execução até gate final |

---

## 6. Critérios de sucesso

- [ ] Discovery aprovado pelo humano (G1)
- [ ] 4 audits + code review produzidos com findings rastreáveis
- [ ] Roadmap final em `13-reports/roadmap.md` com priorização defensável
- [ ] Executive summary de 1 página
- [ ] PROJECT.md atualizado refletindo conclusão de cada fase
