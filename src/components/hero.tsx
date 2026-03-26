export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 pt-16 grid-pattern">
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-accent-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-950/50 px-4 py-1.5 text-sm text-accent-300">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
          Multi-tenant &middot; RAG-powered &middot; 5 languages
        </div>

        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Strategic Knowledge
          <br />
          <span className="gradient-text">Platform with AI</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Noesis unifies semantic search, AI-generated answers, and multi-source
          data integration into a single platform &mdash; built for organisations
          that need knowledge to be findable, not just stored.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="rounded-lg bg-accent-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-500"
          >
            Request a Demo
          </a>
          <a
            href="#architecture"
            className="rounded-lg border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white"
          >
            Explore the Architecture
          </a>
        </div>

        {/* Terminal preview */}
        <div className="glow mx-auto mt-16 max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="ml-3 text-xs text-zinc-500 font-mono">noesis-search</span>
          </div>
          <div className="p-5 text-left font-mono text-sm leading-relaxed">
            <p className="text-zinc-500">
              <span className="text-accent-400">POST</span> /api/v1/search/rag
            </p>
            <p className="mt-2 text-zinc-600">{'{'}</p>
            <p className="text-zinc-400">
              {'  '}<span className="text-accent-300">&quot;query&quot;</span>:{' '}
              <span className="text-emerald-400">&quot;How does the refund policy work?&quot;</span>
            </p>
            <p className="text-zinc-400">
              {'  '}<span className="text-accent-300">&quot;language&quot;</span>:{' '}
              <span className="text-emerald-400">&quot;en-GB&quot;</span>
            </p>
            <p className="text-zinc-600">{'}'}</p>
            <div className="mt-3 border-t border-zinc-800 pt-3">
              <p className="text-zinc-500">// AI-generated answer with source citations</p>
              <p className="text-zinc-400">
                <span className="text-accent-300">&quot;answer&quot;</span>:{' '}
                <span className="text-emerald-400">&quot;Refunds are processed within 5-7 working days...&quot;</span>
              </p>
              <p className="text-zinc-400">
                <span className="text-accent-300">&quot;sources&quot;</span>:{' '}
                <span className="text-zinc-500">[3 documents, 94% confidence]</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
