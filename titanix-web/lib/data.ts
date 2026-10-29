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
  /** Muted screen recording (MP4 under /public/work), played in the case-study phone. */
  video?: string;
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
    examples: ['lovly', 'memopix', 'tevekkul-vakti', 'aer', 'pet-portraits'],
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
      'A couples app that lives on the Lock Screen: draw on one shared canvas and it turns up on your partner\'s Lock Screen. Plus moods, mini love notes, a days-together counter and shared memories, with no feed, no streaks and no ads.',
    tech: ['SwiftUI', 'WidgetKit', 'Live Activities', 'Firebase', 'RevenueCat'],
    screenshots: [
      shot('PurpleSource221/v4/06/6d/08/066d080f-0235-d93d-e27d-b2924fdc8681/1_hero.png'),
      shot('PurpleSource221/v4/37/6b/2d/376b2d52-3f03-b097-b40b-30ae3cf00cac/2_canvas.png'),
      shot('PurpleSource211/v4/61/b4/7c/61b47cf7-77d1-ea7f-49c6-02717094a523/3_widgets.png'),
      shot('PurpleSource221/v4/6f/ab/c5/6fabc5cc-0c7c-c979-ec3a-99ad17d8f2de/4_doodle.png'),
      shot('PurpleSource221/v4/09/13/df/0913df14-b764-dd4c-1c9a-30ba804844a0/5_their_sky.png'),
      shot('PurpleSource211/v4/fa/28/f1/fa28f18e-6102-c677-90a0-bb086730712e/6_gift.png'),
      shot('PurpleSource221/v4/5e/c6/5d/5ec65d96-faf4-fedf-b8d5-1434f1815822/7_everything.png'),
    ],
    caseStudy: {
      tagline: 'Draw here. It lands on their Lock Screen.',
      problem:
        'Couple apps tend to become one more feed — streaks to protect, guilt notifications at night, upsells that hold your history hostage. Lovly set out to be the opposite: small daily signals that say "I\'m thinking of you", one glance away on the Lock Screen.',
      built: [
        'One shared canvas both partners draw on, synced to Home and Lock Screen widgets so a drawing shows up on the other phone without opening the app.',
        'Pairing by QR code when you\'re together, or an invite link that previews your first drawing. Getting started takes three screens.',
        'Every stroke saved as you go, and every drawing saved on its own, so closing the app mid-drawing loses nothing.',
        'On Sundays, a card gathers the week\'s drawings from both partners, ready to share.',
        'One-tap moods with a moment when both moods match, plus "thinking of you" pings.',
        'Mini love notes, a days-together counter, date countdowns, shared memories and a bucket list.',
        'No ads, no streaks, no reset — missing a week breaks nothing.',
        'Lovly+ via RevenueCat: the Lock Screen and Home Screen widgets (free for the first 3 days), the whole canvas history, secret messages hidden on the canvas, a shared calendar and themes. One subscription covers both partners.',
        'Larger text support and VoiceOver labels throughout.',
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
      shot('PurpleSource221/v4/aa/02/1a/aa021a59-2200-77fb-5708-d7c661abbfc4/1-keepsake.png'),
      shot('PurpleSource221/v4/d0/f6/49/d0f649b2-3ada-9bb6-3f6d-691317ffbe07/2-reveal.png'),
      shot('PurpleSource221/v4/ae/71/ab/ae71abd8-8eff-6bd5-7e1e-a2b357c5e328/3-wall.png'),
      shot('PurpleSource211/v4/90/24/3d/90243db7-fdf6-fd42-e15b-0fbae3ca6818/4-graduation.png'),
      shot('PurpleSource221/v4/29/87/55/298755b2-32f2-bc0e-6699-513c956b6431/5-occasions.png'),
      shot('PurpleSource221/v4/7d/c2/53/7dc2531d-071d-3ea9-4d35-a66d2f032c0f/6-yours.png'),
      shot('PurpleSource221/v4/cc/ef/38/ccef3874-4a78-eb88-9c8d-72492280c032/7-print.png'),
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
        'The reveal, photos flying into the shape, shared as a video in one tap, and a preview of the keepsake framed on a wall before printing.',
        'Reminders 10 days before a birthday or anniversary (time to print) and the day before, and family can add their own photos to a finished keepsake.',
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
    slug: 'tevekkul-vakti',
    title: 'Tevekkul Vakti: Daily Ayah',
    category: 'iOS · Lifestyle · Reference',
    year: '2026',
    status: 'Shipped',
    icon: '/apps/tevekkul.png',
    url: 'https://apps.apple.com/app/id6757791803',
    description:
      'The right ayah at the right moment: the day becomes six moments set by local prayer times, each with a verse of the Qur\'an chosen for that hour, on the Lock Screen, Home Screen and in StandBy. Also prayer times, Qibla, tasbih and an honest missed-prayer calculator.',
    tech: ['SwiftUI', 'WidgetKit', 'iCloud', 'Firebase'],
    screenshots: [
      shot('PurpleSource221/v4/00/a6/55/00a655ca-4ce8-e608-96de-ff5c260d54bf/01_lock_screen.png'),
      shot('PurpleSource211/v4/fc/8b/51/fc8b51e2-7162-c40a-8566-1c819c8aa2dd/02_today.png'),
      shot('PurpleSource221/v4/81/03/0c/81030cf3-2afd-69c0-df9a-11c271e25fd2/03_feelings.png'),
      shot('PurpleSource221/v4/43/da/0a/43da0acd-9fbc-27ca-d9fd-08e91c94aece/04_widgets.png'),
      shot('PurpleSource221/v4/b3/ba/b5/b3bab5a5-73dd-d439-bbbc-1d293abfa9d5/05_ramadan.png'),
      shot('PurpleSource211/v4/22/fe/26/22fe2636-c688-f416-281e-6c7d98a31391/06_no_ads.png'),
    ],
    caseStudy: {
      tagline: 'The right ayah at the right moment.',
      problem:
        'A Muslim\'s day is already shaped by prayer, but a single "verse of the day" reads the same at dawn as at midnight. Tevekkul Vakti follows the shape of the day: hope at dawn, trust as you head out, patience in the afternoon, letting go before sleep. It started as Qaza Qada, a missed-prayer app, and was rebuilt around this idea.',
      built: [
        'The day split into six moments (Fajr, morning, Dhuhr, Asr, Maghrib, Isha) that start and end with local prayer times, each with a verse chosen for that hour.',
        'A sky that changes colour with the moment, across the whole app.',
        'Lock Screen, Home Screen and StandBy widgets that switch to the next ayah on their own, and notifications that carry the verse itself in Arabic with its meaning.',
        'Recitation for every ayah, Surah Al-Kahf on Fridays, and a feelings picker (worried, grieving, grateful…) that leans the day\'s verses toward how you are.',
        'Arabic in Uthmani script with translations in English, Turkish, Indonesian and Albanian, plus prayer times (Standard or Hanafi Asr, city without sharing location), Qibla, Hijri calendar and tasbih.',
        'The missed-prayer calculator from Qaza Qada kept free and unlimited, with a guided Return Plan in Premium (7-day trial, yearly or lifetime).',
        'No ads, no account; logs stay on the device and in the user\'s own iCloud.',
      ],
      facts: [
        { value: 'iOS 17+', label: 'Platform' },
        { value: '5', label: 'Languages' },
        { value: '6', label: 'Moments a day' },
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
  { date: '2026-10-24', project: 'Tevekkul Vakti', slug: 'tevekkul-vakti', title: 'v2.0.1', note: 'Prayer times with Standard or Hanafi Asr, Surah Al-Kahf on Fridays, private notes on saved ayahs, and the whole app under one changing sky.' },
  { date: '2026-10-23', project: 'Lovly', slug: 'lovly', title: 'v1.1.1', note: 'Pair with a QR code, a three-screen start instead of seven, and a Sunday card with the week\'s drawings from both of you.' },
  { date: '2026-10-05', project: 'Memopix', slug: 'memopix', title: 'v1.5.1', note: 'Share the reveal as a video, preview the keepsake on a wall, and get reminded 10 days before their day.' },
  { date: '2026-09-19', project: 'Lovly', slug: 'lovly', title: 'v1.0.7', note: 'Drawings now lift off the canvas and land on your partner\'s Lock Screen. Onboarding redrawn by hand.' },
  { date: '2026-09-18', project: 'Memopix', slug: 'memopix', title: 'v1.5', note: 'Six new templates, including Family Tree, In Loving Memory and Halloween. Invite links fixed.' },
  { date: '2026-09-01', project: 'Pet Portraits', slug: 'pet-portraits', title: 'v1.0.3', note: 'Now runs on iOS 17 and later, so it reaches many more iPhones.' },
  { date: '2026-08-14', project: 'Aer', slug: 'aer', title: 'Launch', note: 'Live air quality and a 7-day forecast for 35 cities across North Macedonia.' },
  { date: '2026-08-11', project: 'Qaza Qada', slug: 'tevekkul-vakti', title: 'v1.5.0', note: 'Rebuilt around the missed-prayer estimate, with exempt days subtracted and a make-up plan.' },
  { date: '2026-08-06', project: 'Lovly', slug: 'lovly', title: 'Launch', note: 'A couples app that lives on the Lock Screen.' },
  { date: '2026-07-27', project: 'Pet Portraits', slug: 'pet-portraits', title: 'Launch', note: 'One photo of a pet becomes a portrait in 15+ styles.' },
  { date: '2026-07-20', project: 'Memopix', slug: 'memopix', title: 'Launch', note: 'Shape photo collages, printed as PNG, JPEG or PDF.' },
];

export interface ShipStep {
  title: string;
  text: string;
  /** What the client has in hand at the end of the step. */
  output: string;
}

// The launch process every app goes through (/ship). Each step is a gate:
// the next one doesn't start until this one is done.
export const SHIP_STEPS: ShipStep[] = [
  {
    title: 'Check the idea',
    text: 'Before any code: the top apps in the category, what their 1–2★ reviews complain about, and whether people already pay for a fix.',
    output: 'A go / no-go with the reasons written down',
  },
  {
    title: 'Find the one screen',
    text: 'The single screen that shows what the app does in three seconds. It becomes the first screenshot, the demo video and the ad.',
    output: 'A spec for the core screen',
  },
  {
    title: 'Build one feature well',
    text: 'Native Swift and SwiftUI, one core feature, and a TestFlight build on your phone every week.',
    output: 'Weekly builds you can use',
  },
  {
    title: 'Paywall and pricing',
    text: 'StoreKit subscriptions with the price and terms Apple wants shown, restore purchases, and a retention offer only where Apple allows it.',
    output: 'A paywall that passes review',
  },
  {
    title: 'The App Store listing',
    text: 'Keywords, title and subtitle, and screenshots that show the real app, which is what guideline 2.3.3 asks for.',
    output: 'A listing ready to submit',
  },
  {
    title: 'Pre-submission check',
    text: 'Every build is checked against the usual rejection reasons before Apple sees it: privacy manifest, permission texts, subscription disclosures, account deletion, sign-in rules, leaked keys and crashes.',
    output: 'A READY / NOT READY report',
  },
  {
    title: 'Launch and measure',
    text: 'Analytics checked end to end before release, then the numbers read every week: who opens the paywall, who starts a trial, who stays.',
    output: 'A live app and a weekly read-out',
  },
];

export interface Offer {
  id: string;
  title: string;
  time: string;
  summary: string;
  includes: string[];
  /** The promise attached to the offer, if any. */
  promise?: string;
  /** cal.com URLs open the booking modal; site paths are normal links. */
  cta: { label: string; href: string };
  /** Secondary action. */
  alt?: { label: string; href: string };
}

export const OFFERS: Offer[] = [
  {
    id: 'audit',
    title: 'App Launch Audit',
    time: '48 hours',
    summary: 'Your app, built or nearly built, put through our pre-submission check and launch review. You get a READY / NOT READY report with the exact fix for every problem.',
    includes: [
      'App Review risks: privacy, permissions, subscriptions, sign-in, account deletion',
      'Paywall and pricing against Apple’s rules',
      'App Store listing: keywords, screenshots, first impression',
      'Leaked keys, crash risks and missing analytics',
    ],
    cta: { label: 'Order the audit', href: '/ship#order' },
    alt: { label: 'Book 15 min', href: 'https://cal.com/titanix/15min' },
  },
  {
    id: 'launch',
    title: 'Idea to App Store',
    time: 'Fixed scope',
    summary: 'We take your idea through our whole launch process and ship it: a native iOS app with its paywall, listing and analytics, live on the App Store.',
    includes: [
      'Idea check before we write code',
      'Native Swift / SwiftUI app, weekly TestFlight builds',
      'Subscriptions, App Store listing and analytics',
      'Submission and launch',
    ],
    promise: 'Approved, or we fix it free. If App Review rejects the app we built, we fix and resubmit at no extra cost until it’s live.',
    cta: { label: 'Talk it through', href: 'https://cal.com/titanix/30min' },
  },
];

export const CONTACT = {
  email: 'contact@titanix.dev',
  whatsapp: '+372 5395 1655',
  whatsappUrl: 'https://wa.me/37253951655',
  instagram: '@titanixdev',
  instagramUrl: 'https://instagram.com/titanixdev',
  linkedinUrl: 'https://www.linkedin.com/in/menansali/',
  githubUrl: 'https://github.com/menansali',
  /** Cal.com intro-call slots. An empty list hides the "Book a call" card. */
  booking: [
    { label: '15 min', note: 'Quick intro', url: 'https://cal.com/titanix/15min' },
    { label: '30 min', note: 'Talk through your project', url: 'https://cal.com/titanix/30min' },
  ],
  bookingProfile: 'https://cal.com/titanix',
  /** Where the studio works from, for the footer clock. */
  city: 'Skopje',
  timeZone: 'Europe/Skopje',
};
