import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SkillsContainer = styled.div`
  width: 100%;
  padding: 4rem 0;
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const SkillItem = styled.div`
  width: 100%;
`;

export const SkillName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SkillBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

interface SkillLevelProps {
  $level: number;
}

export const SkillLevel = styled.div<SkillLevelProps>`
  width: ${({ $level }) => $level}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.text.primary};
  border-radius: 2px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const SkillsTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SkillIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const SkillPercentage = styled.span``;

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
