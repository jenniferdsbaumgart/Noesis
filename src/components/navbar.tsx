export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600">
            <span className="text-sm font-bold text-white">N</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">Noesis</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#architecture" className="transition hover:text-white">Architecture</a>
          <a href="#use-cases" className="transition hover:text-white">Use Cases</a>
          <a href="#stack" className="transition hover:text-white">Stack</a>
        </div>

        <a
          href="#contact"
          className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-500"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  );
}
