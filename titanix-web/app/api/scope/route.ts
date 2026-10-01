import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { NextResponse } from 'next/server';
import { IDEA_MAX, IDEA_MIN, SCOPE_SYSTEM, ScopeSchema } from '@/lib/scope';

export const maxDuration = 60;

// Best-effort per-instance limiter: 5 scopes per IP per hour. Serverless
// instances don't share memory, so this caps bursts rather than guaranteeing
// a global limit — pair it with a monthly spend limit in the Anthropic Console.
const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

let client: Anthropic | null = null;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'The scoper is offline right now.' }, { status: 503 });
  }

  let idea = '';
  try {
    const body = await req.json();
    idea = typeof body.idea === 'string' ? body.idea.trim() : '';
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  if (idea.length < IDEA_MIN || idea.length > IDEA_MAX) {
    return NextResponse.json(
      { error: `Describe your idea in ${IDEA_MIN}–${IDEA_MAX} characters.` },
      { status: 422 },
    );
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) {
    return NextResponse.json(
      { error: 'That’s a lot of ideas! Try again in an hour — or just send us a brief.' },
      { status: 429 },
    );
  }

  client ??= new Anthropic();

  try {
    const response = await client.beta.messages.parse({
      model: 'claude-opus-5-5',
      max_tokens: 8000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'low', format: zodOutputFormat(ScopeSchema) },
      system: SCOPE_SYSTEM,
      messages: [{ role: 'user', content: `<idea>\n${idea}\n</idea>` }],
    });

    if (response.stop_reason === 'refusal' || !response.parsed_output) {
      return NextResponse.json(
        { error: 'We couldn’t scope that one — tell us about it directly instead.' },
        { status: 422 },
      );
    }

    const s = response.parsed_output;
    return NextResponse.json({
      ...s,
      v1: s.v1.slice(0, 6),
      later: s.later.slice(0, 4),
      stack: s.stack.slice(0, 6),
      risks: s.risks.slice(0, 3),
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: 'Busy right now — try again in a minute.' }, { status: 429 });
    }
    console.error('Scope error', error);
    return NextResponse.json({ error: 'Something went wrong. Try again shortly.' }, { status: 502 });
  }
}
