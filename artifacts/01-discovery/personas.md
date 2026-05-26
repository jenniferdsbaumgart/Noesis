# Personas — Noesis Landing

**Autor:** product-strategist
**Data:** 2026-05-25 (v1.0) · 2026-05-26 (v1.1 — pivot)
**Status:** ⚠️ Hipóteses fortes — derivadas do README + domínio + briefing. Sem entrevistas formais. **A validar com 5-10 conversas qualitativas antes de tratar como verdade.**

---

## ⚡ PIVOT 2026-05-26 — leia antes de seguir

A fundadora reavaliou a estratégia de audiência. Resumo do que mudou (full context em `PROJECT.md` decisões + memory `landing-pivot-2026-05-26`):

| Persona | Status v1.0 | Status v1.1 (atual) |
|---|---|---|
| **P1 Marina** (Head of Customer Ops) | Decisor primário | ✅ **Única audiência primária** |
| **P2 Caio** (Tech Lead) | Co-decisor com veto técnico | ⚠️ **Rebaixado a influenciador** — landing não é desenhada pra ele se divertir, mas mantém prova técnica suficiente pra ele não vetar |
| **P3 Dani** (Indie Dev) | Self-serve PLG | ❌ **DROPPED** — sem funil PLG/indie; toda conversão é sales-led via waitlist |

**Implicações nas seções abaixo:**
- A persona **P3 Dani** (linhas 160-225 abaixo) está mantida como referência histórica mas **não orienta mais decisões de landing**. Ignore os "Cenário de uso (landing)" e "CTA ideal" dela.
- **P2 Caio** continua existindo no funil B2B (CTO/eng leader que valida tecnicamente o pitch da Marina pro budget), mas a copy do landing **não é otimizada pra ele** — só não pode expulsá-lo. Decisões como "ele estuda Architecture 30 segundos" continuam true; o que mudou é que esse "Architecture" virou **"How it works" em linguagem de trust** (não NestJS/pgvector).
- A "Matriz comparativa" (linha ~229) está stale na coluna Dani; tudo da Marina continua válido.
- "Implicações para a landing" (linha ~243) está parcialmente implementado e parcialmente stale — ver `artifacts/13-reports/roadmap.md` v1.1 pro estado atual.

---

## Resumo

| # | Persona | Segmento | Papel no funil | Decisor? |
|---|---------|----------|----------------|----------|
| P1 | **Marina, Head of Customer Operations** | Decisor B2B (operacional) | Inicia avaliação, contrata | ✅ Decisor primário |
| P2 | **Caio, Tech Lead / Platform Engineer** | Tech evaluator B2B | Avalia viabilidade, integra | ✅ Decisor técnico (veto) |
| P3 | **Dani, Solo Dev / Indie Hacker** | Self-serve PLG | Compra Starter direto, sem comitê | ✅ Decisor único |

**Cobertura da audiência mista:** Marina cobre o decisor B2B; Caio cobre o tech lead em B2B; Dani cobre o dev em self-serve. Três cenários, três jornadas distintas.

---

## P1 — Marina, Head of Customer Operations

> "Eu não preciso de mais um lugar pra guardar documento. Eu preciso que minha equipe pare de responder a mesma pergunta 50 vezes por dia."

### Perfil demográfico (hipótese)
- **Cargo:** Head of Customer Ops / Head of Support / Diretora de Sucesso do Cliente
- **Empresa:** SaaS B2B, fintech, healthtech ou edtech, 100-1000 funcionários
- **Localização:** Brasil, México, Portugal, Espanha (mercados que valorizam i18n)
- **Idade:** 32-45 anos
- **Educação:** Administração, comunicação, ou área operacional. Não é técnica, mas é tech-fluent.

### Contexto profissional
- Lidera equipe de 8-40 pessoas entre suporte, sucesso do cliente e operações
- KPIs: CSAT, NPS, FRT (first response time), volume de tickets resolvidos por hora-pessoa
- Reporta-se ao COO ou ao Head of Revenue
- Tem budget anual de US$ 50k-300k para ferramentas operacionais
- Avalia 2-4 ferramentas novas por ano

### Stack atual
- **Help desk:** Zendesk, Intercom, ou Freshdesk
- **Knowledge:** Confluence, Notion, ou Google Drive (acervo fragmentado)
- **Já tentou:** macros, scripts, talvez Intercom Fin ou Zendesk AI add-on
- **Frustração:** "Aquilo só responde bem 30% das perguntas e quando erra, erra feio."

### Jobs principais
- (E1) Reduzir custo por ticket sem demitir gente
- (E2) Garantir que respostas estejam corretas e auditáveis (compliance)
- (E3) Mostrar para o C-level que "AI" está sendo usada com responsabilidade

### Dores (top 5)
1. **Resposta errada com confiança** — alucinação destrói confiança em qualquer iniciativa AI futura
2. **Vendor lock-in** — integrar e depois descobrir que não tem export/migração
3. **Falta de auditoria** — "de onde veio essa resposta?" sem citação não passa por compliance
4. **Setup demorado** — POC que vira projeto de 6 meses
5. **Custo escalando com volume** — pricing por query mata o caso de uso de alto volume

### Ganhos esperados
1. **Deflexão de tickets** — reduzir 20-40% do volume que chega ao atendente humano
2. **Self-service melhor** — clientes resolvem sozinhos no widget embarcado
3. **Visibilidade** — analytics mostrando que perguntas estão sendo feitas e respondidas
4. **Multi-idioma sem dor** — atende Brasil e LATAM com a mesma stack
5. **História bonita pro board** — "implementamos AI grounded com citação de fonte"

### Canais
- LinkedIn (posts de fundadores de RAG companies, demos virais)
- Newsletters de produto (Lenny, Reforge, Product Coalition)
- Conferências (SaaStr, RD Summit no Brasil)
- Indicação de pares (CS managers em grupos privados)

### Critérios de decisão (peso relativo)
| Critério | Peso |
|----------|------|
| Citação de fontes / auditabilidade | 25% |
| Multi-tenant / posso oferecer aos meus clientes | 20% |
| Tempo de setup / time to value | 20% |
| Pricing previsível | 15% |
| Suporte ao português / espanhol | 10% |
| Maturidade do vendor (segurança, SOC2, etc) | 10% |

### Objeções típicas
- "Já tenho Zendesk AI, por que trocar?" → diferencial é grounded + multi-tenant + i18n
- "Quem garante que não vai vazar dados do meu cliente?" → row-level isolation + RBAC enforce
- "Preciso de SOC2 / ISO27001" → security-analyst deve avaliar como tratar isso na landing

### Cenário de uso (landing)
Marina chega no landing via post no LinkedIn de um VC falando sobre RAG companies emergentes. Lê o hero, entende o frame. Rola para Numbers ("209 endpoints, 30 modelos") — sinal de maturidade. Passa por Architecture (só olha o diagrama, não estuda). Para em UseCases procurando "atendimento ao cliente". Decide: **vou marcar uma conversa OU entrar na waitlist**. CTA: ❌ "Request a Demo" alto-contato a afasta um pouco — ela prefere começar lendo conteúdo antes de falar com vendedor.

---

## ⚠️ P2 — Caio, Tech Lead / Platform Engineer (downgraded to influencer 2026-05-26)

> **PARCIALMENTE STALE.** Perfil + dores + jobs continuam true. O que mudou: Caio **não é mais alvo de copy do landing** — a landing é desenhada pra Marina. Caio existe como veto técnico no fechamento B2B (CTO/eng leader que a Marina chama antes de assinar contrato). Por isso o landing precisa **manter prova técnica suficiente pra ele não vetar**, mas em linguagem de trust (não em linguagem dev). Ignore "Cenário de uso (landing)" abaixo onde fala em ir pra GitHub / docs / API — esses CTAs foram removidos.

---

> "Eu não vou montar RAG do zero de novo. Da última vez levei 4 meses para descobrir que o chunking estava errado."

### Perfil demográfico (hipótese)
- **Cargo:** Tech Lead, Staff Engineer, Platform Engineer ou Engineering Manager
- **Empresa:** Mesmo perfil da Marina (B2B SaaS, 100-1000 pessoas), OU consultoria implementando para clientes
- **Localização:** Global, mas Brasil/EU em mercados-alvo de i18n
- **Idade:** 28-40 anos
- **Educação:** CS, eng software, ou bootcamp. 6+ anos de XP. Toca Node.js/TS confortavelmente.

### Contexto profissional
- Lidera time de 4-12 engenheiros
- Responsável por "platform" — infra compartilhada, integrações, AI features
- Tem voto técnico (pode vetar uma ferramenta)
- Já implementou: LangChain POC, integração com OpenAI, vector DB ou tentativa
- Sofreu com: chunking, reranking, custo de embeddings, drift de qualidade

### Stack atual
- **Backend:** Node/NestJS/Django/Rails
- **DB:** Postgres (provavelmente já com pgvector ou considerando)
- **AI:** OpenAI API direto OU LangChain OU LlamaIndex
- **Frustração:** "Conseguir 80% é fácil. Os últimos 20% destroem trimestres."

### Jobs principais
- (E1) Entregar feature de AI sem virar AI engineer
- (E2) Garantir que a feature seja confiável o suficiente pra colocar na frente do cliente
- (E3) Manter custo previsível (não explodir budget de OpenAI)

### Dores (top 5)
1. **Maintenance burden** — RAG caseiro vira passivo eterno
2. **Qualidade inconsistente** — funciona em demo, falha em produção
3. **Multi-tenant é difícil de fazer direito** — RLS, isolamento de embeddings, etc.
4. **Lock-in com framework** — LangChain quebra API a cada release
5. **Falta de observability** — não sabe por que uma resposta foi ruim

### Ganhos esperados
1. **API estável e bem documentada** — pode integrar em 1-2 sprints
2. **Stack familiar (NestJS, Postgres)** — não precisa aprender ecossistema novo
3. **Open enough** — pode trocar componentes se precisar (pgvector vs Pinecone, etc.)
4. **Observability embutida** — métricas, traces, confidence scores
5. **Tipos TypeScript end-to-end** — autocomplete e type-safety

### Canais
- HackerNews, Reddit r/MachineLearning, r/LocalLLaMA
- GitHub trending (procura repos relacionados)
- Newsletters técnicas (TLDR, Bytes, JavaScript Weekly)
- Twitter/X de pessoas como Simon Willison, Andrej Karpathy
- Conferências técnicas (KubeCon, NeurIPS, eventos locais)

### Critérios de decisão (peso relativo)
| Critério | Peso |
|----------|------|
| Qualidade da API e docs | 25% |
| Maturidade do código (testes, types) | 20% |
| Possibilidade de self-host ou export | 15% |
| Stack tecnológica reconhecível | 15% |
| Performance / latência | 15% |
| Comunidade / longevidade | 10% |

### Objeções típicas
- "Por que não monto eu mesmo com LangChain?" → time to value + multi-tenant pronto + maintenance
- "Posso confiar em um vendor pré-launch?" → fundamental ter código/exemplos abertos, talvez self-host opcional no roadmap
- "E quando vocês forem comprados/quebrarem?" → estratégia de continuidade (export, escrow, etc.)

### Cenário de uso (landing)
Caio chega via post técnico no HackerNews ou indicação direta. Pula o hero, vai direto para Architecture — quer ver se a arquitetura faz sentido. Estuda o diagrama 30 segundos. Vai pra TechStack — reconhece NestJS+Prisma+pgvector e relaxa ("isso aqui é gente séria"). Volta pro hero, lê o snippet de API. Procura: link pra docs da API, exemplo de auth, exemplo de widget. **Decisão:** vai pra GitHub do projeto ou pra docs. Se não acha, abandona ou marca pra ler depois. CTA: ❌ "Request a Demo" não converte — ele quer **explorar tech, não conversar**.

---

## ❌ P3 — Dani, Solo Dev / Indie Hacker (DROPPED 2026-05-26)

> **STALE.** Seção mantida como referência histórica. Não orienta mais decisões de landing após o pivot. Toda menção a "tier Starter", "trial sem cartão", "self-serve" abaixo deve ser ignorada pra propósito de design da landing atual.

---

> "Eu só quero que meus usuários consigam achar resposta na minha doc sem eu precisar montar RAG do zero."

### Perfil demográfico (hipótese)
- **Cargo:** Indie hacker, freelancer full-stack, ou eng em startup ≤10 pessoas
- **Empresa:** Própria (SaaS, info-produto, app, agência), 1-5 pessoas, sem budget grande
- **Localização:** Brasil, EUA, EU — qualquer lugar com bom inglês e cartão de crédito internacional
- **Idade:** 25-38 anos
- **Educação:** CS, autodidata, ou bootcamp. Toca Next.js/Supabase/Vercel.

### Contexto profissional
- Constrói produto sozinho ou em time de 2-3
- Stack típica: Next.js + Vercel + Supabase + Stripe + (alguma) AI
- Quer agregar AI ao produto sem virar especialista em ML
- Compra ferramentas com cartão pessoal, sem comitê
- Toma decisão em minutos se o pricing for claro

### Stack atual
- **Frontend:** Next.js, React, Tailwind
- **Backend:** Next.js routes, Supabase, ou small Node API
- **AI:** OpenAI direto, talvez Vercel AI SDK
- **Knowledge:** docs estáticas no próprio site, Notion público, ou GitBook

### Jobs principais
- (E1) Adicionar busca semântica + Q&A no produto/doc dele em 1-2 dias
- (E2) Não estourar o budget pessoal (≤ US$ 50/mês até ter MRR)
- (E3) Não criar dependência impossível de migrar depois

### Dores (top 5)
1. **Enterprise pricing** — produtos "Contact us" descartados imediatamente
2. **Setup complexo** — se precisa de 10 envs e Docker pra rodar, abandona
3. **Onboarding sem trial** — quer brincar antes de pagar
4. **Sem widget embedável** — não quer construir UI do zero
5. **Não suporta português** — limita audiência dele se mira Brasil

### Ganhos esperados
1. **Trial grátis ou tier free com limites generosos** — pode testar no fim de semana
2. **Widget drop-in** — `<noesis-widget>` e pronto
3. **Pricing transparente** — US$ 19-49/mês no Starter
4. **Setup em 10 minutos** — copy-paste de chave, importa doc, funciona
5. **Sai sem dor** — exporta dados, cancela com 1 clique

### Canais
- IndieHackers, Product Hunt
- Twitter/X (build in public, fundadores de RAG vendors)
- YouTube (Theo, Web Dev Simplified, Lee Robinson)
- Newsletters de indie (Indie Bites, Starter Story)
- Discord de Next.js / Vercel / Supabase

### Critérios de decisão (peso relativo)
| Critério | Peso |
|----------|------|
| Pricing transparente e barato no Starter | 30% |
| Tempo de setup (≤ 30 min) | 25% |
| Widget pronto / componente embarcável | 20% |
| Documentação clara com exemplos copiáveis | 15% |
| Não exige cartão pra testar | 10% |

### Objeções típicas
- "Quanto custa?" → preciso ver tier Starter na landing OU na página de pricing
- "Vou precisar de SDK pra Node?" → docs visíveis + npm package
- "E se eu crescer e ficar caro?" → tiers escaláveis com limites claros

### Cenário de uso (landing)
Dani chega via tweet ou Product Hunt. Não passa do hero se não entender em 5 segundos. Procura "Pricing" no nav — se não existe, frustra. Procura "Docs" — também espera. Para no widget/snippet de API: se vê código copiável e linguagem que entende, segue. **Decisão:** vai pra trial / signup self-serve OU desiste. CTA: ✅ trial 7 dias OU ✅ "Start free" (sem cartão). ❌ "Request a Demo" o expulsa.

---

## Matriz comparativa

| Dimensão | Marina (P1) | Caio (P2) | Dani (P3) |
|----------|-------------|-----------|-----------|
| **Tipo de compra** | Comitê / orçamento aprovado | Veto técnico em compra B2B | Cartão pessoal |
| **Ciclo de decisão** | 4-12 semanas | 1-4 semanas | 5-60 minutos |
| **Sensibilidade a preço** | Média | Baixa (importa qualidade) | Alta |
| **CTA ideal** | Waitlist + futuro "talk to us" assíncrono | GitHub + docs + waitlist técnica | Trial self-serve + pricing claro |
| **Conteúdo que converte** | Cases, ROI, prova social | Arquitetura, docs API, código | Pricing, trial, snippet copy-paste |
| **Métrica de sucesso (landing)** | Form preenchido | Click em "Docs" / "GitHub" | Click em "Start trial" |
| **Tier provável** | Pro ou Enterprise | Pro (avaliando Enterprise) | Starter |

---

## Implicações para a landing (input para ux-designer)

1. **Nav precisa ter Pricing + Docs** — ausência mata P3 (Dani) imediatamente
2. **Hero CTA dupla:** "Join waitlist" (default, todos) + "See architecture" (secundária, técnica) — alinhado com pré-launch + audiência mista
3. **CTA atual "Request a Demo" deve ser eliminada** — conflita com preferência do fundador por baixo contato e com P3
4. **Seção de pricing (ainda que vaga: "3 tiers, sem surpresa")** — segura P3, sinaliza intenção para P1
5. **Provas técnicas (Architecture + TechStack + Numbers) devem estar acima de UseCases** — segura P2 cedo, antes que ele saia. Atualmente Numbers vem entre Architecture e UseCases, o que é razoável; mas pode subir mais.
6. **Português + outros idiomas** — landing em inglês está OK, mas badge "5 languages" deve estar visível (já está no hero)

---

## Riscos das hipóteses

| Risco | Severidade | Mitigação |
|-------|------------|-----------|
| Marina pode não existir no perfil descrito — mercado B2B real talvez seja outro | Alta | Validar com 5 entrevistas em 60 dias |
| Caio pode preferir build-in-house mesmo com Noesis pronto (síndrome NIH) | Média | Reforçar prova de qualidade + caso de manutenção |
| Dani pode não ser um persona real — RAG pode ser overkill para indie | Média | Validar buscando posts em IndieHackers sobre RAG/AI |
| Aversão do fundador a contato 1:1 mata fontes principais de validação | Alta | Usar feedback assíncrono: forms, gravações de uso, analytics |
