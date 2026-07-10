# Titanix — Web (Rebrand)

The new Titanix website. A product studio positioned around three pillars:
**iOS Apps · SaaS Platforms · IoT Systems**.

## Brand

- **Palette:** violet + indigo on deep violet-black (`#0B0A14`, `#7C3AED → #6366F1`)
- **Aesthetic:** bold & expressive — gradients, ambient blobs, glassmorphism, motion
- **Logo:** gradient "squircle" tile with two ascending chevrons — an evolution of the original Titanix chevron mark (`components/Logo.tsx`, inline SVG). `LogoChevron` is an alternate; swap `ActiveMark` to switch.
- **Type:** Space Grotesk (display) · Inter (body) · JetBrains Mono (accents)

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion · lucide-react

## Commands

```bash
npm install       # once
npm run dev       # dev server → http://localhost:3000
npm run build     # production build
npm start         # serve the production build
npm run lint      # eslint
```

## Structure

- `app/page.tsx` — composes every section in order.
- `app/layout.tsx` — fonts, metadata, SVG favicon.
- `lib/data.ts` — single source of truth for pillars, projects, stats, and contact info. **Edit content here.**
- `components/` — `Hero`, `Focus` (3 pillars), `Work` (portfolio), `Studio` (about), `Contact`, plus `Navbar`, `Footer`, `Background`, `Marquee`, `Logo`. Contact is `mailto:` + WhatsApp/Instagram links only.

## Design tokens

All brand colors, gradients, shadows, and animations live in `tailwind.config.ts` under the `titanix` namespace (e.g. `bg-titanix-void`, `text-gradient`, `shadow-glow`, `animate-blob`). Prefer these over ad-hoc values.
