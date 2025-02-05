import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 100, // Doubled from 50
        damping: 40,   // Doubled from 20
        mass: 0.5      // Halved from 1 to make it faster
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;