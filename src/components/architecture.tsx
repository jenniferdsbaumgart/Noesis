import {
  BookOpen,
  Sparkles,
  MessageCircle,
  BadgeCheck,
  Ban,
  Building2,
  ScrollText,
} from 'lucide-react';

const steps = [
  {
    icon: BookOpen,
    title: 'Your sources',
    description:
      'Connect your help docs, FAQs, policies, and knowledge base — wherever they live today.',
  },
  {
    icon: Sparkles,
    title: 'Indexed semantically',
    description:
      'Noesis reads your content the way a person would — understanding meaning, not matching keywords.',
  },
  {
    icon: MessageCircle,
    title: 'Customer asks',
    description:
      'In your widget, your app, or your support tool — in any of the supported languages.',
  },
  {
    icon: BadgeCheck,
    title: 'Answer with citation',
    description:
      'Grounded in your own documents, with every source named so your team can verify it.',
  },
];

const reassurances = [
  {
    icon: Ban,
    title: 'Doesn’t make things up',
    description:
      'If the answer isn’t in your documents, Noesis says so — instead of guessing. The most important answer is sometimes “I don’t know.”',
  },
  {
    icon: Building2,
    title: 'Stays in its lane',
    description:
      'Every customer’s knowledge base is isolated. Their users see only what they’re entitled to — never another tenant’s data.',
  },
  {
    icon: ScrollText,
    title: 'Defensible by compliance',
    description:
      'Every question, answer, and source citation is retained. Audit trails are exportable on demand for compliance reviews.',
  },
];

export function Architecture() {
  return (
    <section id="how-it-works" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-400">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From your docs to a cited answer.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Four steps. No black box.
          </p>
        </div>

        <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent-500/30 bg-accent-950/60 text-xs font-semibold text-accent-300">
                  {idx + 1}
                </span>
                <step.icon size={20} className="text-accent-400" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {reassurances.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5"
            >
              <item.icon size={18} className="text-accent-400" aria-hidden />
              <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
