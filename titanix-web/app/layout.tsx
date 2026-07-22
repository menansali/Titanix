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
};

export const viewport: Viewport = {
  themeColor: '#0A0A08',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${mono.variable}`}>
      <body className="noise font-sans antialiased">{children}</body>
    </html>
  );
}
