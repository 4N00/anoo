'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
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
  background-color: ${props => props.$bgColor};
  transition: background-color 0.6s ease;
  z-index: -1000;
  opacity: ${props => props.$isHome ? 1 : 0};
  pointer-events: none;
`;

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('#f5f5f5');
  const [showTrefoil, setShowTrefoil] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Reset background color when leaving home page
  useEffect(() => {
    if (!isHome) {
      setBackgroundColor('#f5f5f5');
      setShowTrefoil(false);
    } else {
      setShowTrefoil(true);
    }
  }, [isHome]);

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