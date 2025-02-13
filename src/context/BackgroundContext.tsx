'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useTheme } from '@/styles/theme';

interface BackgroundContextType {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useTheme();
  const [backgroundColor, setBackgroundColor] = useState(isDark ? '#121212' : '#FFFFFF');

  const handleBackgroundColor = useCallback((color: string) => {
    setBackgroundColor(color);
  }, []);

  return (
    <BackgroundContext.Provider
      value={{
        backgroundColor,
        setBackgroundColor: handleBackgroundColor,
      }}
    >
      <div style={{ backgroundColor, transition: 'background-color 0.3s ease' }}>
        {children}
      </div>
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