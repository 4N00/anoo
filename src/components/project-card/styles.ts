import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const ProjectImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.secondary};

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
  }
`;

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
  gap: 20rem;
  grid-template-columns: 1fr;
  margin-top: 20rem;
  margin-bottom: 20rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

export const ProjectCardWrapper = styled(motion.div)`
  position: relative;
  width: 70%;
  max-width: 40rem;
  margin: 0 auto;
  cursor: none;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.background.secondary};
  transform-style: preserve-3d;
  will-change: transform, opacity;
  box-shadow: 0 20px 80px -20px rgba(0, 0, 0, 0.3);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.02) translateY(-10px) !important;

    ${ProjectImageWrapper} {
      &:after {
        opacity: 1;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

export const ProjectInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  z-index: 2;
  transform: translateZ(50px);
`;

export const ProjectTitle = styled.h3`
  font-family: "Neue Machina", sans-serif;
  font-size: 12rem;
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
  z-index: 3;
  text-align: center;
  pointer-events: none;
  width: 150%;
  opacity: 0;
  transform: translate(-50%, -30%);
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.visible {
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(1.5rem, 6vw, 4rem);
    width: 120%;
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

export const ProjectCardContainer = styled.div`
  position: relative;
`;
