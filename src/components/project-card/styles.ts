import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectContainerProps {
  $featured?: boolean;
}

export const ProjectContainer = styled.div<ProjectContainerProps>`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg} 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg} 1rem;
  }
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

export const ProjectCardWrapper = styled(motion.div)<ProjectContainerProps>`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: transform 0.3s ease;
  grid-column: ${({ $featured }) => $featured ? 'span 2' : 'span 1'};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 1;
  }

  &:hover {
    transform: scale(1.02);
  }
`;

export const ProjectImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const ProjectImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProjectCardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

export const ProjectInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
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
  color: white;
`;

export const ProjectCategory = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  opacity: 0.8;
  color: white;
`;

export const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: 0;
  opacity: 0.9;
  color: white;
`;

export const BlurImage = styled(Image)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  transition: opacity 0.5s ease-in-out;
  transform: translateZ(0);
  will-change: opacity;
`;
