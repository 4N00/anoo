import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const config = {
  distDir: '.next',
  compiler: {
    styledComponents: true,
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
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
      }
    };
    return config;
  },
  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Build optimizations
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TS errors during build
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    // Configure turbotrace properly
    turbotrace: {
      enabled: true,
      memoryLimit: 4096
    }
  },
  // Ignore certain patterns during build
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(ext => !ext.includes('test')),
  output: 'standalone'
};

export default config; 