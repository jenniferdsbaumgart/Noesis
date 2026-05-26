import {
  ShieldCheck,
  FileText,
  Building2,
  Globe,
  Puzzle,
  Code,
  BarChart3,
  CheckCircle2,
  LayoutGrid,
  ScrollText,
} from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Grounded answers',
    description:
      'Every answer comes from your own documents — never invented, never approximated. If the source isn’t there, the system says so.',
  },
  {
    icon: FileText,
    title: 'Every answer cited',
    description:
      'Each response shows which documents it drew from, down to the section. Your team can verify and defend any answer in seconds.',
  },
  {
    icon: Building2,
    title: 'Built for multiple customers',
    description:
      'Strict isolation between every customer’s knowledge base. Embed the widget in your product and each user only sees what they’re allowed to.',
  },
  {
    icon: Globe,
    title: 'Speaks your market’s language',
    description:
      'Portuguese, English, Spanish, German, French — same quality across every language, so you can serve Brazil, LATAM, and Europe from one platform.',
  },
];

const alsoIncluded = [
  { icon: Puzzle, label: 'Embeddable widget' },
  { icon: Code, label: 'API access' },
  { icon: BarChart3, label: 'Analytics & CSAT' },
  { icon: CheckCircle2, label: 'Approval workflows' },
  { icon: LayoutGrid, label: 'Multi-source ingestion' },
  { icon: ScrollText, label: 'Audit log retention' },
];

export function Features() {
  return (
    <section id="features" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-400">
            Why Noesis
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built on four promises.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            When your team puts AI in front of customers, four things have to
            be true. Noesis is the platform that holds itself to all of them.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-8 transition hover:border-accent-500/30 hover:bg-zinc-900/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-950 text-accent-400 transition group-hover:bg-accent-900">
                <p.icon size={24} aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-zinc-800/60 pt-8">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-zinc-500">
            Also included
          </p>
          <ul className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
            {alsoIncluded.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 text-sm text-zinc-400"
              >
                <item.icon size={16} className="shrink-0 text-accent-400" aria-hidden />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
