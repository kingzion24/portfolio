import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { Clock } from "@/components/clock";
import { faqs, site, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}. ${site.available}`,
};

export default function ContactPage() {
  return (
    <>
      <section className="gutter pb-16 pt-40 md:pb-24 md:pt-56">
        <Reveal shift={false}>
          <p className="label text-muted">(Contact)</p>
          <h1 className="mt-8 font-display text-display uppercase">
            <span className="line-mask">
              <span>Start</span>
            </span>
            <span className="line-mask" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <span>
                some<em className="font-serif lowercase italic text-accent">thing</em>
              </span>
            </span>
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-8 border-t border-line pt-6 md:grid-cols-12">
          <Reveal delay={180} className="md:col-span-4">
            <p className="label text-muted">Email</p>
            <a href={`mailto:${site.email}`} className="link-underline mt-3 block text-lead">
              {site.email}
            </a>
          </Reveal>
          <Reveal delay={240} className="md:col-span-4">
            <p className="label text-muted">Elsewhere</p>
            <div className="mt-3 flex flex-col gap-1">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline w-fit">
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={300} className="md:col-span-4">
            <p className="label text-muted">Studio</p>
            <p className="mt-3">{site.location}</p>
            <Clock className="mt-1 block tabular-nums text-muted" />
            <p className="mt-4 flex items-center gap-2 text-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {site.available}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="gutter border-t border-line py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="label text-muted">(Enquiry)</p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-9">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="gutter border-t border-line py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="label text-muted">(Questions)</p>
          </Reveal>
          <div className="md:col-span-9">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 70} className="border-t border-line last:border-b">
                <details className="group py-6">
                  <summary className="flex cursor-pointer items-baseline justify-between gap-6 font-display text-big uppercase transition-colors duration-300 group-open:text-accent marker:content-none [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="label shrink-0 text-muted transition-transform duration-300 group-open:rotate-45">
                      &#43;
                    </span>
                  </summary>
                  <p className="mt-4 max-w-prose text-muted">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
