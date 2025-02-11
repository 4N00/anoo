import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/metadata';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all projects (you'll need to implement this based on your data fetching method)
  const projects = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
    .then((res) => res.json())
    .catch(() => []);

  // Base routes that are always present
  const routes = [
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

  // Add project routes
  const projectRoutes = projects.map((project: any) => ({
    url: `${siteConfig.url}/project/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...projectRoutes];
} 