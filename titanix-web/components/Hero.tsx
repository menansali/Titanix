import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { ArrowRight } from 'lucide-react';
import { LAB_LOG, PROJECTS } from '@/lib/data';
import Scramble from './motion/Scramble';
import SignalType from './motion/SignalType';

export default function Hero() {
  const onStore = PROJECTS.filter((p) => p.icon && p.url?.includes('apps.apple.com'));
  const count = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'][onStore.length] ?? String(onStore.length);
  // Releases of our own apps since the first one in the log (static, so it never depends on Apple being up).
  const first = LAB_LOG[LAB_LOG.length - 1]?.date;
  const since = first ? new Date(`${first}T12:00:00Z`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : '';

  return (
    <section id="top" className="relative mx-auto flex min-h-[100svh] max-w-[90rem] flex-col justify-between px-5 pb-8 pt-24 sm:px-8 sm:pt-28 lg:pb-10">
      <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted">
        <Scramble immediate delay={0.2} text="Product studio / Est. 2021" />
        <Scramble immediate delay={0.35} text={`${LAB_LOG.length} releases since ${since}`} className="hidden sm:inline" />
      </div>

      {/* CSS-only entrance so the headline paints before any JavaScript (it's the LCP element);
          afterwards its letters respond to the signal (see SignalType). */}
      <SignalType
        lines={[`${count} apps`, 'live. Yours', 'is next']}
        className="wide my-10 font-display short:my-6 text-[9.1vw] font-extrabold uppercase leading-[0.86] tracking-[-0.025em] sm:text-[9.4vw] 2xl:text-[8.6rem]"
      />

      <div className="grid gap-10 border-t border-titanix-border pt-6 xl:grid-cols-[1fr_auto] xl:items-end">
        <div className="max-w-xl">
          <p className="fade-in text-lg leading-relaxed text-titanix-muted sm:text-xl" style={{ animationDelay: '0.45s' }}>
            Titanix is two people, a designer and a developer. We build, ship and keep updating our own iOS
            apps, and we do the same for yours: from an idea, or an AI-built app that&apos;s stuck, through App
            Review to a paying product.
          </p>
          <div className="fade-in mt-7 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.6s' }}>
            <a href="#contact" className="btn-primary group">
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/ship#rescue" className="btn-ghost group">
              Built it with AI? Rescue it
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Link href="/app-review/check" className="fade-in mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted underline decoration-titanix-border underline-offset-4 transition-colors hover:text-titanix-yellow hover:decoration-titanix-yellow" style={{ animationDelay: '0.7s' }}>
            Or check your app&apos;s rejection risk, free →
          </Link>
        </div>

        {/* The apps themselves, each a link to its case study. */}
        <div className="fade-in" style={{ animationDelay: '0.8s' }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanix-faint">Live on the App Store</span>
          <ul className="mt-3 flex items-center gap-2.5">
            {onStore.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  aria-label={p.title}
                  title={p.title.split(':')[0]}
                  className="relative block h-9 w-9 overflow-hidden rounded-[0.6rem] border border-titanix-border transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-titanix-yellow"
                >
                  <Image src={p.icon!} alt="" fill sizes="36px" className="object-cover" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
