'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProjectsProvider } from '@/context/ProjectsContext';
import { ThemeProvider } from '@/styles/theme';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { BackgroundProvider } from '@/context/BackgroundContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AnimatePresence } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalStyles from '@/styles/GlobalStyles';
import PageFooter from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

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

const MainContent = styled.div`
  position: relative;
  padding-top: 64px; /* Navbar height */
`;

const GlobalStyle = createGlobalStyle`
  body {
    transition: background-color 0.6s ease;
  }
`;

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <ThemeProvider>
        <GlobalStyle />
        <GlobalStyles />
        <ToastProvider>
          <AuthProvider>
            <ProjectsProvider>
              <BackgroundProvider>
                <LanguageProvider>
                  <Navbar />
                  <MainContent>
                    <AnimatePresence mode="wait">{children}</AnimatePresence>
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
}