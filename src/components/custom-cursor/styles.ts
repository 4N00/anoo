import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CursorWrapper = styled(motion.div)`
  width: 1rem;
  height: 1rem;
  background: rgba(128, 128, 128, 0.8);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;

  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  mix-blend-mode: difference;
  transform-origin: center;
`;

export const ClickText = styled(motion.span)`
  color: white;
  font-size: 0.5rem;
  font-weight: 500;
  opacity: 0;
  position: absolute;

`;