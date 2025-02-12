import React from 'react';
import { ButtonProps, StyledButton } from './styles';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <StyledButton ref={ref} {...props}>
      {children}
    </StyledButton>
  )
);

Button.displayName = 'Button';

export default Button; 