import { DefaultTheme } from 'styled-components';

// Convert breakpoint string to number
const getBreakpointValue = (breakpoint: string): number =>
  Number(breakpoint.replace(/[^\d]/g, ''));

// Create media query helper
const createMediaQuery = (breakpoint: string, type: 'min' | 'max' = 'min') =>
  `@media screen and (${type}-width: ${breakpoint})`;

// Media query functions
export const media = {
  up: (breakpoint: keyof DefaultTheme['breakpoints']) => (
    theme: DefaultTheme
  ): string => createMediaQuery(theme.breakpoints[breakpoint]),

  down: (breakpoint: keyof DefaultTheme['breakpoints']) => (
    theme: DefaultTheme
  ): string =>
    createMediaQuery(
      `${getBreakpointValue(theme.breakpoints[breakpoint]) - 0.02}px`,
      'max'
    ),

  between: (
    start: keyof DefaultTheme['breakpoints'],
    end: keyof DefaultTheme['breakpoints']
  ) => (theme: DefaultTheme): string => {
    const minWidth = theme.breakpoints[start];
    const maxWidth = `${getBreakpointValue(theme.breakpoints[end]) - 0.02}px`;
    return `@media screen and (min-width: ${minWidth}) and (max-width: ${maxWidth})`;
  },

  only: (breakpoint: keyof DefaultTheme['breakpoints']) => (
    theme: DefaultTheme
  ): string => {
    const breakpoints = Object.keys(theme.breakpoints) as Array<
      keyof DefaultTheme['breakpoints']
    >;
    const index = breakpoints.indexOf(breakpoint);
    const nextBreakpoint = breakpoints[index + 1];

    return nextBreakpoint
      ? media.between(breakpoint, nextBreakpoint)(theme)
      : media.up(breakpoint)(theme);
  },
};

// Breakpoint hooks for styled-components
export const breakpoints = {
  sm: (styles: string) => (theme: DefaultTheme) =>
    `${media.up('sm')(theme)} { ${styles} }`,
  md: (styles: string) => (theme: DefaultTheme) =>
    `${media.up('md')(theme)} { ${styles} }`,
  lg: (styles: string) => (theme: DefaultTheme) =>
    `${media.up('lg')(theme)} { ${styles} }`,
  xl: (styles: string) => (theme: DefaultTheme) =>
    `${media.up('xl')(theme)} { ${styles} }`,
  '2xl': (styles: string) => (theme: DefaultTheme) =>
    `${media.up('2xl')(theme)} { ${styles} }`,
};

// Usage example:
/*
import styled from 'styled-components';
import { breakpoints } from './media';

const ResponsiveComponent = styled.div\`
  width: 100%;
  
  \${breakpoints.sm\`
    width: 50%;
  \`}
  
  \${breakpoints.md\`
    width: 33.33%;
  \`}
  
  \${breakpoints.lg\`
    width: 25%;
  \`}
  
  // Or using media directly
  \${({ theme }) => media.up('xl')(theme)} {
    width: 20%;
  }
  
  // Between breakpoints
  \${({ theme }) => media.between('sm', 'lg')(theme)} {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }
  
  // Only at specific breakpoint
  \${({ theme }) => media.only('md')(theme)} {
    padding: ${({ theme }) => theme.space.lg};
  }
\`;
*/