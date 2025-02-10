'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Section, ContentWrapper, LetterContainer, Letter, Subtitle, StyledLink } from './styles';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const title = [t('hero.greeting'), t('hero.introduction'), t('hero.name')];

  return (
    <Section>
      <ContentWrapper>
        {title.map((word, wordIndex) => (
          <LetterContainer
            key={wordIndex}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: wordIndex * 0.2 }}
          >
            {word.split('').map((char, charIndex) => (
              <Letter
                key={charIndex}
                data-extra-space={char === ',' || char === '.' ? false : charIndex === word.length - 1}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: (wordIndex * word.length + charIndex) * 0.05 }}
              >
                {char}
              </Letter>
            ))}
          </LetterContainer>
        ))}
        <Subtitle
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {t('hero.subtitle')}
        </Subtitle>
        <StyledLink
          href="/about"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {t('hero.cta')}
        </StyledLink>
      </ContentWrapper>
    </Section>
  );
};

export default HeroSection;