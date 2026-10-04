import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Next doesn't pick a parent lockfile.
  outputFileTracingRoot: path.resolve(),
  async redirects() {
    return [
      // Removed note.
      { source: '/notes/catch-app-store-rejections-before-you-submit', destination: '/notes', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      // App Store screenshots on case-study pages.
      { protocol: 'https', hostname: '*.mzstatic.com' },
    ],
  },
};

export default nextConfig;
