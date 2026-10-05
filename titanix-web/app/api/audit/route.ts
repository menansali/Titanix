import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { AUDIT_ACCESS, auditBody, auditSubject, type AuditOrder } from '@/lib/contact';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Receives an App Launch Audit request. Same delivery and fallbacks as /api/contact. */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  if (text(data.company, 200)) return NextResponse.json({ ok: true });

  const order: AuditOrder = {
    name: text(data.name, 120),
    email: text(data.email, 200),
    app: text(data.app, 300),
    access: (AUDIT_ACCESS as readonly string[]).includes(String(data.access)) ? String(data.access) : '',
    concern: text(data.concern, 3000),
  };
  if (!order.name || !EMAIL_RE.test(order.email) || order.app.length < 3 || !order.access) {
    return NextResponse.json({ error: 'Please fill in your name, email, the app and how we can access it.' }, { status: 422 });
  }

  const sent = await sendMail({ subject: auditSubject(order), text: auditBody(order), replyTo: order.email });
  if (sent === 'unconfigured') return NextResponse.json({ error: 'Email delivery is not configured.' }, { status: 503 });
  if (sent === 'failed') return NextResponse.json({ error: 'Could not send right now.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
