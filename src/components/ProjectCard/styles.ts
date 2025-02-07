import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ProjectContainerProps {
  $featured?: boolean;
}

export const ProjectContainer = styled.div<ProjectContainerProps>`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const ProjectGrid = styled.div<ProjectContainerProps>`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: ${({ $featured }) => ($featured ? '1fr' : 'repeat(2, 1fr)')};
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCardWrapper = styled(motion.div)`
  width: 100%;
  cursor: pointer;
`;

export const ProjectImage = styled(motion.img)`
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
  color: ${({ theme }) => theme.colors.text.primary};

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
