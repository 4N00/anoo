/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextArea from './TextArea';
import { render } from '@/test-utils/test-utils';

// Declare Jest globals
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

describe('TextArea', () => {
  it('renders correctly', () => {
    render(<TextArea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<TextArea onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New text' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message and styles when error prop is provided', () => {
    const errorMessage = 'Error message';
    render(<TextArea error={errorMessage} />);
    const textarea = screen.getByRole('textbox');
    const error = screen.getByText(errorMessage);
    expect(error).toBeInTheDocument();
    expect(textarea).toHaveStyle({ 'border-color': '#ff0000' }); // Using theme's error.main color
  });

  it('applies disabled styles when disabled prop is true', () => {
    render(<TextArea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveStyle({ opacity: '0.5' }); // Using disabled opacity
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('applies custom className', () => {
    const customClass = 'custom-textarea';
    render(<TextArea className={customClass} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(customClass);
  });
}); 