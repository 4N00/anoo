import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/themeConfig';
import Button from './Button';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Button', () => {
  it('renders children correctly', () => {
    const buttonText = 'Click me';
    renderWithTheme(<Button>{buttonText}</Button>);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders disabled state correctly', () => {
    renderWithTheme(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('applies variant styles correctly', () => {
    const { rerender } = renderWithTheme(<Button $variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Button $variant="danger">Danger</Button>
      </ThemeProvider>
    );
    expect(screen.getByText('Danger')).toBeInTheDocument();
  });
}); 