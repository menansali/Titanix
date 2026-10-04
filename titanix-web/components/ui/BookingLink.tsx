'use client';

import { track } from '@vercel/analytics';
import type { ComponentProps, MouseEvent } from 'react';

type Props = Omit<ComponentProps<'a'>, 'href'> & {
  /** Full cal.com URL, e.g. https://cal.com/titanix/15min */
  href: string;
  /** Short name for analytics, e.g. "15 min". */
  slot: string;
};

let calReady: Promise<CalApi> | null = null;
type CalApi = Awaited<ReturnType<typeof import('@calcom/embed-react').getCalApi>>;

/**
 * Loads Cal.com's embed on first click (nothing is fetched before that) and
 * styles it to match the site. A finished booking is sent to Vercel Analytics.
 */
function loadCal() {
  calReady ??= import('@calcom/embed-react')
    .then(({ getCalApi }) => getCalApi())
    .then((cal) => {
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        cssVarsPerTheme: { light: { 'cal-brand': '#0A0A08' }, dark: { 'cal-brand': '#EFE200' } },
      });
      cal('on', {
        action: 'bookingSuccessfulV2',
        callback: (e) => {
          const d = (e as CustomEvent<{ data?: { title?: string } }>).detail?.data;
          track('Booking completed', { slot: d?.title ?? 'unknown' });
        },
      });
      return cal;
    })
    .catch((err) => {
      calReady = null;
      throw err;
    });
  return calReady;
}

/**
 * A cal.com link that opens the booking calendar in a modal over the page.
 * Modifier clicks, no JS, or a failed embed load all fall back to the plain link.
 */
export default function BookingLink({ href, slot, onClick, ...rest }: Props) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    track('Contact clicked', { channel: `booking-${slot}` });
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const calLink = new URL(href).pathname.replace(/^\//, '');
    loadCal()
      .then((cal) => cal('modal', { calLink, config: { layout: 'month_view', theme: 'dark' } }))
      .catch(() => window.location.assign(href));
  };

  return <a href={href} target="_blank" rel="noopener noreferrer" onClick={handle} onMouseEnter={() => void loadCal().catch(() => {})} {...rest} />;
}
