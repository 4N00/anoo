import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const SkillsContainer = styled.div`
  width: 100%;
  padding: 4rem 0;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 1rem;
  }
`;

export const SkillItem = styled.div`
  width: 100%;
  padding: 1rem 0;
  position: relative;
  border-left: 4px solid ${({ theme }) => theme.colors.text.primary};
  opacity: 0;
  transform: translateX(-10px);
  animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--delay, 0s);

  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

interface SkillNameProps {
  $level: number;
}

export const SkillName = styled.div<SkillNameProps>`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 600;
  margin-bottom: 0.75rem;
  padding-left: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:after {
    content: '${({ $level }) => ($level / 10).toFixed(1)}/10';
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const SkillBar = styled.div`
  width: 100%;
  height: 3.5rem;
  background: rgba(0, 0, 0, 0.1);
  overflow: visible;
  position: relative;
`;

interface SkillLevelProps {
  $level: number;
}

export const SkillLevel = styled(motion.div)<SkillLevelProps>`
  width: 0%;
  height: 100%;
  background: ${({ theme }) => theme.colors.text.primary};
  will-change: width;
  animation: fillBar 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--delay, 0.8s);
  position: relative;

  @keyframes fillBar {
    from { width: 0%; }
    to { width: ${({ $level }) => Math.min($level, 100)}%; }
  }

  ${({ $level }) => $level > 100 && css`
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 100%;
      width: 20%;
      height: 100%;
      background: #ff3333;
      animation: pulse 2s ease-in-out infinite;
      box-shadow: 
        0 0 10px #ff3333,
        0 0 20px #ff3333,
        0 0 30px #ff3333;
      opacity: 0.8;
      z-index: 10;
    }

    @keyframes pulse {
      0% { opacity: 0.4; box-shadow: 0 0 10px #ff3333, 0 0 20px #ff3333; }
      50% { opacity: 0.9; box-shadow: 0 0 15px #ff3333, 0 0 30px #ff3333, 0 0 45px #ff3333; }
      100% { opacity: 0.4; box-shadow: 0 0 10px #ff3333, 0 0 20px #ff3333; }
    }
  `}
`;

export const SkillsTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SkillIcon = styled.img`
  display: none;
`;

export const SkillPercentage = styled.span`
  display: none;
`;

export const SkillNameText = styled.span`
  display: none;
`;

export const ProgressContainer = styled(motion.div)`
  display: none;
`;

export const ProgressBar = styled(motion.div)`
  display: none;
`;
