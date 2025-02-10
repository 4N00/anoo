/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileSection from './ProfileSection';

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

describe('ProfileSection', () => {
  it('renders the component with correct title', () => {
    const { getByText } = render(<ProfileSection />);
    expect(getByText('About Me')).toBeInTheDocument();
  });

  it('renders the profile description', () => {
    const { getByText } = render(<ProfileSection />);
    expect(getByText(/I'm a creative developer and designer/)).toBeInTheDocument();
  });

  it('renders all styled components', () => {
    const { container } = render(<ProfileSection />);
    expect(container.querySelector('div')).toBeInTheDocument(); // ProfileContainer
    expect(container.querySelector('h2')).toBeInTheDocument(); // ProfileTitle
    expect(container.querySelector('p')).toBeInTheDocument(); // ProfileText
  });
});
