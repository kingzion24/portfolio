import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { HorizontalWork } from "@/components/horizontal-work";
import { Cta } from "@/components/cta";
import { Odometer } from "@/components/odometer";
import { projects, stats } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Three products, live in production.",
};

export default function WorkPage() {
  return (
    <>
      <section className="gutter pb-12 pt-40 md:pb-16 md:pt-52">
        <Reveal shift={false}>
          <h1 className="font-display text-display uppercase">
            <span className="line-mask">
              <span>Work</span>
            </span>
          </h1>
        </Reveal>
        <Reveal delay={160} className="mt-8 flex items-baseline justify-between border-t border-line pt-5">
          <p className="max-w-sm text-muted">Every link opens the live site.</p>
          <p className="label text-muted">{projects.length} projects</p>
        </Reveal>
      </section>

      <HorizontalWork projects={projects} />

      <section className="gutter border-t border-line py-16">
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <Odometer value={stat.figure} className="block font-display text-huge uppercase" />
              <p className="mt-2 label text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
