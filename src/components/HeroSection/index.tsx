'use client';

import React, { useState, useCallback } from 'react';
import { Section, ContentWrapper, LetterContainer, Letter, Subtitle, StyledLink, SVGFilters } from './styles';

const HeroSection: React.FC = () => {
  const title = ["HI,", "I'M", "ANOO."];
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <Section>
      <SVGFilters>
        <svg>
          <defs>
            <filter id="warpFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0" result="blur">
                <animate
                  attributeName="stdDeviation"
                  from="0"
                  to="0.5"
                  dur="0.3s"
                  begin="0s"
                  fill="freeze"
                />
              </feGaussianBlur>

              <feTurbulence
                type="turbulence"
                baseFrequency="0.01 0.01"
                numOctaves="1"
                seed="1"
                result="turbulence1"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="1s"
                  values="0.01 0.01;0.02 0.02;0.01 0.01"
                  repeatCount="indefinite"
                />
              </feTurbulence>

              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence1"
                scale="0"
                result="displacement1"
              >
                <animate
                  attributeName="scale"
                  from="0"
                  to="25"
                  dur="0.3s"
                  begin="0s"
                  fill="freeze"
                />
              </feDisplacementMap>

              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015"
                numOctaves="2"
                seed="2"
                stitchTiles="stitch"
                result="turbulence2"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="2s"
                  values="0.015;0.025;0.015"
                  repeatCount="indefinite"
                />
              </feTurbulence>

              <feDisplacementMap
                in="displacement1"
                in2="turbulence2"
                xChannelSelector="R"
                yChannelSelector="G"
                scale="0"
                result="displacement2"
              >
                <animate
                  attributeName="scale"
                  from="0"
                  to="15"
                  dur="0.3s"
                  begin="0s"
                  fill="freeze"
                />
              </feDisplacementMap>

              <feOffset in="displacement2" dx="0" dy="0" result="offsetText">
                <animate
                  attributeName="dx"
                  from="0"
                  to={mousePos.x - 50}
                  dur="0.3s"
                  fill="freeze"
                />
                <animate
                  attributeName="dy"
                  from="0"
                  to={mousePos.y - 50}
                  dur="0.3s"
                  fill="freeze"
                />
              </feOffset>

              <feComposite
                in="offsetText"
                in2="SourceGraphic"
                operator="arithmetic"
                k1="1"
                k2="0"
                k3="0"
                k4="0"
              />
            </filter>
          </defs>
        </svg>
      </SVGFilters>
      <ContentWrapper onMouseMove={handleMouseMove}>
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
          Scroll to see some of my work - contact me if you like what i do.
        </Subtitle>
        <StyledLink
          href="/about"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          LEARN MORE ABOUT ME
        </StyledLink>
      </ContentWrapper>
    </Section>
  );
};

export default HeroSection;