/*
 * App Review rejection guides: one page per guideline that commonly gets apps
 * rejected, rendered at /app-review/[slug]. Quotes are short excerpts from
 * Apple's App Review Guidelines (developer.apple.com/app-store/review/guidelines),
 * checked 2026-10-05 (4.2, 1.2 and 5.1.2 added and checked 2026-11-24 against
 * the version updated 2026-10-16). Keep the advice practical and generic, no invented stats.
 */

export interface Guide {
  slug: string;
  /** Guideline number as Apple writes it. */
  code: string;
  /** Short name, as in the guidelines. */
  name: string;
  /** Page title, phrased the way people search for it. */
  title: string;
  summary: string;
  /** Short verbatim excerpt from the guideline. */
  quote: string;
  causes: string[];
  fix: string[];
  /** What to write back to App Review after fixing. */
  reply: string;
  /** ISO date the quote was last checked against Apple's page. */
  checked: string;
}

/** Guides first written on 2026-10-05; newer ones set their own `checked`. */
const FIRST_CHECK = '2026-10-05';

export const GUIDES: Guide[] = [
  {
    slug: 'guideline-2-1-app-completeness',
    code: '2.1',
    name: 'App Completeness',
    title: 'Guideline 2.1 rejection: App Completeness, and how to fix it',
    summary:
      'The reviewer hit a crash, a broken link, placeholder content, a login they couldn’t get past, or an in-app purchase they couldn’t find.',
    quote:
      'We will reject incomplete app bundles and binaries that crash or exhibit obvious technical problems.',
    causes: [
      'A crash on launch or on a common path, often on a device or iOS version you didn’t test.',
      'The app needs a login and there is no demo account in the review notes, or the backend was off.',
      'Placeholder text, “coming soon” screens or buttons that do nothing.',
      'In-app purchases configured in App Store Connect that the reviewer can’t find or buy in the app.',
      'Links in the app or the listing that go to an empty or broken page.',
    ],
    fix: [
      'Read the crash log attached to the rejection (or in Xcode Organizer) and reproduce it on the same iOS version.',
      'Test the full flow on a real device with a fresh install and no saved state.',
      'Add a working demo account to the review notes and keep the backend running during review.',
      'Remove or finish every placeholder screen. Hide features that aren’t ready instead of shipping them empty.',
      'Make every configured in-app purchase reachable, or explain in the review notes where it is and why.',
    ],
    reply:
      'Say what was broken and what you changed, for example: “The crash on launch on iOS 18 was caused by X and is fixed in build 42. A demo account is in the review notes.” Then submit the new build.',
    checked: FIRST_CHECK,
  },
  {
    slug: 'guideline-2-3-3-screenshots',
    code: '2.3.3',
    name: 'Accurate Metadata: screenshots',
    title: 'Guideline 2.3.3 rejection: screenshots that don’t show the app',
    summary:
      'Your screenshots are marketing art, a splash screen or a login page instead of the app being used.',
    quote:
      'Screenshots should show the app in use, and not merely the title art, login page, or splash screen.',
    causes: [
      'Screenshots that are only headlines, illustrations or device mockups with no real app screen.',
      'The first screenshots show onboarding, a paywall or a login screen.',
      'Screens that don’t exist in the build: an old design, or a feature not shipped yet.',
      'iPad screenshots that are stretched iPhone screens.',
    ],
    fix: [
      'Make sure every screenshot contains a real screen from the current build. Text overlays and frames are fine around it.',
      'Lead with the core feature in use, not onboarding or the paywall.',
      'Retake screenshots after any redesign so they match what the reviewer sees.',
      'If you support iPad, take real iPad screenshots.',
    ],
    reply:
      'Screenshots are metadata, so you usually don’t need a new build. Replace them in App Store Connect and reply: “We updated the screenshots to show the app in use.”',
    checked: FIRST_CHECK,
  },
  {
    slug: 'guideline-2-3-accurate-metadata',
    code: '2.3',
    name: 'Accurate Metadata',
    title: 'Guideline 2.3 rejection: name, description and keywords',
    summary:
      'Something in your listing doesn’t match the app, or the name, subtitle or keywords are stuffed with terms Apple doesn’t allow.',
    quote:
      'Customers should know what they’re getting when they download or buy your app, so make sure all your app metadata … accurately reflect the app’s core experience.',
    causes: [
      'The description promises features the app doesn’t have yet.',
      'Competitor names, trademarks or popular app names in the keywords or subtitle (2.3.7).',
      'Prices or “free” claims in the name, subtitle or screenshots (2.3.7).',
      'New features not described in the review notes (2.3.1).',
      'A name over 30 characters, or a subtitle with unverifiable claims like “#1”.',
    ],
    fix: [
      'Cut every claim the current build can’t back up.',
      'Remove other apps’ names and trademarks from keywords, title and subtitle.',
      'Keep prices out of the name, subtitle and screenshots.',
      'Describe new features specifically in the Notes for Review.',
    ],
    reply:
      'List what you changed: “We removed X from the keywords and updated the description to match the current features.” Metadata-only fixes don’t need a new build.',
    checked: FIRST_CHECK,
  },
  {
    slug: 'guideline-3-1-1-in-app-purchase',
    code: '3.1.1',
    name: 'In-App Purchase',
    title: 'Guideline 3.1.1 rejection: unlocking features without in-app purchase',
    summary:
      'The app unlocks digital features or content in some way other than Apple’s in-app purchase, or there is no way to restore purchases.',
    quote:
      'If you want to unlock features or functionality within your app … you must use in-app purchase.',
    causes: [
      'A web checkout (Stripe, PayPal) or license key that unlocks features inside the app.',
      'Buttons or links that send people to buy outside the app where that isn’t allowed in their storefront.',
      'No “Restore Purchases” option for subscriptions or non-consumables.',
      'Promo codes or QR codes of your own that unlock premium content.',
    ],
    fix: [
      'Sell every digital feature, subscription and content unlock through StoreKit.',
      'Add a visible Restore Purchases button, usually on the paywall and in settings.',
      'Physical goods and real-world services can use other payment methods. Digital ones can’t, except where Apple’s rules for a storefront say otherwise.',
      'Use App Store offer codes instead of your own unlock codes.',
    ],
    reply:
      '“All premium features are now sold through in-app purchase, and Restore Purchases is on the paywall and in Settings.” Submit the new build.',
    checked: FIRST_CHECK,
  },
  {
    slug: 'guideline-3-1-2-subscriptions',
    code: '3.1.2',
    name: 'Subscriptions',
    title: 'Guideline 3.1.2 rejection: subscription price and terms on the paywall',
    summary:
      'The paywall doesn’t clearly show what the subscription costs, how long it lasts and what the user gets, or the subscription itself isn’t allowed.',
    quote:
      'Before asking a customer to subscribe, you should clearly describe what the user will get for the price.',
    causes: [
      'The full price is small or hidden, while a per-week or per-day figure or the trial is the biggest text.',
      'No subscription length, or no mention that it renews automatically.',
      'No links to the Terms of Use (EULA) and Privacy Policy on the paywall or in the listing.',
      'A subscription that gives no ongoing value, or lasts less than seven days (3.1.2(a)).',
    ],
    fix: [
      'Show the billed amount and period clearly, as prominent as any discount or trial text.',
      'Say what happens after a free trial: the price it renews at and when.',
      'Link Terms of Use and Privacy Policy on the paywall, and add the EULA link in App Store Connect.',
      'Describe exactly what the subscription unlocks.',
    ],
    reply:
      '“The paywall now shows the full price and billing period, explains auto-renewal, and links our Terms of Use and Privacy Policy.” Submit the new build with a screenshot of the paywall in the notes.',
    checked: FIRST_CHECK,
  },
  {
    slug: 'guideline-4-3-spam',
    code: '4.3',
    name: 'Spam',
    title: 'Guideline 4.3 rejection: spam, and how to get past it',
    summary:
      'Apple thinks the app is too similar to apps already on the store, to your own other apps, or that it is one of many copies.',
    quote:
      'Don’t submit apps that are indistinguishable from what’s already widely available.',
    causes: [
      'An app built from a template or a purchased codebase that many others also use.',
      'Several apps from you that are nearly the same, for example one per city (4.3(a)).',
      'A crowded category such as flashlights, wallpapers or simple timers with nothing new.',
    ],
    fix: [
      'Merge near-duplicate apps into one app with options or in-app purchases.',
      'Make the difference obvious: a feature, design or audience the others don’t serve.',
      'Show that difference in the first screenshots and in the review notes.',
      'Rebuild template code so the app doesn’t look like the many others made from it.',
    ],
    reply:
      'Explain concretely what is new, with screens: “Unlike other X apps, ours does Y, shown in screenshots 1 and 2.” If you believe the rejection is wrong, you can appeal to the App Review Board.',
    checked: FIRST_CHECK,
  },
  {
    slug: 'guideline-4-8-sign-in-with-apple',
    code: '4.8',
    name: 'Login Services',
    title: 'Guideline 4.8 rejection: Google sign-in without Sign in with Apple',
    summary:
      'The app lets people create an account with Google, Facebook or another social login but doesn’t offer an equivalent private option like Sign in with Apple.',
    quote:
      'Apps that use a third-party or social login service … must also offer as an equivalent option another login service.',
    causes: [
      'Google or Facebook sign-in on the welcome screen with no Sign in with Apple next to it.',
      'Sign in with Apple only reachable from a second screen, so it isn’t equivalent.',
      'Sign in with Apple that then asks for more personal data than name and email.',
    ],
    fix: [
      'Add Sign in with Apple next to the other login options, at the same size.',
      'Don’t ask for extra details after Sign in with Apple unless the core feature needs them.',
      'Handle the private relay email address Apple can give you.',
      'If your app only uses its own email and password accounts, 4.8 doesn’t apply.',
    ],
    reply:
      '“We added Sign in with Apple as an equal option on the sign-in screen.” Submit the new build.',
    checked: FIRST_CHECK,
  },
  {
    slug: 'guideline-5-1-1-privacy',
    code: '5.1.1',
    name: 'Data Collection and Storage',
    title: 'Guideline 5.1.1 rejection: privacy policy and permission prompts',
    summary:
      'Your privacy policy is missing or vague, or a permission prompt doesn’t clearly say why the app needs access.',
    quote:
      'Ensure your purpose strings clearly and completely describe your use of the data.',
    causes: [
      'No privacy policy link in App Store Connect, or none inside the app.',
      'A policy that doesn’t list what data is collected, which third parties get it and how to delete it.',
      'Vague permission texts like “This app needs your location.”',
      'Asking for permissions on launch before the user knows why.',
      'Paid features that only work if the user allows tracking or data access.',
      'Requiring personal details that the core feature doesn’t need.',
    ],
    fix: [
      'Link the privacy policy in App Store Connect and in the app, usually in Settings.',
      'List every kind of data collected, every SDK that receives it, retention, and how to request deletion.',
      'Rewrite each purpose string with the reason and an example: for example “We use your location to show the air quality where you are.”',
      'Ask for each permission at the moment the feature needs it.',
      'Check the App Privacy answers in App Store Connect match the policy and the SDKs in the build.',
    ],
    reply:
      'Describe each change: “Updated the location purpose string to explain X, added the privacy policy link in Settings.” Purpose strings live in the build, so submit a new one.',
    checked: FIRST_CHECK,
  },
  {
    slug: 'guideline-5-1-1-v-account-deletion',
    code: '5.1.1(v)',
    name: 'Account Sign-In',
    title: 'Guideline 5.1.1(v) rejection: no account deletion in the app',
    summary:
      'People can create an account in your app but can’t delete it from inside the app, or the app forces a login it doesn’t need.',
    quote:
      'If your app supports account creation, you must also offer account deletion within the app.',
    causes: [
      'Account deletion only by email or on a website, with no way to start it in the app.',
      '“Delete account” that only signs the user out or deactivates the account.',
      'A login required before the user can see anything, when the app has no real account features.',
    ],
    fix: [
      'Add Delete Account in settings. It should delete the account and its data, not just sign out.',
      'If you use Sign in with Apple, revoke the user’s token when the account is deleted.',
      'Delete the user in every connected service too, such as your subscription or analytics backend.',
      'Let people use the parts of the app that don’t need an account without signing in.',
    ],
    reply:
      '“Users can now delete their account in Settings → Account → Delete Account, which removes the account and its data.” Submit the new build and say where to find it.',
    checked: FIRST_CHECK,
  },
  {
    slug: 'guideline-4-2-minimum-functionality',
    code: '4.2',
    name: 'Minimum Functionality',
    title: 'Guideline 4.2 rejection: “repackaged website”, and how to fix it',
    summary:
      'Apple thinks the app is a website in a wrapper, or too thin to be useful. This is the rejection apps made with web-first and AI app builders hit most.',
    quote:
      'Your app should include features, content, and UI that elevate it beyond a repackaged website.',
    causes: [
      'The whole app is one web view loading your site, with a tab bar around it.',
      'Web-style screens: no native navigation, no back swipe, text that ignores Dynamic Type, buttons that look like links.',
      'Nothing the phone does that a browser can’t: no notifications, widgets, offline use, camera or share sheet.',
      'The app is mostly a list of links, a marketing page or an aggregator of other people’s content (4.2.2).',
      'A single prompt box in front of a chatbot API, with nothing else around it.',
    ],
    fix: [
      'Rebuild the screens people use most as native screens. Keep the web view only for content that really is web content, like help pages.',
      'Add at least one thing a website can’t do and make it central: a widget, notifications people ask for, offline access, camera input, Lock Screen or Shortcuts support.',
      'Use the system navigation, text sizes and controls so it behaves like an iPhone app.',
      'For AI apps, build the workflow around the model: history, saved results, editing, sharing, presets for one clear job.',
      'Lead the screenshots and the review notes with those native features.',
    ],
    reply:
      'List what changed and where to see it: “The app now has native screens for X and Y, a Home Screen widget, and offline access to saved items. Only the help pages are web content.” Submit the new build.',
    checked: '2026-11-24',
  },
  {
    slug: 'guideline-1-2-user-generated-content',
    code: '1.2',
    name: 'User-Generated Content',
    title: 'Guideline 1.2 rejection: AI and user content without moderation',
    summary:
      'People can post, share or generate content in your app, including with AI, and the app has no way to filter it, report it or block someone.',
    quote:
      'This includes social media, user-generated content platforms, and AI content creation apps.',
    causes: [
      'An AI image, video or chat app with no filter on what can be generated.',
      'Users can see each other’s posts, profiles or generated images, but there is no Report button.',
      'No way to block another user.',
      'No published contact information for reaching the developer.',
      'A report button that goes nowhere, with nobody reading the reports.',
    ],
    fix: [
      'Filter prompts and outputs before anything is shown or shared. Most AI providers offer a moderation endpoint; use it on both sides.',
      'Add Report on every piece of content and every profile, and send those reports somewhere a person reads them.',
      'Add Block user, and hide a blocked user’s content straight away.',
      'Publish a support email or contact page in the app and in App Store Connect.',
      'Write the moderation setup in the review notes, so the reviewer doesn’t have to find it.',
    ],
    reply:
      '“The app now filters generated content with X before it is shown, every item and profile has Report and Block, reports go to our support team, and our contact details are in Settings.” Submit the new build.',
    checked: '2026-11-24',
  },
  {
    slug: 'guideline-5-1-2-third-party-ai',
    code: '5.1.2(i)',
    name: 'Data Use and Sharing: third-party AI',
    title: 'Guideline 5.1.2(i) rejection: sending user data to an AI service without asking',
    summary:
      'The app sends what people type, say or upload to an outside AI service, like OpenAI, Anthropic or Google, without telling them first and asking.',
    quote:
      'You must clearly disclose where personal data will be shared with third parties, including with third-party AI, and obtain explicit permission before doing so.',
    causes: [
      'Prompts, photos, voice or documents go to an AI API and the user is never told.',
      'The disclosure is only in the privacy policy, not in the app before the first request.',
      'Consent is assumed by using the app, with no explicit “Allow” step.',
      'The App Privacy answers in App Store Connect don’t list the data the AI provider receives.',
    ],
    fix: [
      'Before the first AI request, show a short screen that names the provider, says what is sent and why, and has a clear Allow button.',
      'Let people decline and still use the parts of the app that don’t need the AI.',
      'Remember the choice and let people change it later in Settings.',
      'Name the AI provider and what it receives in the privacy policy, and update the App Privacy answers to match.',
      'Send only what the feature needs: strip names, locations and photo metadata the model doesn’t use.',
    ],
    reply:
      '“Before any data is sent to X, the app now explains what is shared and asks for permission. People can decline and change this in Settings. The privacy policy and App Privacy details are updated.” Submit the new build.',
    checked: '2026-11-24',
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
