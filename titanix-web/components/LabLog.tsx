import { Link } from 'next-view-transitions';
import { getLabLog } from '@/lib/appstore';
import SectionHead from './ui/SectionHead';

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export default async function LabLog() {
  const log = await getLabLog();
  return (
    <section id="log" className="section" aria-labelledby="log-title">
      <SectionHead
        n="07"
        label="Lab log"
        id="log-title"
        title="What we shipped lately."
        intro="Launches and updates from our own products. New App Store releases show up here on their own."
      />

      <ol className="mt-12 border-t border-titanix-border">
        {log.map((e) => {
          const name = e.slug ? (
            <Link href={`/work/${e.slug}`} className="hover:text-titanix-yellow">
              {e.project}
            </Link>
          ) : e.url ? (
            <a href={e.url} target="_blank" rel="noopener noreferrer" className="hover:text-titanix-yellow">
              {e.project}
            </a>
          ) : (
            e.project
          );
          return (
            <li
              key={`${e.date}-${e.project}`}
              className="grid gap-2 border-b border-titanix-border py-5 sm:grid-cols-[8.5rem_14rem_1fr] sm:gap-6"
            >
              <time dateTime={e.date} className="font-mono text-xs text-titanix-faint sm:pt-1">
                {fmt(e.date)}
              </time>
              <p className="flex items-center gap-2.5">
                <span className="font-display font-bold text-titanix-text">{name}</span>
                <span className={`chip ${e.title === 'Launch' ? '!border-titanix-yellow/50 !text-titanix-yellow' : ''}`}>
                  {e.title}
                </span>
              </p>
              <p className="text-sm text-titanix-muted sm:pt-0.5">{e.note}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
