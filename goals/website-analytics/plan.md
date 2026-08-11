# Plan — Privacy-conscious analytics + CV download tracking (Umami Cloud)

## Solution approach

Add Umami Cloud with a single `<script>` in the shared `Base.astro` `<head>`, gated so it
only renders in production and only when a website ID is configured. Track clicks
declaratively with Umami's `data-umami-event` attributes (no JS, keeps `href` intact and
non-blocking). Track "reached end" with one small IntersectionObserver on `#contact`.
The website ID + script src come from build-time env vars (`PUBLIC_UMAMI_*`), set once in
the GitHub Actions build step; you paste the real values there. `data-do-not-track="true"`
honors the browser DNT signal. Cookieless, so no banner/note.

## Ordered steps

### 1. Analytics config + script tag (prod-only, DNT)
- File: `src/layouts/Base.astro`
- Read `const umamiId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID;` and
  `const umamiSrc = import.meta.env.PUBLIC_UMAMI_SRC ?? 'https://cloud.umami.is/script.js';`
- In `<head>`, render only when `import.meta.env.PROD && umamiId`:
  `<script defer src={umamiSrc} data-website-id={umamiId} data-do-not-track="true"></script>`
- This satisfies prod-only (PROD false under `astro dev`) and "single place / from provided value".
- Verify: `npm run build` with a dummy `PUBLIC_UMAMI_WEBSITE_ID=test-id`; grep `dist/index.html`
  and `dist/sl/index.html` for `data-website-id="test-id"`, the src, and `data-do-not-track`.

### 2. CV download events (EN vs SLO)
- Files: `src/components/Hero.astro`, `src/components/Nav.astro`
- In Hero add `const loc = Astro.currentLocale === 'sl' ? 'sl' : 'en';` (Nav already has `loc`).
- On both CV `<a href={profile.cvPdf}>`: add
  `data-umami-event="cv-download"` and `data-umami-event-lang={loc}`
  (and `data-umami-event-location="hero"|"nav"` to tell the two buttons apart).
- Verify: grep built HTML for `data-umami-event="cv-download"` with `data-umami-event-lang`
  present in both `/` (en) and `/sl/`; confirm `href` still points at the PDF.

### 3. Outbound-click events (LinkedIn / GitHub / email)
- Files: `src/components/Hero.astro`, `src/components/Contact.astro`
- GitHub link: `data-umami-event="outbound-github"`; LinkedIn: `data-umami-event="outbound-linkedin"`;
  mailto: `data-umami-event="email-click"`. Add `data-umami-event-location` to distinguish hero vs contact.
- Verify: grep built HTML for each of the three event names; `href`/`mailto:` unchanged.

### 4. Language-toggle events
- File: `src/components/Nav.astro`
- On each `[data-set-lang]` anchor: `data-umami-event="lang-switch"` + `data-umami-event-to={"en"|"sl"}`.
- The existing inline click handler that stores the lang choice stays untouched.
- Verify: grep built HTML for `data-umami-event="lang-switch"` with `data-umami-event-to`.

### 5. Nav section-link events
- File: `src/components/Nav.astro`
- On each mapped section `<a href={`#${s.id}`}>`: `data-umami-event="nav-click"` + `data-umami-event-section={s.id}`.
- Verify: grep built HTML for `data-umami-event="nav-click"` across the section ids.

### 6. Scroll-reached-end event
- New file: `src/scripts/analytics.ts` (module script), imported once from `Base.astro` via
  `<script>` so it ships on every page.
- Logic: `IntersectionObserver` on `#contact`; on first intersection call
  `window.umami?.track('scroll-reached-end')` then `disconnect()` (fires at most once/visit).
  Optional-chaining means it's a no-op in dev where `umami` is absent.
- Respect reduced overhead: bail early if `#contact` missing.
- Verify: manual — load production build, scroll to contact, confirm one `scroll-reached-end`
  in the Umami dashboard / network tab. (Marked manual in facts.)

### 7. Document (DECISION UPDATE: hardcode the ID)
- The Umami website ID is public (it ships in the client-side script tag), so per the user's
  decision it is **hardcoded directly in `Base.astro`** — no env var, no GitHub repo variable,
  no deploy-workflow change. Real ID: `ef4e37a6-1512-4d6f-8882-a35add85bf0c`,
  src `https://cloud.umami.is/script.js`.
- Add a short "Analytics" note to the README documenting the integration and where the ID lives.

### 8. Final verification
- `npm run build` succeeds (with a dummy id) — required.
- Grep `dist/**/*.html` to confirm all event attributes + the gated script are present on both locales.
- Confirm no `href`/`mailto:` values changed (non-blocking guarantee).
- Reason about prod-only: script is wrapped in `import.meta.env.PROD` so `astro dev` never emits it.
- Clean up any temp/dummy env usage.

## Risks / open questions
- **Website ID required for real data.** Nothing reports until you create the Umami site and set
  `UMAMI_WEBSITE_ID`. The build/site work fine without it (script simply omitted).
- **Ad/tracker blockers** may block `cloud.umami.is`, undercounting tech-savvy visitors. Acceptable
  for this goal; a custom-domain/self-host proxy could mitigate later (out of scope).
- **Umami global timing.** `data-umami-event` clicks are handled by Umami's script; the scroll
  observer uses `window.umami?.track` guarded by optional chaining, so early/absent load is safe.
- **Excluding your own visits** was not selected; you can filter yourself in the Umami dashboard later.
