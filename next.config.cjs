/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    turbotrace: {
      memoryLimit: 4096,
      logLevel: 'error'
    },
    swcMinify: true,
  },
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
    domains: ['ognrjtlftwwrjgfdpzmy.supabase.co'],
  },
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
};

module.exports = nextConfig;