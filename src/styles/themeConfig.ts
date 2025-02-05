import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: {
      main: '#0070f3',
      light: '#3291ff',
      dark: '#0050af',
      contrast: '#ffffff'
    },
    secondary: {
      main: '#7928ca',
      light: '#9c4ddb',
      dark: '#5c1e9e',
      contrast: '#ffffff'
    },
    background: {
      primary: '#ffffff',
      secondary: '#f7f7f7',
      main: '#ffffff',
      light: '#f7f7f7',
      dark: '#000000'
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
      muted: '#999999'
    },
    error: {
      main: '#ff0000',
      light: '#ff3333',
      dark: '#cc0000',
      contrast: '#ffffff'
    },
    success: {
      main: '#0070f3',
      light: '#3291ff',
      dark: '#0050af',
      contrast: '#ffffff'
    },
    warning: {
      main: '#f5a623',
      light: '#f7b955',
      dark: '#c48619',
      contrast: '#ffffff'
    },
    info: {
      main: '#0070f3',
      light: '#3291ff',
      dark: '#0050af',
      contrast: '#ffffff'
    }
  },
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      hero: 'clamp(1.5rem, 10vw, 12rem)',
      heroSubtitle: 'clamp(1.5rem, 2vw, 2rem)'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em'
    }
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    h1: 'Inter, system-ui, sans-serif',
    heading: 'Josefin Sans, system-ui, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '4rem',
    '3xl': '8rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)'
  },
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    header: 900,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    toast: 1500
  }
};