import React from 'react';
import { StyledButton, ButtonProps } from './styles';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledButton ref={ref} {...props}>
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export type { ButtonProps };
export default Button; 