import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';

const RootLayoutClient = dynamic(() => import('@/components/layout/RootLayoutClient'), {
  ssr: true
});

const FontLoader = dynamic(() => import('@/components/layout/FontLoader'), {
  ssr: false
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'light dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://anoo.nl'),
  title: 'Anoo - Creative Developer Portfolio',
  description: 'Portfolio showcasing creative development work and projects by Anoo. Specializing in React, TypeScript, and modern web development.',
  keywords: 'developer, portfolio, react, typescript, web development',
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icons/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Anoo - Creative Developer Portfolio',
    description: 'Portfolio showcasing creative development work and projects by Anoo.',
    siteName: 'Anoo Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anoo Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anoo - Creative Developer Portfolio',
    description: 'Portfolio showcasing creative development work and projects by Anoo.',
    creator: '@anoo',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <style>{`* { cursor: none !important; }`}</style>
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <FontLoader />
        </Suspense>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
