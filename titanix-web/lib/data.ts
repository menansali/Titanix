export interface Pillar {
  id: string;
  title: string;
  description: string;
  stack: string[];
  /** Case-study slugs (or lab project titles) that show this discipline. */
  examples: string[];
}

export interface CaseStudy {
  /** One-line hook shown under the title on the case-study page. */
  tagline: string;
  /** The problem the product solves, in the user's terms. */
  problem: string;
  /** What we built — concrete features and engineering decisions. */
  built: string[];
  /** Short facts shown as a strip (platform, languages, model…). */
  facts: Stat[];
}

export interface Project {
  id: number;
  /** URL segment for /work/[slug]. Only projects with a case study get a page. */
  slug: string;
  title: string;
  category: string;
  year?: string;
  status: 'Shipped' | 'In Development' | 'Lab';
  description: string;
  tech: string[];
  /** Local app-icon path under /public/apps. Falls back to a monogram tile. */
  icon?: string;
  /** App Store / product URL. */
  url?: string;
  /** Cover image under /public/work (4:5, from the Instagram kit). */
  cover?: string;
  /** App Store screenshots (mzstatic CDN). */
  screenshots?: string[];
  caseStudy?: CaseStudy;
}

export interface Stat {
  value: string;
  label: string;
}

// The three disciplines.
export const PILLARS: Pillar[] = [
  {
    id: 'ios',
    title: 'iOS apps',
    description:
      'Native apps in Swift and SwiftUI, including widgets, Live Activities and subscriptions, taken all the way through App Store review.',
    stack: ['Swift', 'SwiftUI', 'WidgetKit', 'StoreKit 2', 'RevenueCat'],
    examples: ['lovly', 'memopix', 'qaza-qada', 'aer', 'pet-portraits'],
  },
  {
    id: 'saas',
    title: 'SaaS platforms',
    description:
      'Web products with accounts, billing, multi-tenant dashboards and APIs, deployed and running in production.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'tRPC', 'Stripe'],
    examples: ['skeniraj'],
  },
  {
    id: 'iot',
    title: 'IoT systems',
    description:
      'Sensors, firmware, long-range radio networks and the pipelines that turn raw readings into something people can use.',
    stack: ['C++', 'Arduino', 'Raspberry Pi', 'LoRa', 'Grafana'],
    examples: ['env-monitor', 'edge-lora'],
  },
];

const shot = (path: string) => `https://is1-ssl.mzstatic.com/image/thumb/${path}/645x1398bb.jpg`;

export const PROJECTS: Project[] = [
  // ── Shipped ────────────────────────────────────────────────
  // Names, categories and copy mirror the live App Store listings.
  {
    id: 1,
    slug: 'lovly',
    title: 'Lovly',
    category: 'iOS · Lifestyle · Social',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/lovly.png',
    cover: '/work/lovly.jpg',
    url: 'https://apps.apple.com/app/id6760272304',
    description:
      'A couples app that lives on the Lock Screen: one shared canvas both partners draw on, plus moods, mini love notes, a days-together counter and shared memories — no feed, no streaks, no ads.',
    tech: ['SwiftUI', 'WidgetKit', 'Live Activities', 'Firebase', 'RevenueCat'],
    screenshots: [
      shot('PurpleSource211/v4/f1/61/a0/f161a0dd-014c-1b81-6b16-a2715bfae34b/1_lock.png'),
      shot('PurpleSource221/v4/21/67/d1/2167d1ad-1fba-0174-dd96-c2ec7ac50e32/2_home.png'),
      shot('PurpleSource221/v4/c5/9b/66/c59b6618-2be0-0d28-149c-62f145d2a91a/3_canvas.png'),
      shot('PurpleSource211/v4/18/4d/ca/184dca80-9371-a18b-0b73-5e890e8591d2/4_keep.png'),
      shot('PurpleSource221/v4/56/dc/b6/56dcb623-da1d-c770-92c8-301e8454099e/5_us.png'),
    ],
    caseStudy: {
      tagline: 'Draw here. It lands on their Lock Screen.',
      problem:
        'Couple apps tend to become one more feed — streaks to protect, guilt notifications at night, upsells that hold your history hostage. Lovly set out to be the opposite: small daily signals that say "I\'m thinking of you", one glance away on the Lock Screen.',
      built: [
        'One shared canvas both partners draw on, synced to Home and Lock Screen widgets so a drawing shows up on the other phone without opening the app.',
        'Every stroke saved as you go — close the app mid-drawing and nothing is lost.',
        'One-tap moods with a moment when both moods match, plus "thinking of you" pings.',
        'Mini love notes, a days-together counter, date countdowns, shared memories and a bucket list.',
        'No ads, no streaks, no reset — missing a week breaks nothing.',
        'Lovly+ subscription via RevenueCat for unlimited canvas history, secret canvas zones, a shared calendar and themes.',
      ],
      facts: [
        { value: 'iOS 17+', label: 'Platform' },
        { value: '12', label: 'Languages' },
        { value: 'Widgets', label: 'Home & Lock Screen' },
        { value: 'Freemium', label: 'Model' },
      ],
    },
  },
  {
    id: 2,
    slug: 'memopix',
    title: 'Memopix',
    category: 'iOS · Photo & Video',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/memopix.png',
    cover: '/work/memopix.jpg',
    url: 'https://apps.apple.com/app/id6789686385',
    description:
      'Turns 20–60 photos into one shaped keepsake — a heart of wedding photos, a name or a year built from family moments — across 34 templates, with print-ready PNG, JPEG and PDF export.',
    tech: ['Swift 6', 'SwiftUI', 'Vision', 'PDFKit', 'StoreKit 2'],
    screenshots: [
      shot('PurpleSource221/v4/73/0b/b5/730bb513-91ab-da7e-4809-fc539b1ff6f1/1-keepsake.png'),
      shot('PurpleSource221/v4/36/4b/ef/364bef77-77f7-9a13-3b85-7a192c2bb93e/2-reveal.png'),
      shot('PurpleSource211/v4/24/31/ee/2431eed2-3527-46fe-d2f6-afc0cbdf27b8/3-graduation.png'),
      shot('PurpleSource221/v4/74/61/58/7461582e-930b-0af1-9a2b-ceb50d533782/4-occasions.png'),
      shot('PurpleSource211/v4/f5/cd/8a/f5cd8a9c-9234-07d7-49cc-539224c241b6/5-yours.png'),
      shot('PurpleSource221/v4/40/45/39/40453904-1870-2e11-ab4a-fc1392af0cfe/6-print.png'),
    ],
    caseStudy: {
      tagline: 'Your favourite photos, shaped into something you can keep.',
      problem:
        'Shape collages — a heart of wedding photos, an "18" made of eighteen years of birthdays — are a popular gift, but making one by hand means hours of cropping and arranging. Memopix does it in minutes, entirely on the phone.',
      built: [
        '34 designer templates (hearts, stars, paw prints, crowns…) plus any word, name, number or year rendered out of photos.',
        'Smart curation with Apple Vision: scores every photo, drops duplicates and screenshots, and keeps faces framed inside each tile.',
        'A real editor — tap any tile to swap a photo, shuffle the layout, add text, switch between styles like Gold, Film and Polaroid.',
        'Print-ready PNG, JPEG and PDF export via PDFKit, with 4K watermark-free output in Pro.',
        'Fully on-device: photos never leave the iPhone.',
        'One-time Pro purchase with StoreKit 2 — no subscription.',
      ],
      facts: [
        { value: 'iOS 18+', label: 'Platform' },
        { value: '8', label: 'Languages' },
        { value: '34', label: 'Templates' },
        { value: 'On-device', label: 'Processing' },
      ],
    },
  },
  {
    id: 3,
    slug: 'qaza-qada',
    title: 'Qaza Qada: Missed Salah',
    category: 'iOS · Lifestyle',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/qazaqada.png',
    cover: '/work/qazaqada.jpg',
    url: 'https://apps.apple.com/app/id6757791803',
    description:
      'Estimates how many prayers you owe — correctly subtracting the days most qada calculators get wrong — then builds a make-up plan at your own pace, with the remaining count on your Lock Screen, daily verses, and offline prayer times, Qibla and Tasbih.',
    tech: ['SwiftUI', 'WidgetKit', 'CoreLocation', 'RevenueCat'],
    screenshots: [
      shot('PurpleSource221/v4/9f/62/a8/9f62a882-0f3d-1bf7-ae0d-2c55a1cfe2cf/01_qada_reveal.png'),
      shot('PurpleSource221/v4/1c/8e/5b/1c8e5b52-e6b4-b1da-f5a0-6fbf53e162fc/02_daily.png'),
      shot('PurpleSource221/v4/54/19/8d/54198d3d-c92a-099b-2cb2-36baafbdb50b/03_plan.png'),
      shot('PurpleSource221/v4/9a/e3/d6/9ae3d6fa-7a45-59da-10ce-90f5d0479f5c/04_fair.png'),
      shot('PurpleSource221/v4/a8/4b/be/a84bbeb7-0c2f-a099-c35c-5bb56ffbd1dc/05_tasbih.png'),
      shot('PurpleSource221/v4/2d/68/89/2d688914-c242-fbd7-6973-2a508d6ea03d/06_themes.png'),
    ],
    caseStudy: {
      tagline: 'How many prayers do you actually owe?',
      problem:
        'Most qada calculators count every day since a person became obliged to pray — including the days women were not required to pray — so the number is wrong from the start. Qaza Qada gives an honest estimate and a plan you can actually finish, framed around returning rather than debt.',
      built: [
        'A missed-prayer estimate from two ages, with the menstruation exemption handled correctly.',
        'A make-up plan at a self-chosen pace, with progress that syncs across devices.',
        'The remaining count on the Lock Screen via WidgetKit, so the number that matters is the one you see first.',
        'Accurate prayer times computed fully offline from CoreLocation, with reminders synced to each prayer.',
        'Qibla compass, digital Tasbih, morning and evening adhkar, and daily verses matched to time of day.',
        'Works 100% offline — no account, no tracking. Premium themes and statistics via RevenueCat.',
      ],
      facts: [
        { value: 'iOS 17+', label: 'Platform' },
        { value: '3', label: 'Languages' },
        { value: 'Offline', label: 'No account' },
        { value: 'Freemium', label: 'Model' },
      ],
    },
  },
  {
    id: 4,
    slug: 'aer',
    title: 'Aer',
    category: 'iOS · Weather · Health',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/aer.png',
    cover: '/work/aer.jpg',
    url: 'https://apps.apple.com/app/id6790945433',
    description:
      'Live air quality for 35 cities across North Macedonia with a 7-day AQI forecast from the Copernicus (CAMS) model — plain-language health guidance, maps, alerts, widgets, and a Live Activity for pollution spikes.',
    tech: ['SwiftUI', 'WidgetKit', 'FastAPI', 'PostgreSQL', 'scikit-learn'],
    screenshots: [
      shot('PurpleSource221/v4/31/ab/2a/31ab2a2e-c371-0357-fd81-3a7b46152869/0_dashboard.png'),
      shot('PurpleSource221/v4/db/d4/c1/dbd4c12e-cf41-d800-27e2-7bf0c4f62376/1_forecast.png'),
      shot('PurpleSource221/v4/67/6c/3d/676c3d54-aff3-98cb-b3b7-2877a014738c/2_map.png'),
      shot('PurpleSource221/v4/04/df/08/04df0821-cb1a-be19-a96e-c0e6c7cf0010/3_city-detail.png'),
      shot('PurpleSource221/v4/c5/65/c4/c565c4bc-7d30-c12b-877d-af3a89ad5c9e/4_cities.png'),
      shot('PurpleSource221/v4/6a/d6/24/6ad624f1-5dd5-07e9-940b-ddd8f6bf4614/5_alerts.png'),
      shot('PurpleSource221/v4/a8/52/d7/a852d7ed-ea83-10c0-a92a-0a3ed5eb2a09/6_learn.png'),
    ],
    caseStudy: {
      tagline: 'The air in North Macedonia, easy to understand and act on.',
      problem:
        'Winter air pollution in North Macedonia is among the worst in Europe, but raw pollutant numbers don\'t tell a parent whether to do the school run on foot. Aer turns modelled air-quality data into a plain verdict and a forecast people can plan around.',
      built: [
        'Live European AQI and PM2.5, PM10, NO₂ and O₃ for 35 cities, nearest city picked from location.',
        'A 7-day AQI forecast from the Copernicus (CAMS) atmospheric model, served through a FastAPI + PostgreSQL backend.',
        'Health guidance tailored to a profile — general, respiratory-sensitive or active — with a "what to do now" layer.',
        'Colour-coded map, city comparison, saved cities and AQI alerts.',
        'Home and Lock Screen widgets plus a Live Activity for pollution spikes.',
        'Honest by design: modelled values are labelled as estimates, and the last readings stay available offline.',
      ],
      facts: [
        { value: 'iOS 26.5+', label: 'Platform' },
        { value: '35', label: 'Cities' },
        { value: 'EN · MK · SQ', label: 'Languages' },
        { value: 'Free', label: 'No ads, no tracking' },
      ],
    },
  },
  {
    id: 5,
    slug: 'pet-portraits',
    title: 'Pet Portraits',
    category: 'iOS · AI',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/petportraits.png',
    cover: '/work/petportraits.jpg',
    url: 'https://apps.apple.com/app/id6793742748',
    description:
      'One photo of a dog or cat becomes a gallery-grade AI portrait in seconds — 15+ styles from Renaissance oils to vintage noir — then animates into a shareable Living Portrait or a moving wallpaper.',
    tech: ['SwiftUI', 'StoreKit 2', 'Gemini Image', 'Vercel Functions'],
    screenshots: [
      shot('PurpleSource221/v4/1d/a5/e0/1da5e03c-d593-a8e7-251f-09e666c2068e/en-US_APP_IPHONE_67_1.jpg'),
      shot('PurpleSource211/v4/2b/41/c5/2b41c58c-ded7-c6fd-1112-555ec78ac071/iphone2.png'),
      shot('PurpleSource211/v4/85/b2/88/85b28849-2b38-eefd-5945-db5c28708e90/iphone3.png'),
      shot('PurpleSource211/v4/af/13/64/af13640c-9e27-383d-a8b4-524326a1af10/iphone4.png'),
      shot('PurpleSource211/v4/44/ac/d6/44acd64f-e2c3-6d98-049e-8128c47142d8/en-US_APP_IPHONE_67_5.jpg'),
    ],
    caseStudy: {
      tagline: 'Their face, exactly recognisable — in any style.',
      problem:
        'Generic AI image tools lose what makes a pet theirs: the markings, the ears, the expression. Pet Portraits is built around keeping the animal recognisable while restyling everything else.',
      built: [
        '15+ styles — Renaissance oils, Astronaut, Anime, Vintage Noir — with new styles added weekly.',
        'Living Portraits: any piece animates into a short shareable clip or a moving wallpaper.',
        'The Yearbook: one photo becomes a whole grid of styles.',
        'A gentle Memorial Collection for companions who have passed.',
        'Image generation runs server-side on Vercel Functions; uploaded photos are processed, never stored or used for training.',
        'First portrait free, no account; PRO subscription via StoreKit 2.',
      ],
      facts: [
        { value: 'iOS 17+', label: 'Platform' },
        { value: '15+', label: 'Styles' },
        { value: 'Server', label: 'Vercel Functions' },
        { value: 'Subscription', label: 'Model' },
      ],
    },
  },
  {
    id: 6,
    slug: 'skeniraj',
    title: 'skeniraj.mk',
    category: 'SaaS · Hospitality',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/skeniraj.png',
    cover: '/work/skeniraj.jpg',
    url: 'https://skeniraj.mk',
    description:
      'A QR-menu platform for restaurants, bars, cafés, hotels, and food trucks — build a menu once, share it via a scannable code, and manage it all from a multi-tenant dashboard with billing.',
    tech: ['Next.js', 'tRPC', 'Drizzle', 'PostgreSQL', 'Stripe'],
    caseStudy: {
      tagline: 'A QR menu in minutes — no app, no reprinting.',
      problem:
        'Printed menus go stale the moment a price changes, and most QR-menu tools are built for other markets. skeniraj.mk gives Macedonian venues a menu they build once and update anytime, which guests open straight from a scan.',
      built: [
        'A menu builder for restaurants, bars, cafés, hotels and food trucks.',
        'A scannable QR code per venue; guests browse on their phone with no app install.',
        'Multi-tenant dashboard so each venue manages its own menus.',
        'Subscription billing with Stripe.',
        'Type-safe stack end to end: Next.js, tRPC and Drizzle on PostgreSQL.',
      ],
      facts: [
        { value: 'Web', label: 'Platform' },
        { value: 'Multi-tenant', label: 'Architecture' },
        { value: 'Stripe', label: 'Billing' },
        { value: 'MK', label: 'Market' },
      ],
    },
  },

  // ── IoT lab ────────────────────────────────────────────────
  // Hardware work from the studio's early years — no public listing.
  {
    id: 7,
    slug: 'env-monitor',
    title: 'Env Monitor Pro',
    category: 'IoT · Air quality',
    status: 'Lab',
    description:
      'Automated indoor/outdoor environmental monitoring collecting PM1, PM2.5, PM10 and humidity from an OPC-N3 particle sensor on a Raspberry Pi, visualised in live Grafana dashboards.',
    tech: ['Raspberry Pi 4', 'Python', 'Bash', 'OPC-N3', 'Grafana'],
  },
  {
    id: 8,
    slug: 'edge-lora',
    title: 'Edge LoRa Network',
    category: 'IoT · Embedded',
    status: 'Lab',
    description:
      'A long-range sensor network on LilyGO T-Beam and Arduino Nano 33 BLE nodes, tuned for low power with custom sleep cycles and a lean radio protocol.',
    tech: ['C++', 'Arduino', 'LilyGO T-Beam', 'LoRa', 'Nano 33 BLE'],
  },
];

export const FOUNDER = {
  name: 'Menan Sali',
  role: 'Co-founder',
  photo: '/team/menan.jpg',
  linkedin: 'https://www.linkedin.com/in/menansali/',
  github: 'https://github.com/menansali',
};

export interface LogEntry {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  project: string;
  /** Case-study slug, when there is one. */
  slug?: string;
  url?: string;
  title: string;
  note: string;
}

// Real releases, newest first — dates and notes from the App Store / GitHub.
export const LAB_LOG: LogEntry[] = [
  { date: '2026-09-19', project: 'Lovly', slug: 'lovly', title: 'v1.0.7', note: 'Drawings now lift off the canvas and land on your partner\'s Lock Screen. Onboarding redrawn by hand.' },
  { date: '2026-09-18', project: 'Memopix', slug: 'memopix', title: 'v1.5', note: 'Six new templates, including Family Tree, In Loving Memory and Halloween. Invite links fixed.' },
  { date: '2026-09-01', project: 'Pet Portraits', slug: 'pet-portraits', title: 'v1.0.3', note: 'Now runs on iOS 17 and later, so it reaches many more iPhones.' },
  { date: '2026-08-14', project: 'Aer', slug: 'aer', title: 'Launch', note: 'Live air quality and a 7-day forecast for 35 cities across North Macedonia.' },
  { date: '2026-08-11', project: 'Qaza Qada', slug: 'qaza-qada', title: 'v1.5.0', note: 'Rebuilt around the missed-prayer estimate, with exempt days subtracted and a make-up plan.' },
  { date: '2026-08-06', project: 'Lovly', slug: 'lovly', title: 'Launch', note: 'A couples app that lives on the Lock Screen.' },
  { date: '2026-07-27', project: 'Pet Portraits', slug: 'pet-portraits', title: 'Launch', note: 'One photo of a pet becomes a portrait in 15+ styles.' },
  { date: '2026-07-20', project: 'Memopix', slug: 'memopix', title: 'Launch', note: 'Shape photo collages, printed as PNG, JPEG or PDF.' },
  { date: '2026-07-18', project: 'ios-ship-doctor', url: 'https://github.com/menansali/ios-ship-doctor', title: 'Open source', note: 'An MCP server that finds why an iOS app would fail App Store review, before you submit.' },
];

export const CONTACT = {
  email: 'contact@titanix.dev',
  whatsapp: '+372 5395 1655',
  whatsappUrl: 'https://wa.me/37253951655',
  instagram: '@titanixdev',
  instagramUrl: 'https://instagram.com/titanixdev',
  linkedinUrl: 'https://www.linkedin.com/in/menansali/',
  githubUrl: 'https://github.com/menansali',
};
