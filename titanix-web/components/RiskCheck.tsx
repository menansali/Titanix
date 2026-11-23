'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'next-view-transitions';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { track } from '@vercel/analytics';
import type { RiskQuestion } from '@/lib/riskCheck';

type Answer = 'yes' | 'no';

/**
 * The yes-or-no rejection-risk check. Results build up as you answer, ranked
 * by how likely each one is to block approval. Everything stays in the page.
 * `guides` maps a guide slug to its guideline code and name.
 */
export default function RiskCheck({
  questions,
  guides,
}: {
  questions: RiskQuestion[];
  guides: Record<string, { code: string; name: string }>;
}) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const reported = useRef(false);

  const answered = Object.keys(answers).length;
  const done = answered === questions.length;
  const risks = questions
    .filter((q) => answers[q.id] === 'yes')
    .sort((a, b) => (a.level === b.level ? 0 : a.level === 'high' ? -1 : 1));

  useEffect(() => {
    if (done && !reported.current) {
      reported.current = true;
      track('Risk check completed', { risks: risks.length, high: risks.filter((r) => r.level === 'high').length });
    }
  }, [done, risks]);

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <ol className="border-t border-titanix-border">
        {questions.map((q, n) => (
          <li key={q.id} className="grid gap-4 border-b border-titanix-border py-5 sm:grid-cols-[2.5rem_1fr_auto] sm:items-center">
            <span className="font-mono text-xs text-titanix-yellow">{String(n + 1).padStart(2, '0')}</span>
            <span id={`q-${q.id}`} className="text-lg leading-snug">{q.question}</span>
            <span role="radiogroup" aria-labelledby={`q-${q.id}`} className="flex gap-2">
              {(['yes', 'no'] as const).map((a) => (
                <label key={a} className="cursor-pointer">
                  <input
                    type="radio"
                    name={q.id}
                    value={a}
                    checked={answers[q.id] === a}
                    onChange={() => setAnswers((s) => ({ ...s, [q.id]: a }))}
                    className="peer sr-only"
                  />
                  <span className="inline-block min-w-[3.5rem] rounded-md border border-titanix-border px-3.5 py-2 text-center text-sm capitalize text-titanix-muted transition-colors hover:border-white/40 peer-checked:border-titanix-yellow peer-checked:bg-titanix-yellow peer-checked:font-medium peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-titanix-yellow">
                    {a}
                  </span>
                </label>
              ))}
            </span>
          </li>
        ))}
      </ol>

      <aside aria-live="polite" className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center justify-between gap-4 border-t border-titanix-border pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted">
          <span>
            {answered} / {questions.length} answered
          </span>
          {answered > 0 && (
            <button type="button" onClick={() => { setAnswers({}); reported.current = false; }} className="inline-flex items-center gap-1.5 hover:text-titanix-text">
              <RotateCcw size={12} /> Reset
            </button>
          )}
        </div>

        <p className="wide mt-6 font-display text-5xl font-extrabold uppercase leading-none tracking-tight sm:text-6xl">
          {risks.length === 0 ? (answered === 0 ? '—' : 'Clear so far') : `${risks.length} to check`}
        </p>
        <p className="mt-3 text-titanix-muted">
          {answered === 0
            ? 'Answer on the left. Each yes adds the guideline it puts at risk.'
            : risks.length === 0
              ? 'None of your answers point at a common rejection yet.'
              : 'Ranked by what is most likely to block approval.'}
        </p>

        {risks.length > 0 && (
          <ul className="mt-6 border-t border-titanix-border">
            {risks.map((r) => (
              <li key={r.id} className="border-b border-titanix-border py-4">
                <Link href={`/app-review/${r.guide}`} className="group block">
                  <span className="flex items-baseline gap-3 font-mono text-xs">
                    <span className="text-titanix-yellow">{guides[r.guide]?.code}</span>
                    <span className="text-titanix-text group-hover:text-titanix-yellow">{guides[r.guide]?.name}</span>
                    {r.level === 'high' && <span className="ml-auto text-titanix-faint">needs a new build</span>}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-titanix-muted">{r.check}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {done && (
          <div className="mt-8 bg-titanix-yellow p-6 text-black">
            <p className="wide font-display text-xl font-extrabold uppercase leading-tight">
              {risks.length > 0 ? 'Want us to fix them?' : 'Want a second pair of eyes?'}
            </p>
            <p className="mt-2 text-sm text-black/75">
              {risks.length > 0
                ? 'App Rescue takes the app through every item above to approved. The audit gives you the full list with fixes in 48 hours.'
                : 'This check only covers the usual suspects. The audit reads the app itself and gives you a READY / NOT READY report in 48 hours.'}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/ship#rescue-form" className="inline-flex items-center gap-2 whitespace-nowrap bg-black px-4 py-2.5 text-sm font-semibold text-titanix-yellow">
                Rescue my app <ArrowRight size={15} />
              </Link>
              <Link href="/ship#order" className="inline-flex items-center gap-2 whitespace-nowrap border border-black/40 px-4 py-2.5 text-sm font-semibold">
                Order the audit
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
