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
  {
    id: 1,
    title: 'Lovly',
    category: 'iOS · Lifestyle',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/lovly.png',
    description:
      'A couple app where partners draw together on one shared canvas that appears live on each other’s Lock Screen — plus moods, mini-messages, and shared moments.',
    tech: ['SwiftUI', 'WidgetKit', 'Live Activities', 'Firebase', 'RevenueCat'],
  },
  {
    id: 2,
    title: 'Memopix',
    category: 'iOS · Photo & Video',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/memopix.png',
    description:
      'Turns your photos into shaped photo-collage keepsakes — a heart made of 40 photos — ready to export or print as a gift.',
    tech: ['Swift 6', 'SwiftUI', 'Vision', 'PDFKit', 'StoreKit 2'],
  },
  {
    id: 3,
    title: 'Spiritual Growth: Muslim Ref',
    category: 'iOS · Lifestyle',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/muslimref.png',
    description:
      'A private, offline-first Islamic companion: daily verses and reflections, accurate prayer times, Qibla compass, digital Tasbih, Hijri calendar, and widgets.',
    tech: ['SwiftUI', 'WidgetKit', 'CoreLocation', 'RevenueCat'],
  },
  {
    id: 4,
    title: 'Lipstick Finder',
    category: 'iOS · AI',
    year: '2025',
    status: 'Shipped',
    art: 'lipstick',
    description:
      'Snap a selfie and get AI-personalized lipstick shades with an AR-style virtual try-on — fully on-device face, skin, and lip analysis.',
    tech: ['SwiftUI', 'CoreML', 'Vision', 'AVFoundation', 'StoreKit'],
  },
  {
    id: 5,
    title: 'Aer',
    category: 'iOS · Health · IoT',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/aer.png',
    description:
      'Real-time air-quality monitoring with 7-day AQI forecasts across 35 cities — personalized health guidance, maps, alerts, and home-screen widgets, backed by a FastAPI + ML forecasting pipeline.',
    tech: ['SwiftUI', 'WidgetKit', 'FastAPI', 'PostgreSQL', 'scikit-learn'],
  },
  {
    id: 6,
    title: 'PetPortraits',
    category: 'iOS · AI',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/petportraits.png',
    description:
      'One photo of any pet becomes a gallery-grade AI portrait in ~20 seconds — Renaissance oils, film noir, watercolor and more — with on-device styling, StoreKit 2 subscriptions, and print upsells.',
    tech: ['SwiftUI', 'StoreKit 2', 'Gemini Image', 'Vercel Functions'],
  },
  {
    id: 7,
    title: 'skeniraj.mk',
    category: 'SaaS · Hospitality',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/skeniraj.png',
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
