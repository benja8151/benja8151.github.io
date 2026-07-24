# Asset contract

Drop real files here to replace the placeholders. **Keep the same filenames and
aspect ratios** and the layout will not change.

## Logos — `public/assets/logos/`
Square, transparent background (PNG or SVG). Rendered ~40–44px.

| File | Product | Recommended size |
|---|---|---|
| `the-nu.svg` | The NU | 512×512 |
| `avant2go.svg` | Avant2GO | 512×512 |
| `amzs.svg` | AMZS | 512×512 |

If you supply PNGs, name them `.png` and update the `logo.src` paths in
`src/data/cv.ts` (the only place asset paths are declared).

## Device screenshots — `public/assets/<project>/`
Portrait phone screenshots shown in a horizontally-scrollable **carousel** (swipe on
touch, prev/next buttons + dots on desktop). **PNG**, portrait aspect ratio
**1170×2532** (iPhone); any resolution with that ratio works — they are `object-cover`
cropped.

Add as many as you like per project: name them `screen-1.png`, `screen-2.png`,
`screen-3.png`, … and list them in that project's `mockups` array in
`src/data/cv.ts` (order = carousel order). Remove entries to show fewer.

| Folder | Product | Ships with |
|---|---|---|
| `the-nu/` | The NU | `screen-1.png` … `screen-3.png` |
| `avant2go/` | Avant2GO | `screen-1.png` … `screen-3.png` |
| `amzs/` | AMZS | `screen-1.png` … `screen-3.png` |

## Profile photo — `public/assets/`
The hero portrait. Portrait orientation, aspect ratio **4:5** (e.g. 800×1000). Shown
inside a rounded, framed container and cropped with `object-cover`.

| File | Purpose | Recommended size |
|---|---|---|
| `profile.png` | Hero portrait | 800×1000 (4:5) |

## Social / SEO
| File | Purpose | Size |
|---|---|---|
| `og-image.svg` | Open Graph / Twitter preview | 1200×630 |
| `../favicon.svg` | Browser favicon | any square |

## CV PDF
Replace `public/cv-placeholder.pdf` with the real CV, or add a new file and update
`profile.cvPdf` in `src/data/cv.ts`.

All asset paths are centralized in `src/data/cv.ts` and `src/layouts/Base.astro`.
