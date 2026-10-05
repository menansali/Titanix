/*
 * The sample App Launch Audit shown at /ship/sample-audit: a real audit of our
 * own app Aer, run 2026-10-05. `published` keeps the page (and links to it)
 * off until the founder has reviewed it.
 */

export type Verdict = 'PASS' | 'WARN' | 'FAIL' | 'N/A';

export interface AuditCheck {
  check: string;
  verdict: Verdict;
  found: string;
  fix: string;
}

export const SAMPLE_AUDIT = {
  published: false,
  app: 'Aer: Air Quality',
  slug: 'aer',
  date: '2026-10-05',
  version: '1.0 (build 3), live since 14 August 2026',
  verdict: 'NOT READY' as 'READY' | 'NOT READY',
  headline: 'The production backend was down, so new users could see generated sample readings instead of live data.',
  checks: [
    {
      check: '2.1 Completeness',
      verdict: 'FAIL',
      found: 'Every request to the production API returned 404. The app fell back to cached data, or to generated readings when there was no cache.',
      fix: 'Redeploy the backend and add an uptime monitor. Make the fallback screen say “sample data” plainly, or fall back to the public forecast API directly.',
    },
    {
      check: '2.3.3 Screenshots',
      verdict: 'PASS',
      found: 'Seven iPhone screenshots, all real app screens in a device frame with a caption.',
      fix: 'None.',
    },
    {
      check: '2.3 Metadata accuracy',
      verdict: 'WARN',
      found: '“35 cities”, widgets, Live Activities and alerts all match the code. The forecast is described as coming from the CAMS model, but the backend serves its own ML forecast first.',
      fix: 'Reword to “7-day forecast built on Copernicus (CAMS) data”.',
    },
    {
      check: '5.1.1 Privacy manifest',
      verdict: 'WARN',
      found: 'The manifest declares UserDefaults with reason CA92.1, but the app also shares UserDefaults with its widget through an App Group, and the widget extension has no manifest of its own.',
      fix: 'Add reason 1C8F.1, and add a privacy manifest to the widget extension.',
    },
    {
      check: '5.1.1 Privacy policy',
      verdict: 'PASS',
      found: 'Privacy and support pages load, and the policy matches the code: location stays on the device.',
      fix: 'None.',
    },
    {
      check: '5.1.1 Permission texts',
      verdict: 'PASS',
      found: 'Location is asked for only while in use, with a clear purpose string.',
      fix: 'None.',
    },
    {
      check: '3.1 In-app purchase',
      verdict: 'N/A',
      found: 'Free app, no purchases.',
      fix: 'None.',
    },
    {
      check: '4.8 Sign in with Apple',
      verdict: 'N/A',
      found: 'No accounts or third-party login.',
      fix: 'None.',
    },
    {
      check: 'Secrets',
      verdict: 'PASS',
      found: 'No API keys in the code or plists. Deployment keys are read from the environment.',
      fix: 'None.',
    },
    {
      check: 'Listing and keywords',
      verdict: 'WARN',
      found: 'Three keywords repeat words already in the title, subtitle or category. No Macedonian or Albanian listing although the app supports both. No ratings yet.',
      fix: 'Replace duplicates with city names and local words for “pollution”. Add mk and sq listings and an in-app review prompt.',
    },
  ] as AuditCheck[],
  next: [
    'Bring the backend back and monitor it.',
    'Fix the two privacy-manifest gaps and bump the version.',
    'Clean up keywords and add the local-language listings.',
  ],
};
