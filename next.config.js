/* eslint-disable no-undef */
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
  webpack: (config) => {
    // Explicitly resolve the src directory
    config.resolve = {
      ...config.resolve,
      modules: ['src', 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
        components: path.resolve(__dirname, 'src/components'),
      }
    };

    return config;
  },
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
};

export default config;