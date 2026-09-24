import Link from "next/link";
import { site } from "@/content/site";
import { Reveal } from "@/components/reveal";

export function Cta() {
  return (
    <section className="bg-ink text-bg">
      <div className="gutter py-20 md:py-32">
        <Reveal shift={false} className="block">
          <Link href="/contact" className="group block">
            <h2 className="font-display text-display uppercase">
              <span className="line-mask">
                <span className="transition-colors duration-500 group-hover:text-accent">
                  Start a <em className="font-serif lowercase italic">project</em>{" "}
                  <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[0.12em] group-hover:translate-x-[0.12em]">
                    &#8599;
                  </span>
                </span>
              </span>
            </h2>
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="link-underline mt-8 inline-block label opacity-60"
          >
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
