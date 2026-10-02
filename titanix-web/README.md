# Titanix — Web

The Titanix website, live at https://www.titanix.dev. A product studio positioned around three pillars:
**iOS Apps · SaaS Platforms · IoT Systems**.

## Brand

- **Palette:** logo yellow on near-black (`#0A0A08`, `#EFE200`)
- **Aesthetic:** "signal over terrain": a live WebGL contour map behind the site with the cursor as a transmitter, wide display type, hairline rules, mono labels, yellow as a marking colour (see CLAUDE.md → Styling & motion)
- **Logo:** `components/Logo.tsx`
- **Type:** Archivo (wide cut for display, normal for text) · JetBrains Mono (labels)

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · GSAP (ScrollTrigger, SplitText, ScrambleText) · Lenis · raw WebGL2 · lucide-react · Vercel Analytics · next-view-transitions

## Commands

```bash
npm install       # once
npm run dev       # dev server → http://localhost:3000
npm run build     # production build
npm start         # serve the production build
npm run lint      # eslint
```

## Structure

- `app/page.tsx` — composes the home page sections in order.
- `app/work/[slug]/page.tsx` — statically generated case-study page for every project with a `caseStudy` in `lib/data.ts`.
- `app/api/contact/route.ts` — receives the project-brief form and emails it via Resend.
- `app/layout.tsx` — fonts, metadata, JSON-LD, Vercel Analytics.
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `public/llms.txt` — SEO layer. Keep `llms.txt` in sync with `lib/data.ts`.
- `lib/data.ts` — single source of truth for pillars, projects (incl. case-study copy and App Store screenshots), stats, and contact info. **Edit content here.**
- `lib/contact.ts` — form options and email formatting shared by the form and the API route.
- `components/` — `Hero`, `Showreel`, `LiveAir`, `Focus`, `Pipeline`, `Work`, `Process`, `Studio`, `LabLog`, `Contact` + `ContactForm`, plus `Navbar`, `Footer`, `Logo`, `ui/` (`SectionHead`, `TrackedLink`) and `motion/` (`SignalField`, `SmoothScroll`, `Reveal`, `Scramble`, `Marquee`, `RevealImage`, `Wordmark`, `Cursor`).
- `public/work/` — case-study cover images (exported from the Instagram kit; used for social share images and skeniraj.mk).
- `public/team/` — founder photo.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | for the form to email | Without it, the form falls back to opening a pre-filled email. |
| `CONTACT_FROM_EMAIL` | no | Sender address; must be on a domain verified in Resend. Default `Titanix Website <website@titanix.dev>`. |
| `CONTACT_TO_EMAIL` | no | Where briefs go. Default `contact@titanix.dev`. |

## Analytics

Vercel Analytics is mounted in `app/layout.tsx` (enable it in the Vercel project's Analytics tab). Custom events: `Case study opened`, `Store link clicked`, `Contact clicked`, `Contact form submitted`.

## Design tokens

All brand colors, gradients, shadows, and animations live in `tailwind.config.ts` under the `titanix` namespace (e.g. `bg-titanix-void`, `text-gradient`, `shadow-glow`, `animate-blob`). Prefer these over ad-hoc values.
