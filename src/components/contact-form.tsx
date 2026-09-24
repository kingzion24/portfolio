"use client";

import { useState } from "react";
import { budgets, site } from "@/content/site";

/**
 * Where submissions go.
 *
 * The site is a static export on GitHub Pages — there is no server to POST to,
 * so by default the form composes a pre-filled email and hands it to the
 * visitor's mail client. Nothing is stored anywhere in between.
 *
 * To collect submissions properly, set this to a form endpoint (Formspree,
 * Web3Forms, a Cloudflare Worker…). When it is set the form POSTs JSON there
 * instead, and the mailto path is never used.
 */
const FORM_ENDPOINT = "";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [budget, setBudget] = useState<string>(budgets[1]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      budget,
      message: String(data.get("message") ?? ""),
    };

    if (!FORM_ENDPOINT) {
      const body = [`Name: ${payload.name}`, `Budget: ${payload.budget}`, "", payload.message].join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Project enquiry — ${payload.name}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full border-b border-line bg-transparent py-4 outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

  if (status === "sent" && FORM_ENDPOINT) {
    return (
      <p className="border-t border-line py-10 text-lead">
        Thank you — I&rsquo;ll reply within two working days.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-10 gap-y-2 md:grid-cols-2">
      <label className="block">
        <span className="label text-muted">Name</span>
        <input required name="name" autoComplete="name" placeholder="Your name" className={field} />
      </label>

      <label className="block">
        <span className="label text-muted">Email</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          className={field}
        />
      </label>

      <fieldset className="mt-8 md:col-span-2">
        <legend className="label text-muted">Budget</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {budgets.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setBudget(option)}
              aria-pressed={budget === option}
              // normal-case: "TSh" is the correct shilling abbreviation, not "TSH".
              className={`label border px-5 py-3 normal-case transition-colors duration-300 ${
                budget === option
                  ? "border-ink bg-ink text-bg"
                  : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-8 block md:col-span-2">
        <span className="label text-muted">What are you building?</span>
        <textarea
          required
          name="message"
          rows={4}
          placeholder="The project, and what's in the way."
          className={`${field} resize-none`}
        />
      </label>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 md:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="label border border-ink px-10 py-4 transition-colors duration-500 hover:bg-ink hover:text-bg disabled:opacity-40"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        <p className="label text-muted" role="status">
          {status === "error"
            ? "That didn't send — email me directly."
            : status === "sent"
              ? "Your mail app should have opened."
              : "Reply within two working days."}
        </p>
      </div>
    </form>
  );
}
