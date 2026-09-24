"use client";

import { useState } from "react";
import { site } from "@/content/site";

const budgets = ["< $10k", "$10k – $25k", "$25k – $60k", "$60k +", "Not sure yet"];

type Status = "idle" | "sending" | "sent" | "error";

/**
 * No backend yet: the form composes a structured mail draft and hands it to the
 * user's mail client. Swap `handleSubmit` for a fetch to /api/contact when a
 * mail provider (Resend, Postmark…) is wired up.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [budget, setBudget] = useState(budgets[1]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Budget: ${budget}`,
      "",
      message,
    ].join("\n");

    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      `New project enquiry — ${company || name}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setStatus("sent");
  }

  const field =
    "w-full border-b border-line bg-transparent py-4 text-lead outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-8 gap-y-2 md:grid-cols-2">
      <label className="block">
        <span className="label text-muted">Name *</span>
        <input required name="name" autoComplete="name" placeholder="Ada Lovelace" className={field} />
      </label>

      <label className="block">
        <span className="label text-muted">Company</span>
        <input name="company" autoComplete="organization" placeholder="Analytical Engines Ltd" className={field} />
      </label>

      <label className="block md:col-span-2">
        <span className="label text-muted">Email *</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          className={field}
        />
      </label>

      <fieldset className="md:col-span-2 mt-6">
        <legend className="label text-muted">Budget</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {budgets.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setBudget(option)}
              aria-pressed={budget === option}
              className={`label border px-5 py-3 transition-colors duration-300 ${
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

      <label className="mt-6 block md:col-span-2">
        <span className="label text-muted">What are you building? *</span>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="The project, the deadline, and the thing that's currently in the way."
          className={`${field} resize-none`}
        />
      </label>

      <div className="mt-8 flex flex-col items-start gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="label border border-ink px-10 py-4 transition-colors duration-500 hover:bg-ink hover:text-bg disabled:opacity-40"
        >
          {status === "sending" ? "Opening…" : "Send enquiry"}
        </button>
        <p className="label text-muted" role="status">
          {status === "sent"
            ? "Your mail client should have opened — if not, email me directly."
            : "Replies within two working days."}
        </p>
      </div>
    </form>
  );
}
