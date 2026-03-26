import { Building2, GraduationCap, Headset } from 'lucide-react';

const cases = [
  {
    icon: Building2,
    title: 'Enterprise Knowledge Base',
    audience: 'Corporates & Scale-ups',
    points: [
      'Centralise documentation, policies, and procedures across departments',
      'AI-powered search lets employees find answers in seconds, not hours',
      'Multi-tenant architecture supports multiple business units or clients',
      'Auto-response rules deflect repetitive queries from support teams',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Academic & Research Institutions',
    audience: 'Universities & Research Centres',
    points: [
      'Index research papers, course materials, and institutional knowledge',
      'RAG-powered Q&A grounded in actual sources with citations',
      'Multi-language support for international student bodies',
      'Embeddable widget for student portals and library systems',
    ],
  },
  {
    icon: Headset,
    title: 'Customer Support Intelligence',
    audience: 'SaaS & Service Companies',
    points: [
      'Generate FAQs automatically from support tickets and documentation',
      'CSAT surveys and analytics track customer satisfaction over time',
      'Follow-up CRM with campaigns and journey builder for engagement',
      'Conversation flows build guided troubleshooting for chatbots',
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
            Built for organisations that take
            <br className="hidden sm:block" /> knowledge seriously
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {cases.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-950 text-accent-400">
                <c.icon size={22} />
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
