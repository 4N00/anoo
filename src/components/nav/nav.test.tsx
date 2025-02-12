/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/test-utils/test-utils';
import '@testing-library/jest-dom';
import Navbar from './nav';
import type { User, Session } from '@supabase/supabase-js';
import { stripMotionProps, stripAllProps } from '@/test-utils/mockHelpers';

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

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div {...stripMotionProps(props)}>{children}</div>
    ),
    path: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <path {...stripMotionProps(props)}>{children}</path>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
}));

// Mock styled components
jest.mock('./styles', () => ({
  NavbarContainer: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <nav data-testid="nav" {...stripAllProps(props)}>
      {children}
    </nav>
  ),
  NavbarContent: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="container" {...stripAllProps(props)}>
      {children}
    </div>
  ),
  Logo: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <a data-testid="logo" {...stripAllProps(props)}>
      {children}
    </a>
  ),
  HamburgerButton: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <button data-testid="menu-button" {...stripAllProps(props)}>
      {children}
    </button>
  ),
  Backdrop: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="backdrop" {...stripAllProps(props)}>
      {children}
    </div>
  ),
  MenuOverlay: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="mobile-menu" {...stripAllProps(props)}>
      {children}
    </div>
  ),
  MenuContent: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="menu-content" {...stripAllProps(props)}>
      {children}
    </div>
  ),
  MenuItem: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <a data-testid="menu-item" {...stripAllProps(props)}>
      {children}
    </a>
  ),
  BottomBar: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="bottom-bar" {...stripAllProps(props)}>
      {children}
    </div>
  ),
  LanguageToggle: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="language-toggle" {...stripAllProps(props)}>
      {children}
    </div>
  ),
  LanguageOption: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <button data-testid="language-option" {...stripAllProps(props)}>
      {children}
    </button>
  ),
  ThemeToggle: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <button data-testid="theme-toggle" {...stripAllProps(props)}>
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
    expect(screen.getByText('anoo.nl')).toBeInTheDocument();
  });

  it('renders basic navigation links when not logged in', () => {
    mockUseAuth.mockReturnValue({
      isLoading: false,
      isAdmin: false,
      user: null,
      session: null,
    });
    render(<Navbar />);

    fireEvent.click(screen.getByTestId('menu-button'));

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

    fireEvent.click(screen.getByTestId('menu-button'));

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

    fireEvent.click(screen.getByTestId('backdrop'));
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
    fireEvent.click(screen.getByTestId('menu-button'));
    const logoutLink = screen.getByText('Logout');

    fireEvent.click(logoutLink);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it('shows language toggle in mobile menu', () => {
    mockUseAuth.mockReturnValue({
      isLoading: false,
      isAdmin: false,
      user: null,
      session: null,
    });
    render(<Navbar />);

    fireEvent.click(screen.getByTestId('menu-button'));

    expect(screen.getByTestId('language-toggle')).toBeInTheDocument();
    expect(screen.getAllByTestId('language-option')).toHaveLength(2);
  });
});
