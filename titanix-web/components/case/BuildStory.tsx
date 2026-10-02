'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ScrollTrigger } from '@/lib/motion';

/**
 * "What we built" as a reading column next to a sticky iPhone. As each point
 * reaches the middle of the screen it lights up and the phone switches to the
 * next App Store screenshot. Without screenshots it's just the list.
 */
export default function BuildStory({ title, built, screenshots = [] }: { title: string; built: string[]; screenshots?: string[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const shots = screenshots.length ? screenshots : null;

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('li');
    if (!items) return;
    const triggers = [...items].map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 60%',
        onToggle: (self) => self.isActive && setActive(i),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div className={`grid gap-12 ${shots ? 'lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]' : ''} lg:gap-20`}>
      <ol ref={listRef} className="border-t border-titanix-border">
        {built.map((b, n) => (
          <li
            key={b}
            className={`grid grid-cols-[3rem_1fr] border-b border-titanix-border py-7 transition-colors duration-500 sm:grid-cols-[4rem_1fr] lg:py-12 ${
              n === active ? 'text-titanix-text' : 'text-titanix-faint'
            }`}
          >
            <span className={`font-mono text-xs transition-colors duration-500 ${n === active ? 'text-titanix-yellow' : ''}`}>
              {String(n + 1).padStart(2, '0')}
            </span>
            <span className="font-display text-xl font-semibold leading-snug tracking-tight sm:text-3xl">{b}</span>
          </li>
        ))}
      </ol>

      {shots && (
        <div className="hidden lg:block">
          <div className="sticky top-[12svh]">
            <div className="relative mx-auto aspect-[1290/2796] w-[min(100%,35svh)] overflow-hidden rounded-[2.2rem] border-[6px] border-black bg-titanix-deep shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-titanix-border">
              {shots.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={i === active % shots.length ? `${title} screen ${i + 1}` : ''}
                  fill
                  sizes="22rem"
                  className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${
                    i === active % shots.length ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 text-center font-mono text-[11px] text-titanix-faint">
              Screen {String((active % shots.length) + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
