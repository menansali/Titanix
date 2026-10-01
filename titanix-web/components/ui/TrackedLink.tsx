'use client';

import { Link } from 'next-view-transitions';
import { track } from '@vercel/analytics';
import type { ComponentProps } from 'react';

type Props = ComponentProps<'a'> & {
  /** Custom event name sent to Vercel Analytics on click. */
  event: string;
  /** Extra event properties (flat strings/numbers only). */
  props?: Record<string, string | number>;
};

/**
 * Anchor that records a Vercel Analytics custom event on click.
 * Internal hrefs (starting with "/") render through next-view-transitions' Link,
 * so page changes animate with the View Transitions API where supported.
 */
export default function TrackedLink({ event, props, href = '', onClick, ...rest }: Props) {
  const handle: Props['onClick'] = (e) => {
    track(event, props);
    onClick?.(e);
  };
  if (href.startsWith('/')) {
    return <Link href={href} onClick={handle} {...rest} />;
  }
  return <a href={href} onClick={handle} {...rest} />;
}
