import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHead from '@/components/ui/SectionHead';
import { GUIDES } from '@/lib/guides';
import { RISK_QUESTIONS } from '@/lib/riskCheck';

export const metadata: Metadata = {
  title: 'App Store rejection guides',
  description:
    `What the most common App Review rejections mean and how to fix them, in plain English: ${GUIDES.map((g) => g.code).join(', ')}. Plus a free rejection-risk check.`,
  alternates: { canonical: '/app-review' },
};

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="section">
          <SectionHead
            n={String(GUIDES.length).padStart(2, '0')}
            label="App Review"
            id="guides-title"
            title="Got rejected? Start here."
            intro="The App Review guidelines that reject apps most often, what each one means, and what to change before you resubmit."
          />
          <Link
            href="/app-review/check"
            className="group mt-12 flex flex-col gap-4 bg-titanix-yellow p-6 text-black sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <span>
              <span className="wide block font-display text-2xl font-extrabold uppercase leading-tight">Not submitted yet?</span>
              <span className="mt-1 block text-black/75">Answer {RISK_QUESTIONS.length} yes-or-no questions and see which guidelines your app is likely to trip. Nothing you answer leaves your browser.</span>
            </span>
            <span className="inline-flex items-center gap-2 whitespace-nowrap bg-black px-5 py-3 text-sm font-semibold text-titanix-yellow">
              Check my app <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <ol className="mt-14 border-t border-titanix-border">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/app-review/${g.slug}`}
                  data-cursor="Read"
                  className="group grid gap-3 border-b border-titanix-border py-7 md:grid-cols-[8rem_1fr_2rem] md:gap-8"
                >
                  <span className="wide font-display text-3xl font-extrabold tracking-tight text-titanix-yellow">{g.code}</span>
                  <span>
                    <span className="block font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-titanix-yellow">
                      {g.name}
                    </span>
                    <span className="mt-2 block max-w-2xl text-titanix-muted">{g.summary}</span>
                  </span>
                  <ArrowUpRight className="hidden text-titanix-faint transition-all group-hover:rotate-45 group-hover:text-titanix-yellow md:block" />
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-sm text-titanix-muted">
            Not affiliated with Apple. Quotes are from Apple&apos;s{' '}
            <a href="https://developer.apple.com/app-store/review/guidelines/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-titanix-text">
              App Review Guidelines
            </a>
            , which change over time; the full text there is what counts.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
