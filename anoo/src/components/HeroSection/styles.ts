import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Letter = styled(motion.span)`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1.5rem, 8vw, 6rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.none};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tighter};
  margin-right: var(--letter-spacing, 0.02em);
  will-change: transform, opacity;
  color: ${({ theme }) => theme.colors.text.primary};

  &[data-extra-space="true"] {
    --letter-spacing: 0.3em;
  }
`;

export const Section = styled.section`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base + 10};
  max-width: 600px;
  margin-left: ${({ theme }) => theme.spacing['2xl']};
`;

export const LetterContainer = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow: hidden;
  will-change: transform;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  margin-right: ${({ theme }) => theme.spacing.lg};
  
  &:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
    margin-right: 0;
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