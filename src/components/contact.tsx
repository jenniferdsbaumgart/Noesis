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
          Whether you&apos;re exploring knowledge management for your organisation,
          evaluating the platform for academic research, or interested in the
          engineering behind it &mdash; we&apos;d love to hear from you.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="mailto:contact@noesis-platform.io"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-500"
          >
            Get in Touch
            <ArrowUpRight size={16} />
          </a>
          <a
            href="https://github.com/your-org/noesis"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
            <ArrowUpRight size={16} />
          </a>
        </div>

        <p className="mt-8 text-sm text-zinc-600">
          Enterprise enquiries &middot; Academic partnerships &middot; Technical collaboration
        </p>
      </div>
    </section>
  );
}
