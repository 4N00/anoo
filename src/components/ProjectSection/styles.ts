import styled from 'styled-components';

export const SectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ProjectsGrid = styled.div<{ featured?: boolean }>`
  display: grid;
  grid-template-columns: ${({ featured }) => featured ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))'};
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;