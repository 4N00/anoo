/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
    removeConsole: true
  },
  images: {
    domains: ['ognrjtlftwwrjgfdpzmy.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
    };
    return config;
  },
  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  // Optimize output
  output: 'standalone'
};

export default config; 