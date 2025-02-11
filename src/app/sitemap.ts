import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/metadata';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch projects from Supabase
  const { data: projects } = await supabase
    .from('projects')
    .select('slug, updated_at')
    .order('display_order', { ascending: true });

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

  // Add project routes if projects exist
  const projectRoutes = (projects || []).map((project) => ({
    url: `${siteConfig.url}/project/${project.slug}`,
    lastModified: new Date(project.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...baseRoutes, ...projectRoutes];
} 