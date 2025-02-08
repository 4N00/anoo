import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 1rem;
  }
`;

export const Section = styled(Container).attrs({ as: 'section' })`
  padding-top: ${({ theme }) => theme.spacing['3xl']};
  padding-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: ${({ theme }) => theme.spacing.xl};
    padding-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

export default Container; 