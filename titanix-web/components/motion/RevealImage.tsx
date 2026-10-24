import type { ReactNode } from 'react';

/**
 * Image frame that wipes open from the bottom, with the image settling in slow
 * parallax. Both run on CSS scroll timelines (`.wipe`, `.drift` in globals.css),
 * so there's no JavaScript; unsupported browsers show the image in place.
 */
export default function RevealImage({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`wipe relative overflow-hidden ${className}`}>
      <div className="drift absolute inset-0">{children}</div>
    </div>
  );
}
