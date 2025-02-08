import styled, { DefaultTheme } from 'styled-components';

const baseInputStyles = (theme: DefaultTheme) => `
  width: 100%;
  padding: 1.2rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.lg};
  transition: all 0.3s ease;

  &::placeholder {
    color: ${theme.colors.text.muted};
    opacity: 0.6;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.text.primary};
    background: rgba(255, 255, 255, 0.02);
  }

  &:hover {
    border-color: ${theme.colors.text.secondary};
  }
`;

export const StyledInput = styled.input`
  ${({ theme }) => baseInputStyles(theme)}
`;

export const StyledTextarea = styled.textarea`
  ${({ theme }) => baseInputStyles(theme)}
  resize: vertical;
  min-height: 150px;
`; 