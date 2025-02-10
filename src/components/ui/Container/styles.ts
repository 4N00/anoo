import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`; 