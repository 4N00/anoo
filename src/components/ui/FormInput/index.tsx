import React, { forwardRef } from 'react';
import { FormInputContainer, StyledInput, Label, ErrorMessage } from './styles';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <FormInputContainer className={className}>
        {label && <Label>{label}</Label>}
        <StyledInput ref={ref} $hasError={!!error} {...props} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormInputContainer>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
export type { FormInputProps }; 