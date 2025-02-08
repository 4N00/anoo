import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/themeConfig';
import { BackgroundProvider } from '../context/BackgroundContext';

// Declare Jest globals
declare const jest: any;

// Mock usePathname for BackgroundProvider
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <BackgroundProvider>{children}</BackgroundProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
