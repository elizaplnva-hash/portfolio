# Portfolio — Eliza Popelinova

Static site on Astro. Deployed from `main` to Vercel. Owner writes in Russian; site copy is English.

## Concept: "Two sides"
One sheet that fits one screen (desktop 4×3 grid, 100dvh, min 780px). Front = Product (`/`, light), back = Brand & Visual (`/visual`, dark). The bottom-right "turn" tile flips between sides (cross-document View Transitions: a circle opens from that corner; nothing else on the page moves during the flip). `/product` redirects to `/`.

## Where content lives
- `src/data/site.ts`: per side — intro (`role` = headline, may hold `<b>`; `pitchSub` = one grey line), photo + `photoPos`, socials, shared `process` steps, turn tile copy.
- `src/data/cases.ts`: cases (order, `big`, `tags`, `headline`, `color`, `image`, `phones`, `desk`, `mark`) and each case page as `screens` of blocks. `bySide()` hides parked slugs (`world-of-colors`, `reboot-hub`, `bobyard`; their pages still exist).
- Edit copy there, not in components.

## Home (front)
- Row 1: photo tile (inset 10px like case covers, image follows the cursor; chips: spinning Earth "Vancouver, BC" + blinking green "Open to work"), Intro tile (one tag "Intro"; headline all black, weight 700; one grey description line; iOS-style social icons: LinkedIn, Behance, Gmail, CV in pink), My process tile.
- My process: 4 steps pinned to the bottom (Research, Understand, Design, Deliver). Hover opens a white frame upwards: description under the title, tags tinted in the step colour (green, blue, pink, orange = the case colours), icon in a circle tinted on hover. Frame grows from its bottom edge; text appears after the rows settle.
- Case tiles: product name as first tag + 3 tags (glass pills on front, dark glass on back), ONE product-based headline in the form "benefit, how" or a confirmed metric. Order: PinkWallet (big), Green Credit Score, Jam Social, Lapunzel.
- Layered covers: light solid fill (16% of case colour), the product name (`mark` if shorter) huge and faint behind, fitted edge to edge with 20px; transparent device renders (`phones`) hang just below the measured tag row, sit lower at rest and rise on hover, following the cursor. `desk: true` = monitor + phone (phone ~70% of monitor height, at the right edge, rises further). Covers without `phones` use `image`.
- Turn tile: rounded peeling corner; the curl grows as the cursor gets closer to the corner.

## Style rules
- Font: Manrope (variable, `@fontsource-variable/manrope`), fallback Helvetica Neue, Arial. No uppercase anywhere. Moderate negative tracking (≈ -.02 to -.035em).
- Front: grey ground `#f3f3f1`, all tiles white; hover = a very light shadow only (`--sh-hover`). Back: dark ground, dark tiles, no shadows and no outlines on hover; tags and chips are dark translucent (inverted front).
- Text: black for primary, grey for secondary.
- Colour: pink `--pink: #e0408f` for section-tag dots and small accents; green only for the status dot; case colours on covers and process steps; brand colours only inside the social icons. No gradients in UI (the Earth icon and curl shading are the only exceptions).
- Icons: Tabler (filled) for UI, Simple Icons shapes for brand logos, Lucide on case pages. Arrows only on Back and in the process chain on case pages.
- Motion: transform/opacity only, ease-out, ~0.4–0.7s; no page-load entrance animations. Always honour `prefers-reduced-motion`. Pointer effects on mouse devices only.
- Must not look "AI-made": no filler copy, no mono-caps labels.
- Keep it fast: no UI frameworks; client JS only for pointer effects, cover measuring and the curl.

## Facts policy
No fabricated metrics. Case headline metrics (Jam Social 2.5×, Lapunzel 20%, Green Credit Score "5 seconds", "0-to-1") are confirmed by the owner. The agency name (Danart) may be named on cases (owner allowed it); her lead there is the Design Manager. Title on site: Senior Product Designer.

## Workflow
`npm run dev` / `npm run build`. Work on `feat/links`, push, review the Vercel preview URL. Merge to `main` only when the owner explicitly says so ("влей").

## Case pages (Product)
- Grey ground. Importance = elevation: key element white with soft shadow (`.l1`), supporting off-white (`.l2`), the rest slightly grey (`.l3`). Black main text, grey secondary.
- Rail on the left (Back pill, section list with the active item white, photo + Contact button), content column, image panel to the right edge. One full screen per section (scroll-snap). Brand cases use the dark mode of the same template with `group` sections in the rail and an optional `link` button.
- Each case has a pastel `tint` behind its images; case colour (`fill`) only in small icons. Headlines all black. Facts are cards with numbers in the case colour. Last screen: CTA left, next-case and brand-work tiles right.
- Vary the form: icon row, bento, divider lists, contrast panels, table, plain text, one tinted callout. Cards react on hover.
- One screen answers one question. ≤90 words per screen.
- Blocks: meta, bento, contrast, table, decision, cards, list, callout, chain, chips, facts, quote, note, fromto, steps, theme, contact. Right panel = `visual` (single / stack / row); `shot` screens for image-led brand cases.
- Planned (stage 2): Context, Business priorities, Collaboration, Design system & handoff, Reflection blocks; recheck every case page after the Manrope switch.
