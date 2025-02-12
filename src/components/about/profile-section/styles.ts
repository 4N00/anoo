import styled from 'styled-components';
import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';

export const ProfileContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 12rem 0 8rem;
`;

export const BackgroundText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: clamp(150px, 20vw, 300px);
  font-weight: 900;
  line-height: 0.8;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
  display: flex;
  align-items: flex-start;
  padding: 12rem 2rem;
  overflow: hidden;
  user-select: none;
`;

export const ProfileContent = styled(motion(Container))`
  position: relative;
  z-index: 1;
`;

export const ProfileTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  line-height: 0.9;
  margin-bottom: 6rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

export const ProfileText = styled.p`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  line-height: 1.4;
  max-width: 800px;
  margin-bottom: 3rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;