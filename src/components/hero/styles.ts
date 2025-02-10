import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from '@/components/ui/container/Container';

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
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing['3xl']};
  padding-bottom: ${({ theme }) => theme.spacing['3xl']};
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  width: 100%;
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
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  border-bottom: 1px solid currentColor;
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  transition: color ${({ theme }) => theme.transitions.normal};
  will-change: transform, opacity;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;