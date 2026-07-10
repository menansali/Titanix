import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Titanix — iOS Apps, SaaS & IoT Studio',
  description:
    'Titanix is a product studio forging iOS apps, SaaS platforms, and IoT systems. From bare metal to the App Store, we build things that matter.',
  keywords: [
    'iOS development', 'SaaS', 'IoT', 'Swift', 'SwiftUI', 'product studio',
    'embedded systems', 'React Native', 'software engineering', 'Titanix',
  ],
  openGraph: {
    title: 'Titanix — iOS Apps, SaaS & IoT Studio',
    description: 'We forge iOS apps, SaaS platforms, and IoT systems.',
    type: 'website',
    url: 'https://titanix.dev',
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cdefs%3E%3ClinearGradient id='l' x1='8' y1='10' x2='40' y2='40' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23A78BFA'/%3E%3Cstop offset='1' stop-color='%237C3AED'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='48' height='48' rx='12' fill='%23120F22'/%3E%3Crect x='21' y='12' width='6' height='26' rx='3' fill='url(%23l)'/%3E%3Crect x='11' y='12' width='26' height='6' rx='3' fill='url(%23l)'/%3E%3C/svg%3E",
        type: 'image/svg+xml',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0A14',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${mono.variable}`}>
      <body className="noise font-sans antialiased">{children}</body>
    </html>
  );
}
