import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { ProjectArt } from "@/components/project-art";
import { Cta } from "@/components/cta";
import { Clock } from "@/components/clock";
import { approach, projects, services, site } from "@/content/site";

export default function HomePage() {
  const [lead, ...rest] = projects;

  return (
    <>
      {/* Hero */}
      <section className="gutter relative flex min-h-svh flex-col justify-end pb-10 pt-32">
        <Reveal shift={false} className="block">
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

        <div className="mt-14 grid gap-8 border-t border-line pt-6 md:grid-cols-12">
          <Reveal delay={200} className="md:col-span-3">
            <p className="label text-muted">Available</p>
            <p className="mt-3 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {site.available}
            </p>
          </Reveal>
          <Reveal delay={300} className="md:col-span-5 md:col-start-6">
            <p className="text-lead text-balance">{site.intro}</p>
          </Reveal>
          <Reveal delay={400} className="md:col-span-3 md:col-start-11 md:text-right">
            <p className="label text-muted">{site.location}</p>
            <Clock className="mt-3 block tabular-nums" />
          </Reveal>
        </div>
      </section>

      <Marquee
        items={["Flutter", "TypeScript", "Go", "Laravel", "Postgres", "Kubernetes"]}
      />

      {/* Statement */}
      <section className="gutter py-24 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="label text-muted">(Who)</p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-9">
            <p className="font-display text-big uppercase text-balance">
              I don&rsquo;t hand work off.
              <span className="text-muted">
                {" "}
                Interface, API, database and the servers underneath are one set of decisions — so I make them
                together, ship them myself, and stay on call for what I chose.
              </span>
            </p>
            <Link href="/about" className="link-underline mt-10 inline-block label">
              More about the practice &rarr;
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="gutter border-t border-line py-24 md:py-32">
        <Reveal>
          <p className="label text-muted">(Services)</p>
        </Reveal>
        <ul className="mt-12">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 60} className="group border-t border-line">
              <div className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline">
                <span className="label text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-big uppercase transition-colors duration-500 group-hover:text-accent md:col-span-5">
                  {service.title}
                </h3>
                <p className="max-w-prose text-muted md:col-span-6">{service.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Featured work */}
      <section className="gutter border-t border-line py-24 md:py-32">
        <div className="flex items-baseline justify-between">
          <Reveal>
            <p className="label text-muted">(Selected work)</p>
          </Reveal>
          <Reveal delay={80}>
            <Link href="/work" className="link-underline label">
              All projects &rarr;
            </Link>
          </Reveal>
        </div>

        <Reveal className="mt-12 block">
          <a href={lead.href} target="_blank" rel="noreferrer" className="group block">
            <ProjectArt
              art={lead.art}
              label={lead.client}
              className="aspect-[16/9] w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01]"
            />
            <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
              <h3 className="font-display text-huge uppercase transition-colors duration-500 group-hover:text-accent">
                {lead.title}
              </h3>
              <span className="label text-muted">{lead.year}</span>
            </div>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
              <p className="max-w-xl text-muted">{lead.summary}</p>
              <span className="label text-accent">{lead.href.replace("https://", "")} &#8599;</span>
            </div>
          </a>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={i * 120} className="group">
              <a href={project.href} target="_blank" rel="noreferrer" className="block">
                <ProjectArt
                  art={project.art}
                  label={project.client}
                  className="aspect-[4/3] w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                />
                <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
                  <h3 className="font-display text-big uppercase transition-colors duration-500 group-hover:text-accent">
                    {project.title}
                  </h3>
                  <span className="label text-muted">{project.year}</span>
                </div>
                <p className="mt-2 label text-muted">{project.category}</p>
              </a>
            </Reveal>
          ))}
        </div>

      </section>

      {/* Approach */}
      <section className="gutter border-t border-line py-24 md:py-32">
        <Reveal>
          <p className="label text-muted">(Approach)</p>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-4">
          {approach.map((item, i) => (
            <Reveal key={item.step} delay={i * 90} className="border-t border-line pt-5">
              <span className="label text-accent">{item.step}</span>
              <h3 className="mt-6 font-display text-big uppercase">{item.title}</h3>
              <p className="mt-4 text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
