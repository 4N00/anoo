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
  experimental: {
    turbotrace: {
      memoryLimit: 4096,
      logLevel: 'error'
    },
    swcMinify: true,
  },
  images: {
    domains: ['ognrjtlftwwrjgfdpzmy.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
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
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
  trailingSlash: false,
};

export default config; 