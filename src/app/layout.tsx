'use client';

import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProjectsProvider } from '../context/ProjectsContext';
import { ThemeProvider } from '../styles/theme';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { BackgroundProvider } from '../context/BackgroundContext';
import Navbar from '../components/Navbar';
import PageFooter from '../components/PageFooter';
import { AnimatePresence } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';

const inter = Inter({ subsets: ['latin'] });

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't refetch on window focus to prevent hydration mismatches
      refetchOnWindowFocus: false,
      // Disable retries to prevent unnecessary server/client differences
      retry: false,
      // Start with empty cache on server
      initialData: typeof window === 'undefined' ? undefined : undefined,
    },
  },
});

// Ensure the same instance is used
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return queryClient;
  }
  // @ts-ignore - window._queryClient is fine for this use case
  window._queryClient = window._queryClient ?? queryClient;
  // @ts-ignore
  return window._queryClient;
};

const MainContent = styled.div`
  position: relative;
  padding-top: 64px; /* Navbar height */
`;

const GlobalStyle = createGlobalStyle`
  body {
    transition: background-color 0.6s ease;
  }
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`* { cursor: none !important; }`}</style>
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={getQueryClient()}>
          <ThemeProvider>
            <GlobalStyle />
            <GlobalStyles />
            <ToastProvider>
              <AuthProvider>
                <ProjectsProvider>
                  <BackgroundProvider>
                    <Navbar />
                    <MainContent>
                      <AnimatePresence mode="wait">{children}</AnimatePresence>
                    </MainContent>
                    <PageFooter />
                  </BackgroundProvider>
                </ProjectsProvider>
              </AuthProvider>
            </ToastProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
