import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.22, 1, 0.36, 1]
        }
      });
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={controls}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll; 