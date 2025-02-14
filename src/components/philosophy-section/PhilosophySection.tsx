'use client';

import React from 'react';
import { PhilosophyContainer, LeftContent, QuoteContainer, Quote } from './styles';
import AnimateOnScroll from '../animate-on-scroll/AnimateOnScroll';

const PhilosophySection = () => {
  return (
    <AnimateOnScroll>
      <PhilosophyContainer>
        <LeftContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            I build digital experiences that not only work well but feel good to use.
          </p>
          <p>
            Efficiency is important, but I believe the real impact comes from the little details that make an interface intuitive, engaging, and enjoyable. That's what makes people want to come back.
          </p>
        </LeftContent>

        <QuoteContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Quote>
            Good design isn't just about function—it's about creating something that people enjoy using without even thinking about it.
          </Quote>
        </QuoteContainer>
      </PhilosophyContainer>
    </AnimateOnScroll>
  );
};

export default PhilosophySection; 