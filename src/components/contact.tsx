import { Mail, ArrowUpRight } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-accent-500/20 bg-accent-950/50">
          <Mail size={24} className="text-accent-400" />
        </div>

        <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Interested in Noesis?
        </h2>
        <p className="mt-4 text-zinc-400">
          Noesis is currently in pre-launch. Join the waitlist to be notified
          when the platform opens for early access, or reach out directly
          if you&apos;d like to talk about your use case.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="mailto:jenniferdsbaumgart@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-500"
          >
            Join the waitlist
            <ArrowUpRight size={16} />
          </a>
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          Early access &middot; Enterprise enquiries
        </p>
      </div>
    </section>
  );
}
