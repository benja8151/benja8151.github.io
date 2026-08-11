# Goal — Privacy-conscious analytics + CV download tracking

Add Umami Cloud analytics to the portfolio so I can see whether recruiters actually
visit the site and, specifically, when they download my CV — plus a few other
engagement signals (outbound clicks, language switch, nav clicks, reaching the end
of the page). Cookieless, no consent banner, loads only in production, respects
Do Not Track.

## Shared understanding
See [`facts.md`](facts.md) for the agreed, verifiable facts.

## Execution plan
See [`plan.md`](plan.md) for the ordered, verified implementation steps (approved).

## Done condition
- Umami script is present on both `/` and `/sl/` production builds, gated to prod + configured ID, with `data-do-not-track`.
- CV downloads (EN vs SLO), outbound clicks (LinkedIn/GitHub/email), language toggle, nav-section clicks, and a single `scroll-reached-end` event are all tracked.
- No consent banner/note; all links keep working unchanged.
- `npm run build` succeeds; the deploy workflow passes the `UMAMI_WEBSITE_ID` env in.
- Real data appears in the Umami dashboard once the account/ID is set (my manual step).
