import React from 'react';
import { HeroContainer, HeroContent, HeroTitle, HeroSubtitle } from './styles';

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>Creative Developer & Designer</HeroTitle>
        <HeroSubtitle>Building digital experiences that matter</HeroSubtitle>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;