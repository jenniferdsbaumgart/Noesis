# PROJECT: Noesis Landing — Auditoria & Roadmap

> Ciclo de auditoria estratégica + técnica do landing page do Noesis (plataforma RAG multi-tenant), consolidado em roadmap acionável. Sem reescrita de código nesta rodada.

---

## Status

| Campo | Valor |
|-------|-------|
| **Fase Atual** | ✅ Ciclo de auditoria concluído · 🏗️ Execução do roadmap em andamento (humano) |
| **Agente Ativo** | — (entregue para humano; Claude apoia execução) |
| **Última Atualização** | 2026-05-26 |
| **Progresso Geral** | Auditoria 100% · Execução: 9/9 Quick Wins ✅ · MP-1, MP-2, MP-3 ✅ |
| **Entregável final** | `artifacts/13-reports/roadmap.md` ⭐ (v1.1 com pivot de personas) |
| **Modo do ciclo** | Auditoria + Roadmap (não-implementação) → execução iterativa |
| **Pivot ativo** | 2026-05-26 — Marina-only (drop Dani, Caio rebaixado) |

---

## Pipeline (customizado)

| Fase | Agente | Status | Data | Observação |
|------|--------|--------|------|------------|
| 00-management | squad-manager | ✅ Concluída | 2026-05-25 | Plano aprovado, handoff entregue |
| 01-discovery | product-strategist | ✅ Concluída | 2026-05-25 | 4 artefatos: positioning, personas, jtbd, messaging-map |
| 02-design | ux-designer | ✅ Concluída | 2026-05-25 | Audit (score 5.25) + 32 recomendações P0-P3 |
| 03-architecture | architect | ✅ Concluída | 2026-05-25 | Audit técnico (score 4.2) + 28 recomendações + 5 decisões pendentes |
| 04-frontend | frontend-dev | ⏭️ Pulada | - | Sem implementação neste ciclo |
| 05-backend | backend-dev | ⏭️ Pulada | - | Sem backend no landing |
| 06-ai | ai-engineer | ⏭️ Pulada | - | Sem IA no landing |
| 07-data | data-engineer | ⏭️ Pulada | - | Sem persistência |
| 08-qa | qa-engineer | ✅ Concluída | 2026-05-25 | **Build atual quebrado!** 24 findings (4 crit) score ~5 |
| 09-security | security-analyst | ✅ Concluída | 2026-05-25 | 16 findings, risk Médio, política mínima em 3 níveis, score 4.3 |
| 10-devops | devops | ⏭️ Pulada | - | Sem mudança de deploy |
| 11-reviews | code-reviewer | ✅ Concluída | 2026-05-25 | 19 findings, score 7, code quality é o menor problema |
| 12-docs | tech-writer | ✅ Concluída | 2026-05-25 | findings-consolidated.md (98→38 temas) |
| 13-reports | project-reporter | ✅ Concluída | 2026-05-25 | ⭐ **roadmap.md** + executive-summary.md |
| 14-evals | eval-engineer | ⏭️ Pulada | - | Sem IA |
| 15-prompts | prompt-engineer | ⏭️ Pulada | - | Sem prompts |

**Gates de aprovação humana:**
- G1: 01 → 02+03 (discovery validado?)
- G2: 02+03 → 08+09+11 (audits prontos para iniciar?)
- G3: 08+09+11 → 13 (todos os findings consolidáveis em roadmap?)

---

## Decisões Importantes

| Data | Decisão | Motivação | Agente |
|------|---------|-----------|--------|
| 2026-05-25 | Modo "Auditoria + Roadmap" em vez de pipeline completo | Humano definiu objetivo: avaliar o que existe e propor roadmap, sem reescrever ainda | squad-manager |
| 2026-05-25 | Audiência mista (B2B decisores + tech leads/devs) | Landing precisa servir ambos perfis — discovery e design devem segmentar narrativa | squad-manager |
| 2026-05-25 | Entregável final = `artifacts/13-reports/roadmap.md` | Resultado esperado é documentação + plano, não código novo | squad-manager |
| 2026-05-25 | Fases 04, 05, 06, 07, 10, 14, 15 puladas | Não há implementação, backend, IA, ou mudança de infra neste ciclo | squad-manager |
| 2026-05-25 | Plano aprovado pelo humano — transição 00 → 01 | Gate inicial aprovado, product-strategist autorizado a iniciar discovery | humano |
| 2026-05-25 | Frame de positioning = "RAG Platform for Knowledge Operations" | Diferencia de KB tradicionais (Confluence) E de RAG Infra (LangChain DIY) | product-strategist |
| 2026-05-25 | 3 personas: Marina (Head Ops, decisor B2B), Caio (Tech Lead, veto técnico), Dani (Indie Dev, self-serve) | Cobre audiência mista B2B+dev em jornadas distintas | product-strategist |
| 2026-05-25 | CTA "Request a Demo" deve ser substituída por "Join waitlist" segmentada | Alinha pré-launch + aversão fundador a contato 1:1 + persona P3 (Dani) | product-strategist |
| 2026-05-25 | Recomendação: adicionar 2 seções (How it works + Pricing preview) e subir Numbers | Servir Caio cedo (How it works) e não perder Dani (Pricing) | product-strategist |
| 2026-05-25 | UX audit identificou 5 críticos (CTA Request a Demo, GitHub link quebrado, email placeholder, nav sem Pricing/Docs, sem form) | Bloqueiam conversão de pelo menos 1 persona; descuidos visíveis minam credibilidade | ux-designer |
| 2026-05-25 | Tech audit identificou 2 vulns ativas em Next 14.2.35 + 1 em PostCSS + public/ vazio | Vulns são de severidade moderate/high (DoS); public/ vazio quebra SEO e social sharing | architect |
| 2026-05-25 | 5 decisões pendentes do humano: host, form solution, analytics solution, janela upgrade Next, prioridade mercados i18n | Bloqueiam ~10 recomendações; consolidar em uma sessão de decisão | architect |
| 2026-05-25 | Host = Vercel | Habilita Vercel Analytics + Vercel Functions (para form) + headers via vercel.json | humano |
| 2026-05-25 | Form = Resend (via Vercel Function como proxy) | API simples + email transactional combinado; Resend não tem CORS público então precisa Vercel Function | humano |
| 2026-05-25 | Analytics = Vercel Analytics (default recomendado) | Alinha com host; sem cookie banner; free tier inicial | humano (default arquiteto) |
| 2026-05-25 | Upgrade Next 14→16 autorizado | Entra no roadmap como P1; corrige 2 vulns conhecidas | humano |
| 2026-05-25 | i18n = PT-BR + EN inicialmente | Sobe REC-T18 de P2 para P1; cumpre parcialmente promessa "5 languages" | humano |
| 2026-05-26 | **Pivot de personas: Marina-only.** Drop Dani (P3 indie). Caio (P2 tech lead) rebaixado de co-decisor pra influenciador | Fundadora prefere narrativa coesa B2B + baixo contato dev. Aceita perda de canal PLG/HN em troca de foco. Architecture/TechStack permanecem mas serão reframeados (não removidos) — ausência total seria red flag em produto RAG | humano |
| 2026-05-26 | MP-20 (copy reframe) entra como pré-requisito do Sprint 2 | Sem reescrever copy primeiro, MP-11/12/16/17 escreveriam em cima de framing velho | humano + Claude |
| 2026-05-26 | LP-4 (tech stack docs links) **dropped** | Era item pra Caio; com Caio fora do funil primário, não há demanda | humano |

---

## Contexto do Projeto

### Briefing
Noesis é uma plataforma RAG multi-tenant (repositório privado). Este repositório contém o **landing page público** (Next.js 14 estático). O humano quer rodar o squad para auditar o landing atual e produzir um roadmap de melhorias — sem reescrever código nesta rodada. Output final será um plano consolidado em `artifacts/13-reports/roadmap.md`.

### Stack Tecnológica (detectada — a confirmar pelo architect)
- **Framework:** Next.js 14 (App Router presumido, a confirmar)
- **Estilização:** Tailwind CSS 3.4 + PostCSS + Autoprefixer
- **Tipografia:** Geist
- **Ícones:** Lucide React
- **Linguagem:** TypeScript 5.5
- **Build/Deploy:** Static export (`out/` no repo, sugere `output: 'export'`)

### Personas (estado pós-pivot 2026-05-26)
**Audiência primária única: Marina** (Head of Customer Ops / Support / Sucesso do Cliente em B2B SaaS 100-1000 pessoas). Foco em ROI, compliance, audit de respostas IA, deflexão de tickets.

**Caio (tech lead/platform eng)** continua relevante como influenciador no fechamento B2B — landing precisa dar provas técnicas suficientes pra Marina mostrar pro CTO sem virar red flag. Mas a copy **não é desenhada pra ele se divertir** (nada de NestJS/pgvector visível).

**Dani (indie dev)** removida. Sem funil self-serve / PLG / indie. Toda conversão é sales-led via waitlist.

Detalhes históricos em `artifacts/01-discovery/personas.md` (v1.0 — pré-pivot). Atualização desse doc é trabalho pendente do MP-20.

### Escopo MVP
N/A — ciclo de auditoria. MVP seria o roadmap consolidado em `13-reports/roadmap.md` cobrindo:
- Quick wins (a fazer em < 1 semana)
- Médio prazo (1-4 semanas)
- Longo prazo (estratégico)
- Cada item com: justificativa, esforço estimado, impacto esperado, agente sugerido para executar

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Fases planejadas | 8 ativas / 7 puladas |
| Audits previstos | 4 (design, arch, QA, security) + 1 code review |
| Entregável final | `artifacts/13-reports/roadmap.md` |
| Build atual | A verificar pelo architect |
| Cobertura de testes | N/A (sem testes no landing) |
