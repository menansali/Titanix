import { ImageResponse } from 'next/og';
import { MARK_SHAPES } from '@/components/Logo';

export const alt = 'Titanix — iOS Apps, SaaS & IoT Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          backgroundColor: '#0A0A08',
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(239,226,0,0.14), transparent)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <svg width={110} height={110} viewBox="0 0 100 100" fill="none">
            {MARK_SHAPES.map((s, i) => (
              <polygon key={i} points={s.points} fill={s.fill} />
            ))}
          </svg>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>Titanix</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 14,
            marginTop: 48,
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1,
            maxWidth: 950,
          }}
        >
          <span>We forge</span>
          <span style={{ color: '#EFE200' }}>iOS apps</span>
          <span style={{ marginLeft: -14 }}>,</span>
          <span style={{ color: '#EFE200' }}>SaaS</span>
          <span>&</span>
          <span style={{ color: '#EFE200' }}>IoT</span>
          <span>that ship.</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: '#9CA3AF' }}>
          titanix.dev — product studio, est. 2021
        </div>
      </div>
    ),
    { ...size }
  );
}
