'use client';

import React from 'react';
import { styled } from 'styled-components';

export const TooltipContainer = styled.div``;
export const TooltipContent = styled.div``;
export const TooltipTrigger = styled.button``;
export const TooltipRoot = styled.div``;

interface TooltipProviderProps {
  children: React.ReactNode;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return (
    <TooltipRoot>
      {children}
    </TooltipRoot>
  );
};