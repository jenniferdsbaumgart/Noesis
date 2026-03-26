export function Architecture() {
  return (
    <section id="architecture" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-400">
            Architecture
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for production, not prototypes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Monorepo architecture with clear separation between API, dashboard,
            widget, and shared packages. Every layer is typed, tested, and isolated.
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
          <div className="border-b border-zinc-800 px-6 py-3">
            <span className="text-xs font-medium text-zinc-500 font-mono">system-overview</span>
          </div>
          <div className="p-6 font-mono text-sm leading-loose">
            {/* Layer diagram */}
            <div className="space-y-4">
              {/* Clients */}
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-right text-zinc-600">clients</span>
                <div className="flex flex-1 flex-wrap gap-2">
                  <Tag colour="indigo">Next.js Dashboard</Tag>
                  <Tag colour="indigo">Lit Widget</Tag>
                  <Tag colour="indigo">External API</Tag>
                </div>
              </div>

              <Divider />

              {/* API */}
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-right text-zinc-600">api</span>
                <div className="flex flex-1 flex-wrap gap-2">
                  <Tag colour="violet">NestJS</Tag>
                  <Tag colour="violet">Guards &amp; RBAC</Tag>
                  <Tag colour="violet">21 Modules</Tag>
                  <Tag colour="violet">209 Endpoints</Tag>
                </div>
              </div>

              <Divider />

              {/* Services */}
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-right text-zinc-600">services</span>
                <div className="flex flex-1 flex-wrap gap-2">
                  <Tag colour="emerald">RAG Engine</Tag>
                  <Tag colour="emerald">Search (hybrid)</Tag>
                  <Tag colour="emerald">AI Generation</Tag>
                  <Tag colour="emerald">Sync Workers</Tag>
                </div>
              </div>

              <Divider />

              {/* Data */}
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-right text-zinc-600">data</span>
                <div className="flex flex-1 flex-wrap gap-2">
                  <Tag colour="amber">PostgreSQL + pgvector</Tag>
                  <Tag colour="amber">Redis + BullMQ</Tag>
                  <Tag colour="amber">MinIO (S3)</Tag>
                  <Tag colour="amber">30 Models</Tag>
                </div>
              </div>

              <Divider />

              {/* Packages */}
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-right text-zinc-600">packages</span>
                <div className="flex flex-1 flex-wrap gap-2">
                  <Tag colour="zinc">@athena/rag</Tag>
                  <Tag colour="zinc">@athena/connectors</Tag>
                  <Tag colour="zinc">@athena/shared</Tag>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key architectural decisions */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <DecisionCard
            title="Row-Level Multi-Tenancy"
            description="OrganisationGuard enforces tenant isolation at the request level. Every query is scoped. No shared data leakage."
          />
          <DecisionCard
            title="Language-Aware Search"
            description="PostgreSQL regconfigs dynamically resolve per request. Full-text search respects morphology for each of the 5 supported languages."
          />
          <DecisionCard
            title="Shared Type System"
            description="@athena/shared provides types, validators, and constants across all apps. Single source of truth, enforced at compile time."
          />
        </div>
      </div>
    </section>
  );
}

const colourMap: Record<string, string> = {
  indigo: 'border-indigo-500/20 bg-indigo-950/50 text-indigo-300',
  violet: 'border-violet-500/20 bg-violet-950/50 text-violet-300',
  emerald: 'border-emerald-500/20 bg-emerald-950/50 text-emerald-300',
  amber: 'border-amber-500/20 bg-amber-950/50 text-amber-300',
  zinc: 'border-zinc-600/30 bg-zinc-800/50 text-zinc-300',
};

function Tag({ children, colour }: { children: React.ReactNode; colour: string }) {
  return (
    <span className={`rounded-md border px-2.5 py-1 text-xs ${colourMap[colour]}`}>
      {children}
    </span>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0" />
      <div className="h-4 border-l border-dashed border-zinc-700 ml-4" />
    </div>
  );
}

function DecisionCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
    </div>
  );
}
