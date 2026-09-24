export function Marquee({ items }: { items: readonly string[] }) {
  // The track holds two identical runs; the CSS animation translates exactly -50%
  // so the seam is never visible.
  const run = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden border-y border-line py-5" aria-hidden="true">
      <div className="marquee-track flex shrink-0 gap-10 pr-10">
        {run.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10 font-display text-big uppercase">
            {item}
            <span className="text-accent">&#9679;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
