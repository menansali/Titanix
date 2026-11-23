// Shared between the contact form (client) and /api/contact (server).

export const PROJECT_TYPES = ['App Rescue', 'App Launch Audit', 'iOS app', 'Hardware + app', 'SaaS platform', 'Something else'] as const;
export const BUDGETS = ['Under €5k', '€5k–15k', '€15k–40k', '€40k+', 'Not sure yet'] as const;
export const TIMELINES = ['As soon as possible', '1–3 months', '3+ months', 'Just exploring'] as const;

export interface Brief {
  name: string;
  email: string;
  type: string;
  budget: string;
  timeline: string;
  message: string;
}

export function briefSubject(b: Brief) {
  return `New project: ${b.type} — ${b.name}`;
}

export function briefBody(b: Brief) {
  return [
    `Name: ${b.name}`,
    `Email: ${b.email}`,
    `Project: ${b.type}`,
    `Budget: ${b.budget}`,
    `Timeline: ${b.timeline}`,
    '',
    b.message,
  ].join('\n');
}

// Orders sent without a call (/ship#order and /ship#rescue-form → /api/audit).
// `access` holds the one choice each form asks for; its options depend on the kind.
export const AUDIT_ACCESS = ['TestFlight invite', 'Code access', 'Live on the App Store only'] as const;
export const RESCUE_BUILT = ['An AI app builder (Lovable, Rork, Bolt…)', 'An AI code editor (Cursor, Claude Code…)', 'A freelancer or agency', 'We wrote it ourselves'] as const;

export const ORDER_KINDS = {
  audit: { label: 'Audit request', choice: 'Access', options: AUDIT_ACCESS },
  rescue: { label: 'Rescue request', choice: 'Built with', options: RESCUE_BUILT },
} as const;
export type OrderKind = keyof typeof ORDER_KINDS;

export interface AuditOrder {
  kind: OrderKind;
  name: string;
  email: string;
  app: string;
  access: string;
  concern: string;
}

export function auditSubject(o: AuditOrder) {
  return `${ORDER_KINDS[o.kind].label}: ${o.app.slice(0, 80)} — ${o.name}`;
}

export function auditBody(o: AuditOrder) {
  return [`Name: ${o.name}`, `Email: ${o.email}`, `App: ${o.app}`, `${ORDER_KINDS[o.kind].choice}: ${o.access}`, '', o.concern || '(no notes)'].join('\n');
}
