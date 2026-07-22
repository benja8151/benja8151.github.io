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

## Deployment
Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds with `withastro/action` and publishes via `actions/deploy-pages`.

**One-time setup:** create a GitHub repo named exactly `benja8151.github.io`, and in
**Settings → Pages** set the source to **GitHub Actions**.
