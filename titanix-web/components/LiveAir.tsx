import { Link } from 'next-view-transitions';
import { ArrowUpRight } from 'lucide-react';

// Same Copernicus (CAMS) model Aer uses, via Open-Meteo. Server-rendered and
// revalidated every 15 minutes; renders nothing if the feed is unavailable.
const CITIES = [
  { name: 'Skopje', lat: 41.9981, lon: 21.4254 },
  { name: 'Bitola', lat: 41.0314, lon: 21.3347 },
  { name: 'Tetovo', lat: 42.0069, lon: 20.9715 },
  { name: 'Kumanovo', lat: 42.1322, lon: 21.7144 },
];

// European AQI bands (EEA).
const BANDS = [
  { max: 20, label: 'Good', color: '#50F0E6' },
  { max: 40, label: 'Fair', color: '#50CCAA' },
  { max: 60, label: 'Moderate', color: '#F0E641' },
  { max: 80, label: 'Poor', color: '#FF5050' },
  { max: 100, label: 'Very poor', color: '#960032' },
  { max: Infinity, label: 'Extremely poor', color: '#7D2181' },
];

const band = (aqi: number) => BANDS.find((b) => aqi <= b.max)!;

interface Reading {
  name: string;
  aqi: number;
  pm25: number;
  /** Next 24 hourly AQI values from the current hour. */
  next: number[];
}

async function getReadings(): Promise<Reading[] | null> {
  const qs = new URLSearchParams({
    latitude: CITIES.map((c) => c.lat).join(','),
    longitude: CITIES.map((c) => c.lon).join(','),
    current: 'european_aqi,pm2_5',
    hourly: 'european_aqi',
    forecast_days: '2',
    timezone: 'Europe/Skopje',
  });
  try {
    const res = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${qs}`, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const list = Array.isArray(data) ? data : [data];
    return list.map((d, i) => {
      const start = Math.max(0, d.hourly.time.indexOf(d.current.time));
      return {
        name: CITIES[i].name,
        aqi: Math.round(d.current.european_aqi),
        pm25: d.current.pm2_5,
        next: (d.hourly.european_aqi as (number | null)[])
          .slice(start, start + 24)
          .filter((v): v is number => v !== null),
      };
    });
  } catch {
    return null;
  }
}

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null;
  const w = 240;
  const h = 56;
  const max = Math.max(...values, 40);
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - (v / max) * (h - 6) - 3]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-14 w-full" aria-hidden="true">
      <defs>
        <linearGradient id="aqi-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#EFE200" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#EFE200" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#aqi-fill)" />
      <path d={line} fill="none" stroke="#F6EB2E" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default async function LiveAir() {
  const readings = await getReadings();
  if (!readings?.length) return null;
  const [main, ...rest] = readings;
  const mainBand = band(main.aqi);
  const peak = Math.max(...main.next);

  return (
    <section aria-labelledby="live-air" className="section !py-12 sm:!py-16">
        <div className="relative border border-titanix-border p-6 sm:p-8">
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="label flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-titanix-yellow opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-titanix-yellow" />
                </span>
                Live from our stack
              </p>
              <h2 id="live-air" className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Air in {main.name} right now:{' '}
                <span style={{ color: mainBand.color }}>{mainBand.label}</span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-titanix-muted">
                The same Copernicus (CAMS) model behind <strong className="text-titanix-text">Aer</strong>,
                our air-quality app for North Macedonia — refreshed every 15 minutes. Modelled
                estimates, not a sensor reading.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {rest.map((r) => {
                  const b = band(r.aqi);
                  return (
                    <span
                      key={r.name}
                      className="inline-flex items-center gap-2 rounded-md border border-titanix-border px-3 py-1.5 text-xs text-titanix-muted"
                    >
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: b.color }} />
                      {r.name} <span className="font-mono text-titanix-text">{r.aqi}</span>
                    </span>
                  );
                })}
              </div>
              <Link
                href="/work/aer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-titanix-yellow hover:underline"
              >
                How we built Aer <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="border border-titanix-border p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-titanix-faint">European AQI · {main.name}</p>
                  <p className="mt-1 font-display text-5xl font-bold" style={{ color: mainBand.color }}>
                    {main.aqi}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-titanix-faint">PM2.5</p>
                  <p className="mt-1 font-mono text-lg text-titanix-text">
                    {main.pm25.toFixed(1)} <span className="text-xs text-titanix-faint">µg/m³</span>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Sparkline values={main.next} />
                <p className="mt-1 flex justify-between text-[11px] text-titanix-faint">
                  <span>Now</span>
                  <span>Next 24h · peak {peak}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
