import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Clock } from "@/components/clock";
import { contacts, faqs, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${site.name} — ${site.email}, ${site.phoneDisplay}.`,
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
      </section>

      {/* The whole page: four ways to reach me. */}
      <section className="gutter pb-16">
        <ul className="border-t border-line">
          {contacts.map((contact, i) => (
            <Reveal as="li" key={contact.label} delay={i * 80} className="border-b border-line">
              <a
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex flex-wrap items-baseline gap-x-8 gap-y-2 py-6 transition-colors duration-500 hover:text-accent md:py-8"
              >
                <span className="label w-24 shrink-0 text-muted transition-colors group-hover:text-accent">
                  {contact.label}
                </span>
                <span className="font-display text-big uppercase transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-3">
                  {contact.value}
                </span>
                <span className="ml-auto label opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  &#8599;
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={320} className="mt-10 flex flex-wrap items-baseline justify-between gap-4">
          <p className="flex items-center gap-2 label">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {site.available}
          </p>
          <p className="label text-muted">{site.location}</p>
          <Clock className="label tabular-nums text-muted" />
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
