# Asset contract

Drop real files here to replace the placeholders. **Keep the same filenames and
aspect ratios** and the layout will not change.

## Logos — `public/assets/logos/`
Square, transparent-background **PNG**. Rendered ~40–44px.

| File | Product | Recommended size |
|---|---|---|
| `the-nu.png` | The NU | 360×360 |
| `avant2go.png` | Avant2GO | 360×360 |
| `amzs.png` | AMZS | 360×360 |

Asset paths are declared in `src/data/cv.ts` (the only place).

## Device screenshots — `public/assets/<project>/`
Portrait phone screenshots shown in a horizontally-scrollable carousel (swipe on
touch, prev/next buttons + dots on desktop). **The images must already include the
device frame** — they are displayed as-is (natural aspect, no cropping). PNG with a
transparent area around the frame looks best (the drop shadow follows the frame).

Recommended size: **~765×1518** (downscaled from a 1530×3036 export). That is plenty
for the on-page display (~210px wide) at up to 3× pixel density; larger just bloats
the download.

Add as many as you like per project: name them `screen-1.png`, `screen-2.png`,
`screen-3.png`, … and list them in that project's `mockups` array in
`src/data/cv.ts` (order = carousel order). Remove entries to show fewer.

A project can instead show **one transparent PNG** (no carousel) by setting a
`showcase` image in its `src/data/cv.ts` entry (see Avant2GO: `avant2go/product.png`).
It's rendered centered with `object-contain` in the same-height slot as the carousel.

| Folder | Product | Ships with |
|---|---|---|
| `the-nu/` | The NU | `screen-1.png` … `screen-7.png` |
| `avant2go/` | Avant2GO | `product.png` (single **transparent** PNG — no carousel) |
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
