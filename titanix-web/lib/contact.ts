// Shared between the contact form (client) and /api/contact (server).

export const PROJECT_TYPES = ['App Launch Audit', 'iOS app', 'SaaS platform', 'IoT system', 'Something else'] as const;
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

// App Launch Audit order (/ship#order → /api/audit).
export const AUDIT_ACCESS = ['TestFlight invite', 'Code access', 'Live on the App Store only'] as const;

export interface AuditOrder {
  name: string;
  email: string;
  app: string;
  access: string;
  concern: string;
}

export function auditSubject(o: AuditOrder) {
  return `Audit request: ${o.app.slice(0, 80)} — ${o.name}`;
}

export function auditBody(o: AuditOrder) {
  return [`Name: ${o.name}`, `Email: ${o.email}`, `App: ${o.app}`, `Access: ${o.access}`, '', o.concern || '(no notes)'].join('\n');
}
