import React from 'react';
import { Inter } from 'next/font/google';
import { Providers } from '@/lib/registry';
import { Metadata } from 'next';
import { SEO } from '@/utils/constants';

// Import global styles
import './globals.css';

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: SEO.defaultTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.defaultDescription,
  keywords: ['portfolio', 'projects', 'admin', 'dashboard', 'next.js', 'react'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: SEO.openGraph.locale,
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    siteName: SEO.openGraph.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    creator: '@yourusername',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Enable static rendering
export const dynamic = 'force-static';
export const revalidate = 60; // Revalidate every 60 seconds

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_APP_URL}
        />
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Providers wrap for context and styling */}
        <Providers>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Skip to main content
          </a>

          {/* Main content */}
          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          {/* Analytics script */}
          {process.env.NODE_ENV === 'production' && (
            <script
              defer
              data-domain={process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, '')}
              src="https://plausible.io/js/script.js"
            />
          )}
        </Providers>
      </body>
    </html>
  );
}
