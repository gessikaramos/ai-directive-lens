# Site Changelog — 2026-07-24

## Verbal architecture pivot

- New site-wide positioning: slogan changed from "Direction Makes It Matter." /
  "AI can generate. LolaLab directs." to **"Human intention, made visible."**,
  support line **"A creative direction studio and editorial system for
  deciding what deserves to exist when AI makes production abundant."**
  Applied across `index.html` (title/meta/JSON-LD), `src/lib/i18n.ts`
  (hero, about, footer, home preview keys), `src/pages/Index.tsx`,
  `src/pages/About.tsx`.
- Retired "AI-native editorial film studio" framing site-wide — LolaLab is
  now positioned as a creative direction studio + editorial system, not an
  AI production studio.

## Author name correction: "Gessika Olivieri" → "Gessika Olivieri Ramos"

Applied consistently across every public credit, byline, and legal
attribution:

- `index.html` — `meta[name="author"]`, JSON-LD `founder.name`
- `src/lib/i18n.ts` — about/footer credit strings (EN + PT)
- `src/pages/About.tsx` — manifesto founder line, portrait alt text, caption
- `src/pages/Legal.tsx` — "what you're buying" and copyright sections (EN + PT)
- `src/pages/Library.tsx` — book cover byline, essay attribution
- Verified against the book manuscript: both `Direction_Over_Prompt_*_v9_AUTORA.docx`
  files (PT/EN) already use the full name everywhere — no changes needed there.

## Editorial imprint consistency: "LolaLab Studio" → "LolaLab Atelier"

Book-context bylines now consistently credit **LolaLab Atelier** as the
editorial imprint (distinct from "LolaLab Studio" used elsewhere for the
company/production credit):

- `src/pages/Library.tsx` — DOP featured-release cover card
- `src/components/library/Compendiums.tsx` — Tactility (Compendium II)
  placeholder cover card

## Bug fixes

- **OG image dimension mismatch (social sharing)** — `src/pages/dop/DirectionOverPrompt.tsx`
  swapped `og:image` to the portrait book cover (1054×1492) on the DOP page
  but never updated `og:image:width` / `og:image:height`, which stayed frozen
  at the site default `1200×630`. That mismatch between declared and actual
  image dimensions is a known cause of Facebook/LinkedIn/Slack link-preview
  crawlers rejecting or badly cropping the card. Now set correctly per image.
- **hreflang duplication / leak (SEO)** — the DOP page injects its own
  `hreflang` alternate links (`pt-BR`, `en`, `x-default`) but only cleaned up
  its *own* previously-injected tags, not the static homepage hreflang set
  baked into `index.html`. Visiting the DOP page left two conflicting sets of
  `hreflang="en"` / `hreflang="x-default"` on the same document — which
  Google treats as invalid and typically ignores entirely. Additionally, the
  shared `useSeo` hook (`src/hooks/use-seo.ts`, used by every other page)
  never cleaned up DOP-injected alternates, so they persisted across every
  subsequent page navigated to in the same SPA session. Fixed by having both
  hooks fully own and clear the alternate-link state on every mount.

## Verified, no changes needed

- **Product hierarchy** (Walter / Collective / Compendiums vs. the book) —
  consistent. Walter correctly gated off (`PUBLIC_WALTER_ENABLED=false`),
  Collective has a single email-capture point, the digital edition of
  *Direction Over Prompt* sells live via a direct Gumroad link matching
  `Legal.tsx`'s Merchant-of-Record terms, and Tactility (Compendium II)
  correctly stays in waitlist-only mode.
- **PT-BR/EN persistence, hreflang, canonical, x-default** — see bug fix
  above; behavior is now correct for both the DOP page and every other route.

## Known issue flagged, not fixed (needs a product decision)

- `src/components/library/Compendiums.tsx`: the "Reserve Hardcover" button
  still routes through the old Lemon Squeezy checkout Edge Function if
  `LIBRARY_CHECKOUT_ENABLED` is ever turned on for `book_direction_over_prompt`
  — but that backend is documented as dormant/disconnected since the 22/jul
  Gumroad pivot, and the call hardcodes `product_tier: 'digital'` even for the
  hardcover button. This will silently break the moment that flag is enabled
  as currently intended. Spun off as a separate task rather than fixed inline,
  since it requires deciding whether hardcover also goes through Gumroad or
  gets its own flow.
