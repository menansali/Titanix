import { FOUNDER } from '@/lib/data';
import { NOTES } from '@/lib/notes';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** RSS 2.0 feed of /notes. */
export function GET() {
  const notes = [...NOTES].sort((a, b) => b.date.localeCompare(a.date));
  const items = notes
    .map((n) => {
      const url = `${SITE_URL}/notes/${n.slug}`;
      return `    <item>
      <title>${esc(n.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${n.date}T12:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${esc(FOUNDER.name)}</dc:creator>
      <description>${esc(n.summary)}</description>
${n.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Titanix Notes</title>
    <link>${SITE_URL}/notes</link>
    <atom:link href="${SITE_URL}/notes/feed.xml" rel="self" type="application/rss+xml" />
    <description>Write-ups from Titanix on shipping iOS apps, App Review and the things we build.</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${notes[0]?.date ?? '2026-01-01'}T12:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
