"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, socials } from "@/content/site";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* mix-blend-difference keeps the bar legible over both light and dark sections */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="gutter flex items-center justify-between py-6 text-white md:py-8">
          <Link
            href="/"
            className="pointer-events-auto label transition-opacity hover:opacity-60"
            aria-label={`${site.name} — home`}
          >
            {site.short}
            <span className="ml-2 opacity-50">/ {site.role}</span>
          </Link>

          <nav className="pointer-events-auto hidden items-center gap-8 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="label link-underline transition-opacity hover:opacity-100"
                  style={{ opacity: active ? 1 : 0.6 }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="pointer-events-auto label md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-8 pt-28 text-bg md:hidden"
      >
        <nav className="flex flex-col">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-white/15 py-5 font-display text-big uppercase"
            >
              <span className="label mr-4 align-top opacity-40">0{i + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="label opacity-60">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
