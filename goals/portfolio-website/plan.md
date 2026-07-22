# Execution Plan — Benjamin Smrdelj Portfolio Website

## Solution approach

A single-page, statically-generated Astro site styled with Tailwind CSS, dark by
default, deployed to GitHub Pages from a user-site repo (`benja8151.github.io`) via
GitHub Actions. Content is adapted from `cv.md`. The only interactivity is a
scroll-linked experience timeline built with vanilla TypeScript (IntersectionObserver
+ CSS), with a `prefers-reduced-motion` fallback. Images use placeholder assets in a
documented `public/assets/` structure so the site is buildable/deployable now and the
user can drop in real screenshots/logos later without touching layout.

Environment confirmed: Node v24.5.0, npm 11.5.1, git, gh, flutter all present.

## Ordered steps

1. **Scaffold the Astro project in-place**
   - Init a minimal Astro project in the repo root, keeping existing `cv.md` and `goals/`.
   - Add Tailwind via the official integration; add `@fontsource` (or Google Fonts link) for the chosen sans + mono pairing.
   - Files: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.*`, `src/`, `public/`.
   - Set `site: 'https://benja8151.github.io'` (root, no `base`).
   - Verify: `npm install` succeeds; `npm run build` produces `dist/`.

2. **Global theme + layout shell**
   - `src/styles/global.css`: dark charcoal/slate background (not #000), single desaturated accent, sans body / mono for labels, CSS custom properties for the palette.
   - `src/layouts/Base.astro`: `<head>` with title + meta description + Open Graph tags (SEO fact), the sticky nav, `<slot/>`, footer.
   - Verify: build output HTML contains `<title>`, meta description, and OG tags.

3. **Content source of truth**
   - `src/data/cv.ts` (typed): profile, about, skills, experience[], projects[], education[]. Populated from `cv.md`, with the corrected timeline (Comtrade -> Endava/Avant2GO -> The NU) and condensed About.
   - Keep original `cv.md` untouched as reference.
   - Verify: type-checks during build.

4. **Sections (Astro components in `src/components/`)**
   - `Hero.astro`: name, tagline, short intro, GitHub/LinkedIn/email links, Download CV button.
   - `About.astro`: condensed about text.
   - `Skills.astro`: proficiency table rendered as grouped tag chips (Proficient vs Familiar).
   - `Experience.astro` + `timeline.ts`: sticky progress rail; IntersectionObserver reveals each role; reduced-motion fallback shows all statically.
   - `Projects.astro`: three cards — The NU (hero/large), Avant2GO, AMZS — each with device-mockup image slot(s) + logo slot.
   - `Education.astro`: compact list.
   - `Contact.astro`/footer: prominent mailto + GitHub/LinkedIn buttons (no form).
   - `Nav.astro`: sticky, anchors to each section.
   - Assemble in `src/pages/index.astro`.
   - Verify: build HTML contains each section's heading id and expected text (name, tagline, all three project names, education entries, mailto link).

5. **Placeholder assets + asset contract**
   - `public/assets/` with subfolders per project (`the-nu/`, `avant2go/`, `amzs/`) and `logos/`.
   - Ship placeholder images (device-frame mockups + logo placeholders).
   - `public/cv-placeholder.pdf` for the Download CV button.
   - `public/assets/README.md` documenting required filenames, counts, and pixel dimensions per slot so the user can swap real images in.
   - Verify: referenced asset paths exist in `dist/`.

6. **Motion + responsiveness polish**
   - Tasteful micro-interactions (hover states, fade/slide reveals) gated behind reduced-motion.
   - Responsive breakpoints; verify layout at mobile + desktop widths.
   - Verify: `prefers-reduced-motion` media query present; manual/browser check of breakpoints.

7. **Deployment: GitHub Pages via Actions**
   - `.github/workflows/deploy.yml` using `withastro/action` + `actions/deploy-pages`.
   - `README.md` at repo root: what the site is, how to run/build, how to swap assets.
   - Prereq: create repo `benja8151.github.io` on GitHub and enable Pages (source: GitHub Actions).
   - Verify: workflow file validates; after first push, Action succeeds and site is live at https://benja8151.github.io.

8. **Git init + first push**
   - `git init`, `.gitignore` (node_modules, dist, .astro), initial commit.
   - Create the GitHub repo and push (requires the user to re-auth `gh` first — see risks).
   - Verify: repo exists, main branch pushed, Pages build green.

## Verification summary (automated where marked)
- `npm run build` succeeds and emits `dist/` — covers stack, single-page, SEO.
- Grep `dist/` HTML for: name, tagline, all section ids, three project names, education programs, `mailto:`, `<title>`/meta/OG — covers hero/about/skills/timeline-content/projects/education/contact/seo.
- Assert `prefers-reduced-motion` present in CSS — covers reduced-motion.
- Assert placeholder asset paths + `cv-placeholder.pdf` resolve in `dist/` — covers image-slots/pdf-placeholder.
- Assert no analytics scripts (`gtag`, `plausible`, etc.) in output — covers analytics-none.
- Manual/visual: dark theme aesthetic, typography, responsiveness, timeline feel — the subjective facts.

## Risks / open questions
- **gh auth:** `gh auth status` shows account `benja8151` failing to log in. User must run `gh auth login` (with `repo` + `workflow` scopes) before repo creation/push. Non-blocking for local build.
- **Repo name is fixed:** must be exactly `benja8151.github.io` for root-URL serving.
- **Real assets pending:** site ships with placeholders; final visual quality depends on the user's screenshots/logos and their fit to documented dimensions.
- **PDF:** temporary placeholder now; user supplies final PDF later.
- **Font/accent not yet fixed:** will propose a specific sans+mono pairing and accent hex during step 2 for quick approval.
- **Avant2GO imagery:** user still sourcing (website screenshots or logo); card must look good with logo-only fallback.
