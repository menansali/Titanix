import { Cpu, Smartphone, Cloud, LucideIcon } from 'lucide-react';

export interface Pillar {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  points: string[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  status: 'Shipped' | 'In Development';
  description: string;
  tech: string[];
  /** Local app-icon path under /public/apps. Falls back to a monogram tile. */
  icon?: string;
  /** App Store / product URL — makes the portfolio card clickable. */
  url?: string;
  /** Themed generated app-icon (inline SVG) for apps without an exported icon. */
  art?: 'lipstick' | 'visitly' | 'gymbuddy';
}

export interface Stat {
  value: string;
  label: string;
}

// Three pillars — the rebrand focus
export const PILLARS: Pillar[] = [
  {
    id: 'ios',
    title: 'iOS Apps',
    tagline: 'Native. Fast. Beautiful.',
    description:
      'Native iOS applications built in Swift & SwiftUI — crafted for performance, polish, and the App Store.',
    icon: Smartphone,
    points: ['Swift & SwiftUI', 'On-device & Cloud AI', 'App Store launch', 'Delightful UX'],
  },
  {
    id: 'saas',
    title: 'SaaS Platforms',
    tagline: 'Products that scale.',
    description:
      'End-to-end SaaS products — from auth and billing to dashboards and APIs — engineered to grow with you.',
    icon: Cloud,
    points: ['Web platforms & APIs', 'Auth, billing & multi-tenant', 'Real-time dashboards', 'Cloud-native scale'],
  },
  {
    id: 'iot',
    title: 'IoT Systems',
    tagline: 'Bare metal to cloud.',
    description:
      'End-to-end hardware + software: smart devices, edge networks, and the pipelines that make sensor data useful.',
    icon: Cpu,
    points: ['Embedded firmware', 'LoRa / edge networks', 'Sensor data pipelines', 'Live telemetry'],
  },
];

export const PROJECTS: Project[] = [
  // ── Shipped ────────────────────────────────────────────────
  // Names, categories and copy mirror the live App Store listings.
  {
    id: 1,
    title: 'Lovly',
    category: 'iOS · Lifestyle · Social',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/lovly.png',
    url: 'https://apps.apple.com/app/id6760272304',
    description:
      'A couples app that lives on the Lock Screen: one shared canvas both partners draw on, plus moods, mini love notes, a days-together counter and shared memories — no feed, no streaks, no ads.',
    tech: ['SwiftUI', 'WidgetKit', 'Live Activities', 'Firebase', 'RevenueCat'],
  },
  {
    id: 2,
    title: 'Memopix',
    category: 'iOS · Photo & Video',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/memopix.png',
    url: 'https://apps.apple.com/app/id6789686385',
    description:
      'Turns 20–60 photos into one shaped keepsake — a heart of wedding photos, a name or a year built from family moments — across 28 templates, with print-ready PNG, JPEG and PDF export.',
    tech: ['Swift 6', 'SwiftUI', 'Vision', 'PDFKit', 'StoreKit 2'],
  },
  {
    id: 3,
    title: 'Qaza Qada: Missed Salah',
    category: 'iOS · Lifestyle',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/qazaqada.png',
    url: 'https://apps.apple.com/app/id6757791803',
    description:
      'Estimates how many prayers you owe — correctly subtracting the days most qada calculators get wrong — then builds a make-up plan at your own pace, with the remaining count on your Lock Screen, daily verses, and offline prayer times, Qibla and Tasbih.',
    tech: ['SwiftUI', 'WidgetKit', 'CoreLocation', 'RevenueCat'],
  },
  {
    id: 4,
    title: 'Aer',
    category: 'iOS · Weather · Health',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/aer.png',
    url: 'https://apps.apple.com/app/id6790945433',
    description:
      'Live air quality for 35 cities across North Macedonia with a 7-day AQI forecast from the Copernicus (CAMS) model — plain-language health guidance, maps, alerts, widgets, and a Live Activity for pollution spikes.',
    tech: ['SwiftUI', 'WidgetKit', 'FastAPI', 'PostgreSQL', 'scikit-learn'],
  },
  {
    id: 5,
    title: 'Pet Portraits',
    category: 'iOS · AI',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/petportraits.png',
    url: 'https://apps.apple.com/app/id6793742748',
    description:
      'One photo of a dog or cat becomes a gallery-grade AI portrait in seconds — 15+ styles from Renaissance oils to vintage noir — then animates into a shareable Living Portrait or a moving wallpaper.',
    tech: ['SwiftUI', 'StoreKit 2', 'Gemini Image', 'Vercel Functions'],
  },
  {
    id: 6,
    title: 'skeniraj.mk',
    category: 'SaaS · Hospitality',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/skeniraj.png',
    url: 'https://skeniraj.mk',
    description:
      'A QR-menu platform for restaurants, bars, cafés, hotels, and food trucks — build a menu once, share it via a scannable code, and manage it all from a multi-tenant dashboard with billing.',
    tech: ['Next.js', 'tRPC', 'Drizzle', 'PostgreSQL', 'Stripe'],
  },
];

export const STATS: Stat[] = [
  { value: '2021', label: 'Building since' },
  { value: '3', label: 'Core disciplines' },
  { value: '10+', label: 'Products built' },
  { value: '∞', label: 'Ideas in the lab' },
];

export const TECH_MARQUEE: string[] = [
  'Swift', 'SwiftUI', 'SwiftData', 'CoreML', 'Vision', 'WidgetKit',
  'Live Activities', 'StoreKit', 'RevenueCat', 'Firebase', 'MapKit', 'SpriteKit',
  'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Python',
  'C++', 'LoRa', 'Raspberry Pi', 'Grafana',
];

export const CONTACT = {
  email: 'contact@titanix.dev',
  whatsapp: '+372 5395 1655',
  whatsappUrl: 'https://wa.me/37253951655',
  instagram: '@titanixdev',
  instagramUrl: 'https://instagram.com/titanixdev',
};
