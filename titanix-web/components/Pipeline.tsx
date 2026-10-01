'use client';

import { useEffect, useRef, useState } from 'react';
import { Cloud, Cpu, Gauge, RadioTower, Rocket, Smartphone, type LucideIcon } from 'lucide-react';
import { useScrollProgress } from '@/lib/useScrollProgress';

interface Stage {
  title: string;
  tag: string;
  text: string;
  icon: LucideIcon;
  /** Illustrative readout of one reading at this stage. */
  readout: string[];
}

const STAGES: Stage[] = [
  {
    title: 'Sensor',
    tag: 'Hardware that reads the world',
    text: 'It starts with a physical reading — particulates, humidity, motion — from hardware we choose, wire and calibrate.',
    icon: Gauge,
    readout: ['pm2_5    20.6 µg/m³', 'pm10     22.3 µg/m³', 'humidity 48 %'],
  },
  {
    title: 'Firmware',
    tag: 'C++ on bare metal',
    text: 'Firmware samples, filters and packs the reading into a few bytes, then sleeps — so a battery lasts months, not days.',
    icon: Cpu,
    readout: ['frame  0x14 0xCE 0x00 0xDF 0x30', 'crc    ok', 'sleep  58 s · wake 2 s'],
  },
  {
    title: 'Edge',
    tag: 'LoRa mesh, gateways, telemetry',
    text: 'The packet hops over long-range radio to a gateway — kilometres of reach with no Wi-Fi and no SIM.',
    icon: RadioTower,
    readout: ['lora   SF9 · 868 MHz', 'rssi   −97 dBm · snr 7.5', 'gw     forwarded → cloud'],
  },
  {
    title: 'Cloud',
    tag: 'FastAPI, PostgreSQL, pipelines',
    text: 'An API validates and stores it, pipelines turn raw numbers into something meaningful — like an air-quality index.',
    icon: Cloud,
    readout: ['POST /readings → 201', '{ "pm25": 20.6, "aqi": 43 }', 'band   moderate'],
  },
  {
    title: 'App',
    tag: 'SwiftUI, widgets, Live Activities',
    text: 'The result lands where people actually look: a native app, a Lock Screen widget, a Live Activity when it matters.',
    icon: Smartphone,
    readout: ['widget        AQI 43 · Moderate', 'live activity updated', 'push          only on spikes'],
  },
  {
    title: 'Ship',
    tag: 'App Store review, live',
    text: 'Then the last mile most teams underestimate: store listing, review, analytics, payments — and live for real users.',
    icon: Rocket,
    readout: ['review   approved', 'status   Ready for Distribution', 'release  live ✓'],
  },
];

const N = STAGES.length;

// Wave through the six nodes in a 1200×200 viewBox.
const NODES = STAGES.map((_, i) => ({ x: 100 + i * 200, y: i % 2 ? 140 : 60 }));
const PATH = NODES.reduce(
  (d, n, i) => (i === 0 ? `M${n.x},${n.y}` : `${d} C${NODES[i - 1].x + 100},${NODES[i - 1].y} ${n.x - 100},${n.y} ${n.x},${n.y}`),
  '',
);

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

export default function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const litRef = useRef<SVGPathElement>(null);
  const packetRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const len = useRef(0);

  useEffect(() => {
    len.current = pathRef.current?.getTotalLength() ?? 0;
  }, []);

  useScrollProgress(sectionRef, (p) => {
    // Short dwell at both ends so the first and last stage get read.
    const f = clamp(p * 1.15 - 0.075);
    if (litRef.current) litRef.current.style.strokeDashoffset = String(1 - f);
    if (pathRef.current && packetRef.current && len.current) {
      const pt = pathRef.current.getPointAtLength(f * len.current);
      packetRef.current.style.left = `${(pt.x / 1200) * 100}%`;
      packetRef.current.style.top = `${(pt.y / 200) * 100}%`;
    }
    const next = Math.min(N - 1, Math.floor(f * (N - 1) + 0.5));
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  });

  return (
    <section ref={sectionRef} id="pipeline" aria-labelledby="pipeline-title" className="relative" style={{ height: `${N * 70}svh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="section w-full !py-0">
          <div className="text-center">
            <span className="eyebrow">End to end</span>
            <h2 id="pipeline-title" className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              From bare metal to the <span className="text-gradient">App Store</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-titanix-muted">
              Follow one reading through every layer of the stack — we build every one of them.
            </p>
          </div>

          {/* Track */}
          <div className="relative mx-auto mt-10 w-full max-w-5xl" style={{ aspectRatio: '1200 / 200' }} aria-hidden="true">
            <svg viewBox="0 0 1200 200" className="absolute inset-0 h-full w-full overflow-visible">
              <path ref={pathRef} d={PATH} fill="none" stroke="rgba(239,226,0,0.16)" strokeWidth="2" strokeDasharray="6 8" />
              <path
                ref={litRef}
                d={PATH}
                fill="none"
                stroke="#F6EB2E"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="1"
                style={{ filter: 'drop-shadow(0 0 6px rgba(246,235,46,0.7))' }}
              />
            </svg>

            {NODES.map((n, i) => {
              const Icon = STAGES[i].icon;
              const on = i <= active;
              return (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${(n.x / 1200) * 100}%`, top: `${(n.y / 200) * 100}%` }}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-500 sm:h-14 sm:w-14 sm:rounded-2xl ${
                      on
                        ? 'border-transparent bg-brand-gradient text-black shadow-glow'
                        : 'border-titanix-border bg-titanix-void text-titanix-faint'
                    } ${i === active ? 'scale-110' : ''}`}
                  >
                    <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <p
                    className={`absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-xs font-medium transition-colors sm:block ${
                      n.y < 100 ? 'bottom-full mb-2' : 'top-full mt-2'
                    } ${on ? 'text-titanix-text' : 'text-titanix-faint'}`}
                  >
                    {STAGES[i].title}
                  </p>
                </div>
              );
            })}

            {/* Packet */}
            <div ref={packetRef} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: '8.33%', top: '30%' }}>
              <span className="absolute -inset-2 animate-ping rounded-full bg-titanix-glow/40 motion-reduce:animate-none" />
              <span className="relative block h-3 w-3 rounded-full bg-white shadow-[0_0_18px_6px_rgba(246,235,46,0.8)]" />
            </div>
          </div>

          {/* Stage detail */}
          <div className="relative mx-auto mt-8 min-h-[19rem] max-w-3xl sm:mt-12 sm:min-h-[12rem]">
            {STAGES.map((s, i) => (
              <div
                key={s.title}
                aria-hidden={i !== active}
                className={`absolute inset-x-0 top-0 grid gap-5 rounded-3xl glass p-5 transition-all duration-500 sm:grid-cols-[1.2fr_1fr] sm:p-7 ${
                  i === active ? 'translate-y-0 opacity-100' : i < active ? '-translate-y-4 opacity-0' : 'translate-y-4 opacity-0'
                }`}
              >
                <div>
                  <p className="font-mono text-xs text-titanix-faint">
                    0{i + 1} / 0{N} · <span className="text-titanix-glow">{s.tag}</span>
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-titanix-muted">{s.text}</p>
                </div>
                <div className="rounded-2xl border border-titanix-border bg-black/40 p-4 font-mono text-[11px] leading-relaxed text-titanix-glow sm:text-xs">
                  {s.readout.map((line) => (
                    <p key={line} className="whitespace-pre">
                      <span className="text-titanix-faint">› </span>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-titanix-faint sm:mt-4">Illustrative readout of a single sensor reading.</p>
        </div>
      </div>
    </section>
  );
}
