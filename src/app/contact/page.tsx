import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { faqs, site, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="gutter pb-12 pt-40 md:pb-16 md:pt-52">
        <Reveal shift={false}>
          <h1 className="font-display text-display uppercase">
            <span className="line-mask">
              <span>
                Say <em className="font-serif lowercase italic text-accent">hello</em>
              </span>
            </span>
          </h1>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-5">
          <Reveal delay={160}>
            <a href={`mailto:${site.email}`} className="link-underline text-lead">
              {site.email}
            </a>
          </Reveal>
          <Reveal delay={220}>
            <p className="text-muted">{site.location}</p>
          </Reveal>
          <Reveal delay={280} className="ml-auto">
            <div className="flex gap-6">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline label">
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="gutter py-12 md:py-16">
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>

      <section className="gutter border-t border-line py-16 md:py-24">
        {faqs.map((faq, i) => (
          <Reveal key={faq.q} delay={i * 70} className="border-b border-line">
            <details className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-6 font-display text-big uppercase transition-colors duration-300 group-open:text-accent marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="label shrink-0 text-muted transition-transform duration-300 group-open:rotate-45">
                  &#43;
                </span>
              </summary>
              <p className="mt-3 max-w-prose text-muted">{faq.a}</p>
            </details>
          </Reveal>
        ))}
      </section>
    </>
  );
}
