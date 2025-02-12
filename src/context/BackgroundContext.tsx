'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/styles/theme';
import TrefoilKnot from '@/components/trefoil-knot/TrefoilKnot';

interface BackgroundContextType {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  showTrefoil: boolean;
  setShowTrefoil: (show: boolean) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

const PageBackground = styled.div<{ $bgColor: string; $isHome: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme, $bgColor }) => $bgColor === '#f5f5f5' ? theme.colors.background.primary : $bgColor};
  transition: background-color 0.6s ease;
  z-index: -1000;
  opacity: ${props => props.$isHome ? 1 : 0};
  pointer-events: none;
`;

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isDark, theme } = useTheme();
  const [backgroundColor, setBackgroundColor] = useState(theme.colors.background.primary);
  const [showTrefoil, setShowTrefoil] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Reset background color when leaving home page or theme changes
  useEffect(() => {
    if (!isHome) {
      setBackgroundColor(theme.colors.background.primary);
      setShowTrefoil(false);
    } else {
      setShowTrefoil(true);
      // Only reset if it's the default color
      if (backgroundColor === theme.colors.background.primary) {
        setBackgroundColor(theme.colors.background.primary);
      }
    }
  }, [isHome, isDark, theme.colors.background.primary, backgroundColor]);

  return (
    <BackgroundContext.Provider value={{ backgroundColor, setBackgroundColor, showTrefoil, setShowTrefoil }}>
      <PageBackground $bgColor={backgroundColor} $isHome={isHome} />
      {showTrefoil && <TrefoilKnot />}
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}; 