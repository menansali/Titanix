import { Link } from 'next-view-transitions';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { OFFERS } from '@/lib/data';
import BookingLink from './ui/BookingLink';

/**
 * The approval guarantee as the page's one full-yellow band. The wording is
 * the `promise` of the Idea to App Store offer in lib/data.ts, so it is
 * written once. Renders nothing if that offer has no promise.
 */
export default function Guarantee() {
  const offer = OFFERS.find((o) => o.promise);
  if (!offer?.promise) return null;
  const [claim, ...rest] = offer.promise.split('. ');
  const [first, second] = claim.split(', ');

  return (
    <section aria-labelledby="guarantee-title" className="on-yellow bg-titanix-yellow text-black">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex items-center justify-between gap-4 border-t border-black/25 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-black/70">
          <span>The guarantee</span>
          <span>{offer.title}</span>
        </div>

        <h2
          id="guarantee-title"
          className="wide wide-in mt-10 font-display text-[10.5vw] font-extrabold uppercase leading-[0.98] tracking-[-0.025em] sm:mt-14 sm:text-[7.4vw] 2xl:text-[6.9rem]"
        >
          {first}
          {second && (
            <>
              ,<br />
              {second}.
            </>
          )}
        </h2>

        <div className="mt-10 grid gap-8 border-t border-black/25 pt-6 sm:mt-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-black/80 sm:text-xl">{rest.join('. ')}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BookingLink
              href={offer.cta.href}
              slot={`guarantee-${offer.cta.href.split('/').pop()}`}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-black px-5 py-3 text-sm font-semibold text-titanix-yellow transition-colors hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {offer.cta.label} <ArrowUpRight size={16} />
            </BookingLink>
            <Link
              href={`/ship#${offer.id}`}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-black/40 px-5 py-3 text-sm font-semibold text-black transition-colors hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              How it works <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
