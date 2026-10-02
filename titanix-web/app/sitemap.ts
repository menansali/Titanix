import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/data';
import { SITE_URL } from '@/lib/site';
import { NOTES } from '@/lib/notes';

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
    { url: `${SITE_URL}/notes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    ...NOTES.map((n) => ({
      url: `${SITE_URL}/notes/${n.slug}`,
      lastModified: new Date(`${n.date}T12:00:00Z`),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
