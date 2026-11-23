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
    slug: 'ai-built-app-app-store-rejections',
    title: 'You built an app with AI. Here is what App Review will look at.',
    summary:
      'Lovable, Rork, Bolt and Cursor get an app working fast. These are the guidelines those apps run into most at App Review, and what to change before you submit.',
    date: '2026-11-24',
    tags: ['App Review', 'AI', 'iOS'],
    body: [
      {
        type: 'p',
        text: 'AI tools have made the first working version of an app cheap. Getting it through App Review hasn’t got any easier. The reviewer doesn’t care how the app was made, but apps made quickly tend to trip the same few guidelines, so it is worth checking them before you submit rather than after a rejection.',
      },
      { type: 'h2', text: '4.2: it looks like a website' },
      {
        type: 'p',
        text: 'Apple asks for apps that go “beyond a repackaged website”. Web-first builders often produce exactly that: one web view, web-style buttons, no back swipe, nothing a browser couldn’t do. The fix is not to rewrite everything. Rebuild the screens people use most as native screens, and add one thing only an iPhone app can do, such as a widget, notifications people ask for, or offline access.',
      },
      { type: 'h2', text: '5.1.2(i): data sent to an AI service' },
      {
        type: 'p',
        text: 'If the app sends prompts, photos or voice to OpenAI, Anthropic, Google or any other AI provider, Apple now wants that disclosed and explicitly agreed to before it happens. A line in the privacy policy is not enough. Show a short screen before the first request that names the provider, says what is sent, and has an Allow button.',
      },
      { type: 'h2', text: '1.2: AI content without moderation' },
      {
        type: 'p',
        text: 'Guideline 1.2 names AI content creation apps alongside social apps. If people can generate or share content others see, the app needs a filter, a way to report content, a way to block users, and published contact details.',
      },
      { type: 'h2', text: 'The ones every app hits' },
      {
        type: 'list',
        items: [
          'Account deletion inside the app if people can sign up (5.1.1(v)).',
          'Sign in with Apple or another equivalent private login next to Google sign-in (4.8).',
          'Subscriptions through in-app purchase, with the price, period and terms on the paywall (3.1.1 and 3.1.2).',
          'A demo account in the review notes if the app needs a login (2.1).',
          'Screenshots that show the real app in use (2.3.3).',
          'Apps built from the same starter as many others can be flagged as spam (4.3). Make the difference obvious.',
        ],
      },
      { type: 'h2', text: 'Check before you submit' },
      {
        type: 'p',
        text: 'We put these into a free check of twelve yes-or-no questions at titanix.dev/app-review/check. Each answer links to a guide with the causes, the fix and what to tell App Review. If the list comes back long, that is what our App Rescue offer is for.',
      },
    ],
  },
  {
    slug: 'apps-that-live-outside-the-app',
    title: 'Apps that live outside the app',
    summary:
      'Three of our apps do their main job on the Lock Screen, in a widget or in a Live Activity. What that looks like, and what it changes.',
    date: '2026-11-24',
    tags: ['iOS', 'Design', 'WidgetKit'],
    body: [
      {
        type: 'p',
        text: 'Most apps are opened a few times and then forgotten. The ones people keep are often the ones they don’t have to open. So for several of our apps the main question was: what should someone see without tapping anything?',
      },
      { type: 'h2', text: 'Lovly: the drawing lands on their Lock Screen' },
      {
        type: 'p',
        text: 'Lovly is a couples app. You draw on a shared canvas and the drawing turns up in a widget on your partner’s Lock Screen and Home Screen, without them opening the app. The widgets are also what the Lovly+ subscription unlocks, after three free days.',
      },
      { type: 'h2', text: 'Tevekkul Vakti: a verse for this part of the day' },
      {
        type: 'p',
        text: 'Tevekkul Vakti splits the day into six moments set by local prayer times and shows a Qur’an verse chosen for each one. It is built to be read on the Lock Screen, the Home Screen and in StandBy, so the verse changes with the day while the phone sits on the nightstand.',
      },
      { type: 'h2', text: 'Aer: an alert only when it matters' },
      {
        type: 'p',
        text: 'Aer shows air quality for 35 cities in North Macedonia. Day to day it lives in a Home or Lock Screen widget. For pollution spikes there is a Live Activity, so the reading stays on the Lock Screen while the air is bad.',
      },
      { type: 'h2', text: 'If you are designing for the glance' },
      {
        type: 'list',
        items: [
          'Decide what the widget shows before you design the app’s screens.',
          'Give every surface one job. A widget that tries to be a small app reads as nothing at a glance.',
          'The data has to be ready before the widget asks for it, so plan background refresh and caching early.',
          'If the app lives on the Lock Screen, lead the App Store screenshots with the Lock Screen.',
        ],
      },
    ],
  },
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
