import { CONTACT } from '@/lib/data';

/**
 * Sends a plain-text email to the studio inbox via Resend.
 * Needs RESEND_API_KEY (and a verified sending domain for CONTACT_FROM_EMAIL).
 */
export async function sendMail(m: { subject: string; text: string; replyTo: string }): Promise<'ok' | 'unconfigured' | 'failed'> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return 'unconfigured';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Titanix Website <website@titanix.dev>',
      to: process.env.CONTACT_TO_EMAIL ?? CONTACT.email,
      reply_to: m.replyTo,
      subject: m.subject,
      text: m.text,
    }),
  });
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return 'failed';
  }
  return 'ok';
}
