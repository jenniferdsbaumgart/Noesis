export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-600">
            <span className="text-xs font-bold text-white">N</span>
          </div>
          <span className="text-sm font-medium text-zinc-400">Noesis</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-600">
          <a href="#features" className="transition hover:text-zinc-400">Features</a>
          <a href="#how-it-works" className="transition hover:text-zinc-400">How it works</a>
          <a href="#use-cases" className="transition hover:text-zinc-400">Use Cases</a>
          <a href="#contact" className="transition hover:text-zinc-400">Contact</a>
        </div>

        <p className="text-xs text-zinc-700">
          &copy; {new Date().getFullYear()} Noesis Platform
        </p>
      </div>
    </footer>
  );
}
