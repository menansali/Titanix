# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing/portfolio site for **Titanix** (iOS apps, SaaS, IoT product studio), live at https://www.titanix.dev. The whole site lives in **`titanix-web/`** — a Next.js 15 App Router app. Run all commands from that directory. (An older Vite site used to sit at the repo root; it was removed and only exists in git history.)

## Commands (in `titanix-web/`)

- `npm run dev` — dev server on port 3000.
- `npm run build` — production build (also type-checks).
- `npm run lint` — eslint.

There is no test runner.

## Deploy

Vercel deploys on push to `master` (project root `titanix-web`). `www.titanix.dev` is the primary host; `lib/site.ts` holds `SITE_URL` — keep canonical/sitemap/JSON-LD URLs on www.

## Architecture

- **Content:** `lib/data.ts` is the single source of truth — pillars, projects, stats, contact. Each project with a `caseStudy` gets a statically generated page at `/work/[slug]` (`app/work/[slug]/page.tsx`), a sitemap entry, and JSON-LD. Project copy mirrors the live App Store listings; screenshots are App Store CDN (`*.mzstatic.com`) URLs.
- **Home page:** `app/page.tsx` composes `Hero`, `Showreel`, `Marquee`, `Focus`, `Pipeline`, `LiveAir`, `Work` (big-type index + cursor-following screenshot), `Process`, `Studio` (founder), `LabLog`, `Contact`. Sections use `components/ui/SectionHead.tsx` (numbered mono label on a hairline); a velocity `Marquee` sits after `Showreel` — keep the numbers in page order.
- **Founder & lab log:** `FOUNDER` and `LAB_LOG` in `lib/data.ts`. Lab-log entries are real releases (App Store version history, GitHub); add new ones at the top when an app ships an update. Nav links use `/#section` so they work from case-study pages too.
- **Scroll-pinned sections:** `Showreel` (CSS-3D iPhone that spins between the iOS apps' first screenshots, swapping the screen while the back faces the viewer) and `Pipeline` (a packet travels sensor → firmware → edge → cloud → app → ship). Both are a tall outer section with a `sticky top-0 h-[100svh]` child, driven by `lib/useScrollProgress.ts` (GSAP ScrollTrigger); per-frame updates go through refs, React state only changes when the active item changes.
- **Live App Store data:** `lib/appstore.ts` reads Apple's public iTunes lookup + review RSS (no key), cached 6h. It feeds the hero rating, `Proof` (ratings + real written reviews, after `Work`), the case-study "Where it is now" row, and `getLabLog()`: any App Store release newer than `LAB_LOG` is added to the lab log automatically. Ratings are summed over the `STOREFRONTS` list (Apple has no global count). Everything falls back to static data if Apple is down.
- **Notes:** `lib/notes.ts` (plain block data, no MDX) → `/notes` and `/notes/[slug]` (BlogPosting JSON-LD, sitemap). Keep posts factual.
- **Share images:** `app/_og/render.tsx` builds every OG card (home + per case study) from `terrain.jpg` (a still of the SignalField shader) and static TTFs in `app/_og/` (Satori can't use variable fonts). To re-render the terrain, run the shader headless at 1200×630.
- **Booking:** `CONTACT.booking` lists the Cal.com slots (15/30 min) shown in the Contact card (`#book`) and the footer; an empty list hides both.
- `app/not-found.tsx` is the styled 404 ("Signal lost").
- **Live air widget:** `components/LiveAir.tsx` is a server component fetching Open-Meteo's CAMS air-quality API (same model as Aer), revalidated every 15 min; it renders nothing if the feed fails. This makes the home page ISR.
- **Page transitions:** `next-view-transitions` wraps the layout; use its `Link` (or `components/ui/TrackedLink.tsx`) for internal links. App icons/titles share `view-transition-name`s (`icon-<slug>`, `title-<slug>`) between work cards and case-study headers.
- **Contact form:** `components/ContactForm.tsx` → `app/api/contact/route.ts` → Resend (needs `RESEND_API_KEY`). Without the key the route returns 503 and the form opens a pre-filled `mailto:` instead. Shared options/formatting in `lib/contact.ts`.
- **Analytics:** Vercel Analytics in `app/layout.tsx`; custom events via `components/ui/TrackedLink.tsx` and the form.
- **SEO/GEO:** `app/layout.tsx` (metadata + Organization/WebSite/portfolio JSON-LD), `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `public/llms.txt`. When project content changes, update `llms.txt` too and re-ping IndexNow (key file in `public/`).

## Styling & motion

One idea carried through: **signal over terrain**. `components/motion/SignalField.tsx` is a fixed full-screen WebGL2 fragment shader behind everything: drifting topographic contour lines, with the cursor as a radio transmitter (yellow coverage + rings). It's strongest over the hero and footer, dimmed behind content, a static frame under reduced motion, and absent without WebGL2. Page content sits in a `relative z-10` wrapper above it (`app/layout.tsx`), so sections must stay transparent (except the yellow `Process` panel).

- **Type:** Archivo for everything; display type uses its wide cut via the `.wide` utility, often uppercase. JetBrains Mono for labels. `.text-outline` (stroke colour via `--stroke`) for outlined type.
- **Colour:** near-black `#0A0A08`, hairlines (`border-titanix-border`), yellow `#EFE200` as the marking colour. `Process` is the one full-yellow section.
- **Motion** (GSAP + plugins registered in `lib/motion.ts`; Lenis smooth scroll in `components/motion/SmoothScroll.tsx`, driven by `gsap.ticker`):
  - `motion/Reveal.tsx` is the single text reveal (SplitText masked lines/chars, `REVEAL` recipe). Use it rather than new fade-ups. Text inside is hidden via `[data-reveal]` until split.
  - `motion/Scramble.tsx` decodes mono labels; `SectionHead` uses both.
  - `motion/Marquee.tsx` (velocity skew), `motion/RevealImage.tsx` (clip wipe + parallax), `motion/Wordmark.tsx` (footer TITANIX), `motion/Cursor.tsx` (dot that opens into a label over `data-cursor="Label"` elements).
  - Every effect checks `prefersReducedMotion()`.
- Same-page hash links are intercepted in `SmoothScroll` and glide via Lenis.

Hero headline animates with pure CSS (`.rise`) and starts partly visible so it paints as the LCP element before JS; don't move it back to `Reveal`. Page transitions: `::view-transition-new(root)` sweeps up behind a soft mask (`globals.css`).

Avoid: gradient text, glass/blur cards, glow shadows, blurred blobs, pill eyebrow labels, icon-in-rounded-square card grids, magnetic buttons, stacking more effects without a reason. Copy: plain and specific, first person for the founder bio, no stock phrases or em-dash-heavy sentences.

## Other folders

- `.ig-design/` — Instagram post kit (HTML sources + PNG exports). Case-study covers in `titanix-web/public/work/` are exported from `.ig-design/png/`.
