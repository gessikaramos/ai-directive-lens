# Final Release Report — 2026-07-24

Response to "FINAL WEBSITE RELEASE CORRECTION." Manuscript, Book Bible,
commercial PDF master, audiobook source, and Walter's product architecture
were not touched, per instruction. No new PDF was uploaded to Gumroad. All
work is website presentation and copy only.

## URLs tested

- `https://lola182.gumroad.com/l/ffaxv` (live, production Gumroad listing —
  read-only product page + checkout inspection, no purchase completed)
- `https://gumroad.com/checkout?product=ffaxv&quantity=1` (live checkout,
  stopped before entering payment details)
- `http://localhost:8081/*` — full local build of every site route (Home,
  Library, DOP neutral/landing/reader in EN + PT-BR, Studio, Lab, About,
  Contact, Legal, Collective, 404), both dev server and production build via
  `vite preview`

Desktop (1280×720) and mobile (375×812) both tested. No horizontal overflow,
no console errors, no failed network requests found on any route in either
size.

## 1. Currency and checkout — RESOLVED, with a caveat you should see

You were right, and what I'd verified the previous session was incomplete —
I'd only looked at the Gumroad *product page* (which shows a display price
of €29) and never actually opened the checkout. I opened it this time.

**What the real checkout shows**, with nothing beyond contact info entered:

| Field | Portugal (VAT applies) | United States (no VAT) |
|---|---|---|
| Subtotal | US$32.99 | US$32.99 |
| VAT | US$1.98 | — |
| **Total** | **US$34.97** | **US$32.99** |

The subtotal is identical regardless of billing country — confirming USD is
the real, fixed checkout currency, not a display quirk. €29 × current EUR→USD
≈ US$32.99, so the underlying Gumroad price is anchored in EUR and converted
live to USD at checkout for this session — I can't tell you *why* Gumroad
chose USD for this checkout session specifically (it may vary by buyer
geography/session in ways I can't fully reproduce from here), only that it
did, consistently, across two different countries.

**Fixed on the website:** every price display (navbar CTA, Home hero,
Library, Compendiums book/hardcover pricing, DOP landing ×2, Legal terms
text ×2, both languages) now shows **US$29**, formatted as you specified,
with the disclaimer *"Charged in USD + tax, via Gumroad. Your bank or
payment provider may apply currency conversion fees."* right below every
instance — no small-print contradicting a big price tag anymore.

**What I'm flagging, not fixing myself:** the real checkout subtotal is
US$32.99, not a clean US$29. That's most likely just live EUR→USD conversion
of a €29 Gumroad list price — but I can't confirm the actual stored price in
your Gumroad product settings from here, and I won't guess. Please check
your Gumroad dashboard directly: if the product's base price is configured
as €29 (not $29), you may want to either reconfigure it as a fixed $29 USD
price, or adjust the site copy to say "from US$29" / "~US$29" instead of a
flat number, so what's promised and what's charged always match exactly.

## 2. Book product presentation

- Title, author (Gessika Olivieri Ramos), and price are now consistent
  everywhere.
- Fixed a real inconsistency: `Compendiums.tsx`'s book-sale card used a
  subtitle ("The Art of Human Translation & the Recovery of Creative
  Repertoire") that didn't match the Book Bible's locked subtitle. Replaced
  with the correct one: *"Human Intent, Creative Authority, and the Craft of
  Direction in the Age of AI."*
- Confirmed "When Everything Can Be Made" is only ever used where explicitly
  labeled "Chapter 01" nearby — it's not being presented as the book's own
  subtitle anywhere I found.
- Added "A working theory about creativity, AI and intention." as an
  optional supporting/campaign line (Home book-launch block, DOP landing
  hero) — per your clarification, *not* replacing the official subtitle.
- Confirmed no copy anywhere frames the book as a cheap ebook, prompt pack,
  generic AI guide, or academic study.
- Checkout copy, confirmation email, and delivery email are Gumroad's own
  templates — I don't have access to edit those from here, and didn't try.

## 3. Listening Edition

Added exactly as specified — a collapsible "Book + ElevenReader Listening
Edition" section on the book's purchase card (`Compendiums.tsx`), with your
tutorial copy verbatim and your third-party disclosure verbatim. Also added
a "Third-party tools" section to `/legal` (both languages) disclosing
ElevenReader. Verified live: expands correctly, exact copy present, no
console errors.

Separately, I found the DOP chapter reader page already has an *unrelated*
ElevenLabs integration — an "Audio Native" widget that narrates the free
Chapter 1 text aloud on the page itself. That's a different ElevenLabs
product (page narration vs. importing your own file into their app) and
doesn't conflict with what I added.

## 4. Legacy positioning

Searched the full `src/` tree, `public/sitemap.xml`, and `public/robots.txt`
for "AI-Native Editorial Film Studio" and "Direction Makes It Matter." —
zero remaining instances (this was already cleaned up in an earlier pass
today). Walter/Collective/book hierarchy re-confirmed distinct and
non-conflated.

## 5. Legal and trust

- Re-confirmed zero instances of "draft," "minuta," "document under
  review," or similar internal language on `/legal` (already removed
  earlier today, after you confirmed the text was approved).
- Privacy, terms, refund, digital delivery: present and complete in both
  languages.
- Third-party tools: now covers both Gumroad and ElevenReader.
- Copyright/ownership: present, section 6 in both languages.
- **Not present, and I'm not writing it myself: an AI-disclosure clause.**
  You mentioned this explicitly in your brief. I didn't draft one because
  I'd be guessing at facts only you know — how much AI was used in the
  book's writing/production, and to what extent that needs disclosing. If
  you want one, tell me what to say and I'll add it; I won't invent claims
  about your own creative process.

## 6. Technical and UX QA

All verified live, both desktop and mobile, in a real browser (not just
source review):

- Primary links, routes, and the DOP neutral/PT-BR/EN language flow: all
  working, PT-BR persists correctly across the relevant routes.
- Book CTA → checkout redirect: verified, lands on the real Gumroad checkout
  every time.
- **Purchase flow, confirmation email, delivery email, download link: NOT
  tested, and I want to be explicit about why.** I'm not able to enter
  payment details or complete a real financial transaction — that's a hard
  line I don't cross, by design, regardless of instruction. Verifying the
  actual email/download flow requires either you completing one real test
  purchase, or a payment-free way to trigger Gumroad's fulfillment (a
  Gumroad test-mode/discount-to-zero flow, if you have one set up) that I
  can drive instead.
- MasterChef embed: confirmed swapped to the Vimeo link you gave me
  (`vimeo.com/1212739896`), poster loads, play button works, no console
  errors.
- Console errors: none found on any route, either environment.
- OG title/description/image, favicon: all present and correct (verified
  earlier today + spot-checked again).
- Contrast: partially verifiable. An automated contrast check is unreliable
  for text over this site's video/photo hero backgrounds (confirmed this by
  testing — it produced false "invisible text" results for text I could
  plainly see rendered correctly in screenshots). Text over solid
  backgrounds checks out fine. A full contrast audit needs a real tool
  (axe/Lighthouse) or manual visual review, not something I can fully
  certify from here.
- Keyboard navigation: found and fixed a real gap — every custom text input
  site-wide had its focus outline suppressed (`focus:outline-none`) with no
  replacement, meaning keyboard users got zero visual indication of which
  field was focused. Fixed on 8 files; verified live with an actual Tab
  keypress (not simulated focus) that the native focus ring now renders
  correctly.
- Responsive layout: no horizontal overflow anywhere checked, mobile
  typography and spacing read cleanly (see screenshot evidence).

## 7. Single conversion path

Checked the actual page structure, not just the visible copy. The DOP page
already uses a minimal header (logo + PT/EN toggle only — no Walter,
Collective, Contact, or Studio links) and has no site footer at all. The one
secondary Walter CTA in the page's source is wrapped in a feature flag
(`WALTER_WAITLIST_ENABLED`) that defaults to off and is currently off. Live
DOM check on the landing page found exactly 6 interactive elements total:
logo, PT, EN, "Read Chapter 01," "Buy the book," and the chapter-unlock form
button. Nothing routes to Walter, Collective, newsletter, or portfolio
content from this page. No changes were needed here — it was already
correctly scoped.

## Remaining bugs / open items

1. **Checkout amount discrepancy** (US$32.99 vs. the US$29 now shown on
   site) — needs your review of the Gumroad product's configured price, not
   a website fix. See section 1.
2. **Purchase → confirmation email → delivery email → download**, entirely
   untested by me, for the reason stated in section 6.
3. **AI-disclosure clause** — not written, needs your input on what to
   actually disclose.
4. Two things flagged in earlier passes today, still open: hardcover
   checkout implementation should be confirmed working end-to-end once you
   have a moment (I fixed the dormant-backend bug and it's structurally
   safe now, but hasn't been through a real purchase either); DOP book cover
   artwork and the Gumroad page byline both still read "Gessika Olivieri"
   without "Ramos" — neither fixable from this repo (design file / Gumroad
   dashboard).

## Evidence

- Gumroad checkout screenshot (Portugal, VAT applied): US$32.99 subtotal,
  US$1.98 VAT, US$34.97 total.
- Gumroad checkout screenshot (United States, no VAT): US$32.99 flat.
- Home page screenshot: "Buy the Book · US$29" + full disclaimer visible.
- DOP landing page, mobile (375×812): campaign tagline, US$29 pricing,
  disclaimer, single conversion path, all visible in one screenshot.
- `npx tsc --noEmit`: clean.
- `npm run build`: succeeds, no errors.
- Zero console errors across every route tested, both viewport sizes.

## Final status: **CONDITIONAL GO**

Every website-side item in your brief is done and verified live. What's
blocking a clean, unconditional GO is entirely outside the website:

- Confirm the real Gumroad price (item 1) — 10-minute check on your end.
- Either complete one real test purchase yourself to confirm the
  email/delivery loop works, or point me at a way to test it without moving
  real money.

If those two check out, this is ready for the LinkedIn campaign.
