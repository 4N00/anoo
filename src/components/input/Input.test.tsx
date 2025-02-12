/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@/test-utils/test-utils';
import Input from './Input';

// Declare Jest globals
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input value="test" onChange={handleChange} />);
    
    const input = screen.getByDisplayValue('test');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message when provided', () => {
    render(<Input error="Test error message" />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('applies disabled styles when disabled', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Test input" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom className when provided', () => {
    const testClass = 'custom-class';
    render(<Input className={testClass} />);
    expect(screen.getByRole('textbox')).toHaveClass(testClass);
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(
      <Input onFocus={handleFocus} onBlur={handleBlur} placeholder="Test input" />
    );
    
    const input = screen.getByPlaceholderText('Test input');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });
});
