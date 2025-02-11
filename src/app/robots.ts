import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/api',
        '/_next',
        '/static',
        '/*.json$',
        '/*.xml$',
        '/login',
        '/logout',
        '/dashboard',
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
} 