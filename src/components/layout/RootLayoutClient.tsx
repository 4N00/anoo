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
import React, { useEffect } from 'react';
import ErrorBoundary from '@/components/error-boundary/ErrorBoundary';
import ErrorFallback from '@/components/error-boundary/ErrorFallback';

// Create a client
const isDev = process.env.NODE_ENV === 'development';

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
  
  if (isDev) {
    // @ts-ignore - window._queryClient is fine for this use case
    window._queryClient = window._queryClient ?? queryClient;
    // @ts-ignore
    return window._queryClient;
  }
  
  return queryClient;
};

interface RootLayoutClientProps {
  children: React.ReactNode;
}

const RootLayoutClient: React.FC<RootLayoutClientProps> = ({ children }) => {
  useEffect(() => {
    const handleError = (event: globalThis.ErrorEvent | globalThis.PromiseRejectionEvent) => {
      // For ErrorEvent
      if ('error' in event && event.error?.message?.includes('message port closed')) {
        event.preventDefault();
        return;
      }
      
      // For PromiseRejectionEvent
      if ('reason' in event && event.reason?.message?.includes('message port closed')) {
        event.preventDefault();
        return;
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

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