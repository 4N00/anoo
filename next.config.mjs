/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true, // Use SWC for minification
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  // Optimize output
  output: 'standalone',
  experimental: {
    optimizeCss: true, // Built-in CSS optimization
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    turbo: {
      rules: {
        // Optimize specific imports
        '*.css': ['style-loader', 'css-loader'],
      },
    },
  },
};

export default config; 