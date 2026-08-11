# benja8151.github.io — Personal portfolio

Single-page portfolio for **Benjamin Smrdelj**, a Full-Stack & Mobile Engineer.
Statically generated with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com),
dark by default, typography-led, with a scroll-linked experience timeline and an
image-forward product showcase.

Live at **https://benja8151.github.io**.

## Stack
- **Astro** (static output) — real HTML, indexable, no client UI framework
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Vanilla TypeScript** for the timeline reveal (IntersectionObserver + CSS),
  with a `prefers-reduced-motion` static fallback
- Fonts: Inter (sans) + JetBrains Mono (labels/tags) via `@fontsource`

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # -> dist/
npm run preview  # preview the production build
```

## Content
All copy and structured data live in [`src/data/cv.ts`](src/data/cv.ts) — the single
source of truth. The original CV is kept at [`cv.md`](cv.md) for reference.

## Swapping images / CV
Placeholders ship in [`public/assets/`](public/assets/). Drop in real files using the
same filenames and aspect ratios and the layout won't change — see
[`public/assets/README.md`](public/assets/README.md). Asset paths are centralized in
`src/data/cv.ts`. Replace `public/cv-placeholder.pdf` with the real CV PDF.

## Analytics
Privacy-conscious analytics via **[Umami Cloud](https://umami.is)** — cookieless (no consent
banner needed) and honors the browser's Do Not Track. The tracking snippet lives in
[`src/layouts/Base.astro`](src/layouts/Base.astro), gated to `import.meta.env.PROD` so it only
loads on the deployed site, not local dev. The website ID is public and hardcoded there.

Tracked events (in addition to page views/visitors):
- `cv-download` — CV button clicks, with `lang` (en/sl) and `location` (hero/nav)
- `outbound-github`, `outbound-linkedin`, `email-click` — outbound clicks, with `location`
- `lang-switch` — language toggle, with `to` (en/sl)
- `nav-click` — nav section links, with `section`
- `scroll-reached-end` — fired once when the Contact section is reached
  (see [`src/scripts/analytics.ts`](src/scripts/analytics.ts))

## Deployment
Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds with `withastro/action` and publishes via `actions/deploy-pages`.

**One-time setup:** create a GitHub repo named exactly `benja8151.github.io`, and in
**Settings → Pages** set the source to **GitHub Actions**.
