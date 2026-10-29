'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { track } from '@vercel/analytics';

type State = 'idle' | 'sending' | 'sent' | 'error';

/** One field under the lab log: an email when one of the apps ships an update. */
export default function Subscribe() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fd.get('email'), company: fd.get('company') }),
      });
      if (res.ok) {
        track('Subscribed', { list: 'lab-log' });
        return setState('sent');
      }
      setError((await res.json().catch(() => null))?.error ?? 'Could not sign you up right now.');
    } catch {
      setError('Could not sign you up right now.');
    }
    setState('error');
  }

  if (state === 'sent') {
    return (
      <p role="status" className="font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-yellow">
        You’re on the list. Next release lands in your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md">
      <label htmlFor="sub-email" className="label">
        Email me when an app ships
      </label>
      <div className="mt-3 flex border-b border-titanix-border transition-colors focus-within:border-titanix-yellow">
        <input
          id="sub-email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder="you@company.com"
          className="w-full bg-transparent py-3 text-sm text-titanix-text placeholder:text-titanix-faint focus:outline-none"
        />
        <div className="hidden" aria-hidden="true">
          <input name="company" tabIndex={-1} autoComplete="off" />
        </div>
        <button type="submit" disabled={state === 'sending'} aria-label="Sign up" className="shrink-0 px-2 text-titanix-muted transition-colors hover:text-titanix-yellow disabled:opacity-60">
          {state === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
        </button>
      </div>
      {state === 'error' && (
        <p role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
      <p className="mt-2 font-mono text-[11px] text-titanix-faint">
        Only when something ships. Unsubscribe any time.
      </p>
    </form>
  );
}
