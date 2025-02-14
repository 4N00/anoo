import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const ProjectContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg} 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg} 1rem;
  }
`;

export const ProjectGrid = styled.div`
  display: grid;
  gap: 12rem;
  grid-template-columns: 1fr;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const ProjectCardWrapper = styled(motion.div)`
  position: relative;
  width: 70%;
  margin: 0 auto;
  cursor: pointer;
  overflow: visible;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    margin-bottom: 2rem;
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
  font-family: "Neue Machina", sans-serif;
  font-size: clamp(2rem, 8vw, 8rem);
  font-weight: 700;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  letter-spacing: -0.02em;
  white-space: nowrap;
  padding: 0;
  mix-blend-mode: difference;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 100%;
  text-align: center;
  pointer-events: none;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(1.5rem, 6vw, 4rem);
  }
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
