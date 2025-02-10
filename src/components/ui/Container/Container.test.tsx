import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/themeConfig';
import Container from './index';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Container', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Content';
    const { getByText } = renderWithTheme(
      <Container>
        <div>{testContent}</div>
      </Container>
    );
    expect(getByText(testContent)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const testClass = 'custom-class';
    const { container } = renderWithTheme(
      <Container className={testClass}>
        <div>Content</div>
      </Container>
    );
    expect(container.firstChild).toHaveClass(testClass);
  });

  it('maintains proper styling with theme', () => {
    const { container } = renderWithTheme(
      <Container>
        <div>Content</div>
      </Container>
    );
    expect(container.firstChild).toHaveStyle({
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
    });
  });
}); 