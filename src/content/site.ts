/**
 * Single source of truth for every word and project on the site.
 * Keep entries short — the layout is built for brevity.
 */

export const site = {
  name: "Tevin Mdendu",
  short: "Tevin",
  role: "Software Engineer",
  location: "Dar es Salaam, TZ",
  timezone: "Africa/Dar_es_Salaam",
  email: "tevinope@gmail.com",
  available: "Available for work",
  tagline: { lines: ["Software built", "for Tanzania —"], accent: "end to end." },
  intro: "I design, build and run products for the East African market.",
  url: "https://kingzion24.github.io/portfolio",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/kingzion24" },
  { label: "Hareha", href: "https://hareha.com" },
  { label: "Email", href: "mailto:tevinope@gmail.com" },
] as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  href: string;
  /** One line. Resist adding a second. */
  summary: string;
  stack: string[];
  /** Screenshot of the live landing page, in /public/work. */
  image: string;
};

export const projects: Project[] = [
  {
    slug: "hareha",
    title: "Hareha",
    year: "2026",
    category: "Platform",
    href: "https://hareha.com",
    summary:
      "Bookkeeping and an AI assistant for Tanzanian businesses, answering in Kiswahili from their own data.",
    stack: ["Flutter", "Laravel", "Postgres"],
    image: "/work/hareha.webp",
  },
  {
    slug: "ukowapi",
    title: "Ukowapi",
    year: "2026",
    category: "Civic tool",
    href: "https://ukowapi.site",
    summary:
      "One tap returns your region, district, ward and village, from the 2022 census. Nothing leaves the browser.",
    stack: ["TypeScript", "GeoJSON"],
    image: "/work/ukowapi.webp",
  },
  {
    slug: "studywings",
    title: "StudyWings",
    year: "2026",
    category: "Client work",
    href: "https://studywings.co.tz",
    summary:
      "A study-abroad consultancy end to end: public site, student registration, and the staff dashboard behind it.",
    stack: ["Flutter", "Express", "Postgres"],
    image: "/work/studywings.webp",
  },
];

export const services = [
  { title: "Product", body: "Whole products, shipped." },
  { title: "Backend", body: "Postgres, APIs, migrations you can read." },
  { title: "Infrastructure", body: "Docker, Kubernetes, deploys on merge." },
  { title: "AI", body: "Models wired to real data, grounded and traceable." },
];

export const approach = [
  { step: "01", title: "Interrogate", body: "Find the constraint everyone is avoiding." },
  { step: "02", title: "Structure", body: "Schema first. It outlives the interface." },
  { step: "03", title: "Build", body: "I ship what I design. No handoff gap." },
  { step: "04", title: "Harden", body: "Separate, measure, cut." },
];

export const now = [
  { label: "Building", body: "Hareha" },
  { label: "Running", body: "Ukowapi, StudyWings" },
  { label: "Writing", body: "Ozymandis, a Kubernetes PaaS in Go" },
];

export const capabilities = [
  "TypeScript",
  "Flutter",
  "Go",
  "Laravel",
  "Node",
  "Postgres",
  "Docker",
  "Kubernetes",
];

export const stats = [
  { figure: "3", label: "Live products" },
  { figure: "2", label: "Languages" },
  { figure: "1", label: "Engineer" },
];

/** Tanzanian shilling bands. */
export const budgets = [
  "Under TSh 2M",
  "TSh 2M – 6M",
  "TSh 6M – 15M",
  "TSh 15M+",
  "Not sure yet",
] as const;

export const faqs = [
  {
    q: "What do you take on?",
    a: "Builds where owning the whole stack is the point — interface, API, database and deployment decided together.",
  },
  {
    q: "What does it cost?",
    a: "Full builds usually start around TSh 6M. Advisory and audits are billed weekly.",
  },
  {
    q: "How fast can you start?",
    a: "Two projects at a time. Email me and you'll have an answer within two working days.",
  },
];
