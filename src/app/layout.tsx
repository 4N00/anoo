'use client';

import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProjectsProvider } from '../context/ProjectsContext';
import { ThemeProvider } from '../styles/theme';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';

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
  min-height: 100vh;
  padding-top: 64px; /* Navbar height */
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={getQueryClient()}>
          <ThemeProvider>
            <ToastProvider>
              <AuthProvider>
                <ProjectsProvider>
                  <Navbar />
                  <MainContent>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.2,
                        ease: 'linear',
                      }}
                      style={{
                        width: '100%',
                        minHeight: '100vh',
                        willChange: 'opacity',
                      }}
                    >
                      {children}
                    </motion.div>
                  </MainContent>
                </ProjectsProvider>
              </AuthProvider>
            </ToastProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
