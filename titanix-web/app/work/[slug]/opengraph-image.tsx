import { PROJECTS } from '@/lib/data';
import { OG_SIZE, renderCard } from '../../_og/render';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Titanix case study';

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug)!;
  return renderCard({
    kicker: `Case study · ${p.category.split(' · ')[0]}`,
    title: p.title.split(':')[0],
    subtitle: p.caseStudy?.tagline,
    icon: p.icon,
  });
}
