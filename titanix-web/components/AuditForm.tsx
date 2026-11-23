'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { track } from '@vercel/analytics';
import { CONTACT } from '@/lib/data';
import { ORDER_KINDS, auditBody, auditSubject, type AuditOrder, type OrderKind } from '@/lib/contact';
import { FIELD, LABEL } from './ContactForm';

type State = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

// Wording that differs between the two orders; fields and delivery are shared.
const COPY = {
  audit: {
    question: 'How can we look at it?',
    notes: 'Anything worrying you? (optional)',
    placeholder: 'A rejection you got, a submission date, a part you\'re unsure about',
    submit: 'Request the audit',
    event: 'Audit requested',
  },
  rescue: {
    question: 'How was it built?',
    notes: 'Where is it stuck? (optional)',
    placeholder: 'Paste the rejection message, or tell us what breaks and where the code lives',
    submit: 'Send it to us',
    event: 'Rescue requested',
  },
} as const;

/**
 * Order the App Launch Audit or an App Rescue without a call. Posts to
 * /api/audit; if email delivery isn't set up it opens a pre-filled mailto,
 * like the contact form.
 */
export default function AuditForm({ kind = 'audit' }: { kind?: OrderKind }) {
  const copy = COPY[kind];
  const id = (f: string) => `${kind}-${f}`;
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const order = {
      kind,
      ...Object.fromEntries(['name', 'email', 'app', 'access', 'concern'].map((k) => [k, String(fd.get(k) ?? '')])),
    } as AuditOrder;

    setState('sending');
    setError('');
    track(copy.event, { choice: order.access });

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, company: fd.get('company') }),
      });
      if (res.ok) return setState('sent');
      if (res.status === 422) {
        setError((await res.json()).error ?? 'Please check the form.');
        return setState('error');
      }
    } catch {
      // Network failure: fall through to the email fallback.
    }
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(auditSubject(order))}&body=${encodeURIComponent(auditBody(order))}`;
    setState('mailto');
  }

  if (state === 'sent' || state === 'mailto') {
    return (
      <div className="flex flex-col items-start gap-3 border border-titanix-border p-8" role="status">
        <CheckCircle2 size={28} className="text-titanix-yellow" />
        <p className="font-display text-xl font-bold">
          {state === 'sent' ? 'Request received.' : 'Almost there: your email app should have opened.'}
        </p>
        <p className="text-sm text-titanix-muted">
          {state === 'sent'
            ? 'You will get the fixed price and a start date by email, usually the same day.'
            : `Hit send there, or write to ${CONTACT.email} directly.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className={LABEL}>Name</label>
          <input id={id('name')} name="name" required maxLength={120} autoComplete="name" className={FIELD} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor={id('email')} className={LABEL}>Email</label>
          <input id={id('email')} name="email" type="email" required maxLength={200} autoComplete="email" className={FIELD} placeholder="you@company.com" />
        </div>
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor={id('company')}>Company</label>
        <input id={id('company')} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor={id('app')} className={LABEL}>The app</label>
        <input id={id('app')} name="app" required minLength={3} maxLength={300} className={FIELD} placeholder="App Store link, or its name if it isn't live yet" />
      </div>
      <fieldset>
        <legend className={LABEL}>{copy.question}</legend>
        <div className="flex flex-wrap gap-2">
          {ORDER_KINDS[kind].options.map((o, i) => (
            <label key={o} className="cursor-pointer">
              <input type="radio" name="access" value={o} required={i === 0} className="peer sr-only" />
              <span className="inline-block rounded-md border border-titanix-border px-3.5 py-2 text-sm text-titanix-muted transition-colors hover:border-white/40 peer-checked:border-titanix-yellow peer-checked:bg-titanix-yellow peer-checked:font-medium peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-titanix-yellow">
                {o}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor={id('concern')} className={LABEL}>{copy.notes}</label>
        <textarea id={id('concern')} name="concern" maxLength={3000} rows={3} className={`${FIELD} resize-y`} placeholder={copy.placeholder} />
      </div>
      {state === 'error' && <p className="text-sm text-red-400" role="alert">{error}</p>}
      <button type="submit" disabled={state === 'sending'} className="btn-primary group w-full disabled:opacity-60 sm:w-auto">
        {state === 'sending' ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            {copy.submit} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
