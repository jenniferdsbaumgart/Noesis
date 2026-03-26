const layers = [
  {
    name: 'Backend',
    items: [
      { tech: 'NestJS 10', role: 'API framework' },
      { tech: 'Prisma', role: 'ORM & migrations' },
      { tech: 'BullMQ', role: 'Queue & workers' },
      { tech: 'nestjs-i18n', role: 'Internationalisation' },
      { tech: 'Jest', role: 'Testing (106 tests)' },
    ],
  },
  {
    name: 'Frontend',
    items: [
      { tech: 'Next.js 14', role: 'React framework' },
      { tech: 'Tailwind CSS', role: 'Styling' },
      { tech: 'Radix UI', role: 'Accessible primitives' },
      { tech: 'next-intl', role: 'Internationalisation' },
      { tech: 'Lit', role: 'Widget (Web Components)' },
    ],
  },
  {
    name: 'Data & AI',
    items: [
      { tech: 'PostgreSQL', role: 'Relational database' },
      { tech: 'pgvector', role: 'Vector similarity search' },
      { tech: 'Redis', role: 'Cache & job queue' },
      { tech: 'OpenAI', role: 'Embeddings & LLM' },
      { tech: 'MinIO', role: 'S3-compatible storage' },
    ],
  },
  {
    name: 'Infrastructure',
    items: [
      { tech: 'pnpm workspaces', role: 'Monorepo management' },
      { tech: 'TypeScript', role: 'End-to-end type safety' },
      { tech: 'Docker Compose', role: 'Local development' },
      { tech: 'JWT + RBAC', role: 'Authentication & access' },
      { tech: 'API Keys', role: 'External integrations' },
    ],
  },
];

export function TechStack() {
  return (
    <section id="stack" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-400">
            Tech Stack
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Modern, typed, and production-tested
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Every dependency is chosen for maturity, community support, and
            developer experience. No experimental libraries in production.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {layers.map((layer) => (
            <div
              key={layer.name}
              className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-400">
                {layer.name}
              </h3>
              <div className="mt-4 space-y-3">
                {layer.items.map((item) => (
                  <div key={item.tech} className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium font-mono">{item.tech}</span>
                    <span className="text-xs text-zinc-500">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
