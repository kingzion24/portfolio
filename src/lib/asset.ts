/**
 * Prefixes a public/ path with the deployment base path.
 *
 * GitHub Pages serves this site from /portfolio, and Next only rewrites URLs it
 * controls (links, its own chunks) — a raw <img src="/work/x.webp"> would 404.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${base}${path}`;
}
