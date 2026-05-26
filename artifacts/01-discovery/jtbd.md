# Jobs To Be Done — Noesis

**Autor:** product-strategist
**Data:** 2026-05-25
**Status:** Hipóteses — alinhadas com [[personas]] e [[positioning]]. A validar por entrevistas.

---

## Visão geral

| ID | Job | Persona dominante | Frequência | Importância |
|----|-----|-------------------|------------|-------------|
| J1 | Responder perguntas repetitivas de clientes sem escalar headcount | Marina (P1) | Diária | **Critical** |
| J2 | Habilitar self-service auditável dentro do produto do cliente | Marina (P1) | Diária | High |
| J3 | Embarcar AI grounded em produto sem virar AI engineer | Caio (P2) | Pontual (1× por projeto) | **Critical** |
| J4 | Avaliar se um vendor RAG é maduro o suficiente para apostar | Caio (P2) | Pontual | High |
| J5 | Adicionar busca + Q&A em produto indie sem montar pipeline | Dani (P3) | Pontual | High |
| J6 | Provar para C-level que iniciativa de AI tem rigor (citação, isolamento, multi-idioma) | Marina (P1) | Trimestral (reporting) | Medium |

---

## J1 — Responder perguntas repetitivas sem escalar headcount

**Statement:**
> When my support team is answering the same 30 questions over and over, taking time and money,
> I want to deflect those repetitive answers to a self-service AI grounded in my own docs,
> So I can free my team for complex cases and reduce cost per ticket without hurting CSAT.

**Context:**
- **Trigger:** Volume de tickets cresce mais rápido que receita; head count fica caro; CSAT começa a cair por FRT alta
- **Frequency:** Diária — sempre presente, intensifica em picos sazonais
- **Importance:** **Critical** — KPI principal de Marina

**Current Solutions:**
- Macros e respostas prontas no Zendesk/Intercom
- Help center estático (Zendesk Guide, Intercom Articles)
- Tentativas de AI add-on (Intercom Fin, Zendesk AI) com qualidade inconsistente
- Equipe de support escalando linearmente com volume

**Pain Points:**
- Resposta certa existe mas ninguém acha (no Confluence, no help center, no Drive)
- AI generic responde errado e cliente perde confiança
- Não há auditoria: "de onde veio essa resposta?"
- Vendor lock-in: integrou Zendesk AI, não consegue trocar

**Success Criteria:**
- ≥ 30% dos tickets nunca chegam ao humano (deflexão medível)
- CSAT igual ou melhor que com humano
- Zero incidentes de resposta confiantemente errada em compliance review

**Como Noesis ganha este job:**
Pipeline RAG grounded em fontes do cliente + citações por resposta + confidence score. Widget embarcável no help center. Analytics mostrando o que está sendo perguntado e respondido.

---

## J2 — Habilitar self-service auditável dentro do produto do cliente

**Statement:**
> When my customers are stuck inside my product and don't know how to do something,
> I want to give them an embeddable AI answer box that uses my own knowledge base and respects their tenant data,
> So I can increase activation, reduce drop-off, and have an audit trail of answers given.

**Context:**
- **Trigger:** Activation rate baixa; usuários novos não descobrem features; tickets in-product altos
- **Frequency:** Diária
- **Importance:** High

**Current Solutions:**
- Tour onboarding (Userpilot, Intro.js) — desliga e nunca volta
- Help center em outro domínio — quebra fluxo
- Chatbot Intercom em todas páginas — caro e genérico

**Pain Points:**
- Tour não cobre perguntas específicas
- Help center em outro domínio quebra contexto
- Chatbot genérico não conhece dados do tenant específico
- Sem isolamento, resposta para um cliente vaza pra outro

**Success Criteria:**
- Widget integrado em ≤ 1 dia
- Cada resposta cita a fonte (artigo do help, doc interno do tenant)
- Zero vazamento de dados entre tenants

**Como Noesis ganha este job:**
Widget Lit/Web Component drop-in + multi-tenant nativo + RBAC enforce no guard. i18n no widget para mercados não-anglo.

---

## J3 — Embarcar AI grounded em produto sem virar AI engineer

**Statement:**
> When my product team needs to add a "smart answers" feature to ship next quarter,
> I want an API-first RAG platform with multi-tenancy and i18n already solved,
> So I can integrate in 1-2 sprints instead of becoming an AI infrastructure team.

**Context:**
- **Trigger:** Roadmap prioritiza feature AI; CEO/board pede "AI story"; time não tem expertise em ML/RAG
- **Frequency:** Pontual — 1× por projeto, mas estratégico
- **Importance:** **Critical** — define se Caio escolhe Noesis ou monta do zero

**Current Solutions:**
- LangChain + OpenAI + Pinecone (DIY) — 4-6 meses até produção, manutenção eterna
- OpenAI Assistants API — simples mas pouco controle, sem multi-tenant nativo
- Glean Enterprise — caro, lento de implementar, focado em interno
- Vectara — bom mas é vector layer, dev ainda faz chunking/pipeline

**Pain Points:**
- Chunking, reranking, embeddings — cada decisão tem trade-off não-óbvio
- Multi-tenant em vector DB é ginástica (namespaces, filters, isolamento)
- Custo de tokens/embeddings explode sem monitoramento
- Quality degrada ao longo do tempo sem evaluations

**Success Criteria:**
- Tempo até primeiro endpoint produtivo ≤ 2 sprints (4 semanas)
- Quality ≥ 85% acceptable em golden dataset interno
- Custo previsível em 3 meses iniciais

**Como Noesis ganha este job:**
API completa com chunking, reranking, multi-tenant, i18n já decididos. Stack reconhecível (NestJS+Postgres) reduz ramp-up. Confidence scores e citações habilitam observability.

---

## J4 — Avaliar se vendor RAG é maduro o suficiente para apostar

**Statement:**
> When I'm evaluating a RAG vendor for a 12-month commitment,
> I want to see real architecture, real code patterns, and real engineering rigor — not marketing fluff,
> So I can make a decision I won't be ashamed of in 6 months.

**Context:**
- **Trigger:** Tech lead foi pedido a fazer due-diligence de vendor; precisa defender escolha
- **Frequency:** Pontual — 2-4 vezes por ano
- **Importance:** High — define se Caio aprova ou veta

**Current Solutions:**
- Ler docs do vendor profundamente
- Procurar GitHub do vendor (mesmo que produto principal seja closed-source)
- Buscar HackerNews / Reddit por experiências reais
- Pedir POC paga para validar

**Pain Points:**
- Marketing sites cheios de palavras vazias ("enterprise-grade", "AI-powered")
- Falta de transparência sobre stack, limites, performance real
- Sem caso de uso técnico concreto além de "chatbot"
- "Contact us for demo" antes de poder explorar

**Success Criteria:**
- Avaliação completa sem precisar agendar reunião
- Arquitetura, stack e exemplos visíveis no site
- Sinais de seriedade (testes, types, repositórios públicos)

**Como Noesis ganha este job:**
README já é técnico e específico. Landing já mostra arquitetura. Repositório da landing é público (sinal). Próximo passo: docs públicas de API + exemplos de código.

---

## J5 — Adicionar busca + Q&A em produto indie sem montar pipeline

**Statement:**
> When I'm building my SaaS or info-product and my users keep asking the same questions,
> I want a drop-in widget I can configure in an afternoon, with pricing that fits my MRR,
> So I can ship the AI-powered help feature without becoming a full-stack ML engineer.

**Context:**
- **Trigger:** Volume de DMs/emails de suporte começa a incomodar; quer escalar sem contratar
- **Frequency:** Pontual — 1× para integrar, depois "set and forget"
- **Importance:** High — define se Dani compra ou abandona

**Current Solutions:**
- Construir do zero com OpenAI + Vercel AI SDK + Supabase pgvector — 1-2 semanas
- Crisp/Tawk com tentativa de AI add-on — limitado
- Algolia DocSearch — só busca, sem Q&A
- Nada — usuário busca no Google e às vezes acha

**Pain Points:**
- Construir do zero não é o core do produto dele
- AI vendors caros (US$ 200+/mês entry tier) inviabilizam
- Widget próprio leva semanas de UI work
- Não suporta português → perde mercado dele

**Success Criteria:**
- Integração ≤ 1 tarde (4 horas)
- Custo ≤ US$ 49/mês no Starter
- Sem cartão obrigatório pra testar
- Widget customizável (cores, idioma)

**Como Noesis ganha este job:**
Widget Lit pronto (já existe na plataforma). i18n incluído. Tier Starter (a definir pricing) com self-serve. Trial sem cartão (a definir).

---

## J6 — Provar rigor da iniciativa de AI para C-level

**Statement:**
> When I need to report to the C-suite or board about our AI investments,
> I want to show concrete metrics on safety, accuracy, and tenant isolation,
> So I can defend the budget and avoid being the person who launched the AI that hallucinated to a customer.

**Context:**
- **Trigger:** Reporting trimestral, comitê de risco, due-diligence de investidor, auditoria
- **Frequency:** Trimestral
- **Importance:** Medium — não é dor diária, mas é veto-condicional

**Current Solutions:**
- Slides genéricos com promessa de AI
- Métricas inventadas ou superficiais
- Auditoria reativa quando algo dá errado

**Pain Points:**
- Sem dados estruturados sobre qualidade das respostas
- Sem trilha auditável de quem perguntou o quê e o que foi respondido
- Vendor não fornece dashboards de governance

**Success Criteria:**
- Dashboard com taxa de citação, confidence média, taxa de "não sei"
- Logs auditáveis de queries e respostas (com retenção definida)
- Mecanismo de feedback (resposta foi útil? estava correta?)

**Como Noesis ganha este job:**
Analytics + CSAT no produto (já listado no README). Citations + confidence scores estruturados. Trilha auditável habilitada por design.

---

## Hierarquia de Jobs

```
                    Jobs Estratégicos (decisor de compra)
                    ┌─────────────────────────────────┐
                    │  J1: Deflexão de tickets        │  ← Marina
                    │  J3: Embarcar AI sem ser AI eng │  ← Caio
                    └─────────────────────────────────┘
                                  │
                                  ▼
                    Jobs Operacionais (uso recorrente)
                    ┌─────────────────────────────────┐
                    │  J2: Self-service in-product    │  ← Marina
                    │  J5: Indie integration          │  ← Dani
                    └─────────────────────────────────┘
                                  │
                                  ▼
                    Jobs de Governança (institucional)
                    ┌─────────────────────────────────┐
                    │  J4: Avaliar vendor             │  ← Caio
                    │  J6: Reportar rigor pro board   │  ← Marina
                    └─────────────────────────────────┘
```

---

## Mapping Job → Feature (alto nível)

| Job | Features Noesis que atendem | Lacunas (a flagar para architect) |
|-----|------------------------------|-----------------------------------|
| J1 | RAG pipeline, Citations, Widget embarcável, Analytics, Auto-Response Engine | Integração nativa com Zendesk/Intercom (a confirmar) |
| J2 | Widget, Multi-tenant RLS, RBAC, i18n | Customização visual do widget (escopo a confirmar) |
| J3 | API REST, NestJS stack, Multi-tenant, Confidence scores | Webhooks/eventos (a confirmar), SDK oficial em outras langs |
| J4 | Repo público da landing, arquitetura no site, README detalhado | Docs públicas de API, sandbox interativa |
| J5 | Widget drop-in, i18n, API simples | Pricing tier Starter (a definir), trial sem cartão (a definir) |
| J6 | Analytics, CSAT, Citations, Multi-tenant | Dashboard de governance específico (a confirmar), retention policies |

---

## Decisões registradas

1. **Job mais crítico para conversão = J1 (Marina) + J3 (Caio)** — landing deve falar com ambos, pois um é decisor de orçamento e outro é veto técnico em B2B
2. **J5 (Dani) só converte se houver Pricing e Trial visíveis** — input forte para ux-designer sobre necessidade de seção pricing
3. **J6 não dispara compra mas pode matar deal** — não é foco da landing, mas messaging deve sinalizar capacidade (e.g., "auditable answers")
4. **Não há job de "edit content" ou "manage knowledge"** — Noesis NÃO compete com Confluence/Notion como ferramenta de autoria; consome o que já existe
