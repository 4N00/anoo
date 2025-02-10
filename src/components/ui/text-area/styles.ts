import styled, { css } from 'styled-components';

export const TextAreaContainer = styled.div<{ className?: string }>`
  ${({ className }) => className && css`
    ${className}
  `}
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

interface StyledTextAreaProps {
  $hasError?: boolean;
  className?: string;
}

export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  ${({ className }) => className && css`
    ${className}
  `}
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.text.secondary}40;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;

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

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`; 