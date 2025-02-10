'use client';

import CustomCursor from '@/components/custom-cursor/CustomCursor';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const ContentWrapper = styled(motion.div)`
  width: 100%;
  position: relative;
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 100,
    filter: 'blur(14px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 2.4,
      ease: [0.22, 1, 0.36, 1],
      filter: {
        duration: 1,
      },
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(14px)',
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      opacity: {
        duration: 0.6,
      },
      filter: {
        duration: 0.6,
      },
    },
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <CustomCursor />
      <ContentWrapper
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          willChange: 'transform, opacity, filter',
        }}
      >
        {children}
      </ContentWrapper>
    </Container>
  );
} 