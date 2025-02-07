'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        width: '100%',
        minHeight: '100vh',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
}