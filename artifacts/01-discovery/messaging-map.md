# Messaging Map — Noesis Landing

**Autor:** product-strategist
**Data:** 2026-05-25 (v1.0) · 2026-05-26 (v1.1 — pivot + execução parcial)
**Status:** Recomendações por seção, derivadas de [[positioning]], [[personas]], [[jtbd]].
**Próximo agente que consome:** ux-designer (informa wireframe + hierarquia visual) e — em ciclo futuro — frontend-dev (copy real).

---

## ⚡ PIVOT 2026-05-26 + status de execução

Este doc é o mais afetado pelo pivot, porque foi escrito assumindo audiência mista (3 personas) e mapeia copy seção-por-seção.

### Personas removidas/rebaixadas
- ❌ **P3 Dani:** drop. Todas as referências a "tier Starter", "trial sem cartão", "Pricing pra Dani", "indie hacker" estão stale.
- ⚠️ **P2 Caio:** rebaixado a influenciador. Continua importante no fechamento B2B (CTO valida tecnicamente), mas a copy do landing **não é desenhada pra ele** — só não pode expulsá-lo.
- ✅ **P1 Marina:** única audiência primária da copy.

### Seções já implementadas (commits)
- ✅ **Hero** — reframeado em `d009247` (headline A "Knowledge that answers" + answer-with-citation card)
- ✅ **Features (4 pilares)** — reescritos em `bae6468` ("Grounded / Every answer cited / Built for multiple customers / Speaks your market's language")
- ✅ **How it works (substitui Architecture)** — implementado em `0e687d5` (4-step flow + 3 reassurance cards anti-alucinação)
- ✅ **Use Cases (3 cenários Marina)** — reescritos em `11df5dc` (Cut support volume / Self-service inside your product / Audit-ready AI)
- ✅ **Navbar + Contact CTAs alinhados** em `16514ea` ("Join the waitlist" em todo lugar)

### Seções pendentes ou alteradas pelo pivot
- ⏳ **Numbers** — bloqueado em decisão da fundadora (quais métricas reais usar pra substituir "209 API Endpoints / 30 Models / 21 Modules / 106 Unit Tests")
- ⏳ **TechStack** — decisão pendente: reframe pra "foundations of trust" (SOC2/GDPR/modelos certificados) OU remover
- ❌ **"Pricing preview" pra Dani** (Seção 8 abaixo) — drop completo. Quando entrar (MP-17), será tom enterprise.
- ❌ **"Add Pricing/Docs no nav" pra Dani** (Seção 1, item 0) — drop "Docs"; Pricing fica mas como "talk to us"
- ❌ **CTA segmentada com 3 personas no waitlist** (Seção 9 abaixo) — vira 2 opções (Customer Ops + Tech lead) ou opção única. Não há "indie hacker".

### Tabelas/colunas stale neste doc
- Toda coluna "P3 (Dani)" em qualquer tabela
- Qualquer linha referindo "Para Dani:" ou "para o dev"
- Recomendações que mencionam "Starter tier", "trial sem cartão", "Pricing acessível"

---

## 1. Estrutura recomendada da landing

Ordem atual (em `src/app/page.tsx`): `Navbar → Hero → Features → Architecture → Numbers → UseCases → TechStack → Contact → Footer`.

**Recomendação:** manter ordem, mas adicionar 2 seções e ajustar 1 — ver coluna "Δ".

| # | Seção | Status | Δ | Job/Persona dominante |
|---|-------|--------|---|------------------------|
| 0 | Navbar | Existe | Adicionar: links "Pricing" e "Docs" (mesmo que stub) | P3 (Dani) |
| 1 | Hero | Existe | Trocar CTA "Request a Demo" → "Join waitlist" + "Explore docs" | Todos |
| 2 | Social proof / "by the numbers" | Subir do meio para aqui | Mover seção Numbers para imediatamente após Hero | P1 + P2 |
| 3 | Features (4 pilares) | Existe | Reescrever copy alinhado a positioning pillars | Todos |
| 4 | "How it works" / RAG flow | **Nova** | Diagrama linear: ingestão → indexação → query → resposta + citação | P2 (Caio) |
| 5 | Architecture | Existe | Manter; pequeno ajuste de copy | P2 (Caio) |
| 6 | Use cases (3 cenários nomeados) | Existe | Reescrever cenários com nomes de personas/setores | P1 (Marina) |
| 7 | Tech stack | Existe | Manter; já é forte | P2 + P3 |
| 8 | Pricing preview | **Nova** | "3 tiers em breve — entre na waitlist pra Starter precoce" | P3 (Dani) |
| 9 | Final CTA / waitlist | Substitui "Contact" | Form de email + "what describes you?" (P1/P2/P3) | Todos |
| 10 | Footer | Existe | Adicionar: link pra repo público, créditos, status pré-launch | Todos |

---

## 2. Mensagem por seção × persona

### Seção 1 — Hero

| Persona | O que ela/ele lê em ≤ 8s | Decisão imediata |
|---------|--------------------------|------------------|
| **P1 Marina** | "Knowledge that answers." + frase de support: "Pare de pagar por gente respondendo a mesma pergunta 50× por dia." | Continua se entender; rola pra ver social proof |
| **P2 Caio** | Hero badge "RAG-powered · Multi-tenant · 5 languages" + snippet de API à direita/abaixo | Já valida que é coisa séria; rola pra Architecture |
| **P3 Dani** | Mesma headline + procura "Get started" / "Start free" no CTA | Se CTA = "Request a Demo", abandona. Se = "Join waitlist" / "Try Starter", segue. |

**Recomendações de copy:**

- **Headline atual:** "Strategic Knowledge Platform with AI" → ⚠️ neutro, sem promessa
- **Headline candidato A:** "Knowledge that answers — não só armazena."
- **Headline candidato B:** "Production-ready RAG. Without building it yourself."
- **Subheadline:** manter atual mas comprimir: "Semantic search, AI answers with citations, multi-tenant, 5 languages. Drop-in API + widget."
- **CTAs:**
  - Primário: `Join the waitlist` (todos os perfis, alinhado com pré-launch)
  - Secundário: `Explore the API` (foca em P2 e P3)
  - ❌ Eliminar: `Request a Demo` (conflita com preferência do fundador por baixo contato + afasta P2/P3)
- **Manter:** badge no topo, snippet de API à mostra (excelente para P2)

---

### Seção 2 — Numbers (subir para depois do Hero)

| Métrica atual | Mensagem que comunica | Sugestão de ajuste |
|---------------|------------------------|---------------------|
| 209 API Endpoints | "Maturidade técnica" | Manter |
| 30 Data Models | Idem | Manter |
| 21 Backend Modules | "Profundidade" | Considerar substituir por algo mais voltado a benefício |
| 106 Unit Tests | "Disciplina" | Manter |
| 5 Languages | "Pronto pra mercado não-anglo" | Reforçar — esta é defesa competitiva |

**Adicionar (se possível):** "0 hallucinated answers in golden dataset", "<200ms p95 latency", ou similar — métricas de **qualidade**, não só **volume**.

**Justificativa de subir:** Marina precisa de prova rápida; Caio também. Hoje a seção vem entre Architecture e UseCases — atrasa o impacto.

---

### Seção 3 — Features (4 pilares)

Reescrever para refletir os **4 pilares de differentiation** do positioning:

| Card | Headline | Subcopy | Para quem fala mais |
|------|----------|---------|---------------------|
| 1 | **Ready, not DIY** | Drop-in RAG platform vs. building with LangChain. Production day one. | P2 + P3 |
| 2 | **Grounded answers** | Every answer cites its source. Confidence scores. No silent hallucinations. | P1 + P2 |
| 3 | **Multi-tenant by design** | Row-level isolation enforced at the guard layer. Sell to your customers safely. | P1 + P2 |
| 4 | **Truly i18n** | API, widget, dashboard, search — all five languages, end-to-end. | P1 (mercados BR/LATAM/EU) |

**Anti-recomendação:** evitar buzzwords como "enterprise-grade", "powered by AI", "next-generation". Use prova.

---

### Seção 4 — How it works (NOVA)

Diagrama de fluxo simples em 4 passos:

```
   ┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
   │ 1. Ingest   │───►│ 2. Index     │───►│ 3. Query    │───►│ 4. Answer    │
   │             │    │              │    │             │    │              │
   │ Docs, sites │    │ Chunking +   │    │ Hybrid      │    │ AI grounded  │
   │ APIs, files │    │ embeddings + │    │ search +    │    │ + citations  │
   │             │    │ pgvector     │    │ rerank      │    │ + confidence │
   └─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
```

**Mensagem:** demystifica o "AI mágico" e mostra que tem engenharia decidida.
**Para quem:** principalmente P2 (Caio), mas também P1 entende o suficiente para comprar a narrativa de rigor.

---

### Seção 5 — Architecture (manter)

Já é forte. Pequeno ajuste de copy acima do diagrama:

- **Antes (provável):** "Our architecture"
- **Sugestão:** "Built on stuff you already trust" — sublinha NestJS, Postgres, Redis (não é reinventar a roda)

**Para P2:** este é o momento em que ele decide "ok, gente séria" ou "ok, hype".

---

### Seção 6 — Use cases (reescrever cenários)

Substituir uses cases genéricos por **3 cenários nomeados** alinhados às personas:

| Cenário | Persona | Headline | Story |
|---------|---------|----------|-------|
| Customer support deflection | Marina | **"Your help center, finally findable"** | Embed widget no help center. Cliente pergunta em português. Recebe resposta da base de artigos com citação. Tickets caem 30%. |
| In-product Q&A | Marina (variação) | **"Smart help inside your product"** | Widget dentro do seu SaaS. Cada tenant vê só seus dados. Multi-idioma de fábrica. |
| Drop-in for indie products | Dani | **"Ship AI help in an afternoon"** | API + widget configurados em minutos. Tier Starter quando launchar. |

**Para Caio:** se houver caso de uso "developer platform" / "internal knowledge for engineering teams", adicionar 4º card.

---

### Seção 7 — Tech stack (manter)

Já é forte. **Não diluir** com explicações longas. Tech leads reconhecem instantaneamente.

**Pequena melhoria:** se possível, link cada logo para um trecho da arquitetura ou doc relevante. Aumenta engajamento de P2.

---

### Seção 8 — Pricing preview (NOVA)

Mesmo que pricing não esteja decidido, mostrar **intent**:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Pricing is coming.                                        │
│                                                             │
│   Three tiers, no surprises:                                │
│                                                             │
│   ◆ Starter  — for solo devs and indie products             │
│   ◆ Pro      — for teams shipping to real customers         │
│   ◆ Enterprise — for compliance-heavy orgs                  │
│                                                             │
│   Join the waitlist to lock in early-access pricing.        │
│                                                             │
│   [ Join waitlist ]                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Para Dani:** sinaliza que existe tier acessível. Sem isso, ele abandona.
**Para Marina/Caio:** sinaliza que existe Enterprise pensado.

---

### Seção 9 — Final CTA / waitlist (substitui Contact)

**Substituir** seção Contact (form de demo) por **waitlist form**:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   Knowledge that answers.                               │
│   Built for what's next.                                │
│                                                         │
│   ┌─────────────────────────────────────────────┐       │
│   │  your@email.com                             │       │
│   └─────────────────────────────────────────────┘       │
│                                                         │
│   What describes you best?                              │
│   ( ) I lead support / customer ops                     │
│   ( ) I'm a tech lead or engineer                       │
│   ( ) I'm a solo dev / indie hacker                     │
│   ( ) Something else: ____________                      │
│                                                         │
│   [ Join the waitlist → ]                               │
│                                                         │
│   No spam. We'll only email you about launch.           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Por que segmentar:** dá ao fundador (Jennifer) inteligência sobre composição da demanda real, sem 1:1 — alinhado com preferência declarada por baixo contato.

**Próxima iteração (post-launch):** IA fazendo qualificação inicial via chat assíncrono, conforme intenção do fundador.

---

### Seção 10 — Footer

Adicionar:

- Link "Made by Jennifer · code on GitHub" → repo público da landing (sinaliza transparência)
- Status badge "🟡 pre-launch · waitlist open"
- Privacy / Terms placeholders (mesmo que stub)
- Newsletter sign-up opcional separado da waitlist

---

## 3. Vocabulário a usar e a evitar

### ✅ Usar
- **"Knowledge"** (não "data" ou "content")
- **"Answers"** (não "results" ou "responses")
- **"Grounded"** (palavra técnica específica de RAG — sinaliza expertise)
- **"Citations"** / **"sources"** (auditabilidade)
- **"Multi-tenant"** (B2B SaaS signal)
- **"Production-ready"** (anti-POC)
- **"Drop-in"** (low-friction)

### ❌ Evitar
- "AI-powered" (vazio — todo mundo é)
- "Next-generation" (vazio)
- "Enterprise-grade" (vazio sem prova)
- "Revolutionary" / "Cutting-edge" (red flags de imaturidade)
- "ChatGPT for X" (genérico, depreciativo)
- "Powered by GPT-4" (model name name-dropping — sem valor para audiência B2B madura)

---

## 4. Tom de voz

- **Confiante, não arrogante.** Mostra prova, não promete o céu.
- **Específico, não vago.** "30 data models" > "comprehensive data layer".
- **Direto, não vendedor.** Sem "Discover the power of...".
- **Bilingue-ready.** Copy em inglês deve traduzir limpo para PT-BR e ES.
- **Anti-hype.** Categoria está cheia de hype; diferenciar por sobriedade.

Exemplo:
- ❌ "Unleash the power of next-generation AI-powered knowledge management."
- ✅ "Your team has the answers. Your customers can't find them. Noesis fixes that."

---

## 5. Findings dos audits adjacentes (preparar para 02+03)

Itens identificados nesta fase de discovery que serão úteis para os audits seguintes:

| Para o ux-designer | Para o architect |
|---------------------|------------------|
| CTA "Request a Demo" desalinhada com strategy | Verificar bundle size do landing (P3 abandona se lenta) |
| Falta "Pricing" e "Docs" no nav | Verificar SEO técnico (Marina chega via search) |
| Seção Numbers deveria subir | Verificar performance mobile (Dani chega via mobile) |
| Falta "How it works" diagrama | Verificar i18n na própria landing (atualmente parece só EN) |
| Falta seção pricing preview | Verificar se há form backend pronto pra waitlist |
| Hero atual é forte mas headline pode ser mais punchy | Verificar a11y (Marina pode ter usuários com necessidade) |

---

## 6. Decisões registradas

1. **Hero CTA dupla, sem "Request a Demo"** — alinhado com preferência fundador + persona P2/P3
2. **Subir seção Numbers** para após hero — impact rápido em P1 e P2
3. **Adicionar seção "How it works"** — desmistifica para P2 e segura P1
4. **Adicionar seção Pricing preview** — sem ela, P3 abandona
5. **Substituir Contact por Waitlist segmentada** — captura intent sem 1:1
6. **Repo público no footer** — sinal de seriedade + transparência
7. **Tom anti-hype, anti-buzzword** — diferencia em categoria saturada
