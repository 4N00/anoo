/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from './Container';

declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

type MockProps = {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
};

// Mock styled components
jest.mock('./styles', () => ({
  StyledContainer: React.forwardRef<HTMLElement, MockProps>(({ children, className, as: Component = 'div', ...props }, ref) => {
    const Element = Component;
    return (
      <Element ref={ref} data-testid="container" className={className} {...props}>
        {children}
      </Element>
    );
  }),
}));

/** @jest-environment jsdom */
describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Container className="custom-class">
        <div>Content</div>
      </Container>
    );
    
    expect(screen.getByTestId('container')).toHaveClass('custom-class');
  });

  it('applies default role', () => {
    render(
      <Container>
        <div>Content</div>
      </Container>
    );
    
    expect(screen.getByTestId('container')).toHaveAttribute('role', 'region');
  });

  it('allows custom role override', () => {
    render(
      <Container role="main">
        <div>Content</div>
      </Container>
    );
    
    expect(screen.getByTestId('container')).toHaveAttribute('role', 'main');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(
      <Container ref={ref}>
        <div>Content</div>
      </Container>
    );
    
    expect(ref).toHaveBeenCalled();
  });

  it('renders with custom HTML element', () => {
    render(
      <Container as="section">
        <div>Content</div>
      </Container>
    );
    
    const element = screen.getByTestId('container');
    expect(element.tagName.toLowerCase()).toBe('section');
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Container data-custom="test" aria-label="container">
        <div>Content</div>
      </Container>
    );
    
    const element = screen.getByTestId('container');
    expect(element).toHaveAttribute('data-custom', 'test');
    expect(element).toHaveAttribute('aria-label', 'container');
  });
}); 