import { forwardRef } from 'react';
import { InputContainer, StyledInput, Label, ErrorMessage } from './styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <InputContainer>
        {label && <Label>{label}</Label>}
        <StyledInput ref={ref} {...props} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    );
  }
);

export default Input; 