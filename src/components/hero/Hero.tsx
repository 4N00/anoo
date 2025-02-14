'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Section, 
  ContentWrapper, 
  HeadingWrapper,
  ScrollingText,
  Heading, 
  Subtitle, 
  StyledLink 
} from './styles';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const text = t('hero.heading');
  // Duplicate text to create seamless loop
  const repeatedText = `${text} • ${text} • ${text} • `;

  return (
    <Section>
      <HeadingWrapper>
        <ScrollingText>
          <Heading>{repeatedText}</Heading>
          <Heading>{repeatedText}</Heading>
        </ScrollingText>
      </HeadingWrapper>
      <ContentWrapper>
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
        >
          {t('hero.cta')}
        </StyledLink>
      </ContentWrapper>
    </Section>
  );
};

export default HeroSection;