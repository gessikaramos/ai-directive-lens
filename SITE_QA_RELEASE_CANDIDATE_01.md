# Site QA — Release Candidate 01 (2026-07-24)

Status snapshot at the end of today's pass. See [SITE_CHANGELOG_2026-07-24.md](SITE_CHANGELOG_2026-07-24.md)
for the full list of changes made today.

## Verified / passing

- **Verbal architecture** — "Human intention, made visible." positioning
  applied consistently across home, about, and metadata.
- **Author name** — "Gessika Olivieri Ramos" consistent across every public
  credit, byline, legal attribution, and the book manuscript itself (both
  PT/EN v9 `.docx`).
- **Editorial imprint** — "LolaLab Atelier" consistent across book-context
  bylines (Library featured card, Compendiums cards).
- **Product hierarchy** — Walter / Collective / Compendiums / book sale
  relationships are consistent with each other and with `Legal.tsx`'s stated
  Merchant of Record (Gumroad).
- **Social sharing metadata (OG/Twitter)** — image dimensions now correctly
  declared for every page, including the DOP page's non-default cover image.
- **hreflang / canonical / x-default** — no more duplicate or leaked
  alternate-link tags across SPA navigation, including a second, more severe
  duplicate-canonical bug on the DOP page found only during live browser
  testing (see below).
- **Live browser pass complete** — see
  [SITE_BROWSER_QA_REPORT_2026-07-24.md](SITE_BROWSER_QA_REPORT_2026-07-24.md)
  for the full functional/accessibility/performance/responsive walkthrough.
  No console errors or failed requests on any route; 5 missing aria-labels
  found and fixed; a duplicate-canonical bug on the DOP page found and fixed;
  no code-splitting and oversized cover images flagged as non-blocking
  performance follow-ups.
- `npx tsc --noEmit` — clean across the whole repo after all of today's edits.

## Blockers — all resolved

See [SITE_CHANGELOG_2026-07-24_PART2.md](SITE_CHANGELOG_2026-07-24_PART2.md)
for full detail on each.

1. ~~`/legal` page has no approved final legal text.~~ **Resolved** — Gessika
   approved the text; the draft disclaimer is removed from both PT and EN.
2. ~~MasterChef film is on YouTube, not the intended Vimeo link.~~
   **Resolved** — confirmed Vimeo link (`vimeo.com/1212739896`) wired in,
   verified live (poster loads, play button works, no console errors).
3. ~~Dormant Lemon Squeezy path on hardcover reserve.~~ **Resolved** — no
   hardcover product exists on Gumroad yet (checked the live listing: it's
   digital-only, single tier), so rather than invent a link, the hardcover
   button is now structurally incapable of reaching the dead backend
   regardless of `LIBRARY_CHECKOUT_ENABLED`'s state.

## Follow-ups from the browser QA pass — also resolved

- Route-based code splitting added (was one 834KB bundle for every route).
- DOP book cover PNGs compressed 2.2–2.3MB → ~500KB each, same dimensions,
  no visible quality loss (also the OG share images).
- `prefers-reduced-motion` now respected by all scroll animations.
- Every form input site-wide now has a properly associated label (was
  placeholder-only in most places).
- Unused 3.4MB dead asset (`lola-face.jpg`) deleted.

## New finding, needs Gessika directly (not fixable from this repo)

Both DOP book cover images — the artwork itself — read "GESSIKA OLIVIERI"
without "Ramos", same as the live Gumroad product page byline. Neither is
fixable in code: the cover needs the original design file re-rendered, and
Gumroad needs to be edited in its own dashboard.

## Recommendation

**Ready for release from a code standpoint.** All three original blockers
are resolved and verified live in a browser; the full functional pass (see
[SITE_BROWSER_QA_REPORT_2026-07-24.md](SITE_BROWSER_QA_REPORT_2026-07-24.md))
found no remaining broken routes, forms, links, or console errors, and every
performance/accessibility follow-up from that pass has since been fixed too.
The one open item is the cover-art name typo, which needs Gessika's design
tool and Gumroad access, not more code work.
