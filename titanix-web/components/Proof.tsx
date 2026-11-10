import { Link } from 'next-view-transitions';
import { getRatings, getReviews } from '@/lib/appstore';
import Reveal from './motion/Reveal';

const COUNTRY: Record<string, string> = {
  US: 'United States', GB: 'United Kingdom', DE: 'Germany', FR: 'France', IT: 'Italy', ES: 'Spain', NL: 'Netherlands',
  CH: 'Switzerland', AT: 'Austria', SE: 'Sweden', MK: 'North Macedonia', AL: 'Albania', XK: 'Kosovo', RS: 'Serbia',
  EE: 'Estonia', TR: 'Türkiye', AE: 'UAE', SA: 'Saudi Arabia', CA: 'Canada', AU: 'Australia',
};

const Stars = ({ n }: { n: number }) => (
  <span className="text-titanix-yellow" aria-label={`${n} out of 5 stars`}>
    {'★'.repeat(Math.round(n))}
    <span className="text-titanix-faint">{'★'.repeat(5 - Math.round(n))}</span>
  </span>
);

/**
 * Real App Store reviews, fetched live, with the rating as the supporting
 * line: the words carry more than an average over a small count. One review
 * runs large; two or three sit side by side on hairlines. Renders nothing
 * without data.
 */
export default async function Proof() {
  const [ratings, all] = await Promise.all([getRatings(), getReviews()]);
  if (!ratings && !all.length) return null;
  // One per app first, so three quotes are about three products where possible.
  const firstPerApp = all.filter((r, i) => all.findIndex((x) => x.slug === r.slug) === i);
  const reviews = [...firstPerApp, ...all.filter((r) => !firstPerApp.includes(r))].slice(0, 3);
  const solo = reviews.length === 1;

  return (
    <section aria-label="App Store reviews" className="section !pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-titanix-border pt-4">
        <p className="label">From the App Store</p>
        {ratings && (
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted">
            <span className="text-titanix-text">
              {ratings.average.toFixed(1)}
              <span className="text-titanix-yellow">★</span>
            </span>{' '}
            across {ratings.count} ratings · pulled live from Apple
          </p>
        )}
      </div>

      {reviews.length > 0 && (
        <div className={`mt-10 grid gap-y-10 ${solo ? '' : reviews.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {reviews.map((r, i) => (
            <figure
              key={`${r.slug}-${r.author}`}
              className={`flex flex-col ${solo ? 'max-w-5xl' : `md:px-8 ${i === 0 ? 'md:pl-0' : 'md:border-l md:border-titanix-border'}`}`}
            >
              <Stars n={r.rating} />
              <Reveal
                as="blockquote"
                className={`mt-4 font-display font-semibold tracking-tight ${
                  solo ? 'text-3xl leading-[1.08] sm:text-5xl lg:text-6xl' : 'text-xl leading-snug sm:text-2xl'
                }`}
              >
                “{r.body}”
              </Reveal>
              <figcaption className="mt-auto pt-5 font-mono text-xs text-titanix-faint">
                {r.author} · App Store {COUNTRY[r.country] ?? r.country} · on{' '}
                <Link href={`/work/${r.slug}`} className="text-titanix-text underline decoration-titanix-border underline-offset-4 hover:decoration-titanix-yellow">
                  {r.project.split(':')[0]}
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
