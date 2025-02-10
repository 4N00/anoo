/// <reference types="@testing-library/jest-dom" />
// Declare Jest globals
declare const jest: any;

import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { LanguageProvider } from '@/context/LanguageContext';
import { BackgroundProvider } from '@/context/BackgroundContext';
import { ToastProvider } from '@/context/ToastContext';

// Mock usePathname for BackgroundProvider
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  })
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
  useAnimation: () => ({
    start: jest.fn(),
    set: jest.fn(),
    stop: jest.fn(),
  }),
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
}));

// Mock TrefoilKnot component
jest.mock('../components/trefoil-knot/TrefoilKnot', () => ({
  __esModule: true,
  default: () => <div data-testid="trefoil-knot-mock" />
}));

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <BackgroundProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </BackgroundProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
