/**
 * Single source of truth for every word and project on the site.
 * Edit this file — the pages read from it.
 */

export const site = {
  name: "Zion",
  role: "Software Engineer",
  location: "Dar es Salaam, TZ",
  timezone: "Africa/Dar_es_Salaam",
  email: "tevinope@gmail.com",
  available: "Open for select projects — Q4 2026",
  /** Display lines for the hero; `accent` renders as the serif italic final line. */
  tagline: { lines: ["Software built", "for Tanzania —"], accent: "end to end." },
  intro:
    "I build products for the East African market — bookkeeping for small businesses, location data that actually matches the census, study-abroad systems in two languages. Design, backend, and the infrastructure underneath.",
  url: "https://example.com",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/kingzion24" },
  { label: "Hareha", href: "https://hareha.com" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
] as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  /** Live URL shown on the project row. */
  href: string;
  summary: string;
  /** Two or three concrete facts about the build. */
  notes: string[];
  stack: string[];
  /** Two colors used to render the project's placeholder art. Swap for real screenshots later. */
  art: [string, string];
};

export const projects: Project[] = [
  {
    slug: "hareha",
    title: "Hareha",
    client: "Own platform",
    year: "2025—26",
    category: "Platform · Full-stack",
    href: "https://hareha.com",
    summary:
      "A business platform for Tanzanian MSMEs. Mali Daftari handles the books; Mali Akili is the AI assistant that reads them — answering questions about sales, stock and expenses in English or Kiswahili, grounded so every figure comes from the owner's own data.",
    notes: [
      "Bilingual assistant with per-message language detection and streamed responses over SSE.",
      "Least-privilege database roles: the model's SQL can read data tables and nothing else.",
      "Separate UAT and production estates that hold no credentials for each other — no runtime switch to flip by mistake.",
      "Filament operator dashboard reading the analytics schema across both environments.",
    ],
    stack: ["Flutter", "Laravel", "Postgres", "Redis", "MCP", "Supabase"],
    art: ["#d9481e", "#2b1a12"],
  },
  {
    slug: "ukowapi",
    title: "Ukowapi",
    client: "Own project",
    year: "2026",
    category: "Civic Tool · Web",
    href: "https://ukowapi.site",
    summary:
      "Tap one button and it tells you your region, district, ward and village — so you stop filling in the wrong details on forms. Boundaries come from Tanzania's 2022 Population and Housing Census.",
    notes: [
      "Resolves GPS coordinates against census boundary polygons entirely in the browser.",
      "Stores nothing and sends no coordinates to a server — the privacy claim is structural, not a policy.",
      "Falls back to manual region and district lookup, with nearby wards offered when the fix is uncertain.",
      "Bilingual Swahili and English throughout.",
    ],
    stack: ["TypeScript", "GeoJSON", "Geolocation API"],
    art: ["#0f3b33", "#7fd1b9"],
  },
  {
    slug: "studywings",
    title: "StudyWings",
    client: "StudyWings",
    year: "2026",
    category: "Client Work · Full-stack",
    href: "https://studywings.co.tz",
    summary:
      "A study-abroad consultancy's whole operation: a public marketing site, a student registration form that mirrors the paper one, and a role-scoped staff dashboard where every submission lands.",
    notes: [
      "One Flutter web build and an Express API served from a single domain behind Caddy.",
      "English and Kiswahili throughout — a visitor's language is stored with their submission so staff know how to reply.",
      "Cloudflare Turnstile, a honeypot and rate limiting on the public form.",
      "Zod-validated API, JWT auth, plain SQL migrations on Postgres 16.",
    ],
    stack: ["Flutter", "Node / Express", "Postgres", "Docker", "Caddy"],
    art: ["#1f2a3c", "#8ea6c8"],
  },
];

export const services = [
  {
    title: "Product Engineering",
    body: "Whole products, not tickets. Interface through API through schema, shipped by the same pair of hands so nothing is lost in the handoff.",
  },
  {
    title: "Backend & Data",
    body: "Postgres schemas, migrations you can read, and API surfaces that validate at the edge. Least-privilege roles by default.",
  },
  {
    title: "Infrastructure",
    body: "Docker, Kubernetes and CI that deploys on merge. Environments separated so a mistake in staging cannot reach production data.",
  },
  {
    title: "AI Integration",
    body: "Language models wired to real business data — grounded, cost-tracked, and bounded so the answer is always traceable to a row someone owns.",
  },
  {
    title: "Localisation",
    body: "Bilingual English and Kiswahili products, built in from the first screen rather than retrofitted as a translation pass.",
  },
];

export const approach = [
  {
    step: "01",
    title: "Interrogate",
    body: "Before anything is built, I want the constraint everyone is avoiding. Most projects fail on an unasked question, not a bad line of code.",
  },
  {
    step: "02",
    title: "Structure",
    body: "Schema first, then API, then interface. The data model is the part still standing three years from now.",
  },
  {
    step: "03",
    title: "Build",
    body: "I design and ship the same system. That removes the handoff gap where quality usually leaks out of a project.",
  },
  {
    step: "04",
    title: "Harden",
    body: "Launch is the midpoint. Separate the environments, lock the permissions, measure the cost, and cut whatever isn't doing work.",
  },
];

/** What's live and what's in progress. Kept factual — no invented employment history. */
export const now = [
  {
    label: "Building",
    body: "Hareha — Mali Daftari and Mali Akili, the bookkeeping and AI layer for Tanzanian MSMEs.",
  },
  {
    label: "Maintaining",
    body: "Ukowapi, a free census-backed location lookup, and the StudyWings platform.",
  },
  {
    label: "Working on",
    body: "Ozymandis, a self-hosted Kubernetes PaaS in Go that deploys the rest of it.",
  },
  {
    label: "Available for",
    body: "Client builds where one engineer taking the whole stack is an advantage, not a risk.",
  },
];

export const capabilities = [
  "TypeScript",
  "Flutter / Dart",
  "Go",
  "PHP / Laravel",
  "Node / Express",
  "Postgres",
  "Docker",
  "Kubernetes",
  "Redis",
  "Supabase",
  "LLM integration",
  "CI/CD",
];

export const stats = [
  { figure: "3", label: "Products live in production" },
  { figure: "2", label: "Languages shipped in every product" },
  { figure: "100%", label: "Designed and built end to end" },
];

export const faqs = [
  {
    q: "What kind of work do you take?",
    a: "Builds where owning the whole stack is the point — a product that needs interface, API, database and deployment decided together. I'm least useful dropped into one layer of someone else's architecture.",
  },
  {
    q: "How do you scope a project?",
    a: "A short paid discovery that produces a written brief, a rough architecture and a fixed price for the build. If the brief concludes the project shouldn't happen, you keep the brief and we part cleanly.",
  },
  {
    q: "Do you build for the Tanzanian market specifically?",
    a: "Most of my work is here, and it shows in the defaults: Kiswahili alongside English from the first screen, low-bandwidth budgets, and data that matches local administrative reality rather than an imported assumption.",
  },
  {
    q: "What's your availability?",
    a: "Two engagements at a time. Current availability is listed at the top of this page — email me and you'll have a reply within two working days.",
  },
];
