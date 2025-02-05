import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset and Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Document */
  :root {
    --max-width: 1200px;
    --font-inter: ${({ theme }) => theme.fonts.body};
    
    /* Prevent adjustments of font size after orientation changes in iOS */
    -webkit-text-size-adjust: 100%;
    /* Enable smooth scrolling */
    scroll-behavior: smooth;
  }

  /* Body */
  body {
    min-height: 100vh;
    line-height: 1.5;
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    line-height: 1.25;
    color: ${({ theme }) => theme.colors.text.primary};
    overflow-wrap: break-word;
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }

  /* Images */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* Forms */
  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }

  /* Remove default button styles */
  button:focus {
    outline: none;
  }

  /* Lists */
  ul, ol {
    list-style: none;
  }

  /* Tables */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Remove animations for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.light};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.text.muted};
    border-radius: ${({ theme }) => theme.borderRadius.sm};

    &:hover {
      background: ${({ theme }) => theme.colors.text.secondary};
    }
  }

  /* Hide scrollbar for non-hover devices */
  @media (hover: none) {
    ::-webkit-scrollbar {
      display: none;
    }
    * {
      scrollbar-width: none;
    }
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary.main}40;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }

  /* Remove Firefox's red outline on required fields */
  input:required {
    box-shadow: none;
  }

  /* Remove spinner buttons from number inputs */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  /* Prevent text size adjustment on orientation change */
  html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  /* Remove tap highlight on mobile */
  * {
    -webkit-tap-highlight-color: transparent;
  }
`;

export default GlobalStyles;