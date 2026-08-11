# Facts

- Umami Cloud analytics is loaded via a single script tag in the shared `<head>` (`src/layouts/Base.astro`), so it applies to both the EN (`/`) and SLO (`/sl/`) pages.
- The Umami website ID and script src are set from the value the user provides (a single place in the layout/config), not scattered across files.
- The analytics script loads only on the production site and is absent during local dev (`astro dev` / preview of a dev build).
- The analytics respects the browser Do Not Track setting (Umami `data-do-not-track` enabled).
- No cookie consent banner and no privacy note are added; the integration stays cookieless.
- Clicking either "Download CV" link (hero + nav) fires a tracked event that distinguishes the EN PDF from the SLO PDF.
- Clicks on outbound links — LinkedIn, GitHub, and email (mailto) — each fire a distinct tracked event.
- Using the language toggle (EN <-> SL) fires a tracked event indicating the chosen language.
- Clicking a nav-bar section link fires a tracked event identifying which section was clicked.
- Scroll engagement is tracked with a single `scroll-reached-end` event that fires at most once per visit when the visitor reaches the end of the page (Contact section visible).
- Tracking never breaks normal behavior: CV downloads, outbound links, language switching, and nav anchors all still work exactly as before with analytics enabled.
- The production build (`npm run build`) succeeds with the analytics integration in place.
