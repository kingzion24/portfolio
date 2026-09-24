import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { WorkIndex } from "@/components/work-index";
import { Cta } from "@/components/cta";
import { projects, stats } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Products designed, built and shipped end to end.",
};

export default function WorkPage() {
  return (
    <>
      <section className="gutter pb-16 pt-40 md:pb-24 md:pt-56">
        <Reveal shift={false}>
          <p className="label text-muted">(Work)</p>
          <h1 className="mt-8 font-display text-display uppercase">
            <span className="line-mask">
              <span>Shipped</span>
            </span>
            <span className="line-mask" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <span className="font-serif lowercase italic text-accent">&amp; running</span>
            </span>
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-6 border-t border-line pt-6 md:grid-cols-12">
          <Reveal delay={200} className="md:col-span-5">
            <p className="text-lead text-balance">
              Three products in production, each one designed, built and deployed end to end. Every link below
              goes to the live thing, not a case-study mockup.
            </p>
          </Reveal>
          <Reveal delay={280} className="md:col-span-3 md:col-start-10 md:text-right">
            <p className="label text-muted">
              {projects.length} projects &middot; All live
            </p>
          </Reveal>
        </div>
      </section>

      <section className="gutter pb-24 md:pb-32">
        <WorkIndex projects={projects} />
      </section>

      <section className="gutter border-t border-line py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <p className="font-display text-huge uppercase">{stat.figure}</p>
              <p className="mt-3 label text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
