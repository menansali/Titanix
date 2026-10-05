'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { track } from '@vercel/analytics';
import { CONTACT } from '@/lib/data';
import { BUDGETS, PROJECT_TYPES, TIMELINES, briefBody, briefSubject, type Brief } from '@/lib/contact';

type State = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

export const FIELD =
  'w-full rounded-md border border-titanix-border bg-transparent px-4 py-3 text-sm text-titanix-text ' +
  'placeholder:text-titanix-faint transition-colors focus:border-titanix-yellow focus:outline-none';

export const LABEL = 'label mb-2 block text-left';

function Choice({
  name,
  label,
  options,
}: {
  name: keyof Brief;
  label: string;
  options: readonly string[];
}) {
  return (
    <fieldset className="text-left">
      <legend className={LABEL}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} required={i === 0} className="peer sr-only" />
            <span className="inline-block rounded-md border border-titanix-border px-3.5 py-2 text-sm text-titanix-muted transition-colors hover:border-white/40 peer-checked:border-titanix-yellow peer-checked:bg-titanix-yellow peer-checked:font-medium peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-titanix-yellow">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const brief = Object.fromEntries(
      ['name', 'email', 'type', 'budget', 'timeline', 'message'].map((k) => [k, String(fd.get(k) ?? '')]),
    ) as unknown as Brief;

    setState('sending');
    setError('');
    track('Contact form submitted', { type: brief.type, budget: brief.budget, timeline: brief.timeline });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...brief, company: fd.get('company') }),
      });
      if (res.ok) {
        setState('sent');
        return;
      }
      if (res.status === 422) {
        setError((await res.json()).error ?? 'Please check the form.');
        setState('error');
        return;
      }
    } catch {
      // Network failure — fall through to the email fallback.
    }

    // Delivery not configured or failed: hand the brief to the visitor's mail app.
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(briefSubject(brief))}&body=${encodeURIComponent(briefBody(brief))}`;
    window.location.href = href;
    setState('mailto');
  }

  if (state === 'sent' || state === 'mailto') {
    return (
      <div className="flex flex-col items-start gap-3 border border-titanix-border p-8" role="status">
        <CheckCircle2 size={28} className="text-titanix-yellow" />
        <p className="font-display text-xl font-bold">
          {state === 'sent' ? 'Thanks — your brief is in.' : 'Almost there — your email app should have opened.'}
        </p>
        <p className="text-sm text-titanix-muted">
          {state === 'sent'
            ? 'We reply fast — usually the same day.'
            : `Hit send there, or write to ${CONTACT.email} directly.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-7 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={LABEL}>Name</label>
          <input id="cf-name" name="name" required maxLength={120} autoComplete="name" className={FIELD} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-email" className={LABEL}>Email</label>
          <input id="cf-email" name="email" type="email" required maxLength={200} autoComplete="email" className={FIELD} placeholder="you@company.com" />
        </div>
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Choice name="type" label="What are we building?" options={PROJECT_TYPES} />
      <Choice name="budget" label="Budget" options={BUDGETS} />
      <Choice name="timeline" label="Timeline" options={TIMELINES} />

      <div>
        <label htmlFor="cf-message" className={LABEL}>About the project</label>
        <textarea
          id="cf-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          className={`${FIELD} resize-y`}
          placeholder="What problem does it solve, and who is it for?"
        />
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-400" role="alert">{error}</p>
      )}

      <div>
        <button type="submit" disabled={state === 'sending'} className="btn-primary group w-full disabled:opacity-60 sm:w-auto">
          {state === 'sending' ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send project brief
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
