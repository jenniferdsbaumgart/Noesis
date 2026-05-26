# Security Audit — Noesis Landing

**Autor:** security-analyst
**Data:** 2026-05-25
**Modo:** Auditoria (sem pen-test ativo)
**Inputs:** `npm audit`, `package.json`, código fonte, `out/index.html`, [[03-architecture/tech-audit]]

---

## 1. Sumário executivo

Landing tem **3 vulnerabilidades conhecidas em deps** (1 high, 1 moderate, 1 moderate transitiva), **zero security headers configurados no projeto**, **2 placeholders sensíveis no código** (github.com/your-org, email não-confirmado), e **superfície de ataque mínima** (static export = sem backend, sem auth, sem dados de usuário hoje).

**Risk posture:** **Médio**. Está aceitável para pré-launch sem dados de usuário, mas vira **Alto** assim que (a) form de waitlist for adicionado (coleta de email = LGPD/GDPR aplicável) e (b) vulns Next persistirem em produção.

| Severidade | Quantidade |
|------------|------------|
| 🔴 Critical | 2 |
| 🟠 High | 5 |
| 🟡 Medium | 6 |
| 🟢 Low | 3 |

---

## 2. Vulnerabilidades em dependências

### S-CRIT-01 — Next.js 14.2.35: 2 advisories
- **CVE/Advisory:**
  - GHSA-h25m-26qc-wcjf — **HIGH** (CVSS 7.5) — HTTP request deserialization → DoS via insecure RSC
  - GHSA-9g9p-9gw9-jx7f — **MODERATE** (CVSS 5.9) — DoS via Image Optimizer remotePatterns
- **Range vulnerável:** `>=10.0.0 <15.5.10`
- **Fix:** upgrade para Next >= 15.5.10 (recomendado 16.x)
- **Risco real:** **Médio para landing estática**:
  - DoS via RSC: landing está em static export, não roda RSC dinamicamente em produção — **risco baixo na prática**
  - DoS via Image Optimizer: landing não usa `next/image` — **risco baixo na prática**
  - Mas: `npm audit` flagga independente do uso; pen-testers/scanners flaggam; **risco reputacional** alto
- **Recomendação:** upgrade conforme REC-T15 (humano já autorizou)
- **Esforço:** ver REC-T15

### S-CRIT-02 — PostCSS 8.5.8: XSS via unescaped `</style>`
- **CVE/Advisory:** GHSA-qx2v-qp2m-jg93
- **Severidade:** moderada
- **Risco real:** **Baixo** — PostCSS roda no build time; XSS exploit requer atacante controlar input CSS antes do build. Pouco provável neste contexto.
- **Fix:** `npm update postcss` (não-breaking)
- **Esforço:** XS (5 min)

---

## 3. Headers de segurança

### S-HIGH-01 — Sem `vercel.json` com headers configurados
- **Status atual:** zero headers definidos no projeto (host = Vercel decidido)
- **Headers críticos faltando:**

| Header | Função | Recomendação |
|--------|--------|--------------|
| `Strict-Transport-Security` | Força HTTPS | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | Bloqueia MIME sniff | `nosniff` |
| `Referrer-Policy` | Limita info de referrer | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Desabilita APIs sensitivas | `camera=(), microphone=(), geolocation=()` |
| `X-Frame-Options` | Anti-clickjacking | `DENY` (ou `SAMEORIGIN`) |
| `Content-Security-Policy` | Defesa XSS | Avaliar (com nonce ou hash para inline scripts do Next) |

- **Esforço:** S (2-3h — testar CSP especialmente, que pode quebrar inline scripts do Next)
- **Notas:** Vercel oferece "Secure Headers" template via dashboard; também pode ser feito via `vercel.json` no repo

### S-HIGH-02 — Sem Content Security Policy (CSP) definida
- **Risco:** sem CSP, qualquer XSS injetado tem livre execução
- **Específico para Next 14 static export:** Next inline alguns scripts; CSP precisa `'unsafe-inline'` OU usar nonces (requer SSR — não está disponível em static export)
- **Recomendação:** começar com CSP "permissiva-mas-melhor-que-nada":
  ```
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://vitals.vercel-insights.com;
  ```
- **Esforço:** M (4-6h — incluindo testes de breakage)

### S-HIGH-03 — Sem HTTPS-only enforcement explícito
- **Status:** Vercel já força HTTPS automaticamente em domínios `.vercel.app` e custom domains com SSL
- **Mas:** sem HSTS no header, browser não cacheia preferência
- **Resolvido por:** S-HIGH-01 (HSTS header)

---

## 4. Exposição de dados e placeholders

### S-CRIT-PL1 — Email placeholder `contact@noesis-platform.io`
- **Source:** `src/components/contact.tsx:22`
- **Risco:** se domínio não existe → bounce de leads; se existe mas mailbox não → vazamento de leads em deadletter
- **Verificação:** `dig MX noesis-platform.io` para confirmar domínio + mailbox
- **Esforço:** XS — substituir por email real

### S-HIGH-PL1 — Link GitHub placeholder `github.com/your-org/noesis`
- **Source:** `src/components/contact.tsx:29`
- **Risco principal:** **credibilidade**, não segurança técnica. Mas sinaliza descuido sistêmico — alguém poderia registrar `your-org` no GitHub e capturar tráfego/leads tecnicamente bem-intencionados que clicarem.
- **Esforço:** XS — atualizar para URL real

### S-MED-PL1 — Sem `.env.example` documentando keys
- **Source:** repo
- **Risco:** quando devs forem adicionar keys de Resend/Vercel Analytics, podem commitar `.env` por engano. `.env.example` + `.gitignore` correto previne.
- **Verificação:** `.gitignore` atual lista `.env*` (a confirmar)
- **Esforço:** XS

### S-MED-PL2 — Sem secret scanning configurado
- **Source:** ausência de `.github/secret-scanning.yml` ou tool equivalente
- **Risco:** se developers commitarem accidentally API keys (Resend, Vercel)
- **Mitigação:** GitHub secret scanning é gratuito para repos públicos; ativar via Settings
- **Esforço:** XS

---

## 5. Supply chain

### S-MED-SC1 — Dependências sem auditoria de maintainers
- **Source:** análise de package.json
- **14 deps top-level**, mas árvore total não verificada
- **Análise rápida das deps top-level:**

| Dep | Origem | Risco supply-chain |
|-----|--------|---------------------|
| next | Vercel (corporação) | Baixo ✅ |
| react, react-dom | Meta (corporação) | Baixo ✅ |
| typescript | Microsoft | Baixo ✅ |
| @types/* | DefinitelyTyped (community) | Baixo ✅ |
| tailwindcss | Tailwind Labs (corporação) | Baixo ✅ |
| postcss | Andy Jiang + community | Baixo-médio (large project, well-maintained) |
| autoprefixer | Postcss org | Baixo |
| lucide-react | Lucide org (fork de Feather) | Médio (community-maintained, fork) |
| geist | Vercel | Baixo ✅ |

- **Risco:** baixo no agregado — todas as deps top-level são de organizações estabelecidas
- **Recomendação:** rodar `socket.dev` ou `snyk` quando deploy CI estiver configurado, para análise mais profunda da árvore de deps

### S-MED-SC2 — Sem lockfile integrity check no CI
- **Source:** sem CI configurado
- **Risco:** sem `npm ci` enforcement, builds podem usar versões diferentes da lockfile
- **Mitigação:** `npm ci` em GitHub Action (REC-T09 de architect)
- **Esforço:** incluído em REC-T09

### S-LOW-SC1 — Sem assinatura de commits
- **Source:** git config
- **Verificação:** commits recentes não têm assinatura GPG
- **Risco:** baixo — landing pública sem criticidade alta
- **Recomendação:** opcional para ciclos futuros (especialmente se for ter mais contribuidores)

---

## 6. Privacidade & LGPD/GDPR (preparação para waitlist)

Quando o form de waitlist (REC-001 UX) for adicionado com Resend, **automaticamente** entra em escopo LGPD/GDPR.

### S-HIGH-PR1 — Sem política de privacidade
- **Source:** ausência de `/privacy` ou link no footer
- **Risco legal:** coletar email sem privacy policy viola LGPD Art. 9 + GDPR Art. 13
- **Mitigação:** página `/privacy` mínima cobrindo: o que coletamos (email + persona), por quê (waitlist), retenção, direitos do titular, contato do DPO/responsável
- **Esforço:** S (3-4h)

### S-HIGH-PR2 — Sem checkbox de consentimento explícito no form (a implementar)
- **Quando implementar form:** incluir checkbox "I agree to receive updates from Noesis" (opt-in expresso, não pre-checked)
- **Esforço:** incluído no esforço de form (REC-001 + REC-T12)

### S-MED-PR1 — Sem mecanismo de unsubscribe
- **Resend tem suporte nativo** para unsubscribe links — usar
- **Esforço:** incluído em REC-T12

### S-MED-PR2 — Sem cookie banner — mas pode não precisar com Vercel Analytics
- **Vercel Analytics:** não usa cookies, não precisa banner em maioria das jurisdições
- **Mas:** quando adicionar serviços que usem cookies (Hotjar, Intercom, Posthog session replay), precisa banner
- **Recomendação atual:** sem banner ainda; reavaliar quando trocar/adicionar tools

### S-MED-PR3 — Retenção de dados não definida
- **Quando implementar waitlist:** definir retention policy (ex: deletar após X meses de inatividade)
- **Esforço:** decisão política + implementação no Resend/DB

---

## 7. Static export — limites de superfície de ataque

### Pontos positivos (não-vulnerabilidades)
- ✅ Sem backend dinâmico = sem SQL injection
- ✅ Sem auth = sem session hijacking, sem auth bypass
- ✅ Sem upload de arquivo = sem path traversal
- ✅ Sem user input renderizado = sem XSS server-side
- ✅ Sem API endpoint = sem rate-limit/abuso primário

### Cuidados (futuros)
- ⚠️ Form de waitlist será **primeiro endpoint dinâmico** — precisa CORS, rate-limit, validação Zod, anti-bot (honeypot mínimo ou Cloudflare Turnstile)
- ⚠️ Analytics pode coletar PII inadvertidamente (URL params, scroll depth) — auditar
- ⚠️ i18n adicionado pode criar pages com paths derivados de input (cuidado com path traversal se houver lógica dinâmica)

---

## 8. Recomendações de política mínima

### Política mínima recomendada (P0 para implementar)
1. **HSTS** + `Strict-Transport-Security` header
2. **X-Content-Type-Options: nosniff**
3. **Referrer-Policy: strict-origin-when-cross-origin**
4. **Permissions-Policy** desabilitando APIs não-usadas
5. **Privacy policy** ANTES de adicionar form
6. **Consent explícito** em form (não pre-checked)
7. **Upgrade Next** para fora da janela vulnerável
8. **Atualizar PostCSS** (1 comando)

### Política recomendada (P1 — quando tiver waitlist live)
9. **Content Security Policy** (mesmo que permissive inicial)
10. **Rate-limit** no form endpoint (Vercel Edge Middleware ou via Resend default)
11. **Anti-bot** (honeypot + Vercel Bot Protection nos planos Pro+)
12. **Secret scanning** GitHub (gratuito para repos públicos)
13. **`npm audit` + Snyk no CI** (block builds com vuln HIGH+)

### Política avançada (P2)
14. **CSP com nonce** (requer mudar para hybrid SSR se quiser nonce per-request)
15. **OWASP dependency-check** no CI
16. **Subresource Integrity (SRI)** em scripts/links externos

---

## 9. Findings consolidados (resumo)

### 🔴 P0 Critical (esta semana)
- S-CRIT-01: Plan de upgrade Next (já autorizado)
- S-CRIT-02: Atualizar PostCSS (5 min)
- S-CRIT-PL1: Email placeholder
- S-CRIT-PL2: Link GitHub placeholder

### 🟠 P1 High (próximo sprint)
- S-HIGH-01: Configurar `vercel.json` com security headers
- S-HIGH-02: CSP permissiva
- S-HIGH-03: HSTS via header
- S-HIGH-PR1: Privacy policy ANTES de form
- S-HIGH-PR2: Consent checkbox no form

### 🟡 P2 Medium (próximo ciclo)
- S-MED-PL1: `.env.example`
- S-MED-PL2: Ativar GitHub secret scanning
- S-MED-SC1: Socket.dev/Snyk no CI
- S-MED-PR1: Unsubscribe via Resend
- S-MED-PR2: Reavaliar cookie banner
- S-MED-PR3: Retention policy

### 🟢 P3 Low
- S-LOW-SC1: GPG sign commits
- (outros marginais)

---

## 10. Score por critério

| Critério | Score |
|----------|-------|
| Dependency hygiene | 5/10 (vulns conhecidas) |
| Headers configurados | 0/10 (nenhum) |
| Exposição de dados | 6/10 (2 placeholders, mas superfície baixa) |
| Supply chain | 7/10 (deps de orgs estáveis) |
| Privacidade/Compliance prep | 3/10 (nada pronto para form) |
| Posture geral | 5/10 |

**Score médio:** **4.3/10** — aceitável para pré-launch sem dados, **insuficiente** assim que waitlist for live.
