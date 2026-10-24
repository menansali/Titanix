'use client';

import { useEffect, useState } from 'react';
import { Link } from 'next-view-transitions';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT } from '@/lib/data';
import BookingLink from './ui/BookingLink';

/**
 * Phones only: a slim bar with the two ways to get in touch. It shows up once
 * the hero is out of view and steps aside while the contact section or footer
 * is on screen, so it never covers the form it points to.
 */
export default function MobileCTA() {
  const [past, setPast] = useState(false);
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const targets = [...document.querySelectorAll('#contact, footer')];
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setCovered(seen.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  const slot = CONTACT.booking[0];
  const show = past && !covered;

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-titanix-border bg-titanix-void px-4 pt-3 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex gap-2">
        {slot && (
          <BookingLink href={slot.url} slot={`${slot.label}-mobile-bar`} className="btn-ghost flex-1 !px-3">
            Book {slot.label} <ArrowUpRight size={15} />
          </BookingLink>
        )}
        <Link href="/#contact" className="btn-primary flex-1 !px-3">
          Start a project
        </Link>
      </div>
    </div>
  );
}
