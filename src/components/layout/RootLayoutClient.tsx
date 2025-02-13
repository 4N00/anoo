'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProjectsProvider } from '@/context/ProjectsContext';
import { ThemeProvider } from '@/styles/theme';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { BackgroundProvider } from '@/context/BackgroundContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AnimatePresence } from 'framer-motion';
import GlobalStyles from '@/styles/GlobalStyles';
import PageFooter from "@/components/footer/Footer";
import { MainContent } from './styles';
import Navbar from '../nav/nav';
import React from 'react';
import ErrorBoundary from '@/components/error-boundary/ErrorBoundary';
import ErrorFallback from '@/components/error-boundary/ErrorFallback';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
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

interface RootLayoutClientProps {
  children: React.ReactNode;
}

const RootLayoutClient: React.FC<RootLayoutClientProps> = ({ children }) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <ThemeProvider>
        <GlobalStyles />
        <ToastProvider>
          <AuthProvider>
            <ProjectsProvider>
              <BackgroundProvider>
                <LanguageProvider>
                  <Navbar />
                  <MainContent>
                    <ErrorBoundary fallback={<ErrorFallback />}>
                      <AnimatePresence mode="wait">{children}</AnimatePresence>
                    </ErrorBoundary>
                  </MainContent>
                  <PageFooter />
                </LanguageProvider>
              </BackgroundProvider>
            </ProjectsProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default RootLayoutClient;