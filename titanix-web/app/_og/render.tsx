import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { MARK_SHAPES } from '@/components/Logo';

/*
 * Shared social-share card: the contour field (a still frame of SignalField,
 * rendered to terrain.jpg), wide Archivo type, optional app icon.
 * Fonts are static TTF instances because Satori can't read variable fonts.
 */

export const OG_SIZE = { width: 1200, height: 630 };

const dir = join(process.cwd(), 'app/_og');
const file = (name: string) => readFile(join(dir, name));
const dataUrl = async (path: string, mime: string) => `data:${mime};base64,${(await readFile(path)).toString('base64')}`;

interface Card {
  kicker: string;
  title: string;
  subtitle?: string;
  /** Path under /public, e.g. /apps/lovly.png */
  icon?: string;
}

export async function renderCard({ kicker, title, subtitle, icon }: Card) {
  const [wide, text, mono, terrain, iconUrl] = await Promise.all([
    file('ArchivoExpanded-ExtraBold.ttf'),
    file('Archivo-Medium.ttf'),
    file('JetBrainsMono-Medium.ttf'),
    dataUrl(join(dir, 'terrain.jpg'), 'image/jpeg'),
    icon ? dataUrl(join(process.cwd(), 'public', icon), 'image/png') : Promise.resolve(null),
  ]);

  const size = title.length > 22 ? 64 : title.length > 14 ? 84 : 112;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          backgroundColor: '#0A0A08',
          backgroundImage: `url(${terrain})`,
          backgroundSize: '1200px 630px',
          color: '#FAFAF5',
          fontFamily: 'Archivo',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg width={44} height={44} viewBox="0 0 100 100" fill="none">
              {MARK_SHAPES.map((s, i) => (
                <polygon key={i} points={s.points} fill={s.fill} />
              ))}
            </svg>
            <span style={{ fontSize: 30, letterSpacing: -0.5 }}>Titanix</span>
          </div>
          <span style={{ fontFamily: 'Mono', fontSize: 18, letterSpacing: 3, color: '#A8A89E', textTransform: 'uppercase' }}>
            {kicker}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {iconUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={iconUrl} width={112} height={112} style={{ borderRadius: 26, marginBottom: 36 }} alt="" />
          )}
          <div
            style={{
              display: 'flex',
              fontFamily: 'Wide',
              fontSize: size,
              lineHeight: 0.92,
              letterSpacing: -2,
              textTransform: 'uppercase',
              maxWidth: 1060,
            }}
          >
            {/* A separate yellow full stop only sits right on one-line titles. */}
            {size === 112 ? title : `${title}.`}
            {size === 112 && <span style={{ color: '#EFE200' }}>.</span>}
          </div>
          {subtitle && (
            <div style={{ marginTop: 26, fontSize: 32, color: '#A8A89E', maxWidth: 900, lineHeight: 1.3 }}>{subtitle}</div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Mono', fontSize: 18, color: '#6E6E64', letterSpacing: 2 }}>
          <span>WWW.TITANIX.DEV</span>
          <span style={{ color: '#EFE200' }}>iOS · SAAS · IOT</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Wide', data: wide, weight: 800, style: 'normal' },
        { name: 'Archivo', data: text, weight: 500, style: 'normal' },
        { name: 'Mono', data: mono, weight: 500, style: 'normal' },
      ],
    },
  );
}
