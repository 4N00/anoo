/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@/test-utils/test-utils';
import '@testing-library/jest-dom';
import PageFooter from './index';

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

// Mock FooterLink component
jest.mock('./styles', () => ({
  FooterLink: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} data-testid="footer-link" {...props}>
      {children}
    </a>
  ),
}));

describe('PageFooter', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear();
  });

  it('renders the main heading', () => {
    render(<PageFooter />);
    expect(screen.getByText('HAVE A')).toBeInTheDocument();
    expect(screen.getByText('GREAT DAY!')).toBeInTheDocument();
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
