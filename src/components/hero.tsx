import { FileText, Search } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 pt-16 grid-pattern">
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-accent-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-950/50 px-4 py-1.5 text-sm text-accent-300">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
          Grounded &middot; Source-cited &middot; Multi-language
        </div>

        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Knowledge that answers.
          <br />
          <span className="gradient-text">Not just stores.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Cut support volume with AI that answers from your own docs &mdash;
          and cites every source, so your team can stand behind what
          customers see.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="rounded-lg bg-accent-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-500"
          >
            Join the waitlist
          </a>
        </div>

        <div className="glow mx-auto mt-16 max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-left">
          <div className="flex items-center gap-3 border-b border-zinc-800 px-5 py-4">
            <Search size={16} className="text-zinc-500" aria-hidden />
            <p className="text-sm text-zinc-300">
              How does the refund policy work?
            </p>
          </div>

          <div className="px-5 py-5">
            <p className="text-sm leading-relaxed text-zinc-200">
              Refunds are processed within 5&ndash;7 working days from the date
              your request is approved by the support team.
            </p>

            <div className="mt-5 border-t border-zinc-800 pt-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                3 sources cited
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-zinc-400">
                  <FileText
                    size={14}
                    className="mt-0.5 shrink-0 text-accent-400"
                    aria-hidden
                  />
                  <span>
                    <span className="text-zinc-200">Refund Policy v2.1</span>
                    <span className="text-zinc-500"> &middot; &sect;4 Processing timelines</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-zinc-400">
                  <FileText
                    size={14}
                    className="mt-0.5 shrink-0 text-accent-400"
                    aria-hidden
                  />
                  <span>
                    <span className="text-zinc-200">Support SLA</span>
                    <span className="text-zinc-500"> &middot; Refund handling</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-zinc-400">
                  <FileText
                    size={14}
                    className="mt-0.5 shrink-0 text-accent-400"
                    aria-hidden
                  />
                  <span>
                    <span className="text-zinc-200">FAQ</span>
                    <span className="text-zinc-500"> &middot; What if my refund is late?</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
