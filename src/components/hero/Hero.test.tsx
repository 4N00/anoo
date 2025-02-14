/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@/test-utils/test-utils';
import '@testing-library/jest-dom';
import HeroSection from './Hero';

// Declare Jest globals
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, _animate, _initial, _transition, ...props }) => (
      <div data-testid="motion-div" {...props}>{children}</div>
    ),
    h1: ({ children, _animate, _initial, _transition, ...props }) => (
      <h1 data-testid="motion-h1" {...props}>{children}</h1>
    ),
    p: ({ children, _animate, _initial, _transition, ...props }) => (
      <p data-testid="motion-p" {...props}>{children}</p>
    ),
    a: ({ children, _animate, _initial, _transition, ...props }) => (
      <a data-testid="motion-a" {...props}>{children}</a>
    ),
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock styled components
jest.mock('./styles', () => ({
  Section: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <section data-testid="hero-section" {...props}>
      {children}
    </section>
  ),
  ContentWrapper: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="content-wrapper" {...props}>
      {children}
    </div>
  ),
  HeadingWrapper: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="heading-wrapper" {...props}>
      {children}
    </div>
  ),
  ScrollingText: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="scrolling-text" {...props}>
      {children}
    </div>
  ),
  Heading: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <h1 data-testid="heading" {...props}>
      {children}
    </h1>
  ),
  Subtitle: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <p data-testid="subtitle" {...props}>
      {children}
    </p>
  ),
  StyledLink: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a data-testid="styled-link" href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock useLanguage hook
jest.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => ({
      'hero.subtitle': 'Creative Developer',
      'hero.cta': 'Learn more',
      'hero.heading': "HI, I'M ANOO - I CREATE VISION"
    }[key])
  })
}));

describe('HeroSection', () => {
  it('renders the subtitle', () => {
    render(<HeroSection />);
    const subtitle = screen.getByTestId('subtitle');
    expect(subtitle).toHaveTextContent('Creative Developer');
  });

  it('renders the "Learn More" link', () => {
    render(<HeroSection />);
    const learnMoreLink = screen.getByTestId('styled-link');
    expect(learnMoreLink).toHaveAttribute('href', '/about');
    expect(learnMoreLink).toHaveTextContent('Learn more');
  });

  it('renders the heading with scrolling text', () => {
    render(<HeroSection />);
    const headingWrapper = screen.getByTestId('heading-wrapper');
    const scrollingText = screen.getByTestId('scrolling-text');
    const headings = screen.getAllByTestId('heading');
    
    expect(headingWrapper).toBeInTheDocument();
    expect(scrollingText).toBeInTheDocument();
    expect(headings).toHaveLength(2);
  });

  it('renders the section with proper structure', () => {
    render(<HeroSection />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('heading-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('scrolling-text')).toBeInTheDocument();
    expect(screen.getAllByTestId('heading')).toHaveLength(2);
    expect(screen.getByTestId('subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('styled-link')).toBeInTheDocument();
  });
});
