import { Metadata } from 'next';

const defaultTitle = 'Anoo - Creative Developer Portfolio';
const defaultDescription = 'Portfolio showcasing creative development work and projects by Anoo. Specializing in React, TypeScript, and modern web development.';

export const siteConfig = {
  name: 'Anoo',
  title: defaultTitle,
  description: defaultDescription,
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://anoo.nl',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/anoo',
    github: 'https://github.com/anoo',
    linkedin: 'https://linkedin.com/in/anoo',
  },
  creator: 'Anoo',
  keywords: [
    'developer',
    'portfolio',
    'react',
    'typescript',
    'web development',
    'frontend developer',
    'creative developer',
    'UI/UX',
    'javascript',
    'next.js',
    'web design',
    'responsive design',
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Anoo',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@anoo',
    site: '@anoo',
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en-US': '/en-US',
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  category: 'technology',
}; 