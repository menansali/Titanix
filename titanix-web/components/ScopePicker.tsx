'use client';

import { useState } from 'react';
import { Link } from 'next-view-transitions';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { track } from '@vercel/analytics';
import { CONTACT } from '@/lib/data';
import { TIMELINES } from '@/lib/contact';
import { PLATFORMS, STAGES, recommend, saveScope, type OfferPick, type Scope } from '@/lib/scope';
import BookingLink from './ui/BookingLink';

const call = (label: string) => CONTACT.booking.find((b) => b.label === label)?.url;

const RESULTS: Record<OfferPick, { title: string; why: string }> = {
  audit: {
    title: 'App Launch Audit',
    why: 'There is already an app to look at, so the quickest useful step is finding out exactly what stands between it and the App Store, or between it and more users.',
  },
  launch: {
    title: 'Idea to App Store',
    why: 'A new iPhone app is what the launch process is built for: idea check first, then one feature built well, then submission with the approval guarantee.',
  },
  custom: {
    title: 'A custom project',
    why: 'Web and hardware parts need their own scope, so this starts with a short brief rather than a fixed offer.',
  },
};

function Question<T extends string>({ n, label, options, value, onPick }: { n: number; label: string; options: readonly T[]; value?: T; onPick: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="label mb-3 flex gap-3">
        <span className="text-titanix-yellow">{n}</span>
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={o === value}
            onClick={() => onPick(o)}
            className={`rounded-md border px-3.5 py-2 text-sm transition-colors ${
              o === value ? 'border-titanix-yellow bg-titanix-yellow font-medium text-black' : 'border-titanix-border text-titanix-muted hover:border-white/40'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Three quick questions above the offers that point to the one to start with.
 * The answers are saved for the contact and audit forms, so nobody types them twice.
 */
export default function ScopePicker() {
  const [scope, setScope] = useState<Scope>({});
  const pick = recommend(scope);

  function set(patch: Scope) {
    const next = { ...scope, ...patch };
    setScope(next);
    saveScope(next);
    const r = recommend(next);
    if (r && (patch.stage || patch.platform)) track('Scope picked', { stage: next.stage!, platform: next.platform!, result: r });
  }

  const short = call('15 min');
  const long = call('30 min');

  return (
    <div className="mt-12 grid gap-10 border-t border-titanix-border pt-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
      <div className="space-y-7">
        <p className="label">Not sure which? Three questions.</p>
        <Question n={1} label="Where is the app now?" options={STAGES} value={scope.stage} onPick={(stage) => set({ stage })} />
        <Question n={2} label="What does it run on?" options={PLATFORMS} value={scope.platform} onPick={(platform) => set({ platform })} />
        <Question n={3} label="When do you need it?" options={TIMELINES} value={scope.timeline} onPick={(timeline) => set({ timeline })} />
      </div>

      <div aria-live="polite" className="lg:self-end">
        {pick ? (
          <div className="border-l-2 border-titanix-yellow pl-6">
            <p className="label">Start with</p>
            <p className="wide mt-3 font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl">{RESULTS[pick].title}</p>
            <p className="mt-4 max-w-md text-titanix-muted">{RESULTS[pick].why}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {pick === 'audit' && (
                <>
                  <Link href="/ship#order" className="btn-primary">
                    Order the audit <ArrowRight size={16} />
                  </Link>
                  {short && (
                    <BookingLink href={short} slot="scope-15min" data-cursor="Book" className="btn-ghost">
                      Book 15 min <ArrowUpRight size={16} />
                    </BookingLink>
                  )}
                </>
              )}
              {pick === 'launch' && long && (
                <BookingLink href={long} slot="scope-30min" data-cursor="Book" className="btn-primary">
                  Talk it through <ArrowUpRight size={16} />
                </BookingLink>
              )}
              {pick !== 'audit' && (
                <Link href="/#contact" className={pick === 'launch' && long ? 'btn-ghost' : 'btn-primary'}>
                  Send a brief <ArrowRight size={16} />
                </Link>
              )}
            </div>
            {scope.stage === 'Rejected by App Review' && (
              <Link href="/app-review" className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted underline decoration-titanix-border underline-offset-4 hover:text-titanix-yellow">
                Or read the rejection guides first →
              </Link>
            )}
            <p className="mt-5 font-mono text-[11px] text-titanix-faint">Your answers are filled into the form for you.</p>
          </div>
        ) : (
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-faint">Answer the first two to see where to start.</p>
        )}
      </div>
    </div>
  );
}
