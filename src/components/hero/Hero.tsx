'use client';

import React, { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Section, ContentWrapper, LetterContainer, Letter, Subtitle, StyledLink } from './styles';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  // Memoize title array to prevent unnecessary recalculations
  const title = useMemo(() => [t('hero.greeting'), t('hero.introduction'), t('hero.name')], [t]);

  // Optimize animation timings
  const getAnimationDelay = (wordIndex: number, charIndex: number, wordLength: number) => {
    return (wordIndex * wordLength + charIndex) * 0.03; // Reduced from 0.05
  };

  return (
    <Section>
      <ContentWrapper>
        {title.map((word, wordIndex) => (
          <LetterContainer
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: wordIndex * 0.1 }}
          >
            {word.split('').map((char, charIndex) => (
              <Letter
                key={charIndex}
                data-extra-space={char === ',' || char === '.' ? false : charIndex === word.length - 1}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.3,
                  delay: getAnimationDelay(wordIndex, charIndex, word.length),
                  ease: 'easeOut'
                }}
              >
                {char}
              </Letter>
            ))}
          </LetterContainer>
        ))}
        <Subtitle
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
        >
          {t('hero.subtitle')}
        </Subtitle>
        <StyledLink
          href="/about"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6, ease: 'easeOut' }}
          onMouseEnter={(e) => {
            const target = e.currentTarget;
            target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget;
            target.style.transform = 'translateY(0)';
          }}
        >
          {t('hero.cta')}
        </StyledLink>
      </ContentWrapper>
    </Section>
  );
};

export default HeroSection;