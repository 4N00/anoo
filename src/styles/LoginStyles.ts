import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme, $error }) => 
    $error ? theme.colors.error : theme.colors.background.dark};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.contrast};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.primary.light};
    cursor: not-allowed;
    transform: none;
  }
`;