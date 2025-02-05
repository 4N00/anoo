import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const LanguagesContainer = styled(motion.section)``;
export const LanguagesTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;
export const LanguagesList = styled.ul``;
export const LanguageItem = styled.li``;
export const LanguageName = styled.span``;
export const LanguageLevel = styled.div<{ level: number }>``;