import { LAB_LOG, PROJECTS, type LogEntry } from './data';

/*
 * Live App Store data from Apple's public iTunes endpoints (no key needed),
 * cached for 6 hours (ISR). Everything degrades to the static data in
 * lib/data.ts if Apple is slow or down.
 */

const REVALIDATE = 21600;

// Storefronts we check for ratings. The apps are listed worldwide, but ratings
// only exist where people left them; Apple has no global count.
const STOREFRONTS = ['us', 'gb', 'de', 'fr', 'it', 'es', 'nl', 'ch', 'at', 'se', 'mk', 'al', 'xk', 'rs', 'ee', 'tr', 'ae', 'sa', 'ca', 'au'];

export interface AppInfo {
  slug: string;
  id: string;
  version: string;
  released: string; // ISO date of the current version
  notes: string;
}

export interface Review {
  slug: string;
  project: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  country: string;
}

export interface Ratings {
  count: number;
  average: number;
}

const APPS = PROJECTS.flatMap((p) => {
  const id = p.url?.match(/apps\.apple\.com\/.*id(\d+)/)?.[1];
  return id ? [{ slug: p.slug, title: p.title, id }] : [];
});

async function getJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(5000) });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

interface LookupResult {
  trackId: number;
  version?: string;
  currentVersionReleaseDate?: string;
  releaseNotes?: string;
  averageUserRating?: number;
  userRatingCount?: number;
}

const lookup = (country: string) =>
  getJSON<{ results: LookupResult[] }>(`https://itunes.apple.com/lookup?id=${APPS.map((a) => a.id).join(',')}&country=${country}`);

export async function getApps(): Promise<AppInfo[]> {
  const data = await lookup('us');
  if (!data) return [];
  return data.results.flatMap((r) => {
    const app = APPS.find((a) => a.id === String(r.trackId));
    if (!app || !r.version || !r.currentVersionReleaseDate) return [];
    return [{ slug: app.slug, id: app.id, version: r.version, released: r.currentVersionReleaseDate.slice(0, 10), notes: r.releaseNotes ?? '' }];
  });
}

/** Ratings across the checked storefronts, plus which storefronts have any (for reviews). */
async function getRatingsByCountry() {
  const all = await Promise.all(STOREFRONTS.map(async (c) => ({ c, data: await lookup(c) })));
  const rows: { slug: string; country: string; count: number; avg: number }[] = [];
  for (const { c, data } of all) {
    for (const r of data?.results ?? []) {
      const app = APPS.find((a) => a.id === String(r.trackId));
      if (app && r.userRatingCount) rows.push({ slug: app.slug, country: c, count: r.userRatingCount, avg: r.averageUserRating ?? 0 });
    }
  }
  return rows;
}

export async function getRatings(slug?: string): Promise<Ratings | null> {
  const rows = (await getRatingsByCountry()).filter((r) => !slug || r.slug === slug);
  const count = rows.reduce((n, r) => n + r.count, 0);
  if (!count) return null;
  const average = rows.reduce((n, r) => n + r.avg * r.count, 0) / count;
  return { count, average: Math.round(average * 10) / 10 };
}

interface RssEntry {
  'im:rating'?: { label: string };
  title: { label: string };
  content: { label: string };
  author: { name: { label: string } };
}

/** Written reviews (4★ and up) from storefronts that have ratings. */
export async function getReviews(): Promise<Review[]> {
  const rows = await getRatingsByCountry();
  // A written review always comes with a rating, so only storefronts with ratings need checking.
  const pairs = new Map<string, Set<string>>();
  for (const a of APPS) pairs.set(a.slug, new Set());
  for (const r of rows) pairs.get(r.slug)?.add(r.country);

  const out: Review[] = [];
  await Promise.all(
    APPS.flatMap((a) =>
      [...(pairs.get(a.slug) ?? [])].map(async (c) => {
        const d = await getJSON<{ feed?: { entry?: RssEntry | RssEntry[] } }>(
          `https://itunes.apple.com/${c}/rss/customerreviews/id=${a.id}/sortBy=mostRecent/json`,
        );
        const entries = d?.feed?.entry;
        for (const e of Array.isArray(entries) ? entries : entries ? [entries] : []) {
          const rating = Number(e['im:rating']?.label);
          if (!rating || rating < 4 || e.content.label.length < 20) continue;
          out.push({ slug: a.slug, project: a.title, rating, title: e.title.label, body: e.content.label, author: e.author.name.label, country: c.toUpperCase() });
        }
      }),
    ),
  );
  return out;
}

/** First line of App Store release notes, cleaned up for the lab log. */
function summarise(notes: string) {
  const line = notes
    .split('\n')
    .map((l) => l.replace(/^[•\-*\s]+/, '').trim())
    .find((l) => l.length > 12);
  if (!line) return 'New version on the App Store.';
  return line.length > 150 ? `${line.slice(0, 147).trimEnd()}…` : line;
}

/**
 * The lab log: the hand-written entries in lib/data.ts, plus any App Store
 * release newer than what's listed there, picked up automatically.
 */
export async function getLabLog(): Promise<LogEntry[]> {
  const apps = await getApps();
  const extra: LogEntry[] = [];
  for (const a of apps) {
    const p = PROJECTS.find((x) => x.slug === a.slug)!;
    const known = LAB_LOG.some((e) => e.slug === a.slug && (e.title === `v${a.version}` || e.date >= a.released));
    if (!known) {
      extra.push({ date: a.released, project: p.title.split(':')[0], slug: a.slug, title: `v${a.version}`, note: summarise(a.notes) });
    }
  }
  return [...extra, ...LAB_LOG].sort((x, y) => y.date.localeCompare(x.date));
}
