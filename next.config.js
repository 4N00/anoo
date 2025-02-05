/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode for better development experience
  reactStrictMode: true,

  // Enable static image optimization
  images: {
    domains: [
      'localhost',
      // Add your image domains here (e.g., Supabase storage domain)
      'supabase.co',
      'your-storage-domain.com',
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60, // Cache optimized images for 60 seconds
  },

  // Compiler options
  compiler: {
    // Enable styled-components
    styledComponents: true,
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable experimental features
  experimental: {
    // Add experimental features here if needed
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Add Content Security Policy in production
          ...(process.env.NODE_ENV === 'production'
            ? [
                {
                  key: 'Content-Security-Policy',
                  value: ContentSecurityPolicy,
                },
              ]
            : []),
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/projects',
        permanent: true,
      },
    ];
  },

  // Rewrites for API endpoints
  async rewrites() {
    return {
      beforeFiles: [
        // Add API rewrite rules here if needed
      ],
    };
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add SVG support
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Add environment-specific optimizations
    if (!isServer) {
      // Client-side optimizations
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
        },
      };
    }

    return config;
  },

  // Environment variables that should be exposed to the browser
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  // Output configuration
  output: 'standalone',

  // Enable SWC minification
  swcMinify: true,

  // Configure powered by header
  poweredByHeader: false,

  // Configure compression
  compress: true,
};

// Content Security Policy
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

module.exports = nextConfig;