/*
 * The free rejection-risk check at /app-review/check. Each yes-or-no question
 * points at the guide for the guideline a "yes" puts at risk. It all runs in
 * the browser: answers are never sent anywhere.
 */

export interface RiskQuestion {
  id: string;
  question: string;
  /** Guide slug in lib/guides.ts that a "yes" points to. */
  guide: string;
  /** What to check, shown in the result when the answer is yes. */
  check: string;
  /** "high" rejections usually need a new build; "medium" are often metadata or a small change. */
  level: 'high' | 'medium';
}

export const RISK_QUESTIONS: RiskQuestion[] = [
  {
    id: 'web',
    question: 'Is most of the app a website shown inside the app (a web view)?',
    guide: 'guideline-4-2-minimum-functionality',
    check: 'Apple rejects repackaged websites. The screens people use most need to be native, with at least one thing a browser can’t do.',
    level: 'high',
  },
  {
    id: 'template',
    question: 'Did it start from a template, a bought codebase or an AI app builder’s starter?',
    guide: 'guideline-4-3-spam',
    check: 'Apps that look like many others get rejected as spam. Make the difference obvious in the app, the screenshots and the review notes.',
    level: 'medium',
  },
  {
    id: 'ai',
    question: 'Does it send what people type, say or upload to an AI service (OpenAI, Anthropic, Google…)?',
    guide: 'guideline-5-1-2-third-party-ai',
    check: 'Name the AI provider, say what is sent, and ask for explicit permission in the app before the first request.',
    level: 'high',
  },
  {
    id: 'ugc',
    question: 'Can people generate or post content other people see, like AI images, posts or chat?',
    guide: 'guideline-1-2-user-generated-content',
    check: 'You need a content filter, Report on every item, Block user, and published contact details.',
    level: 'high',
  },
  {
    id: 'accounts',
    question: 'Can people create an account?',
    guide: 'guideline-5-1-1-v-account-deletion',
    check: 'Account deletion has to start inside the app and actually delete the account and its data.',
    level: 'high',
  },
  {
    id: 'social',
    question: 'Is there Google, Facebook or another social sign-in?',
    guide: 'guideline-4-8-sign-in-with-apple',
    check: 'Offer an equivalent private login, usually Sign in with Apple, next to it and at the same size.',
    level: 'medium',
  },
  {
    id: 'gate',
    question: 'Does the reviewer have to log in before they can see anything?',
    guide: 'guideline-2-1-app-completeness',
    check: 'Put a working demo account in the review notes and keep the backend running during review.',
    level: 'medium',
  },
  {
    id: 'unfinished',
    question: 'Is any screen unfinished, “coming soon”, or a button that does nothing?',
    guide: 'guideline-2-1-app-completeness',
    check: 'Finish or hide every placeholder. Reviewers reject anything that looks incomplete.',
    level: 'high',
  },
  {
    id: 'digital',
    question: 'Do you sell anything digital: premium features, credits, content?',
    guide: 'guideline-3-1-1-in-app-purchase',
    check: 'Digital goods go through in-app purchase, with a working Restore Purchases.',
    level: 'high',
  },
  {
    id: 'subs',
    question: 'Is any of it a subscription or a free trial?',
    guide: 'guideline-3-1-2-subscriptions',
    check: 'Show the billed price and period, what happens after the trial, and links to Terms and Privacy on the paywall.',
    level: 'medium',
  },
  {
    id: 'permissions',
    question: 'Does it ask for location, camera, photos, microphone or contacts?',
    guide: 'guideline-5-1-1-privacy',
    check: 'Every permission prompt needs a specific reason, asked at the moment the feature needs it.',
    level: 'medium',
  },
  {
    id: 'screens',
    question: 'Are your App Store screenshots mostly marketing art rather than real app screens?',
    guide: 'guideline-2-3-3-screenshots',
    check: 'Each screenshot has to show the app in use. Frames and captions around a real screen are fine.',
    level: 'medium',
  },
];
