import React, { useEffect, useState } from 'react';
import { AnimatePresence, useSpring } from 'framer-motion';
import { CursorWrapper, ClickText } from './styles';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 15, stiffness: 1000, mass: 0.05 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const scale = useSpring(1, { damping: 20, stiffness: 400, mass: 0.1 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      x.set(e.clientX + -14);
      y.set(e.clientY + -73);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const projectCard = target.closest('[data-testid="project-card"]');

      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'IMG' ||
        target.tagName === 'SVG' ||
        target.tagName === 'PROJECTCARDWRAPPER' ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        projectCard
      ) {
        setIsHovering(true);
        scale.set(5);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      scale.set(1);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [x, y, scale]);

  return (
    <CursorWrapper
      style={{
        x,
        y,
        scale,
      }}
    >
      <AnimatePresence>
        {isHovering && (
          <ClickText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <span>+</span>
          </ClickText>
        )}
      </AnimatePresence>
    </CursorWrapper>
  );
};

export default CustomCursor;
