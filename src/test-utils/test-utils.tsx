import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { LanguageProvider } from '@/context/LanguageContext';
import { BackgroundProvider } from '@/context/BackgroundContext';

// Mock usePathname for BackgroundProvider
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
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
          {children}
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
