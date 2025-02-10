/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileSection from './ProfileSection';
import { LanguageProvider } from '../../../context/LanguageContext';

// Declare Jest globals
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

// Mock the styled components
jest.mock('./styles', () => ({
  ProfileContainer: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...props}>{children}</div>
  ),
  ProfileContent: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...props}>{children}</div>
  ),
  ProfileTitle: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <h2 {...props}>{children}</h2>
  ),
  ProfileText: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <p {...props}>{children}</p>
  ),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  );
};

describe('ProfileSection', () => {
  it('renders the component with correct title', () => {
    const { getByText } = renderWithProviders(<ProfileSection />);
    expect(getByText('About Me')).toBeInTheDocument();
  });

  it('renders the profile description', () => {
    const { getByText } = renderWithProviders(<ProfileSection />);
    expect(getByText(/I'm a creative developer and designer/)).toBeInTheDocument();
  });

  it('renders all styled components', () => {
    const { container } = renderWithProviders(<ProfileSection />);
    expect(container.querySelector('div')).toBeInTheDocument(); // ProfileContainer
    expect(container.querySelector('h2')).toBeInTheDocument(); // ProfileTitle
    expect(container.querySelector('p')).toBeInTheDocument(); // ProfileText
  });
});
