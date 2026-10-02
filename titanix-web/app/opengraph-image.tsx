import { OG_SIZE, renderCard } from './_og/render';

export const alt = 'Titanix: from bare metal to the App Store. iOS apps, SaaS and IoT.';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return renderCard({
    kicker: 'Product studio · Est. 2021',
    title: 'From bare metal to the App Store',
    subtitle: 'We design, build and ship iOS apps, SaaS platforms and IoT systems.',
  });
}
