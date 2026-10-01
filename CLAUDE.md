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
- **Home page:** `app/page.tsx` composes `Hero`, `Marquee`, `LiveAir`, `Focus`, `Work`, `Process`, `Studio`, `AskTitanix`, `Contact`. Nav links use `/#section` so they work from case-study pages too.
- **Live air widget:** `components/LiveAir.tsx` is a server component fetching Open-Meteo's CAMS air-quality API (same model as Aer), revalidated every 15 min; it renders nothing if the feed fails. This makes the home page ISR.
- **Ask Titanix (AI scoper):** `components/AskTitanix.tsx` → `app/api/scope/route.ts` → Claude (`@anthropic-ai/sdk`, structured output via the zod schema in `lib/scope.ts`). Needs `ANTHROPIC_API_KEY`; without it the route returns 503. Rate-limited per IP in memory (best effort). "Send this to Titanix" dispatches a `titanix:brief` window event that `ContactForm` listens for to prefill the brief. Keep zod/`lib/scope.ts` out of client components — import only the `Scope` type.
- **Page transitions:** `next-view-transitions` wraps the layout; use its `Link` (or `components/ui/TrackedLink.tsx`) for internal links. App icons/titles share `view-transition-name`s (`icon-<slug>`, `title-<slug>`) between work cards and case-study headers.
- **Contact form:** `components/ContactForm.tsx` → `app/api/contact/route.ts` → Resend (needs `RESEND_API_KEY`). Without the key the route returns 503 and the form opens a pre-filled `mailto:` instead. Shared options/formatting in `lib/contact.ts`.
- **Analytics:** Vercel Analytics in `app/layout.tsx`; custom events via `components/ui/TrackedLink.tsx` and the form.
- **SEO/GEO:** `app/layout.tsx` (metadata + Organization/WebSite/portfolio JSON-LD), `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `public/llms.txt`. When project content changes, update `llms.txt` too and re-ping IndexNow (key file in `public/`).

## Styling

Tailwind v3 with a `titanix` token set in `tailwind.config.ts` (yellow `#EFE200` on near-black `#0A0A08`), plus component classes in `app/globals.css` (`section`, `eyebrow`, `glass`, `btn-primary`, `btn-ghost`, `text-gradient`). Prefer these over ad-hoc values.

## Other folders

- `.ig-design/` — Instagram post kit (HTML sources + PNG exports). Case-study covers in `titanix-web/public/work/` are exported from `.ig-design/png/`.
