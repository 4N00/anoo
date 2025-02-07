import styled from 'styled-components';
import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const TextAreaWrapper = styled.div<{ fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: 0.25rem;
`;

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    outline: none;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.secondary};
    cursor: not-allowed;
    opacity: 0.7;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  ${({ hasError, theme }) =>
    hasError &&
    `
      border-color: ${theme.colors.error.main};
    `}
`;

const HelperText = styled.span<{ isError?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme, isError }) =>
    isError ? theme.colors.error.main : theme.colors.text.secondary};
  margin-top: 0.25rem;
`;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, fullWidth = false, disabled, ...props }, ref) => {
    const showHelper = error || helperText;

    return (
      <TextAreaWrapper fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        <StyledTextArea
          ref={ref}
          hasError={!!error}
          disabled={disabled}
          aria-invalid={!!error}
          {...props}
        />
        {showHelper && <HelperText isError={!!error}>{error || helperText}</HelperText>}
      </TextAreaWrapper>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
