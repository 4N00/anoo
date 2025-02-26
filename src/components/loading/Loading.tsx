'use client';

import { motion } from 'framer-motion';
import { LoadingContainer, LoadingDot } from './styles';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingDotVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

const loadingDotTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: 'easeInOut',
};

const Loading = () => {
  return (
    <LoadingContainer>
      <motion.div
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
        style={{ display: 'flex' }}
      >
        {[...Array(3)].map((_, index) => (
          <LoadingDot
            key={index}
            variants={loadingDotVariants}
            transition={loadingDotTransition}
          />
        ))}
      </motion.div>
    </LoadingContainer>
  );
};

export default Loading; 