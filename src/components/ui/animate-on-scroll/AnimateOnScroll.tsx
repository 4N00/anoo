import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimateOnScroll = forwardRef<HTMLDivElement, AnimateOnScrollProps>(
  ({ children, delay = 0, className }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        data-testid="animate-scroll"
      >
        {children}
      </motion.div>
    );
  }
);

AnimateOnScroll.displayName = 'AnimateOnScroll';

export default AnimateOnScroll; 