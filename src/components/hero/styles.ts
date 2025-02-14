import styled, { keyframes } from 'styled-components';
import Container from '@/components/container/Container';
import { motion } from 'framer-motion';

export const SVGFilters = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  opacity: 0;

  svg {
    position: absolute;
    width: 0;
    height: 0;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing['3xl']};
  padding-bottom: ${({ theme }) => theme.spacing['3xl']};
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  width: 100%;
  overflow: hidden;
  margin-top: 15rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 10rem;
  }
`;

const scrollText = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const HeadingWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
`;

export const ScrollingText = styled.div`  
  display: flex;
  animation: ${scrollText} 180s linear infinite;
  white-space: nowrap;
`;

export const Heading = styled(motion.h1)`
  font-family: "Neue Machina", sans-serif;
  font-size: clamp(4rem, 20vw, 16rem);
  font-weight: 700;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  letter-spacing: -0.02em;
  white-space: nowrap;
  padding: 0 1rem;
`;

export const ContentWrapper = styled(Container)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base + 10};
  transform: translateZ(0);
  will-change: transform;
  transform-style: preserve-3d;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;

export const LetterContainer = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow: visible;
  will-change: transform;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  margin-right: ${({ theme }) => theme.spacing.lg};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;

  &:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
    margin-right: 0;
  }
`;

export const Letter = styled(motion.span)`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1.5rem, 10vw, 12rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.none};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tighter};
  margin-right: var(--letter-spacing, 0.02em);
  will-change: transform, opacity;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.4s ease;

  &[data-extra-space='true'] {
    --letter-spacing: 0.3em;
  }
`;

export const Subtitle = styled(motion.p)`
  font-family: "Ppmori", sans-serif;
  font-size: ${({ theme }) => theme.typography.fontSize.heroSubtitle};
  max-width: 600px;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  will-change: transform, opacity;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
`;

export const StyledLink = styled(motion.a)`
  display: inline-block;
  font-family: "Ppmori", sans-serif;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  border-bottom: 1px solid currentColor;
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  transition: all 0.3s ease;
  will-change: transform, opacity;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
    transform: translateY(-2px);
  }
`;