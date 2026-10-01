import { z } from 'zod';
import { PROJECTS } from './data';
import { PROJECT_TYPES } from './contact';

export { IDEA_MIN, IDEA_MAX } from './contact';

// Server-side scoping schema and prompt for /api/scope. The client imports
// only the Scope type, so zod and the prompt stay out of the browser bundle.

const CASE_SLUGS = PROJECTS.filter((p) => p.caseStudy).map((p) => p.slug) as [string, ...string[]];

export const ScopeSchema = z.object({
  /** False when the request isn't a software/hardware product idea we could build. */
  fit: z.boolean(),
  /** One or two sentences restating the idea as a product. */
  summary: z.string(),
  platform: z.enum(PROJECT_TYPES),
  /** The smallest feature set that proves the idea. */
  v1: z.array(z.string()),
  /** Features to hold back for later versions. */
  later: z.array(z.string()),
  stack: z.array(z.string()),
  weeksMin: z.number().int(),
  weeksMax: z.number().int(),
  risks: z.array(z.string()),
  /** Closest Titanix case study, or "none". */
  related: z.enum([...CASE_SLUGS, 'none']),
});

export type Scope = z.infer<typeof ScopeSchema>;

const portfolio = PROJECTS.filter((p) => p.caseStudy)
  .map((p) => `- ${p.slug}: ${p.title} (${p.category}) — ${p.description} Stack: ${p.tech.join(', ')}.`)
  .join('\n');

export const SCOPE_SYSTEM = `You are the project-scoping assistant on the website of Titanix, a small senior product studio that builds native iOS apps (Swift/SwiftUI), SaaS platforms (Next.js, TypeScript, PostgreSQL, Stripe) and IoT systems (embedded C++, LoRa, Raspberry Pi, cloud pipelines).

A website visitor describes a product idea. Turn it into a realistic first-version scope the studio could deliver.

Guidelines:
- v1 is the smallest version that proves the idea with real users: 3-6 concrete features. Push everything else into "later" (0-4 items).
- stack: 3-6 technologies Titanix would actually use for this.
- weeksMin/weeksMax: an honest delivery range for v1 by a small senior team, including App Store review or production launch. Keep the range tight (max is at most double min).
- risks: 0-3 short, specific risks or open questions (e.g. App Store policy, hardware sourcing, data availability).
- related: the slug of the closest Titanix case study below, or "none" if nothing is genuinely similar.
- Never quote prices or costs.
- Write plainly for a non-technical founder. Each list item is one short sentence or phrase.
- If the message is not a product idea Titanix could build (spam, harmful, unrelated questions), set fit to false, put a one-sentence polite explanation in summary, and leave the lists empty with weeks set to 0.

Titanix case studies:
${portfolio}`;
