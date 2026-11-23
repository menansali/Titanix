import { Link } from 'next-view-transitions';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { OFFERS } from '@/lib/data';
import SectionHead from './ui/SectionHead';
import BookingLink from './ui/BookingLink';

/** A cal.com href opens the booking modal; anything else is a normal link. */
function Action({ label, href, id, className }: { label: string; href: string; id: string; className: string }) {
  if (href.startsWith('https://cal.com/'))
    return (
      <BookingLink href={href} slot={`${id}-${href.split('/').pop()}`} data-cursor="Book" className={className}>
        {label} <ArrowUpRight size={16} />
      </BookingLink>
    );
  return (
    <Link href={href} className={className}>
      {label} <ArrowRight size={16} />
    </Link>
  );
}

const COUNT = ['', 'One way', 'Two ways', 'Three ways', 'Four ways'];

/**
 * The fixed offers, side by side on a hairline. Used on the home page and
 * on /ship (where `more` is off, since you're already on the details page).
 * The home page turns `promise` off because the guarantee gets its own band
 * right after (see Guarantee).
 */
export default function Offers({ n = '03', more = true, promise = true }: { n?: string; more?: boolean; promise?: boolean }) {
  return (
    <section id="offers" className="section" aria-labelledby="offers-title">
      <SectionHead
        n={n}
        label="Offers"
        id="offers-title"
        title={`${COUNT[OFFERS.length] ?? 'Ways'} to start.`}
        intro="All fixed price, agreed before we begin. Already built something that's stuck? Start with the rescue."
      />

      <div className="mt-12 grid border-t border-titanix-border lg:grid-cols-3">
        {OFFERS.map((o, i) => (
          <article
            key={o.id}
            id={o.id}
            className={`flex scroll-mt-24 flex-col border-b border-titanix-border py-10 lg:border-b-0 lg:px-8 lg:py-12 xl:px-10 ${
              i < OFFERS.length - 1 ? 'lg:border-r' : ''
            } ${i === 0 ? 'lg:!pl-0' : ''} ${i === OFFERS.length - 1 ? 'lg:!pr-0' : ''}`}
          >
            <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em]">
              <span className="text-titanix-yellow">({String.fromCharCode(65 + i)})</span>
              <span className="border border-titanix-border px-2.5 py-1 text-titanix-muted">{o.time}</span>
            </div>
            <h3 className="wide wide-in mt-6 font-display text-[8vw] font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-4xl 2xl:text-5xl">
              {o.title}
            </h3>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-titanix-muted">{o.summary}</p>

            <ul className="mt-8 space-y-2.5 border-l border-titanix-yellow pl-5 text-titanix-text">
              {o.includes.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>

            {promise && o.promise && (
              <p className="mt-8 bg-titanix-yellow p-5 text-black">
                <span className="wide block font-display text-xl font-extrabold uppercase">{o.promise.split('. ')[0]}.</span>
                <span className="mt-1.5 block text-sm text-black/75">{o.promise.split('. ').slice(1).join('. ')}</span>
              </p>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-10">
              <Action {...o.cta} id={o.id} className="btn-primary" />
              {o.alt && <Action {...o.alt} id={o.id} className="btn-ghost" />}
              {more && (
                <Link href={`/ship#${o.id}`} className="btn-ghost">
                  How it works <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 flex flex-col gap-2 border-t border-titanix-border pt-6 text-titanix-muted sm:flex-row sm:items-baseline sm:justify-between">
        <span>Building a physical product? We write the firmware and the app that pairs with it.</span>
        <Link href="/hardware" className="inline-flex items-center gap-2 text-titanix-text underline decoration-titanix-border underline-offset-4 hover:decoration-titanix-yellow">
          Hardware + app <ArrowRight size={15} />
        </Link>
      </p>
    </section>
  );
}
