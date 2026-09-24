import Link from "next/link";
import { nav, site, socials } from "@/content/site";
import { Clock } from "@/components/clock";

export function Footer() {
  return (
    <footer className="bg-ink text-bg">
      <div className="gutter border-t border-white/10 py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label opacity-40">Index</p>
            <nav className="mt-5 flex flex-col gap-2">
              <Link href="/" className="link-underline w-fit text-lead">
                Home
              </Link>
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="link-underline w-fit text-lead">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4">
            <p className="label opacity-40">Elsewhere</p>
            <div className="mt-5 flex flex-col gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline w-fit text-lead"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="label opacity-40">Studio</p>
            <div className="mt-5 flex flex-col gap-2 text-lead">
              <span>{site.location}</span>
              <Clock />
              <a href={`mailto:${site.email}`} className="link-underline w-fit">
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="label opacity-40">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="label opacity-40">Built with Next.js &amp; TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
