import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ 
  children, 
  delay = 0,
  className 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay
        }
      });
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll; 