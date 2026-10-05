import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/data';
import { SITE_URL } from '@/lib/site';
import { NOTES } from '@/lib/notes';
import { GUIDES } from '@/lib/guides';
import { SAMPLE_AUDIT } from '@/lib/sampleAudit';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...PROJECTS.filter((p) => p.caseStudy).map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/ship`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/app-review`, lastModified: new Date('2026-10-05'), changeFrequency: 'monthly', priority: 0.8 },
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}/app-review/${g.slug}`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...(SAMPLE_AUDIT.published
      ? [{ url: `${SITE_URL}/ship/sample-audit`, lastModified: new Date(SAMPLE_AUDIT.date), changeFrequency: 'yearly' as const, priority: 0.6 }]
      : []),
    { url: `${SITE_URL}/notes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    ...NOTES.map((n) => ({
      url: `${SITE_URL}/notes/${n.slug}`,
      lastModified: new Date(`${n.date}T12:00:00Z`),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
