import styled from 'styled-components';

interface ProjectContainerProps {
  featured?: boolean;
}

export const ProjectContainer = styled.div<ProjectContainerProps>`
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr;
  padding: 0 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: ${props => props.featured ? '1fr' : '1fr 1fr'};
    padding: ${props => props.featured ? '0 2rem' : '0'};
  }
  
  max-height: ${props => props.featured ? '800px' : 'none'};
  overflow: ${props => props.featured ? 'hidden' : 'visible'};
`;

export const ProjectCardWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;

export const ProjectImage = styled.img`
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: scale(1.02);
  }
`;

export const ProjectInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const ProjectCategory = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.gray};
  margin-top: ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;