import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Scramble from '@/components/motion/Scramble';
import { PROJECTS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Signal lost',
  robots: { index: false },
};

export default function NotFound() {
  const apps = PROJECTS.filter((p) => p.caseStudy);
  return (
    <>
      <Navbar />
      <main className="section flex min-h-[100svh] flex-col justify-center !pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted">
          <Scramble immediate text="Error 404 / rssi −∞ dBm / no gateway in range" />
        </p>
        <h1 className="wide mt-8 font-display text-[13vw] font-extrabold uppercase leading-[0.86] tracking-[-0.03em] sm:text-[10vw] 2xl:text-[9rem]">
          Signal
          <br />
          lost<span className="text-titanix-yellow">.</span>
        </h1>
        <p className="mt-8 max-w-lg text-lg text-titanix-muted">
          This page isn&apos;t on the map. It may have moved, or the link has a typo. Move your cursor around: the
          transmitter still works.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-primary group">
            Back to base <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/#work" className="btn-ghost">
            See the work
          </Link>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-titanix-border pt-5 font-mono text-xs text-titanix-faint">
          {apps.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="transition-colors hover:text-titanix-yellow">
                {p.title.split(':')[0]}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
