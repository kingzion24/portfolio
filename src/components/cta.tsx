import Link from "next/link";
import { site } from "@/content/site";
import { Reveal } from "@/components/reveal";

export function Cta() {
  return (
    <section className="bg-ink text-bg">
      <div className="gutter py-24 md:py-40">
        <Reveal className="block">
          <p className="label opacity-40">Next step</p>
          <h2 className="mt-8 font-display text-display uppercase">
            Let&rsquo;s
            <br />
            <span className="font-serif lowercase italic text-accent">make</span> it
          </h2>
          <div className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lead opacity-70">
              Tell me what you&rsquo;re building and what&rsquo;s in the way. I reply to everything within two
              working days.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="label border border-bg px-8 py-4 text-center transition-colors duration-500 hover:bg-bg hover:text-ink"
              >
                Start a project
              </Link>
              <a href={`mailto:${site.email}`} className="link-underline w-fit label opacity-50">
                {site.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
