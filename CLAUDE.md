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
- No arrows anywhere. Motion: tile hover tilt, sheet flip/reveal, and on case pages the image crossfade, 12px block rise, statement line reveal and rolling labels. Only transform/opacity, ease-out, under ~600ms. Always honour `prefers-reduced-motion`.
- No top menu. Social links are plain icons, no circles. No repeated text between tiles.
- Must not look "AI-made": no generic pill/card feeds, no gradients, no mono-caps labels, no filler copy.
- Keep it fast: no UI frameworks, no client JS unless essential.

## Open content (placeholders in site.ts)
Green Credit Score and World of Colors headlines; verify Ben AI "first industry award"; Bobyard wording (Series A may imply causality); real images in `public/images/` (set `image:` on a case); real social URLs and CV link; photo.

## Workflow
`npm run dev` / `npm run build`. Work on a branch, push, review the Vercel preview URL, then merge to `main`.

## Case pages (Product)
- Grey ground (`#f3f3f1`). Importance = elevation: the key element is white with a soft shadow (`.l1`), supporting ones off-white (`.l2`), the rest slightly grey (`.l3`). Soft shadows are allowed here (only the shadow layers fade, via opacity). Black main text, grey secondary text (lede is grey too).
- Rail on the left (home + photo circle, section list, active item white with shadow, Contact), content column, image panel to the right edge. Each section is one full screen (scroll-snap).
- Each case has a pastel `tint` behind its images and on highlighted cards on hover. Case colour (`fill`) appears only in small icons (Lucide, inlined at build time from `lucide-static`, no arrows). Numbers and facts stay black. No dots.
- Vary the form, do not use cards everywhere: icon row (meta), bento, divider lists (numbered only for a real sequence), grey-vs-white contrast panels, table, plain text, one tinted callout. Cards react on hover (lift, white/tint).
- One screen answers one question. Headline = a claim, two-tone: second part grey. Small type (headings ~34px, body 15px). ≤90 words per screen.
- Content in `src/data/cases.ts` as `screens` of blocks (meta, bento, contrast, table, decision, cards, list, callout, chain, chips, facts, quote, note, fromto, steps, theme, contact). Right panel = `visual` (single / stack / row), placeholders until real images arrive.
- No gradients, eyebrow labels, hover-reveal text. Every fact appears once per case. No fabricated metrics; scope facts are labelled as scope. No agency name (Danart) on cases.
