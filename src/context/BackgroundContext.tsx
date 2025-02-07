'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

interface BackgroundContextType {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
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
  z-index: -1;
  opacity: ${props => props.$isHome ? 1 : 0};
  pointer-events: none;
`;

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Reset background color when leaving home page
  useEffect(() => {
    if (!isHome) {
      setBackgroundColor('#FFFFFF');
    }
  }, [isHome]);

  return (
    <BackgroundContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      <PageBackground $bgColor={backgroundColor} $isHome={isHome} />
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