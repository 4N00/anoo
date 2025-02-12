import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const config = {
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
  // Remove output: 'export' since we're using middleware
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
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
};

export default config; 