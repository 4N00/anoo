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
    div: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  },
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
  LetterContainer: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="letter-container" {...props}>
      {children}
    </div>
  ),
  Letter: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <span data-testid="letter" {...props}>
      {children}
    </span>
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

describe('HeroSection', () => {
  it('renders the title correctly', () => {
    render(<HeroSection />);

    // Test single occurrence letters
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText(',')).toBeInTheDocument();
    expect(screen.getByText("'")).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
    expect(screen.getByText('.')).toBeInTheDocument();

    // Test multiple occurrence letters
    expect(screen.getAllByText('I')).toHaveLength(2);
    expect(screen.getAllByText('O')).toHaveLength(2);
  });

  it('renders the subtitle', () => {
    render(<HeroSection />);
    const subtitle = screen.getByTestId('subtitle');
    expect(subtitle).toHaveTextContent(
      'Scroll to see some of my work - contact me if you like what i do.'
    );
  });

  it('renders the "Learn More" link', () => {
    render(<HeroSection />);
    const learnMoreLink = screen.getByTestId('styled-link');
    expect(learnMoreLink).toHaveAttribute('href', '/about');
    expect(learnMoreLink).toHaveTextContent('LEARN MORE ABOUT ME');
  });

  it('renders all letter containers', () => {
    render(<HeroSection />);
    const letterContainers = screen.getAllByTestId('letter-container');
    expect(letterContainers).toHaveLength(3); // "HI," "I'M" "ANOO."
  });

  it('renders letters with correct data-extra-space attribute', () => {
    render(<HeroSection />);
    const letters = screen.getAllByTestId('letter');

    // Check some letters for extra space attribute
    const lastLetterOfFirstWord = letters[1]; // 'I' in "HI,"
    const lastLetterOfSecondWord = letters[5]; // 'M' in "I'M"
    const lastLetterOfThirdWord = letters[9]; // 'O' in "ANOO."

    expect(lastLetterOfFirstWord).not.toHaveAttribute('data-extra-space', 'true'); // Comma follows
    expect(lastLetterOfSecondWord).toHaveAttribute('data-extra-space', 'true');
    expect(lastLetterOfThirdWord).not.toHaveAttribute('data-extra-space', 'true'); // Period follows
  });

  it('renders the section with proper structure', () => {
    render(<HeroSection />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('content-wrapper')).toBeInTheDocument();
    expect(screen.getAllByTestId('letter-container')).toHaveLength(3);
    expect(screen.getByTestId('subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('styled-link')).toBeInTheDocument();
  });
});
