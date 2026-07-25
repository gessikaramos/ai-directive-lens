# Browser QA Report — 2026-07-24

Real browser pass (Chrome-based preview pane against the local dev server),
covering tasks "Accessibility and performance pass on critical pages" and
"Functional test pass on staging (routes, forms, links, metadata)". This
supersedes the earlier source-only review — everything below was clicked,
scrolled, resized, or inspected live in a running page, not just read in code.

## Environment blocker found and fixed

The dev server could not start at all: `node_modules/lucide-react/dist/esm/icons/egg-off.js.map`
was a truncated/corrupted sourcemap file, and Vite's esbuild dependency
pre-bundler crashed fatally on it every time, within seconds of boot (looked
like a random flake at first — every retry silently died). Fixed by
reinstalling `lucide-react@0.462.0` clean. Once fixed, the server boots
reliably and the rest of this pass was possible.

## New bugs found only by testing live (not visible from source alone)

1. **Duplicate/conflicting `<link rel="canonical">` on the DOP page.** The
   page's local SEO hook appended a new canonical tag on every mount via
   `document.createElement`, without ever removing the static one baked into
   `index.html`. Net effect: two canonical tags on the same document, the
   first one (still pointing at the homepage) winning any `querySelector`
   lookup. Per Google's own guidance, conflicting canonicals get ignored
   entirely and Google picks its own — real risk of the DOP chapter page
   (the actual page being driven traffic to) getting folded into the
   homepage instead of ranking as its own page. This is worse than the
   hreflang-duplication bug fixed earlier today, same root cause (append-only
   tag helper that never cleans up the static original). Fixed: canonical is
   now updated in-place, with a self-healing cleanup of any stray extras.
2. **Five icon-only buttons with no accessible name**, found via a live
   accessible-name check, not visible from a code skim: mobile menu open
   button, mobile menu close button (`Navbar.tsx`), audio player play/pause
   toggle (`AudioPlayer.tsx`), lightbox close button (`Lightbox.tsx`), skill
   modal close button (`SkillModal.tsx`). All five got `aria-label`. A
   screen-reader user previously got an unlabeled "button" for all of these,
   including the mobile primary navigation entry point.

Both fixes verified against `npx tsc --noEmit` (clean) and confirmed live:
DOP page now shows exactly one canonical tag, self-referencing; mobile menu
opens/closes correctly at 375px width with the new labels in place.

## Functional pass — routes, forms, links

Walked Home, Library (+ Compendiums), the DOP neutral/landing/reader flow (EN
and the PT-BR/EN sub-routes), About, Legal, Contact, Studio, Lab, Collective,
and a deliberate 404. For each: checked console for errors, checked the
network tab for failed requests, and inspected the live DOM for the
canonical/hreflang/OG tags fixed earlier today.

- **No console errors and no failed network requests on any route.**
- Every buy link (navbar, Home, Library featured card, Compendiums digital
  edition, DOP landing) points to the same live Gumroad URL. Consistent.
- DOP reader page (`/read`) correctly bounces an unconfirmed visitor back to
  the landing page instead of showing gated content — verified by direct URL
  visit.
- The DOP form's honeypot field (`name="website"`) is properly hidden from
  both sighted users and assistive tech (`aria-hidden`, `tabindex="-1"`,
  0×0, `opacity:0`) — not a real field a legitimate user could stumble into.
- Compendiums' Tactility "Notify Me" form renders and opens correctly (did
  **not** submit a real test entry — this dev server points at what looks
  like the live Supabase project, and a throwaway signup would pollute the
  real waitlist table).
- Legal page's PT/EN toggle works and swaps the full page body, not just
  chrome.
- 404 page renders correctly with a working link home. Minor, non-blocking:
  it doesn't set its own `document.title` via `useSeo` like every other page
  does, so it just keeps whatever title was last active. Not fixed — cosmetic,
  not worth touching mid-QA-pass.
- Canonical/OG/hreflang tags spot-checked live on Home, DOP neutral, DOP `/en`
  landing, and confirmed self-referencing and leak-free on every one, both
  before *and* after navigating away from the DOP page (the SPA-state-leak
  class of bug fixed earlier today).

## Accessibility

- Heading structure: single `<h1>` per page everywhere checked, no level
  skips.
- Images: zero missing `alt` attributes anywhere on the pages tested,
  including the About portrait (now carrying the corrected full name).
- Icon-only controls: 5 found and fixed (see above). A broader regex sweep
  for the same pattern across the rest of `src/` found no further instances.
- **Not fixed, flagged for follow-up** (both are systemic, not 2-line
  fixes):
  - None of the GSAP `ScrollTrigger` reveal animations
    (`use-scroll-animations.ts` and friends) check `prefers-reduced-motion`.
    Motion-sensitive users get the full parallax/fade treatment regardless
    of their OS setting. Separately, these animations start content at
    `opacity:0` until a scroll-triggered reveal fires — if that JS ever
    fails to fire (slow connection, script error, extremely fast
    programmatic/assistive-tech scrolling), content can stay invisible with
    no fallback. Worth a dedicated pass across every `scrollTrigger` call
    site, with a real decision on how reduced-motion should degrade.
  - Most of the site's forms (DOP opt-in, Compendiums waitlist, Contact)
    rely on placeholder text instead of an associated `<label>` element.
    Placeholders aren't a reliable substitute for labels under WCAG 1.3.1 /
    3.3.2. Fixing this well means a small design pass (visible labels change
    the current placeholder-only visual style), not a blind markup edit.
- A note on method: an automated contrast checker was tried and discarded —
  it produces false "invisible text" readings for anything sitting over a
  video/image/gradient background via fixed/absolute positioning (most of
  the homepage hero and case-study cards), because those backgrounds aren't
  reachable via a simple DOM-ancestor walk. Confirmed this with the nav text
  specifically, which the checker claimed was invisible but is clearly
  legible in every screenshot. Real contrast auditing for this site's
  cinematic, image-heavy design needs a proper tool (axe DevTools /
  Lighthouse) or manual visual review, not a homemade script.

## Performance

- **Production build ships one 834.73 kB JS bundle (256 kB gzipped), zero
  code-splitting.** Every route — including someone landing cold on
  `/legal` — downloads the code for every other page: both DOP chapter
  languages, Lightbox, SkillModal, Supabase client, GSAP, Lenis, everything.
  Not fixed — real value here (route-based `React.lazy` + `Suspense`) is an
  architecture change to the router, not a safe blind edit mid-QA-pass.
- **The DOP book cover PNGs are 2.2–2.3 MB each** (`direction-over-prompt-cover-{en,pt}.png`,
  1054×1492). These are also the page's OG share image, so every social
  preview fetch pays this cost too. Very likely compressible to a few
  hundred KB with no visible quality loss at display size, but that's a
  brand/creative-asset call — flagged, not silently recompressed.
- Case-study videos (11–16 MB each: `bloom-final.mp4`, `bewe-shearling.mp4`,
  `ugc-*.mp4`, etc.) are **already** lazy — wrapped in a `VideoThumbnail` +
  lightbox pattern that only fetches the real video on click. Good existing
  practice, not a bug.
- The homepage hero video (`hero-loop.mp4`, 3.0 MB, `autoPlay preload="auto"`)
  loads eagerly on every homepage visit — a deliberate design choice for a
  cinematic autoplay hero, and a reasonable size for that. Not flagged as an
  issue.
- `public/images/lola-face.jpg` (3.4 MB) is not referenced anywhere in
  `src/` — dead weight in the repo, but not a load-time cost since nothing
  fetches it. Safe to delete whenever convenient; not urgent.

## Responsive

Checked Home, Library, and the DOP page at 375×812 (mobile), 768×1024
(tablet), and native desktop width. No horizontal overflow anywhere
(`document.documentElement.scrollWidth` matched viewport width on every
check). The mobile hamburger menu opens and closes correctly, including with
the newly-added `aria-label`s. Nav collapses to the desktop layout cleanly
right at the tablet breakpoint.

## Bottom line for release readiness

This pass did not touch the two real release blockers from earlier today
(`/legal` draft text, MasterChef Vimeo swap) — those are still open and
still gate a full production release; see
[SITE_QA_RELEASE_CANDIDATE_01.md](SITE_QA_RELEASE_CANDIDATE_01.md). Everything
found *in this pass* was either fixed immediately (canonical duplication,
5 missing aria-labels, the dev-server-blocking sourcemap) or is a flagged,
non-blocking follow-up (reduced-motion, form labels, bundle size, cover
image weight, one dead asset). Nothing found today should block a release on
its own.
