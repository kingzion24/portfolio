import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { HorizontalWork } from "@/components/horizontal-work";
import { Cta } from "@/components/cta";
import { Clock } from "@/components/clock";
import { HeroDrift } from "@/components/hero-drift";
import { SpinBadge } from "@/components/spin-badge";
import { projects, services, site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="gutter relative flex min-h-svh flex-col justify-end pb-12 pt-32">
        <Reveal delay={500} className="absolute right-5 top-28 hidden md:right-10 md:block xl:right-14">
          <SpinBadge text={`${site.available} • ${site.location} • `} className="h-32 w-32" />
        </Reveal>

        <HeroDrift>
          <Reveal shift={false}>
            <h1 className="font-display text-display uppercase">
              {site.tagline.lines.map((line, i) => (
                <span
                  key={line}
                  className="line-mask"
                  style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
                >
                  <span>{line}</span>
                </span>
              ))}
              <span
                className="line-mask"
                style={
                  { "--reveal-delay": `${site.tagline.lines.length * 110}ms` } as React.CSSProperties
                }
              >
                <span className="font-serif lowercase italic text-accent">{site.tagline.accent}</span>
              </span>
            </h1>
          </Reveal>
        </HeroDrift>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-6 border-t border-line pt-5">
          <Reveal delay={260}>
            <p className="flex items-center gap-2 label">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {site.available}
            </p>
          </Reveal>
          <Reveal delay={320}>
            <p className="max-w-xs text-muted">{site.intro}</p>
          </Reveal>
          <Reveal delay={380}>
            <Clock className="label tabular-nums text-muted" />
          </Reveal>
        </div>
      </section>

      {/* Work — scrolls left to right */}
      <div className="gutter flex items-baseline justify-between border-t border-line py-5">
        <Reveal>
          <p className="label text-muted">Selected work</p>
        </Reveal>
        <Reveal delay={80}>
          <Link href="/work" className="link-underline label">
            All &rarr;
          </Link>
        </Reveal>
      </div>

      <HorizontalWork projects={projects} />

      {/* Services */}
      <section className="gutter border-t border-line py-20 md:py-28">
        <Reveal>
          <p className="label text-muted">What I do</p>
        </Reveal>
        <ul className="mt-8 grid gap-px bg-line md:grid-cols-4">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 70} className="card-sweep bg-bg p-6 md:p-8">
              <h2 className="font-display text-big uppercase">{service.title}</h2>
              <p className="mt-3 text-muted">{service.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <Cta />
    </>
  );
}
