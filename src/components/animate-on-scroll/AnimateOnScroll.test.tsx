/// <reference types="@types/jest" />
/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@/test-utils/test-utils';
import AnimateOnScroll from './AnimateOnScroll';

declare const describe: any;
declare const it: any;
declare const expect: any;

describe('AnimateOnScroll', () => {
  it('renders children correctly', () => {
    render(
      <AnimateOnScroll>
        <div>Test content</div>
      </AnimateOnScroll>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(
      <AnimateOnScroll className={customClass}>
        <div>Test content</div>
      </AnimateOnScroll>
    );
    const element = screen.getByTestId('animate-scroll');
    expect(element).toHaveClass(customClass);
  });
}); 