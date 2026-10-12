# Portfolio — Eliza Popelinova

Static site on Astro. Deployed from `main` to Vercel. Owner writes in Russian; site copy is English.

## Concept: "Two sides"
One sheet that fits one screen (desktop 4×3 grid, 100dvh, min 780px). Front = Product (`/`), back = Brand & Visual (`/visual`). The bottom-right "turn" tile flips between sides (View Transitions API). `/product` redirects to `/`.

## Content lives in `src/data/site.ts`
Edit copy, tags, case order and links there, not in components. Each case = product name (first tag) + 1–2 domain tags + ONE selling headline. No descriptions, no numbers on cards (facts go in the CV). Bobyard is a Visual case, never Product.

## Style rules (do not break)
- Interface is grayscale. Colour appears only inside case images and the turn-tile accent. Never invent a new accent colour.
- Font: Helvetica Neue, fallback Hanken Grotesk, Arial. Headings weight 500, uppercase, tight tracking (-0.05em); case headlines sentence case.
- Tokens are CSS variables in `src/styles/global.css` (front on `:root`, back on `[data-side='back']`).
- No arrows anywhere. Motion = tile hover tilt + sheet flip only. Always honour `prefers-reduced-motion`.
- No top menu. Social links are plain icons, no circles. No repeated text between tiles.
- Must not look "AI-made": no generic pill/card feeds, no gradients, no mono-caps labels, no filler copy.
- Keep it fast: no UI frameworks, no client JS unless essential.

## Open content (placeholders in site.ts)
Green Credit Score and World of Colors headlines; verify Ben AI "first industry award"; Bobyard wording (Series A may imply causality); real images in `public/images/` (set `image:` on a case); real social URLs and CV link; photo.

## Workflow
`npm run dev` / `npm run build`. Work on a branch, push, review the Vercel preview URL, then merge to `main`.
