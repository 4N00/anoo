/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@/test-utils/test-utils';
import '@testing-library/jest-dom';
import PageFooter from './Footer';
import { stripAllProps } from '@/test-utils/mockHelpers';

declare const jest: any;

// Mock styled components
jest.mock('./styles', () => ({
  FooterContainer: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <footer data-testid="footer" {...stripAllProps(props)}>{children}</footer>
  ),
  ContentWrapper: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="content" {...stripAllProps(props)}>{children}</div>
  ),
  TopNavigation: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <nav data-testid="nav" {...stripAllProps(props)}>{children}</nav>
  ),
  SmallText: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <span data-testid="small-text" {...stripAllProps(props)}>{children}</span>
  ),
  FooterLink: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <a data-testid="link" {...stripAllProps(props)}>{children}</a>
  ),
  LargeText: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <h2 data-testid="large-text" {...stripAllProps(props)}>{children}</h2>
  ),
  LargeTextSection: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="large-text-section" {...stripAllProps(props)}>{children}</div>
  ),
  FooterInfo: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="footer-info" {...stripAllProps(props)}>{children}</div>
  ),
  ContactInfo: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="contact-info" {...stripAllProps(props)}>{children}</div>
  ),
  NavigationGroup: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="nav-group" {...stripAllProps(props)}>{children}</div>
  ),
  LinkColumn: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="link-column" {...stripAllProps(props)}>{children}</div>
  ),
}));

describe('PageFooter', () => {
  it('renders all sections correctly', () => {
    render(<PageFooter />);
    
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('large-text-section')).toBeInTheDocument();
    expect(screen.getByTestId('footer-info')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<PageFooter />);
    
    const links = screen.getAllByTestId('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders contact information', () => {
    render(<PageFooter />);
    
    expect(screen.getByTestId('contact-info')).toBeInTheDocument();
  });
});
