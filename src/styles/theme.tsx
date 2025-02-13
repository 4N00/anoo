'use client';

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import { lightTheme, darkTheme } from './themeConfig';

const THEME_STORAGE_KEY = 'theme';

function getStoredTheme(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark';
  } catch {
    return false;
  }
}

function setStoredTheme(isDark: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  } catch {
    // Ignore storage errors
  }
}

type ThemeContextType = {
  theme: DefaultTheme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: 'light' | 'dark';
}

export function ThemeProvider({ children, initialTheme = 'light' }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return initialTheme === 'dark';
    return getStoredTheme();
  });
  
  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newTheme = !prev;
      setStoredTheme(newTheme);
      return newTheme;
    });
  }, []);

  const currentTheme = useMemo(() => isDark ? darkTheme : lightTheme, [isDark]);

  const contextValue = useMemo(() => ({
    theme: currentTheme,
    isDark,
    toggleTheme
  }), [currentTheme, isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={currentTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Export themes if needed elsewhere
export { lightTheme, darkTheme };