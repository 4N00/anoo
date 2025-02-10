import React from 'react';
import { StyledContainer } from './styles';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <StyledContainer className={className}>{children}</StyledContainer>;
};

export default Container; 