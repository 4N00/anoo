import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string;
        light: string;
        dark: string;
        contrast: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
        contrast: string;
      };
      background: {
        primary: string;
        secondary: string;
        main: string;
        light: string;
        dark: string;
      };
      text: {
        primary: string;
        secondary: string;
        muted: string;
      };
      error: {
        main: string;
        light: string;
        dark: string;
        contrast: string;
      };
      success: {
        main: string;
        light: string;
        dark: string;
        contrast: string;
      };
      warning: {
        main: string;
        light: string;
        dark: string;
        contrast: string;
      };
      info: {
        main: string;
        light: string;
        dark: string;
        contrast: string;
      };
      card: {
        background: string;
        hover: string;
      };
    };
    typography: {
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        hero: string;
        heroSubtitle: string;
      };
      fontWeight: {
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      lineHeight: {
        none: number;
        tight: number;
        normal: number;
        relaxed: number;
      };
      letterSpacing: {
        tighter: string;
        tight: string;
        normal: string;
        wide: string;
        wider: string;
      };
    };
    fonts: {
      body: string;
      h1: string;
      heading: string;
      mono: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    borderRadius: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
    zIndex: {
      hide: number;
      auto: string | number;
      base: number;
      header: number;
      dropdown: number;
      sticky: number;
      fixed: number;
      modal: number;
      popover: number;
      toast: number;
    };
  }
}