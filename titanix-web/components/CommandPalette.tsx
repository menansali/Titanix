'use client';

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { usePathname } from 'next/navigation';
import { useTransitionRouter } from 'next-view-transitions';
import { track } from '@vercel/analytics';
import { CornerDownLeft, Search } from 'lucide-react';
import { getLenis, scrollToHash } from '@/lib/motion';
import { openBooking } from './ui/BookingLink';

export interface PaletteItem {
  group: string;
  label: string;
  /** Right-hand hint, e.g. a category or guideline number. */
  hint?: string;
  /** Site path, "/#section", mailto: or a cal.com URL (opens the booking modal). */
  href: string;
  /** Extra words to match on. */
  keywords?: string;
}

/** Other components open the palette with `window.dispatchEvent(new Event(OPEN_PALETTE))`. */
export const OPEN_PALETTE = 'palette:open';

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Every query word has to appear somewhere in the item. */
function matches(item: PaletteItem, q: string) {
  const hay = norm(`${item.label} ${item.group} ${item.hint ?? ''} ${item.keywords ?? ''}`);
  return norm(q).split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
}

/** ⌘K / Ctrl+K: jump to any page, case study, guide or note, or book a call. */
export default function CommandPalette({ items }: { items: PaletteItem[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const router = useTransitionRouter();
  const pathname = usePathname();

  useEffect(() => {
    const show = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      track('Palette opened');
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (open) setOpen(false);
        else show();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_PALETTE, show);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_PALETTE, show);
    };
  }, [open]);

  // Pause smooth scroll underneath, and put focus back where it was on close.
  useEffect(() => {
    if (!open) return;
    setQ('');
    setActive(0);
    getLenis()?.stop();
    requestAnimationFrame(() => input.current?.focus());
    return () => {
      getLenis()?.start();
      returnFocus.current?.focus?.();
    };
  }, [open]);

  const results = useMemo(() => (q.trim() ? items.filter((i) => matches(i, q)) : items), [items, q]);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  function go(item: PaletteItem) {
    setOpen(false);
    track('Palette used', { to: item.href });
    const { href } = item;
    if (href.startsWith('https://cal.com/')) return openBooking(href);
    if (href.startsWith('mailto:')) return void (window.location.href = href);
    const [path, hash] = href.split('#');
    // Same page: glide to the section. Anything else is a view-transition navigation.
    if (hash && (path || '/') === pathname && scrollToHash(`#${hash}`)) return;
    router.push(href);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  }

  if (!open) return null;

  let lastGroup = '';
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 px-4 pt-[12svh]" onMouseDown={() => setOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className="w-full max-w-xl border border-titanix-border bg-titanix-void shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center gap-3 border-b border-titanix-border px-4">
          <Search size={16} className="shrink-0 text-titanix-faint" />
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Jump to work, guides, notes, or book a call"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `palette-${active}` : undefined}
            className="h-14 w-full bg-transparent text-base text-titanix-text placeholder:text-titanix-faint focus:outline-none"
          />
          <kbd className="chip shrink-0">esc</kbd>
        </div>

        <ul ref={list} id="palette-list" role="listbox" data-lenis-prevent className="max-h-[55svh] overflow-y-auto py-2">
          {results.length === 0 && <li className="px-4 py-6 text-sm text-titanix-muted">Nothing matches “{q}”.</li>}
          {results.map((item, i) => {
            const head = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <li key={`${item.group}-${item.href}`} role="presentation">
                {head && <p className="label px-4 pb-1.5 pt-3">{head}</p>}
                <div
                  id={`palette-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(item)}
                  className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-2.5 text-sm ${
                    i === active ? 'bg-titanix-yellow text-black' : 'text-titanix-text'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <span className={`flex shrink-0 items-center gap-2 font-mono text-[11px] ${i === active ? 'text-black/60' : 'text-titanix-faint'}`}>
                    {item.hint}
                    {i === active && <CornerDownLeft size={13} />}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
