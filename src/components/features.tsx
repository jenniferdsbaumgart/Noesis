import {
  Search, BrainCircuit, Globe, LayoutGrid, Shield, Puzzle,
  MessageSquare, BarChart3, Workflow, Package,
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Hybrid Search',
    description:
      'Keyword and semantic search combined with pgvector. Language-aware full-text search with PostgreSQL regconfigs.',
  },
  {
    icon: BrainCircuit,
    title: 'RAG Responses',
    description:
      'AI-generated answers grounded in your data with source citations and confidence scores. No hallucination.',
  },
  {
    icon: Globe,
    title: '5 Languages',
    description:
      'Full i18n across every layer — frontend, API, widget, and database. Portuguese, English, Spanish, German, French.',
  },
  {
    icon: Shield,
    title: 'Multi-Tenant Isolation',
    description:
      'Row-level data isolation per organisation with role-based access control. Enforced at the guard level, not just the query.',
  },
  {
    icon: Puzzle,
    title: 'Embeddable Widget',
    description:
      'Drop a single script tag on any website. Lit Web Component with theming, language detection, and API key authentication.',
  },
  {
    icon: LayoutGrid,
    title: 'Multi-Source Ingestion',
    description:
      'Connect APIs, databases, documents, and web pages. Automated sync with BullMQ workers. Chunking and embedding pipeline.',
  },
  {
    icon: MessageSquare,
    title: 'FAQ Generation',
    description:
      'AI-powered FAQ creation from any data source. Approval workflow, category management, and public API for widgets.',
  },
  {
    icon: Workflow,
    title: 'Auto-Response Engine',
    description:
      'Condition-based response rules with AI template generation. RAG-powered contextual replies.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & CSAT',
    description:
      'Search analytics, usage tracking, and customer satisfaction surveys with aggregated reporting.',
  },
  {
    icon: Package,
    title: 'Follow-Up CRM',
    description:
      'Contacts, lists, campaigns, and journey builder. Template management with AI-assisted message generation.',
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-400">
            Capabilities
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to make
            <br className="hidden sm:block" /> knowledge accessible
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            A complete platform — not a wrapper around a vector database.
            Production-grade modules for search, content, automation, and engagement.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6 transition hover:border-accent-500/30 hover:bg-zinc-900/80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-950 text-accent-400 transition group-hover:bg-accent-900">
                <f.icon size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
