import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/themeConfig';
import FormInput from './index';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('FormInput', () => {
  it('renders with label', () => {
    const label = 'Test Label';
    renderWithTheme(<FormInput label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders with error message', () => {
    const error = 'Test Error';
    renderWithTheme(<FormInput error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const testValue = 'test input';
    const onChange = jest.fn();
    renderWithTheme(<FormInput onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, testValue);
    
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue(testValue);
  });

  it('applies custom className', () => {
    const testClass = 'custom-class';
    const { container } = renderWithTheme(<FormInput className={testClass} />);
    expect(container.firstChild).toHaveClass(testClass);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    renderWithTheme(<FormInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
}); 