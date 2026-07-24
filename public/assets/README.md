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
Portrait phone screenshots shown inside a device frame. Aspect ratio **1170×2532**
(iPhone). Any resolution with that ratio works; they are object-cover cropped.

| File | Product | Notes |
|---|---|---|
| `the-nu/screen-1.svg` | The NU | primary (largest treatment) |
| `the-nu/screen-2.svg` | The NU | secondary (shown on ≥sm) |
| `avant2go/screen-1.svg` | Avant2GO | logo-only fallback works if no screenshot |
| `amzs/screen-1.svg` | AMZS | map screen |

## Profile photo — `public/assets/`
The hero portrait. Portrait orientation, aspect ratio **4:5** (e.g. 800×1000). Shown
inside a rounded, framed container and cropped with `object-cover`.

| File | Purpose | Recommended size |
|---|---|---|
| `profile.svg` | Hero portrait | 800×1000 (4:5) |

To use a JPG/PNG instead, add the file and update `profile.image` in `src/data/cv.ts`.

## Social / SEO
| File | Purpose | Size |
|---|---|---|
| `og-image.svg` | Open Graph / Twitter preview | 1200×630 |
| `../favicon.svg` | Browser favicon | any square |

## CV PDF
Replace `public/cv-placeholder.pdf` with the real CV, or add a new file and update
`profile.cvPdf` in `src/data/cv.ts`.

All asset paths are centralized in `src/data/cv.ts` and `src/layouts/Base.astro`.
