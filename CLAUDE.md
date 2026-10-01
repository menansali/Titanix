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
- **Home page:** `app/page.tsx` composes `Hero` (with the datasheet panel), `Showreel`, `LiveAir`, `Focus`, `Pipeline`, `Work` (index + screenshot preview), `Process`, `Studio` (founder), `LabLog`, `Contact`. Sections use `components/ui/SectionHead.tsx` (numbered mono label on a hairline) — keep the numbers in page order.
- **Founder & lab log:** `FOUNDER` and `LAB_LOG` in `lib/data.ts`. Lab-log entries are real releases (App Store version history, GitHub); add new ones at the top when an app ships an update. Nav links use `/#section` so they work from case-study pages too.
- **Scroll-pinned sections:** `Showreel` (CSS-3D iPhone that spins between the iOS apps' first screenshots, swapping the screen while the back faces the viewer) and `Pipeline` (a packet travels sensor → firmware → edge → cloud → app → ship). Both are a tall outer section with a `sticky top-0 h-[100svh]` child, driven by `lib/useScrollProgress.ts` (GSAP ScrollTrigger); per-frame updates go through refs, React state only changes when the active item changes.
- **Live air widget:** `components/LiveAir.tsx` is a server component fetching Open-Meteo's CAMS air-quality API (same model as Aer), revalidated every 15 min; it renders nothing if the feed fails. This makes the home page ISR.
- **Page transitions:** `next-view-transitions` wraps the layout; use its `Link` (or `components/ui/TrackedLink.tsx`) for internal links. App icons/titles share `view-transition-name`s (`icon-<slug>`, `title-<slug>`) between work cards and case-study headers.
- **Contact form:** `components/ContactForm.tsx` → `app/api/contact/route.ts` → Resend (needs `RESEND_API_KEY`). Without the key the route returns 503 and the form opens a pre-filled `mailto:` instead. Shared options/formatting in `lib/contact.ts`.
- **Analytics:** Vercel Analytics in `app/layout.tsx`; custom events via `components/ui/TrackedLink.tsx` and the form.
- **SEO/GEO:** `app/layout.tsx` (metadata + Organization/WebSite/portfolio JSON-LD), `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `public/llms.txt`. When project content changes, update `llms.txt` too and re-ping IndexNow (key file in `public/`).

## Styling

Deliberately *not* the generic AI-site look. "Datasheet" system: flat `#0A0A08` background, hairline borders (`border-titanix-border`, neutral white ~11%), monospace labels (`.label`), small radii (`rounded-md`), and yellow `#EFE200` used only as a marking colour (CTA, active state, numbers). Component classes in `app/globals.css`: `section`, `label`, `chip`, `btn-primary`, `btn-ghost`.

Avoid reintroducing: gradient text, glass/blur cards, glow shadows, blurred background blobs, pill "eyebrow" labels, icon-in-rounded-square card grids, fade-up-on-scroll for everything, cursor-magnetic/tilt effects. Copy: plain and specific, first person for the founder bio, no stock phrases or em-dash-heavy sentences.

## Other folders

- `.ig-design/` — Instagram post kit (HTML sources + PNG exports). Case-study covers in `titanix-web/public/work/` are exported from `.ig-design/png/`.
