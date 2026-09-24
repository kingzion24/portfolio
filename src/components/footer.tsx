import Link from "next/link";
import { nav, site, socials } from "@/content/site";
import { Clock } from "@/components/clock";

export function Footer() {
  return (
    <footer className="bg-ink text-bg">
      <div className="gutter py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-12 gap-y-8">
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/" className="link-underline label">
              Home
            </Link>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="link-underline label">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline label opacity-60"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-white/10 pt-5">
          <p className="label opacity-40">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <Clock className="label tabular-nums opacity-40" />
        </div>
      </div>
    </footer>
  );
}
