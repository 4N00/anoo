import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const SectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ProjectContainer = styled(motion.section)<{ className?: string }>`
  ${({ className }) => className && css`
    ${className}
  `}
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ProjectGrid = styled.div<{ $featured?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-top: 1rem;

  ${({ $featured }) => $featured && css`
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  `}

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;