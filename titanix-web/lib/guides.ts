/*
 * App Review rejection guides: one page per guideline that commonly gets apps
 * rejected, rendered at /app-review/[slug]. Quotes are short excerpts from
 * Apple's App Review Guidelines (developer.apple.com/app-store/review/guidelines),
 * checked 2026-10-05. Keep the advice practical and generic, no invented stats.
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
}

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
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
