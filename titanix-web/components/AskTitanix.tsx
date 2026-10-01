'use client';

import { useState, type FormEvent } from 'react';
import { Link } from 'next-view-transitions';
import { ArrowRight, ArrowUpRight, Loader2, Sparkles, TriangleAlert } from 'lucide-react';
import { track } from '@vercel/analytics';
import { PROJECTS } from '@/lib/data';
import { IDEA_MAX, IDEA_MIN } from '@/lib/contact';
import type { Scope } from '@/lib/scope';
import Reveal from './ui/Reveal';

export const BRIEF_EVENT = 'titanix:brief';
export interface BriefPrefill {
  type: string;
  message: string;
}

const EXAMPLES = [
  'A habit tracker for runners that syncs with Apple Watch',
  'A booking system for a chain of barber shops',
  'Soil-moisture sensors for a vineyard with alerts on a phone',
];

function toMessage(idea: string, s: Scope) {
  const lines = [idea, '', '— Scoped with Ask Titanix —', `v1: ${s.v1.join('; ')}`];
  if (s.later.length) lines.push(`Later: ${s.later.join('; ')}`);
  lines.push(`Stack: ${s.stack.join(', ')}`, `Estimate: ${s.weeksMin}–${s.weeksMax} weeks`);
  return lines.join('\n');
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-titanix-faint">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5 text-sm text-titanix-text">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AskTitanix() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scope, setScope] = useState<Scope | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (idea.trim().length < IDEA_MIN) {
      setError('Tell us a bit more — a sentence or two is perfect.');
      return;
    }
    setLoading(true);
    setError('');
    setScope(null);
    track('Scope requested');
    try {
      const res = await fetch('/api/scope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setScope(data);
      track('Scope generated', { platform: data.platform, fit: String(data.fit) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  function sendBrief() {
    if (!scope) return;
    const detail: BriefPrefill = { type: scope.platform, message: toMessage(idea.trim(), scope) };
    window.dispatchEvent(new CustomEvent(BRIEF_EVENT, { detail }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    track('Scope sent to brief', { platform: scope.platform });
  }

  const related = scope && scope.related !== 'none' ? PROJECTS.find((p) => p.slug === scope.related) : null;

  return (
    <section id="scope" className="section">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">
          <Sparkles size={13} className="text-titanix-glow" /> Ask Titanix
        </span>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Scope your idea in <span className="text-gradient">seconds</span>.
        </h2>
        <p className="mt-5 text-lg text-titanix-muted">
          Describe what you want to build. Our AI scoper drafts a first version, a stack and a
          timeline — the way we&apos;d plan it on a first call.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
        <form onSubmit={onSubmit} className="rounded-3xl glass p-4 sm:p-5">
          <label htmlFor="scope-idea" className="sr-only">Your product idea</label>
          <textarea
            id="scope-idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            maxLength={IDEA_MAX}
            rows={3}
            placeholder="e.g. An app that lets dog walkers share live routes with owners…"
            className="w-full resize-none bg-transparent px-2 py-1 text-base text-titanix-text placeholder:text-titanix-faint focus:outline-none"
          />
          <div className="mt-3 flex flex-col gap-3 border-t border-titanix-border pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setIdea(ex)}
                  className="rounded-full border border-titanix-border px-3 py-1 text-xs text-titanix-muted transition-colors hover:border-white/20 hover:text-titanix-text"
                >
                  {ex}
                </button>
              ))}
            </div>
            <button type="submit" disabled={loading} className="btn-primary shrink-0 !py-2.5 disabled:opacity-60">
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Scoping…
                </>
              ) : (
                <>
                  Scope it <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        <div aria-live="polite">
          {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}

          {loading && (
            <div className="mt-6 space-y-3 rounded-3xl glass p-6" aria-hidden="true">
              {[80, 95, 70, 60].map((w) => (
                <div key={w} className="h-3 animate-pulse rounded-full bg-white/[0.06]" style={{ width: `${w}%` }} />
              ))}
            </div>
          )}

          {scope && !scope.fit && (
            <div className="mt-6 flex gap-3 rounded-3xl glass p-6 text-sm text-titanix-muted">
              <TriangleAlert size={18} className="shrink-0 text-titanix-glow" />
              {scope.summary}
            </div>
          )}

          {scope?.fit && (
            <div className="mt-6 rounded-3xl border border-titanix-border bg-void-fade p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-xl">
                  <p className="text-xs font-medium uppercase tracking-wider text-titanix-glow">{scope.platform}</p>
                  <p className="mt-2 font-display text-xl font-semibold leading-snug">{scope.summary}</p>
                </div>
                <div className="rounded-2xl border border-titanix-border bg-white/[0.02] px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-wider text-titanix-faint">v1 estimate</p>
                  <p className="mt-1 font-display text-2xl font-bold text-gradient">
                    {scope.weeksMin}–{scope.weeksMax} wks
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <List title="Version 1" items={scope.v1} />
                <div className="space-y-8">
                  <List title="Later" items={scope.later} />
                  <List title="Watch out for" items={scope.risks} />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {scope.stack.map((t) => (
                  <span key={t} className="rounded-lg border border-titanix-border bg-white/[0.02] px-2.5 py-1 text-xs text-titanix-muted">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-titanix-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                {related ? (
                  <Link href={`/work/${related.slug}`} className="inline-flex items-center gap-1.5 text-sm text-titanix-muted hover:text-titanix-text">
                    Closest thing we&apos;ve built: <span className="text-titanix-glow">{related.title}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                ) : (
                  <span className="text-xs text-titanix-faint">AI draft — we&apos;ll refine it with you on a call.</span>
                )}
                <button type="button" onClick={sendBrief} className="btn-primary group">
                  Send this to Titanix
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
