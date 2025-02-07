/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './index';
import type { User, Session } from '@supabase/supabase-js';

// Declare Jest globals
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;
declare const beforeEach: any;

// Mock modules
const mockUseAuth = jest.fn();
const mockSignOut = jest.fn();

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('@/lib/supabase', () => ({
  signOut: () => mockSignOut(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
}));

// Mock styled components
jest.mock('./styles', () => ({
  Nav: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <nav data-testid="nav" {...props}>
      {children}
    </nav>
  ),
  Container: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="container" {...props}>
      {children}
    </div>
  ),
  Logo: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <a data-testid="logo" {...props}>
      {children}
    </a>
  ),
  NavLinks: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="nav-links" {...props}>
      {children}
    </div>
  ),
  NavLink: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <a data-testid="nav-link" {...props}>
      {children}
    </a>
  ),
  MenuButton: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <button data-testid="menu-button" {...props}>
      {children}
    </button>
  ),
  MobileMenuContainer: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="mobile-menu" {...props}>
      {children}
    </div>
  ),
  MobileNavLink: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <a data-testid="mobile-nav-link" {...props}>
      {children}
    </a>
  ),
  ContactInfo: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="contact-info" {...props}>
      {children}
    </div>
  ),
  CloseButton: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <button data-testid="close-button" {...props}>
      {children}
    </button>
  ),
}));

describe('Navbar', () => {
  const mockUser: User = {
    id: '1',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
    email: 'test@example.com',
    phone: '',
    role: '',
    confirmation_sent_at: '',
    confirmed_at: '',
    last_sign_in_at: '',
    recovery_sent_at: '',
    identities: [],
    factors: [],
  };

  const mockSession: Session = {
    access_token: 'token',
    refresh_token: 'refresh',
    expires_in: 3600,
    token_type: 'bearer',
    user: mockUser,
  };

  beforeEach(() => {
    mockUseAuth.mockReset();
    mockSignOut.mockReset();
  });

  it('renders loading state', () => {
    mockUseAuth.mockReturnValue({ isLoading: true });
    render(<Navbar />);
    expect(screen.getByText('ANOO')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders basic navigation links when not logged in', () => {
    mockUseAuth.mockReturnValue({
      isLoading: false,
      isAdmin: false,
      user: null,
      session: null,
    });
    render(<Navbar />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Admin')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('renders admin navigation when user is admin', () => {
    mockUseAuth.mockReturnValue({
      isLoading: false,
      isAdmin: true,
      user: mockUser,
      session: mockSession,
    });
    render(<Navbar />);

    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    mockUseAuth.mockReturnValue({
      isLoading: false,
      isAdmin: false,
      user: null,
      session: null,
    });
    render(<Navbar />);

    const menuButton = screen.getByTestId('menu-button');
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  it('handles logout correctly', async () => {
    mockUseAuth.mockReturnValue({
      isLoading: false,
      isAdmin: true,
      user: mockUser,
      session: mockSession,
    });
    mockSignOut.mockResolvedValue(undefined);

    render(<Navbar />);
    const logoutLink = screen.getByText('Logout');

    fireEvent.click(logoutLink);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it('shows contact info in mobile menu', () => {
    mockUseAuth.mockReturnValue({
      isLoading: false,
      isAdmin: false,
      user: null,
      session: null,
    });
    render(<Navbar />);

    fireEvent.click(screen.getByTestId('menu-button'));

    expect(screen.getByText('info@anoo.com')).toBeInTheDocument();
    expect(screen.getByText('+31 6 12345678')).toBeInTheDocument();
  });
});
