import { TrendingDown, Puzzle, ShieldCheck } from 'lucide-react';

const cases = [
  {
    icon: TrendingDown,
    title: 'Cut support volume',
    audience: 'Customer Ops & Support',
    points: [
      'Customers find answers in your help center instead of opening tickets',
      'Every deflected reply cites the document that answered it — so your team knows what to improve',
      'Replies in the customer’s language, not just yours',
      'Confidence scores let you escalate to a human only when it matters',
    ],
  },
  {
    icon: Puzzle,
    title: 'Self-service inside your product',
    audience: 'Product & CX',
    points: [
      'Embed the widget where users get stuck — onboarding, settings, checkout',
      'Answers come from your own docs and policies, never made up',
      'See which questions are spiking so product knows what to fix next',
      'Per-customer isolation — each user only sees what they’re entitled to',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Audit-ready AI',
    audience: 'Compliance & Operations',
    points: [
      'Every answer logged with its source — down to the version of the cited document',
      'Retain Q&A history for compliance reviews and dispute resolution',
      'Show the board that AI is grounded — not a generative guess',
      'Tenant-isolated logs — never blend one customer’s data with another’s',
    ],
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-400">
            Use Cases
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Three ways customer ops teams
            <br className="hidden sm:block" /> put Noesis to work.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {cases.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-950 text-accent-400">
                <c.icon size={22} aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-accent-400">{c.audience}</p>
              <ul className="mt-5 flex-1 space-y-3">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500/60" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
