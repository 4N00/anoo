// API Routes
export const API_ROUTES = {
  PROJECTS: '/api/projects',
  AUTH: {
    SIGN_IN: '/api/auth/sign-in',
    SIGN_OUT: '/api/auth/sign-out',
    SESSION: '/api/auth/session',
  },
} as const;

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  ADMIN: {
    DASHBOARD: '/admin',
    PROJECTS: '/admin/projects',
    SETTINGS: '/admin/settings',
  },
  AUTH: {
    LOGIN: '/login',
    RESET_PASSWORD: '/reset-password',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  default: 'An unexpected error occurred. Please try again.',
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  validation: 'Please check your input and try again.',
  server: 'Server error. Please try again later.',
  auth: {
    invalidCredentials: 'Invalid email or password.',
    sessionExpired: 'Your session has expired. Please log in again.',
    emailRequired: 'Email is required.',
    passwordRequired: 'Password is required.',
    invalidEmail: 'Please enter a valid email address.',
    weakPassword: 'Password must be at least 8 characters long.',
  },
  form: {
    required: 'This field is required.',
    minLength: (min: number) => `Must be at least ${min} characters.`,
    maxLength: (max: number) => `Must be no more than ${max} characters.`,
    invalidUrl: 'Please enter a valid URL.',
    invalidImage: 'Please enter a valid image URL.',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  created: 'Successfully created.',
  updated: 'Successfully updated.',
  deleted: 'Successfully deleted.',
  saved: 'Changes saved successfully.',
  auth: {
    signedIn: 'Signed in successfully.',
    signedOut: 'Signed out successfully.',
    passwordReset: 'Password reset email sent.',
  },
} as const;

// Validation Constants
export const VALIDATION = {
  password: {
    minLength: 8,
    maxLength: 100,
  },
  project: {
    title: {
      minLength: 3,
      maxLength: 100,
    },
    description: {
      minLength: 10,
      maxLength: 1000,
    },
    maxTags: 5,
  },
} as const;

// Cache Keys
export const CACHE_KEYS = {
  projects: 'projects',
  featuredProjects: 'featured-projects',
  projectById: (id: string) => `project-${id}`,
  userProfile: 'user-profile',
} as const;

// Rate Limiting
export const RATE_LIMIT = {
  MAX_REQUESTS: 100,
  WINDOW_MS: 60 * 60 * 1000, // 1 hour
} as const;

// Media Breakpoints (in pixels)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'theme-preference',
  authToken: 'auth-token',
  lastVisit: 'last-visit',
} as const;

// File Upload
export const UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  dimensions: {
    maxWidth: 1920,
    maxHeight: 1080,
  },
} as const;

// SEO Constants
export const SEO = {
  defaultTitle: 'Portfolio & Admin Dashboard',
  defaultDescription: 'A modern portfolio showcasing projects with a secure admin dashboard.',
  titleTemplate: '%s | Portfolio & Admin Dashboard',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Portfolio & Admin Dashboard',
  },
} as const;