import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { BUDGETS, PROJECT_TYPES, TIMELINES, briefBody, briefSubject, type Brief } from '@/lib/contact';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pick<T extends readonly string[]>(value: unknown, allowed: T): string | null {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value) ? value : null;
}

function text(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/**
 * Receives the project brief and emails it via Resend.
 * Needs RESEND_API_KEY (and a verified sending domain for CONTACT_FROM_EMAIL).
 * Without a key it answers 503 so the form falls back to a pre-filled mailto.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (text(data.company, 200)) return NextResponse.json({ ok: true });

  const brief: Brief = {
    name: text(data.name, 120),
    email: text(data.email, 200),
    type: pick(data.type, PROJECT_TYPES) ?? '',
    budget: pick(data.budget, BUDGETS) ?? '',
    timeline: pick(data.timeline, TIMELINES) ?? '',
    message: text(data.message, 5000),
  };

  if (!brief.name || !EMAIL_RE.test(brief.email) || !brief.type || !brief.budget || !brief.timeline || brief.message.length < 10) {
    return NextResponse.json({ error: 'Please fill in every field.' }, { status: 422 });
  }

  const sent = await sendMail({ subject: briefSubject(brief), text: briefBody(brief), replyTo: brief.email });
  if (sent === 'unconfigured') return NextResponse.json({ error: 'Email delivery is not configured.' }, { status: 503 });
  if (sent === 'failed') return NextResponse.json({ error: 'Could not send right now.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
