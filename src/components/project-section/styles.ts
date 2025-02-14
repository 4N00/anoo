import styled from 'styled-components';

export const SectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ProjectContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 20rem auto;
  padding: ${({ theme }) => theme.spacing.lg} 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg} 1rem;
    margin: 3rem auto 5rem;

  }
`;

export const ProjectGrid = styled.div`
  display: grid;
  gap: 12rem;
  grid-template-columns: 1fr;
`;
