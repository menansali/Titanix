'use client';

import { useEffect, useState } from 'react';
import { CONTACT } from '@/lib/data';

const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: CONTACT.timeZone });
const hourOf = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: CONTACT.timeZone });

/**
 * The studio's local time and what that means for a reply. Rendered after
 * mount only, so the static HTML never carries a stale time.
 */
export default function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const hour = now ? Number(hourOf.format(now)) : null;
  const awake = hour !== null && hour >= 8 && hour < 22;

  return (
    <span className="flex items-center gap-2">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${awake ? 'bg-titanix-yellow' : 'bg-titanix-faint'}`} />
      {CONTACT.city}
      {now && (
        <>
          {' · '}
          <time dateTime={now.toISOString()}>{fmt.format(now)}</time>
          {' · '}
          {awake ? 'usually replies the same day' : 'replies in the morning'}
        </>
      )}
    </span>
  );
}
