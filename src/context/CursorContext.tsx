import React, { createContext, useContext, useState } from 'react';

interface CursorContextType {
  isExpanded: boolean;
  expandCursor: () => void;
  shrinkCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  isExpanded: false,
  expandCursor: () => {},
  shrinkCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expandCursor = () => setIsExpanded(true);
  const shrinkCursor = () => setIsExpanded(false);

  return (
    <CursorContext.Provider value={{ isExpanded, expandCursor, shrinkCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export default CursorProvider; 