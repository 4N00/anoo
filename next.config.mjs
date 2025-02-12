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
    // Disable turbotrace as it's causing the path collection issue
    turbotrace: false,
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
  // Optimize build performance
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TS errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint errors during build
  },
  swcMinify: true,
  // Ignore certain patterns during build
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(ext => !ext.includes('test')),
  output: 'standalone',
  // Minimize traced files
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    'framer-motion': {
      transform: 'framer-motion/{{member}}',
    },
  }
};

export default config; 