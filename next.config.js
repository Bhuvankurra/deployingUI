/** Unified Next.js configuration */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Allow builds to pass even if there are lint / type warnings (adjust as desired)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    // Development local backend proxy
    if (process.env.NODE_ENV === 'development') {
      const port = process.env.DEV_BACKEND_PORT || '8000';
      return [
        { source: '/api/:path*', destination: `http://localhost:${port}/api/:path*` },
        { source: '/auth/:path*', destination: `http://localhost:${port}/auth/:path*` },
        { source: '/health', destination: `http://localhost:${port}/health` }
      ];
    }
    // Production: optionally proxy /api/* -> external API if provided
    if (process.env.NEXT_PUBLIC_API_URL) {
      return [
        { source: '/api/:path*', destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*` }
      ];
    }
    return [];
  }
};

module.exports = nextConfig;
