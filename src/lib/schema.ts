import { siteConfig } from '@/config/metadata';

interface WebPageSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
}

interface ProjectSchema extends WebPageSchema {
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': string;
    name: string;
  };
  keywords: string[];
}

interface PersonSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  image: string;
  sameAs: string[];
  jobTitle: string;
  worksFor: {
    '@type': string;
    name: string;
  };
  description: string;
}

export function generateWebPageSchema(
  title: string,
  description: string,
  url: string
): WebPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };
}

export function generateProjectSchema(
  title: string,
  description: string,
  url: string,
  image: string,
  datePublished: string,
  dateModified: string,
  keywords: string[]
): ProjectSchema {
  return {
    ...generateWebPageSchema(title, description, url),
    '@type': 'Article',
    image,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: siteConfig.creator,
    },
    keywords,
  };
}

export function generatePersonSchema(): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.creator,
    url: siteConfig.url,
    image: `${siteConfig.url}/profile.jpg`,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
    jobTitle: 'Creative Developer',
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    description: siteConfig.description,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
} 