import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

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
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://anoo.nl'),
  title: 'Anoo - Creative Developer Portfolio',
  description: 'Portfolio showcasing creative development work and projects by Anoo. Specializing in React, TypeScript, and modern web development.',
  keywords: 'developer, portfolio, react, typescript, web development',
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Anoo - Creative Developer Portfolio',
    description: 'Portfolio showcasing creative development work and projects by Anoo.',
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
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style>{`* { cursor: none !important; }`}</style>
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <FontLoader />
        </Suspense>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Suspense>
      </body>
    </html>
  );
}
