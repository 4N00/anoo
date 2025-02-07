import styled from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'outline' | 'error';
  $fullWidth?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.contrast};
  border: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  ${({ theme, $variant = 'primary' }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary.main};
          color: ${theme.colors.text.primary};
          border: none;

          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary.dark};
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary.main};
          border: 1px solid ${theme.colors.primary.main};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary.main}10;
          }
        `;
      case 'error':
        return `
          background-color: ${theme.colors.error.main};
          color: ${theme.colors.error.contrast};
          border: none;

          &:hover:not(:disabled) {
            background-color: ${theme.colors.error.dark};
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary.main};
          color: #FFFFFF;
          border: none;

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary.dark};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px
      ${({ theme, $variant = 'primary' }) => {
        switch ($variant) {
          case 'error':
            return `${theme.colors.error.main}40`;
          default:
            return `${theme.colors.primary.main}40`;
        }
      }};
  }
`;

export default StyledButton;
