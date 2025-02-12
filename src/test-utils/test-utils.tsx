/// <reference types="@testing-library/jest-dom" />
// Declare Jest globals
declare const jest: any;

import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/themeConfig';
import { LanguageProvider } from '@/context/LanguageContext';
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
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    __esModule: true,
    ...actual,
    motion: new Proxy(
      {},
      {
        get: (_, prop) => {
          return ({ children, ...props }: { children?: React.ReactNode } & Record<string, any>) => {
            const Component = prop.toString();
            return React.createElement(Component, props, children);
          };
        },
      }
    ),
    useInView: () => true,
    useAnimation: () => ({
      start: jest.fn(),
      set: jest.fn(),
      stop: jest.fn(),
    }),
    AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  };
});

// Mock TrefoilKnot component
jest.mock('../components/trefoil-knot/TrefoilKnot', () => ({
  __esModule: true,
  default: () => <div data-testid="trefoil-knot-mock" />
}));

// Mock theme context
jest.mock('@/styles/theme', () => ({
  useTheme: () => ({
    theme: {
      ...lightTheme,
      colors: {
        ...lightTheme.colors,
        error: {
          ...lightTheme.colors.error,
          main: 'rgb(255, 0, 0)'
        },
        background: {
          ...lightTheme.colors.background,
          primary: 'rgb(245, 245, 245)'
        }
      }
    },
    isDark: false,
    toggleTheme: jest.fn()
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock BackgroundContext
jest.mock('@/context/BackgroundContext', () => ({
  BackgroundProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useBackground: () => ({
    backgroundColor: lightTheme.colors.background.primary,
    setBackgroundColor: jest.fn(),
    showTrefoil: true,
    setShowTrefoil: jest.fn(),
  }),
}));

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <LanguageProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
