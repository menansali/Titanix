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

/** Real App Store ratings and written reviews, fetched live. Renders nothing without data. */
export default async function Proof() {
  const [ratings, reviews] = await Promise.all([getRatings(), getReviews()]);
  if (!ratings && !reviews.length) return null;

  return (
    <section aria-label="App Store reviews" className="section !pt-0">
      <div className="grid gap-10 border-t border-titanix-border pt-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        {ratings && (
          <div>
            <p className="label">From the App Store</p>
            <p className="wide mt-5 font-display text-7xl font-extrabold leading-none tracking-tight sm:text-8xl">
              {ratings.average.toFixed(1)}
              <span className="text-titanix-yellow">★</span>
            </p>
            <p className="mt-3 text-titanix-muted">
              Average across {ratings.count} ratings, all from real users. Pulled live from Apple every few hours.
            </p>
          </div>
        )}
        <div className="space-y-10">
          {reviews.slice(0, 3).map((r) => (
            <figure key={`${r.slug}-${r.author}`}>
              <Stars n={r.rating} />
              <Reveal as="blockquote" className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight sm:text-4xl">
                “{r.body}”
              </Reveal>
              <figcaption className="mt-4 font-mono text-xs text-titanix-faint">
                {r.author} · App Store {COUNTRY[r.country] ?? r.country} · on{' '}
                <Link href={`/work/${r.slug}`} className="text-titanix-text underline decoration-titanix-border underline-offset-4 hover:decoration-titanix-yellow">
                  {r.project.split(':')[0]}
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
