import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { Cta } from "@/components/cta";
import { approach, capabilities, now, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.intro,
};

export default function AboutPage() {
  return (
    <>
      <section className="gutter pb-16 pt-40 md:pb-24 md:pt-52">
        <Reveal shift={false}>
          <h1 className="font-display text-display uppercase">
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

        <div className="mt-12 grid gap-8 border-t border-line pt-6 md:grid-cols-12">
          <Reveal delay={180} className="md:col-span-6">
            <p className="text-lead text-balance">
              Interface, API, database and the servers underneath are one set of decisions. I make them
              together, and I stay on call for what I chose.
            </p>
          </Reveal>
          <Reveal delay={260} className="md:col-span-5 md:col-start-8">
            <p className="text-muted">
              That shows up in the defaults: Kiswahili from the first screen, not a later translation pass.
              Data that matches Tanzania&rsquo;s real administrative divisions. Bandwidth budgets for the
              phone someone actually owns.
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee items={capabilities} />

      <section className="gutter py-20 md:py-28">
        <Reveal>
          <p className="label text-muted">Now</p>
        </Reveal>
        <ul className="mt-8">
          {now.map((entry, i) => (
            <Reveal as="li" key={entry.label} delay={i * 80} className="border-t border-line">
              <div className="flex flex-wrap items-baseline justify-between gap-4 py-5">
                <span className="label text-muted">{entry.label}</span>
                <span className="font-display text-big uppercase">{entry.body}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="gutter border-t border-line py-20 md:py-28">
        <Reveal>
          <p className="label text-muted">Method</p>
        </Reveal>
        <ul className="mt-8 grid gap-px bg-line md:grid-cols-4">
          {approach.map((item, i) => (
            <Reveal as="li" key={item.step} delay={i * 70} className="bg-bg p-6 md:p-8">
              <span className="label text-accent">{item.step}</span>
              <h2 className="mt-5 font-display text-big uppercase">{item.title}</h2>
              <p className="mt-3 text-muted">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <Cta />
    </>
  );
}
