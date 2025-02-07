import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SkillsTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SkillsGrid = styled.div``;

export const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SkillIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const SkillPercentage = styled.span``;

export const SkillName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SkillNameText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a1a1a;
  padding: 0.5rem 0;
  display: block;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const ProgressContainer = styled(motion.div)`
  height: 3.5rem;
  background: #f5f5f5;
  width: 100%;
  border: 1px solid #dedede;

  @media (max-width: 768px) {
    height: 2.5rem;
  }
`;

export const ProgressBar = styled(motion.div)`
  height: 100%;
  background: #e8e8e8;
`;

export const SkillLevel = styled.div<{ level: number }>`
  margin-top: 0.5rem;
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;
