import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

interface StyledTextAreaProps {
  $hasError?: boolean;
}

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  width: 100%;
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.text.secondary}40;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${({ theme }) => theme.colors.error.main};
      &:focus {
        border-color: ${({ theme }) => theme.colors.error.main};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.error.main}20;
      }
    `}
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <TextAreaContainer>
        {label && <Label>{label}</Label>}
        <StyledTextArea ref={ref} $hasError={!!error} {...props} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </TextAreaContainer>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
export type { TextAreaProps }; 