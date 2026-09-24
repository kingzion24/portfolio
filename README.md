# Portfolio

Editorial portfolio site — Next.js 15 (App Router), TypeScript, Tailwind v4.
Design direction inspired by [ondastudio.co](https://www.ondastudio.co): off-white ground,
oversized tight uppercase display type, hairline rules, numbered index lists.

## Commands

```bash
npm run dev        # dev server on :3000
npm run build      # static export to out/
npm run typecheck  # tsc --noEmit
npx serve out      # serve the export locally
```

`next.config.ts` sets `output: "export"`, so there is no Node server and
`next start` does not apply.

## Routes

| Route      | Contents                                                          |
| ---------- | ----------------------------------------------------------------- |
| `/`        | Hero, marquee, statement, services, featured work, approach, CTA   |
| `/work`    | Project index with cursor-following art preview, live links, stats |
| `/about`   | Bio, Now, stack, method                                           |
| `/contact` | Details, enquiry form, FAQ                                         |

## Editing content

Everything the site says lives in **`src/content/site.ts`** — name, role, email,
projects, services, approach, `now`, capabilities, stats, FAQs. The pages only read from it.

Current projects: [hareha.com](https://hareha.com), [ukowapi.site](https://ukowapi.site),
[studywings.co.tz](https://studywings.co.tz). Adding a fourth is one entry in the `projects`
array — the home page promotes `projects[0]` to the full-width lead slot automatically.

## Design tokens

Defined as Tailwind v4 `@theme` variables in `src/app/globals.css`:
colours (`bg`, `ink`, `muted`, `line`, `accent`), the fluid type scale
(`text-display`, `text-huge`, `text-big`, `text-lead`, `label`), and the
`gutter` page-padding utility.

## Project imagery

`src/components/project-art.tsx` renders gradient + grain placeholders from the
`art` colour pair on each project. Replace that component with `next/image` when
real case-study photography exists — nothing else needs to change.

## Contact form

`src/components/contact-form.tsx` currently composes a `mailto:` draft. To send
server-side, swap `handleSubmit` for a `fetch("/api/contact")` and add a route
handler backed by a mail provider.

## Motion

Scroll reveals are IntersectionObserver + CSS (`src/components/reveal.tsx`,
`.reveal` / `.line-mask` in `globals.css`). All motion is disabled under
`prefers-reduced-motion`.

## Deployment

Pushing to `next-site` runs `.github/workflows/deploy.yml`, which type-checks,
builds a static export and publishes it to GitHub Pages at
<https://kingzion24.github.io/portfolio/>.

GitHub Pages serves a project site from `/<repo>`, so CI builds with
`PAGES_BASE_PATH=/portfolio`. That variable is empty locally, which is why
`npm run dev` needs no sub-path. On a custom domain, set it to `""` and update
`site.url` in `src/content/site.ts`.

Note that this repo's `main` branch holds an unrelated Flutter project; the site
lives on `next-site`, and the workflow only watches that branch.
