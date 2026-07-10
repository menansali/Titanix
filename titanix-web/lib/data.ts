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
    description:
      'Snap a selfie and get AI-personalized lipstick shades with an AR-style virtual try-on — fully on-device face, skin, and lip analysis.',
    tech: ['SwiftUI', 'CoreML', 'Vision', 'AVFoundation', 'StoreKit'],
  },
  {
    id: 5,
    title: 'AirPollution NMK',
    category: 'iOS · Health · IoT',
    year: '2025',
    status: 'Shipped',
    icon: '/apps/airpollution.png',
    description:
      'Real-time air-quality monitoring with 7-day AQI forecasts for 35 cities, personalized health guidance, maps, alerts, and home-screen widgets.',
    tech: ['SwiftUI', 'WidgetKit', 'FastAPI', 'PostgreSQL', 'ML Forecasting'],
  },

  // ── In development ─────────────────────────────────────────
  {
    id: 6,
    title: 'SheetGenius AI',
    category: 'iOS · AI',
    year: '2025',
    status: 'In Development',
    description:
      'An AI spreadsheet assistant that turns natural language into Excel formulas, converts PDFs to Excel, and cleans, debugs and analyzes data via chat.',
    tech: ['SwiftUI', 'Firebase', 'Cloud Functions', 'RevenueCat'],
  },
  {
    id: 7,
    title: 'ExploreNMK',
    category: 'iOS · Travel',
    year: '2026',
    status: 'In Development',
    description:
      'A travel guide to North Macedonia — 52+ locations with maps, curated multi-day itineraries, events, and full four-language support.',
    tech: ['SwiftUI', 'SwiftData', 'MapKit', 'CoreLocation'],
  },
  {
    id: 8,
    title: 'Visitly',
    category: 'iOS · Travel',
    year: '2025',
    status: 'In Development',
    description:
      'Mark the countries you’ve visited on an interactive world map, log places within each, and share a visual stats card of your journey.',
    tech: ['SwiftUI', 'MapKit', 'CoreLocation', 'Combine'],
  },
  {
    id: 9,
    title: 'GymBuddy',
    category: 'iOS · Health & Fitness',
    year: '2025',
    status: 'In Development',
    description:
      'An accountability app for gym beginners — matches you with a workout partner, guides sessions, and tracks streaks so you actually show up.',
    tech: ['SwiftUI', 'Combine', 'CoreLocation', 'Firebase'],
  },
  {
    id: 10,
    title: 'FlipFrenzy',
    category: 'iOS · Games',
    year: '2026',
    status: 'In Development',
    description:
      'A physics-based arcade game — flick escalating objects onto targets for points, with daily challenges, slow-mo replays, and Game Center leaderboards.',
    tech: ['SpriteKit', 'GameplayKit', 'CoreHaptics', 'GameKit', 'StoreKit 2'],
  },
  {
    id: 11,
    title: 'Response',
    category: 'iOS · Games',
    year: '2026',
    status: 'In Development',
    description:
      'An offline narrative game where the story adapts to how you behave under pressure via a player-modeling engine, with optional Apple Watch integration.',
    tech: ['SwiftUI', 'SpriteKit', 'WatchConnectivity'],
  },
  {
    id: 12,
    title: 'iWallpaper',
    category: 'macOS · Utilities',
    year: '2025',
    status: 'In Development',
    description:
      'A native macOS app for browsing and applying high-quality live video wallpapers, with per-monitor assignment and performance-aware playback.',
    tech: ['SwiftUI', 'AppKit', 'Metal', 'AVFoundation', 'Supabase'],
  },

  // ── IoT / hardware ─────────────────────────────────────────
  {
    id: 13,
    title: 'Env Monitor Pro',
    category: 'IoT · Analytics',
    year: '2024',
    status: 'Shipped',
    description:
      'Automated indoor/outdoor air-quality monitoring — PM1, PM2.5, PM10 and humidity — visualized in live Grafana dashboards.',
    tech: ['Raspberry Pi', 'Python', 'OPC-N3', 'Grafana', 'Bash'],
  },
  {
    id: 14,
    title: 'Edge LoRa Network',
    category: 'Hardware · Embedded',
    year: '2024',
    status: 'Shipped',
    description:
      'Long-range, low-power sensor mesh on T-Beam and Nano 33 BLE with custom sleep cycles and efficient protocols.',
    tech: ['C++', 'Arduino', 'LilyGO T-Beam', 'LoRa', 'Nano 33 BLE'],
  },
];

export const STATS: Stat[] = [
  { value: '2021', label: 'Building since' },
  { value: '3', label: 'Core disciplines' },
  { value: '14', label: 'Products built' },
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
