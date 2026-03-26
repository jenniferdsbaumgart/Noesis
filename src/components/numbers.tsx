const stats = [
  { value: '209', label: 'API Endpoints' },
  { value: '30', label: 'Data Models' },
  { value: '21', label: 'Modules' },
  { value: '106', label: 'Unit Tests' },
  { value: '5', label: 'Languages' },
  { value: '<200ms', label: 'Search Latency' },
];

export function Numbers() {
  return (
    <section className="relative border-y border-zinc-800/60 px-6 py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold tracking-tight gradient-text font-mono">
              {s.value}
            </p>
            <p className="mt-1.5 text-sm text-zinc-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
