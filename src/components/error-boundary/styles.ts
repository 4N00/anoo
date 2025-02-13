import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.error};
`;

export const Message = styled.p`
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
`;

export const Button = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer !important;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`; 