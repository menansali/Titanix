import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Email me when an app ships" from the lab log. With RESEND_AUDIENCE_ID set,
 * the address is added to that Resend audience (send updates as a Broadcast);
 * otherwise it is emailed to the studio inbox. No key at all → 503.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (typeof data.company === 'string' && data.company.trim()) return NextResponse.json({ ok: true });

  const email = typeof data.email === 'string' ? data.email.trim().slice(0, 200) : '';
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'That email doesn’t look right.' }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (apiKey && audience) {
    const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    if (res.ok) return NextResponse.json({ ok: true });
    console.error('Resend audience error', res.status, await res.text());
    return NextResponse.json({ error: 'Could not sign you up right now.' }, { status: 502 });
  }

  const sent = await sendMail({ subject: `Lab log subscriber: ${email}`, text: `${email} wants an email when an app ships.`, replyTo: email });
  if (sent === 'unconfigured') return NextResponse.json({ error: 'Sign-up is not set up yet.' }, { status: 503 });
  if (sent === 'failed') return NextResponse.json({ error: 'Could not sign you up right now.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
