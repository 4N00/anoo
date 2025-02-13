import React, { JSX } from 'react';
import { StyledContainer } from './styles';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  role?: string;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, as, role = 'region', ...props }, ref) => (
    <StyledContainer
      ref={ref}
      as={as}
      className={className}
      role={role}
      {...props}
    >
      {children}
    </StyledContainer>
  )
);

Container.displayName = 'Container';

export default Container; 