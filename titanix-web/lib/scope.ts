// The Offers scoping step (components/ScopePicker.tsx) → the contact and audit forms.
// Answers are kept in sessionStorage so they survive a page change to /ship.

import { TIMELINES } from './contact';

export const STAGES = ['Just an idea', 'Being built', 'Built, not submitted', 'Rejected by App Review', 'Live, not growing'] as const;
export const PLATFORMS = ['iPhone only', 'iPhone and web', 'Hardware too'] as const;

export interface Scope {
  stage?: (typeof STAGES)[number];
  platform?: (typeof PLATFORMS)[number];
  timeline?: (typeof TIMELINES)[number];
}

export type OfferPick = 'audit' | 'launch' | 'custom';

/** Anything that already exists goes through the audit first; new iPhone ideas get the launch offer. */
export function recommend(s: Scope): OfferPick | null {
  if (!s.stage || !s.platform) return null;
  if (s.stage !== 'Just an idea') return 'audit';
  return s.platform === 'iPhone only' ? 'launch' : 'custom';
}

/** The contact form's "What are we building?" answer for this scope. */
export function projectType(s: Scope) {
  if (recommend(s) === 'audit') return 'App Launch Audit';
  if (s.platform === 'Hardware too') return 'IoT system';
  if (s.platform === 'iPhone and web') return 'SaaS platform';
  return 'iOS app';
}

/** One line to start the form's message with. */
export const scopeNote = (s: Scope) =>
  [s.stage && `Stage: ${s.stage}`, s.platform && `Runs on: ${s.platform}`].filter(Boolean).join(' · ');

const KEY = 'titanix:scope';
export const SCOPE_EVENT = 'scope:change';

export function saveScope(s: Scope) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // Storage blocked: the forms just start empty.
  }
  window.dispatchEvent(new Event(SCOPE_EVENT));
}

export function loadScope(): Scope | null {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? 'null');
  } catch {
    return null;
  }
}

/** Calls `apply` with the saved scope now and whenever it changes. Returns the cleanup. */
export function onScope(apply: (s: Scope) => void) {
  const run = () => {
    const s = loadScope();
    if (s) apply(s);
  };
  run();
  window.addEventListener(SCOPE_EVENT, run);
  return () => window.removeEventListener(SCOPE_EVENT, run);
}
