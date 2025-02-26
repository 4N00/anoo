import styled from 'styled-components';
import { motion } from 'framer-motion';

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
`;

export const LoadingDot = styled(motion.span)`
  width: 12px;
  height: 12px;
  margin: 0 4px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: block;
`; 