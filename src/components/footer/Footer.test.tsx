/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@/test-utils/test-utils';
import '@testing-library/jest-dom';
import PageFooter from './Footer';

// Declare Jest globals
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;
declare const beforeEach: any;

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
window.IntersectionObserver = mockIntersectionObserver;

// Mock all styled components
jest.mock('./styles', () => ({
  FooterContainer: ({ children, ...props }: React.PropsWithChildren) => (
    <footer data-testid="footer-container" {...props}>
      {children}
    </footer>
  ),
  ContentWrapper: ({ children, ...props }: React.PropsWithChildren) => (
    <div data-testid="content-wrapper" {...props}>
      {children}
    </div>
  ),
  TopNavigation: ({ children, ...props }: React.PropsWithChildren) => (
    <div data-testid="top-navigation" {...props}>
      {children}
    </div>
  ),
  ContactInfo: ({ children, ...props }: React.PropsWithChildren) => (
    <div data-testid="contact-info" {...props}>
      {children}
    </div>
  ),
  NavigationGroup: ({ children, ...props }: React.PropsWithChildren) => (
    <div data-testid="navigation-group" {...props}>
      {children}
    </div>
  ),
  LinkColumn: ({ children, ...props }: React.PropsWithChildren) => (
    <div data-testid="link-column" {...props}>
      {children}
    </div>
  ),
  FooterLink: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} data-testid="footer-link" {...props}>
      {children}
    </a>
  ),
  LargeTextSection: ({ children, ...props }: React.PropsWithChildren) => (
    <div data-testid="large-text-section" {...props}>
      {children}
    </div>
  ),
  LargeText: ({ children, ...props }: React.PropsWithChildren) => (
    <h1 data-testid="large-text" {...props}>
      {children}
    </h1>
  ),
  FooterInfo: ({ children, ...props }: React.PropsWithChildren) => (
    <div data-testid="footer-info" {...props}>
      {children}
    </div>
  ),
  SmallText: ({ children, ...props }: React.PropsWithChildren) => (
    <div data-testid="small-text" {...props}>
      {children}
    </div>
  ),
}));

describe('PageFooter', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear();
  });

  it('renders all navigation links', () => {
    render(<PageFooter />);

    // Check specific links
    expect(screen.getByText('ANOO, BEAM ME UP')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<PageFooter />);

    const emailLink = screen.getByText('info@anoo.nl');
    const phoneLink = screen.getByText('+31 625 135 338');

    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:info@anoo.nl');

    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+31625135338');
  });

  it('renders footer information', () => {
    render(<PageFooter />);
    expect(screen.getByText('anoo©')).toBeInTheDocument();
    expect(screen.getByText("Let's make cool stuff")).toBeInTheDocument();
  });

  it('sets up intersection observer', () => {
    render(<PageFooter />);
    expect(mockIntersectionObserver).toHaveBeenCalled();
  });
});
