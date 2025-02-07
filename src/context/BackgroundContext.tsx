'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import styled from 'styled-components';

interface BackgroundContextType {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

const PageBackground = styled.div<{ $bgColor: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.$bgColor};
  transition: background-color 0.6s ease;
  z-index: -1;
`;

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  return (
    <BackgroundContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      <PageBackground $bgColor={backgroundColor} />
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