import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { ProjectArt } from "@/components/project-art";
import { Cta } from "@/components/cta";
import { approach, capabilities, now, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.intro,
};

export default function AboutPage() {
  return (
    <>
      <section className="gutter pb-16 pt-40 md:pb-24 md:pt-56">
        <Reveal shift={false}>
          <p className="label text-muted">(About)</p>
          <h1 className="mt-8 font-display text-display uppercase">
            <span className="line-mask">
              <span>One engineer,</span>
            </span>
            <span className="line-mask" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <span>
                whole <em className="font-serif lowercase italic text-accent">stack</em>
              </span>
            </span>
          </h1>
        </Reveal>
      </section>

      <section className="gutter pb-24 md:pb-32">
        <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <ProjectArt art={["#d9481e", "#2b1a12"]} label={site.name} className="aspect-[4/5] w-full" />
            <p className="mt-4 label text-muted">
              {site.name} &middot; {site.role} &middot; {site.location}
            </p>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={120}>
              <p className="text-lead text-balance">
                I build software for the East African market — and I build all of it. Interface, API, database
                and the infrastructure it runs on are one set of decisions, so I make them together.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-8 space-y-6 text-muted">
              <p>
                That shows up in the defaults. Kiswahili sits alongside English from the first screen rather
                than arriving later as a translation pass. Location data matches Tanzania&rsquo;s actual
                administrative divisions instead of an imported assumption about how addresses work. Bandwidth
                budgets assume the phone someone really owns.
              </p>
              <p>
                It also shows up in the boring parts. UAT and production estates that hold no credentials for
                each other. Database roles scoped so an AI assistant&rsquo;s SQL can read data tables and
                nothing else. Migrations in plain SQL that the next person can read without me.
              </p>
              <p>
                Most of my work runs on infrastructure I maintain myself, which keeps me honest — when a
                deploy goes wrong at two in the morning, the person who gets up is also the person who chose
                the architecture.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee items={capabilities} />

      {/* Now */}
      <section className="gutter py-24 md:py-32">
        <Reveal>
          <p className="label text-muted">(Now)</p>
        </Reveal>
        <ul className="mt-12">
          {now.map((entry, i) => (
            <Reveal as="li" key={entry.label} delay={i * 80} className="border-t border-line">
              <div className="grid gap-4 py-7 md:grid-cols-12">
                <span className="font-display text-big uppercase md:col-span-3">{entry.label}</span>
                <p className="max-w-prose text-muted md:col-span-8">{entry.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Capabilities */}
      <section className="gutter border-t border-line py-24 md:py-32">
        <Reveal>
          <p className="label text-muted">(Stack)</p>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-3">
          {capabilities.map((item, i) => (
            <Reveal key={item} delay={i * 40}>
              <span className="label block border border-line px-5 py-3 transition-colors duration-500 hover:border-accent hover:text-accent">
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Method */}
      <section className="gutter border-t border-line py-24 md:py-32">
        <Reveal>
          <p className="label text-muted">(Method)</p>
        </Reveal>
        <ul className="mt-12">
          {approach.map((item, i) => (
            <Reveal as="li" key={item.step} delay={i * 80} className="border-t border-line">
              <div className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline">
                <span className="label text-accent md:col-span-1">{item.step}</span>
                <h2 className="font-display text-big uppercase md:col-span-5">{item.title}</h2>
                <p className="max-w-prose text-muted md:col-span-6">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <Cta />
    </>
  );
}
