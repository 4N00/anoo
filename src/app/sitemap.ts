import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/metadata';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...baseRoutes];
} 