import { asset } from "@/lib/asset";

/** Screenshot of a project's live landing page. */
export function ProjectShot({
  src,
  title,
  className = "",
  priority = false,
}: {
  src: string;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-line ${className}`}>
      <img
        src={asset(src)}
        alt={`${title} — landing page`}
        width={1600}
        height={1000}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
