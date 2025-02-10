import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/themeConfig';
import AnimateOnScroll from './AnimateOnScroll';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('AnimateOnScroll', () => {
  it('renders children correctly', () => {
    const testText = 'Test Content';
    renderWithTheme(
      <AnimateOnScroll>
        <div>{testText}</div>
      </AnimateOnScroll>
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const testClass = 'custom-class';
    const { container } = renderWithTheme(
      <AnimateOnScroll className={testClass}>
        <div>Content</div>
      </AnimateOnScroll>
    );

    expect(container.firstChild).toHaveClass(testClass);
  });
}); 