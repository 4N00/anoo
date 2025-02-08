import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ProjectContainerProps {
  $featured?: boolean;
}

export const ProjectContainer = styled.div<ProjectContainerProps>`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg} 0;
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

interface ProjectCardWrapperProps {
  $featured?: boolean;
}

export const ProjectCardWrapper = styled(motion.div)<ProjectCardWrapperProps>`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: transform 0.3s ease;

  ${({ $featured, theme }) => $featured && `
    grid-column: span 2;
    @media (max-width: ${theme.breakpoints.md}) {
      grid-column: span 1;
    }
  `}

  &:hover {
    transform: scale(1.02);

    .effect-container {
      opacity: 1;
    }
  }
`;

export const ProjectImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
`;

export const ProjectImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.loaded {
    opacity: 1;
  }
`;

export const ProjectInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.contrast};
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  z-index: 1;
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  color: ${({ theme }) => theme.colors.text.contrast};
`;

export const ProjectCategory = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.contrast};
  opacity: 0.8;
`;

export const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: 0;
  color: ${({ theme }) => theme.colors.text.contrast};
  opacity: 0.9;
`;
