import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import Input from './Input';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('Input', () => {
  it('renders correctly', () => {
    renderWithProviders(<Input placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    renderWithProviders(<Input value="test" onChange={handleChange} />);
    
    const input = screen.getByDisplayValue('test');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message when provided', () => {
    renderWithProviders(<Input error="Test error message" />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('applies disabled styles when disabled', () => {
    renderWithProviders(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    renderWithProviders(<Input ref={ref} placeholder="Test input" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom className when provided', () => {
    const testClass = 'custom-class';
    renderWithProviders(<Input className={testClass} />);
    expect(screen.getByRole('textbox')).toHaveClass(testClass);
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    renderWithProviders(
      <Input onFocus={handleFocus} onBlur={handleBlur} placeholder="Test input" />
    );
    
    const input = screen.getByPlaceholderText('Test input');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });
});
