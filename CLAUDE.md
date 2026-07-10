# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page marketing/portfolio website for **Titanix Development** (an IoT/mobile/software agency). It is a static React SPA — there is no backend API; the Express server exists only to serve the built static files.

## Commands

- `npm run dev` — Vite dev server. Note: `vite.config.ts` pins port **3000** (the README's mention of 5173 is stale).
- `npm run build` — TypeScript + Vite build into `dist/`.
- `npm run preview` — serve the production build locally via Vite.
- `npm start` — run the Express server (`server.cjs`) that serves `dist/`.

There is no test runner or linter configured; `tsc` runs only as part of `vite build`.

## Architecture

- **Page composition:** `App.tsx` renders every section in order (`Header`, `Hero`, `TechStack`, `ClientLogos`, `About`, `Services`, `Portfolio`, `SmartConsultant`, `Newsletter`, `Footer`) plus a `LoadingScreen` overlay. There is no router — it's one scrolling page with anchor navigation. To add or reorder a section, edit `App.tsx`.
- **Content data:** Portfolio projects and service cards live as typed arrays in `constants.ts` (`PROJECTS`, `SERVICES`), typed by `types.ts`. Edit content here rather than hardcoding in components. Service/project `icon` fields are string names resolved against `lucide-react`.
- **"Smart Consultant" is a mock.** `services/geminiService.ts` (`analyzeProjectIdea`) is pure keyword-matching with a fake delay — **no real AI call**. Despite `@google/genai` being a dependency and imported in `index.html`'s importmap, no Gemini API is actually used. Don't assume an API key or network call is involved.

## Styling

- **Tailwind CSS v3** with a custom `titanix` design system in `tailwind.config.js`: brand colors (`titanix-yellow/gold/amber/dark/card/text/muted`), `font-display` (Space Grotesk) vs `font-sans` (Inter), and custom animations (`float`, `blob`, `pulse-glow`, `scroll`, etc.) and `glow`/`glass` shadows. Prefer these tokens over ad-hoc values to stay on-brand (dark theme + gold accents + glassmorphism).
- Global styles and keyframe/font setup are in `index.css`.

## Conventions & gotchas

- `@` path alias maps to the repo root (see `vite.config.ts` and `tsconfig.json`).
- `index.html` contains an **importmap pointing React/lucide/genai to `aistudiocdn.com`** (an AI Studio artifact). The Vite build bundles from `node_modules` instead, so the importmap is effectively unused in the built app — be aware of the discrepancy if debugging module resolution.
- Two server files exist: `server.cjs` (CommonJS, used by `npm start`, targets cPanel deploy) and `server.js` (ESM equivalent, not wired to a script). Both just static-serve `dist/` and SPA-fallback to `index.html`.
