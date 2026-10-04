import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ViewTransitions } from 'next-view-transitions';
import { PILLARS, PROJECTS, CONTACT, FOUNDER } from '@/lib/data';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import SmoothScroll from '@/components/motion/SmoothScroll';
import SignalField from '@/components/motion/SignalField';
import Cursor from '@/components/motion/Cursor';
import './globals.css';

// One variable family for display and text; display type uses the wide axis (`.wide`).
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_TITLE = 'Titanix — iOS Apps, SaaS & IoT Studio';
const SITE_DESCRIPTION =
  'Titanix is a product studio forging iOS apps, SaaS platforms, and IoT systems. From bare metal to the App Store, we build things that matter.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s — Titanix',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'iOS development', 'iOS app studio', 'SaaS development', 'IoT development',
    'Swift', 'SwiftUI', 'product studio', 'embedded systems', 'app development agency',
    'Next.js development', 'software engineering', 'Titanix',
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': [{ url: '/notes/feed.xml', title: 'Titanix Notes' }] },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Google Search Console HTML-tag verification. Paste the token from
  // Search Console → URL-prefix property → "HTML tag" method, then redeploy.
  // verification: { google: 'YOUR_GOOGLE_VERIFICATION_TOKEN' },
};

export const viewport: Viewport = {
  themeColor: '#0A0A08',
};

// Structured data for search engines and AI answer engines (SEO + GEO).
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: 'Titanix Development',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 1024,
        height: 1024,
      },
      description: SITE_DESCRIPTION,
      foundingDate: '2021',
      founder: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
        name: FOUNDER.name,
        jobTitle: FOUNDER.role,
        image: `${SITE_URL}${FOUNDER.photo}`,
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'South East European University' },
        sameAs: [FOUNDER.linkedin, FOUNDER.github],
      },
      email: CONTACT.email,
      telephone: CONTACT.whatsapp,
      sameAs: [CONTACT.instagramUrl],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: CONTACT.email,
        telephone: CONTACT.whatsapp,
        availableLanguage: ['English'],
      },
      areaServed: 'Worldwide',
      knowsAbout: [
        'iOS development', 'Swift', 'SwiftUI', 'SaaS platforms',
        'IoT systems', 'embedded firmware', 'machine learning', 'Next.js',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: PILLARS.map((p) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: p.title,
            description: p.description,
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#portfolio`,
      name: 'Titanix portfolio',
      itemListElement: PROJECTS.filter((p) => p.status === 'Shipped').map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: p.title,
          description: p.description,
          applicationCategory: p.category,
          author: { '@id': `${SITE_URL}/#organization` },
          ...(p.icon ? { image: `${SITE_URL}${p.icon}` } : {}),
          ...(p.caseStudy ? { mainEntityOfPage: `${SITE_URL}/work/${p.slug}` } : {}),
          ...(p.url ? { url: p.url, installUrl: p.url } : {}),
        },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${archivo.variable} ${mono.variable}`}>
        <body className="font-sans antialiased">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <noscript>
            <style>{'[data-reveal]{visibility:visible}'}</style>
          </noscript>
          <SignalField />
          <div className="relative z-10">{children}</div>
          <Cursor />
          <SmoothScroll />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
