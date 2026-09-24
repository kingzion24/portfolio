/**
 * Placeholder artwork for a project card. Swap this component for <Image />
 * once real case-study photography exists — nothing else needs to change.
 */
export function ProjectArt({
  art,
  label,
  className = "",
}: {
  art: readonly [string, string];
  label: string;
  className?: string;
}) {
  const [from, to] = art;

  return (
    <div
      className={`relative isolate overflow-hidden bg-ink ${className}`}
      style={{ backgroundImage: `linear-gradient(140deg, ${from} 0%, ${to} 100%)` }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.16] mix-blend-overlay" aria-hidden="true">
        <filter id={`grain-${label.replace(/\W/g, "")}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${label.replace(/\W/g, "")})`} />
      </svg>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 8.3333%)",
        }}
      />
      <span className="absolute bottom-4 left-4 label text-white/70">{label}</span>
    </div>
  );
}
