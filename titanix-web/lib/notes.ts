/*
 * Notes: short write-ups from the studio. Plain data, no MDX, rendered by
 * app/notes. Keep them factual: things we built and how they work.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; text: string };

export interface Note {
  slug: string;
  title: string;
  summary: string;
  /** ISO date */
  date: string;
  tags: string[];
  body: Block[];
}

export const NOTES: Note[] = [
  {
    slug: 'how-the-background-of-this-site-works',
    title: 'How the background of this site works',
    summary:
      'The moving contour map behind titanix.dev is one WebGL fragment shader. Here is what it draws, why a map, and how it stays fast.',
    date: '2026-10-02',
    tags: ['WebGL', 'Design', 'Web'],
    body: [
      {
        type: 'p',
        text: 'Titanix started in 2021 doing hardware: LoRa sensor networks and radio propagation modelling on real terrain. When we redesigned the site we wanted one idea that came from that work instead of decoration. So the background is a topographic map, and your cursor is a radio transmitter.',
      },
      { type: 'h2', text: 'One triangle, one shader' },
      {
        type: 'p',
        text: 'The whole effect is a single fragment shader drawn on one full-screen triangle in raw WebGL2. No 3D library. For every pixel it computes a height from layered gradient noise, warped by more noise so the terrain folds instead of looking like clouds. The height drifts slowly over time and shifts as you scroll.',
      },
      { type: 'h2', text: 'Drawing contour lines' },
      {
        type: 'p',
        text: 'Contours are where the height crosses a fixed step. The shader multiplies the height by the number of levels and measures how far each pixel is from the nearest whole number. fwidth() gives the size of one pixel in those units, so the lines stay one pixel sharp at any screen size. Every fifth line is drawn heavier, like the index lines on a survey map.',
      },
      { type: 'h2', text: 'The transmitter' },
      {
        type: 'p',
        text: 'The cursor position is eased in JavaScript and passed to the shader. Around it the contour lines turn yellow with a Gaussian falloff (the coverage), and a sine wave of the distance, sharpened with a power, sends rings outward across the terrain (the signal). On phones there is no cursor, so the transmitter wanders on its own path.',
      },
      { type: 'h2', text: 'Keeping it fast' },
      {
        type: 'list',
        items: [
          'Resolution is capped at 1.5× on desktop and 1.25× on phones.',
          'After a short warm-up the page checks frame times. If most frames are slow it drops the render resolution, down to 45% if needed.',
          'It stops drawing when the tab is hidden.',
          'With reduced motion on it draws one still frame. Without WebGL2 it draws nothing and the flat background shows.',
          'It is brightest behind the hero and the footer and dimmed behind the content, so text always wins.',
        ],
      },
      {
        type: 'p',
        text: 'The share images for every page use a still frame of the same shader, rendered once and saved as an image.',
      },
    ],
  },
];

export const getNote = (slug: string) => NOTES.find((n) => n.slug === slug);
