import { OG_SIZE, renderCard } from './_og/render';

export const alt = 'Titanix: five apps live on the App Store. Yours is next.';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return renderCard({
    kicker: 'Product studio · Est. 2021',
    title: 'Five apps live. Yours is next.',
    subtitle: 'A designer and a developer. We ship our own iOS apps, and take yours through App Review.',
  });
}
