# Positioning — Noesis

**Autor:** product-strategist
**Data:** 2026-05-25
**Status:** Hipótese forte — derivada do README + briefing humano. A validar com 5-10 entrevistas qualitativas antes de tratar como verdade.

---

## 1. Positioning Statement (one-liner)

> **Para times que precisam transformar conhecimento espalhado em respostas confiáveis, Noesis é uma plataforma RAG multi-tenant pronta para produção que entrega busca semântica, respostas geradas por IA com citações, e isolamento por tenant — sem precisar montar pipeline próprio com LangChain.**

### Versão curta (hero candidate)
> **Knowledge that answers — não só armazena.**

### Versão para tech lead (developer hero candidate)
> **Production-ready RAG, sem montar do zero. API + Widget + Multi-tenant em uma stack só.**

---

## 2. Categoria & Frame de mercado

### Categoria primária
**RAG Platform for Knowledge Operations** — categoria intermediária entre dois espaços maduros:

```
                  ┌─────────────────────────────────────┐
                  │  Onde vivem hoje                    │
                  │                                     │
   Knowledge      │  Confluence, Notion AI, Guru,       │
   Bases          │  Slab, Glean (entry tier)           │
   (storage-first)│                                     │
                  └────────────┬────────────────────────┘
                               │
                               │  ▼  NOESIS  ◀──── posicionamento
                               │
                  ┌────────────┴────────────────────────┐
                  │                                     │
   RAG Infra      │  Vectara, Pinecone, Weaviate,       │
   (search-first) │  LangChain/LlamaIndex DIY,          │
                  │  OpenAI Assistants API              │
                  └─────────────────────────────────────┘
```

**Frame que usamos:** "Knowledge bases armazenam. RAG infra busca. Noesis **responde** — pronto pra usar, sem montar pipeline próprio."

---

## 3. Differentiation pillars (4)

| Pilar | O que é | Por que importa | Prova |
|-------|---------|-----------------|-------|
| **Pronto vs DIY** | Plataforma completa em vez de SDK/libs | Time não vira "RAG engineer" | 209 endpoints, 30 modelos, RAG completo embarcado |
| **Multi-tenant nativo** | Isolamento row-level com RBAC enforce | Habilita produto B2B SaaS sem reinventar | Guards no NestJS + RLS lógica |
| **Respostas grounded** | Citações + confidence score por resposta | Reduz risco de alucinação para casos sérios | Pipeline com reranking + sources estruturados |
| **i18n end-to-end** | 5 idiomas em API, dashboard, widget, DB | Mercados não-anglo (Brasil, LATAM, EU) sem refazer | nestjs-i18n + next-intl + regconfigs PostgreSQL |

> ⚠️ **Risco competitivo:** "pronto vs DIY" é o pilar mais fácil de copiar — vendors maturando como Vectara, Glean Enterprise e até OpenAI Assistants estão neste mesmo frame. Multi-tenant + i18n são as defesas mais duráveis.

---

## 4. Anti-positioning (o que Noesis NÃO é)

Importante: posicionamento ganha clareza pelo que se rejeita.

- ❌ **Não é um vector DB** — não compete com Pinecone/Weaviate em camada de armazenamento
- ❌ **Não é um framework** — não compete com LangChain/LlamaIndex em flexibilidade infinita
- ❌ **Não é um knowledge base tradicional** — não compete com Confluence em colaboração/edição
- ❌ **Não é uma IA conversacional genérica** — não é ChatGPT-for-business; é grounded em dados do cliente
- ❌ **Não é low-code** — é API-first; assume time técnico do lado do cliente

---

## 5. Posicionamento por audiência (mixed B2B + dev)

### Para o **decisor B2B** (CTO, Head of Knowledge, Head of Support)
**Mensagem:** *"Pare de pagar por gente respondendo a mesma pergunta 50× por dia. Suas equipes têm a resposta no Confluence/Drive/Notion — só precisam achar. Noesis vira esse acervo em respostas instantâneas com citações auditáveis."*

**Provas que ele/ela busca:**
- Multi-tenancy = posso oferecer para meus clientes também (revenue lever)
- Citations = auditável, compliance-friendly
- Tech stack adulto (NestJS, Postgres, Redis) = não é POC
- 209 endpoints, 106 testes = maturidade

### Para o **tech lead / dev** avaliando integrar
**Mensagem:** *"Você não quer montar um RAG do zero. Indexação, chunking, reranking, multi-tenancy, i18n, widget — está tudo pronto. Drop-in via API ou Web Component."*

**Provas que ele/ela busca:**
- Diagrama de arquitetura concreto (já no landing)
- Snippet de chamada da API (já no hero)
- Stack reconhecível (NestJS, Prisma, pgvector, Lit) — não é black box
- Repositório público da landing (sinal de seriedade open-friendly)

---

## 6. Hierarquia de prova (de cima para baixo no landing)

```
1. Hero claim ────► "knowledge that answers"
2. Demo viva  ────► snippet de API com resposta + citations (já existe!)
3. Pilares    ────► 4 differentiators em 4 cards
4. Provas     ────► números (209 endpoints, 30 modelos, 5 idiomas)
5. Arquitetura ───► diagrama (segura tech lead)
6. Use cases  ────► 3-4 cenários nomeados (segura decisor)
7. Stack      ────► tech stack (segura dev avaliando)
8. CTA final  ────► waitlist + (futuro) self-serve trial
```

**Decisão:** ordem narrativa atual da landing está razoável (Hero → Features → Architecture → Numbers → UseCases → TechStack → Contact). A `Numbers` provavelmente deve subir antes de `Architecture` para impacto B2B — recomendação para ux-designer avaliar.

---

## 7. Tagline candidates (para A/B em ciclo futuro)

| # | Tagline | Vantagem | Risco |
|---|---------|----------|-------|
| A | "Knowledge that answers" | Curto, memorável, opõe a "knowledge that just sits there" | Genérico — Glean também poderia usar |
| B | "Production-ready RAG for serious teams" | Direto ao ponto técnico | Exclui audiência B2B menos técnica |
| C | "Stop searching. Start answering." | Acionável, contrasta busca tradicional | Pode soar como search vendor genérico |
| D | "Your knowledge, with answers." | Personalização ("your"), promessa clara | Menos diferenciador vs concorrência |
| E (atual) | "Strategic Knowledge Platform with AI" | Descritivo, neutro | Sem emoção, sem promessa específica |

**Recomendação:** testar A vs C contra a atual em ciclo futuro de implementação.

---

## 8. Riscos de posicionamento

| Risco | Severidade | Mitigação |
|-------|------------|-----------|
| "Knowledge platform" é categoria vaga — confunde com CMS | Alta | Usar "RAG" explicitamente no hero badge (já feito) |
| Audiência mista dilui mensagem se mal estruturada | Alta | Hierarquia clara: claim emocional no topo, prova técnica embaixo |
| Pré-launch sem clientes = sem prova social | Média | Substituir testimonials por números de engenharia (já feito) e arquitetura |
| Aversão do fundador a contato 1:1 limita signal de demanda | Média | CTA waitlist + (futuro) trial self-serve + IA de qualificação substituindo demos |
| Categoria RAG está sendo comoditizada por OpenAI Assistants, Anthropic Files API, etc | Alta | Reforçar pilares duráveis: multi-tenant + i18n + control plane operacional |

---

## 9. Decisões registradas

1. **Frame "RAG Platform for Knowledge Operations"** em vez de "AI search" ou "Knowledge base" — diferencia em ambos eixos
2. **Audiência mista tratada com hierarquia narrativa**, não com seções separadas (evita fragmentação)
3. **Anti-positioning explícito** em copy interno (não necessariamente na landing) — disciplina de mensagem
4. **CTA recomendada = waitlist + futuro trial self-serve**, NÃO "Request a Demo" — alinhado com preferência do fundador por baixo contato
5. **Pricing fora do landing nesta fase** — pré-launch, foco em validar demanda antes de comprometer tiers
