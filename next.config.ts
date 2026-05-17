import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smunvlziaxppavmrhtcl.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'smunvlziaxppavmrhtcl.supabase.co',
        pathname: '/storage/v1/render/image/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    const isDev = process.env.NODE_ENV === 'development'

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',       value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
          // Allow requests from local network IP in dev
          ...(isDev
            ? [
                {
                  key: 'Access-Control-Allow-Origin',
                  value: 'http://192.168.0.139:3000',
                },
                {
                  key: 'Access-Control-Allow-Methods',
                  value: 'GET, POST, PUT, DELETE, OPTIONS',
                },
                {
                  key: 'Access-Control-Allow-Headers',
                  value: 'Content-Type, Authorization',
                },
                {
                  key: 'Access-Control-Allow-Credentials',
                  value: 'true',
                },
              ]
            : []),
        ],
      },
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|webp|avif|svg|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/ceramic-coating',
        destination: '/services/nano-ceramic-coating-dubai-sharjah',
        permanent: true,
      },
      {
        source: '/window-tinting',
        destination: '/services/car-window-tinting-dubai-sharjah',
        permanent: true,
      },
      {
        source: '/ppf',
        destination: '/services/paint-protection-film-dubai-sharjah',
        permanent: true,
      },
      {
        source: '/car-wrap',
        destination: '/services/car-wrapping-dubai-sharjah',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: false,
      },
    ]
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  experimental: {
    optimizePackageImports: ['lucide-react', '@supabase/ssr'],
  },

  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartautouae.ae',
  },

  // ✅ Allow Next.js dev server to accept requests from local network IP
  allowedDevOrigins: ['http://192.168.0.139:3000'],

  poweredByHeader: false,
}

export default nextConfig