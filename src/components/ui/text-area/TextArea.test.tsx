/// <reference types="@types/jest" />
/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@/test-utils/test-utils';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/themeConfig';
import TextArea from './TextArea';

declare const describe: any;
declare const it: any;
declare const expect: any;

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('TextArea', () => {
  it('renders with label', () => {
    const label = 'Test Label';
    renderWithTheme(<TextArea label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders with error message', () => {
    const error = 'Test Error';
    renderWithTheme(<TextArea error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const testValue = 'test input';
    const onChange = jest.fn();
    renderWithTheme(<TextArea onChange={onChange} />);
    
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, testValue);
    
    expect(onChange).toHaveBeenCalled();
    expect(textarea).toHaveValue(testValue);
  });

  it('applies custom className', () => {
    const testClass = 'custom-class';
    const { container } = renderWithTheme(<TextArea className={testClass} />);
    expect(container.firstChild).toHaveClass(testClass);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    renderWithTheme(<TextArea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('applies error styles when error prop is provided', () => {
    renderWithTheme(<TextArea error="Error message" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle({ borderColor: theme.colors.error });
  });
}); 