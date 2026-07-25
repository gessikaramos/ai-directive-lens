# Site Changelog — 2026-07-24, Part 2

Second wave of work after Gessika reviewed [SITE_QA_RELEASE_CANDIDATE_01.md](SITE_QA_RELEASE_CANDIDATE_01.md):
confirmed the hardcover edition also sells through Gumroad, gave the confirmed
MasterChef Vimeo link, and approved the `/legal` text. This resolves every
open blocker from Part 1 and works through the flagged-but-not-fixed
performance/accessibility follow-ups.

## Blockers resolved

- **MasterChef swapped from YouTube to the confirmed Vimeo link**
  (`vimeo.com/1212739896`). `CreativePipelineSection.tsx` now embeds the
  Vimeo player; poster image is the real 1920×1080 thumbnail pulled from
  Vimeo's oEmbed API (Vimeo has no predictable-by-ID thumbnail URL pattern
  like YouTube did, so it's hardcoded from the actual API response).
  Verified live: poster loads, play button swaps in the correct iframe, no
  console errors.
- **`/legal` draft disclaimer removed** — Gessika approved the text. Removed
  the "document under review" paragraph (PT + EN) and updated the file's own
  header comment to reflect approval instead of pending review.
- **Dormant Lemon Squeezy path on hardcover reserve, fixed directly.**
  Checked the actual Gumroad product page first — it's currently digital-only,
  single tier, no hardcover variant exists yet. Rather than invent a link
  that doesn't exist, the "Reserve Hardcover" button is now structurally
  decoupled from `LIBRARY_CHECKOUT_ENABLED`: it always goes through the safe
  email-capture path regardless of that flag, so it can never call the dead
  backend no matter how the flag is set in the future. Button copy also
  changed from a conditional "Reserve Hardcover · €59" to always "Notify Me
  — Hardcover", since there's no real payment flow behind it to promise.
  (A separate spawned session was also working this same fix in an isolated
  worktree; it appeared stalled with no progress for over an hour, so this
  was implemented directly here instead. That other session can be checked
  or closed independently — it doesn't touch this repo's working tree.)

## Performance fixes

- **Route-based code splitting added.** `App.tsx` now lazy-loads every page
  via `React.lazy` + a single `Suspense` boundary, replacing 14 static
  imports. Verified against the production build: visiting `/legal` now
  downloads only the shared vendor chunk + Legal's own ~9KB chunk — not the
  61KB DOP chapter content (both languages), not Studio, not Lab. Verified
  both on hard reload and on client-side `Link` navigation between lazy
  routes, no console errors either way.
- **DOP book cover images compressed.** Both PNGs
  (`direction-over-prompt-cover-{en,pt}.png`, 2.2–2.3MB each) converted to
  JPEG at quality 90, same 1054×1492 dimensions, no visible quality loss —
  2.3MB → 473KB (EN) and 2.3MB → 510KB (PT). These are also the OG share
  images for the DOP page, so social preview fetches get lighter too.
  Verified live: correct dimensions, correct file loads, OG meta tags still
  match the new `.jpg` paths.
- **Deleted `lola-face.jpg`** (3.4MB, confirmed unused anywhere in `src/`).

## Accessibility fix

- **`prefers-reduced-motion` now respected.** `use-scroll-animations.ts`
  skips registering every GSAP `ScrollTrigger` animation (parallax and
  reveal alike) when the user has reduced motion set at the OS level —
  content simply stays at its natural, visible CSS state instead of
  animating in. Verified the guard doesn't regress normal behavior by
  temporarily reverting the change and confirming identical output, then
  restoring it.
  - Found something separate while verifying this, worth a note: on the
    About page (and likely others using `[data-anim="case-reveal"]`),
    reveal-triggered elements were already showing `opacity: 1` immediately
    on load regardless of scroll position, even *before* this change — the
    scroll-reveal effect may not be firing as designed in general, not just
    under reduced motion. Confirmed this isn't something introduced today.
    Could be specific to how this testing environment renders/scrolls
    rather than a real production issue — needs checking in an actual
    browser on a real device before treating it as a bug, so it's not
    logged as one, just flagged for awareness.
- **Every form input across the site now has a properly associated
  `<label>`** (previously placeholder-only): footer newsletter, Compendiums
  reserve forms, Collective application (7 fields), Signal Reads emails, the
  DOP opt-in forms (EN/PT-BR landing + Spanish waitlist), Walter's waitlist
  form and chat textarea, and the Auth magic-link email (which had a
  *visible* label that wasn't actually wired to the input via `htmlFor`).
  Used `sr-only` labels to preserve the current visual design exactly —
  nothing changed on screen, verified live with no console errors.

## Verification

`npx tsc --noEmit` clean throughout. Production build (`npm run build`)
succeeds and chunk output confirms the code-splitting is real, not just
theoretical. Spot-checked forms, the Vimeo embed, the compressed covers, and
the legal page live in a browser — all clean, no console errors on any
route touched.

## New finding, not fixed (needs the source design file, not code)

Both book cover images — the *artwork itself*, not text in the DOM — read
**"GESSIKA OLIVIERI"** without "Ramos", on both the EN and PT covers. Same
issue exists on the live Gumroad product page byline ("By Gessika Olivieri,
LolaLab"). Neither is fixable from this repo: the cover is a designed image
(needs the original Figma/Illustrator/InDesign source to re-render text
correctly with matching font/kerning), and the Gumroad page needs to be
edited directly in Gumroad's own dashboard, which requires account access
this session doesn't have and shouldn't be given credentials for.
