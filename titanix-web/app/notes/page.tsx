import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHead from '@/components/ui/SectionHead';
import { NOTES } from '@/lib/notes';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Write-ups from Titanix on shipping iOS apps, App Review and the things we build.',
  alternates: { canonical: '/notes' },
};

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function NotesPage() {
  const notes = [...NOTES].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="section">
          <SectionHead n={String(NOTES.length).padStart(2, "0")} label="Notes" id="notes-title" title="Notes from the studio." intro="How we ship, what we learn, and the tools we open-source along the way." />
          <ol className="mt-14 border-t border-titanix-border">
            {notes.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/notes/${n.slug}`}
                  data-cursor="Read"
                  className="group grid gap-3 border-b border-titanix-border py-8 md:grid-cols-[9rem_1fr_2rem] md:gap-8"
                >
                  <time dateTime={n.date} className="font-mono text-xs text-titanix-faint md:pt-2">
                    {fmt(n.date)}
                  </time>
                  <div>
                    <h2 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-titanix-yellow sm:text-4xl">
                      {n.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-titanix-muted">{n.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {n.tags.map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="hidden text-titanix-faint transition-all group-hover:rotate-45 group-hover:text-titanix-yellow md:block" />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
