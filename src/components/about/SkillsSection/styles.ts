import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const SkillsContainer = styled(motion.section)``;
export const SkillsTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;
export const SkillsGrid = styled.div``;
export const SkillItem = styled.div``;
export const SkillName = styled.span``;
export const SkillLevel = styled.div<{ level: number }>``;
export const SkillPercentage = styled.span``;