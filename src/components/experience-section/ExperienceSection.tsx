'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  ExperienceContainer,
  ContentWrapper,
  Title,
  Description,
  GridContainer,
  ExperienceGrid,
  ExperienceItem,
  ExperienceInfo,
  ExperienceDate,
  ScrollingTextContainer,
  ScrollingText
} from './styles';
import ExperienceLavaLamp from '../lava-lamp/ExperienceLavaLamp';

const ExperienceSection: React.FC = () => {
  const { t } = useLanguage();
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('left');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('left');
      } else {
        setScrollDirection('right');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const experience = [
    {
      title: 'Anoo Media',
      company: 'Developed a video game using C# in the Unity game engine.',
      period: '05/2024- Present'
    },
    {
      title: 'Touchtribe',
      company: 'Developed Web Apps & UI/UX design.\nTech stack: React, TypeScript, Next.js, Styled components, SCSS, HTML5, Jest.',
      period: '05/2022- 05/2024'
    },
    {
      title: 'Toomba',
      company: 'Developed React Web Apps, Apps & UI/UX design.',
      period: '05/2018- 05/2022'
    },
    {
      title: 'Differ Solutions',
      company: 'Developed Websites & UI/UX design.',
      period: '03/2017- 06/2018'
    },
    {
      title: 'Maxed-On',
      company: 'Developed Websites & UI/UX design.',
      period: '02/2016- 03/2017'
    },
  ];

  const education = [
    {
        title: t('experience.autodidact.title'),
        company: t('experience.autodidact.subtitle'),
        period: t('experience.autodidact.period'),
        description: t('experience.autodidact.description')
    },
    {
      title: 'MBO Graphic Design',
      institution: 'ROC Flevoland',
      period: '2015 - 2016'
    },
    {
      title: 'MBO Interactive Design',
      institution: 'ROC Flevoland',
      period: '2015 - 2016'
    },
    {
      title: 'VMBO Trade & Administration',
      institution: 'ROC Flevoland',
      period: '2002 - 2006'
    }
  ];

  const scrollText = t('experience.scrollingText').repeat(3);

  return (
    <ExperienceContainer id="experience">
      <ExperienceLavaLamp />
      <ScrollingTextContainer>
        <ScrollingText $direction={scrollDirection}>
          <img src="/images/stock-image.png" alt="Stock Image" />
          {scrollText}
        </ScrollingText>
        <ScrollingText $direction={scrollDirection} style={{ marginLeft: '1rem' }}>
          {scrollText}
        </ScrollingText>
      </ScrollingTextContainer>
      <ContentWrapper>
        <Title>{t('experience.title')}</Title>
        <Description>
          <p>{t('experience.description')}</p>
        </Description>
        <GridContainer>
          <ExperienceGrid>
            <h3>{t('experience.workExperience')}</h3>
            {experience.map((item, index) => (
              <ExperienceItem key={index}>
                <ExperienceInfo>
                  <h3>{item.title}</h3>
                  <p>{item.company}</p>
                </ExperienceInfo>
                <ExperienceDate>{item.period}</ExperienceDate>
              </ExperienceItem>
            ))}
          </ExperienceGrid>

          <ExperienceGrid>
            <h3>{t('experience.education')}</h3>
            {education.map((item, index) => (
              <ExperienceItem key={index}>
                <ExperienceInfo>
                  <h3>{item.title}</h3>
                  <p>{item.institution}</p>
                  {item.description && <p>{item.description}</p>}
                </ExperienceInfo>
                <ExperienceDate>{item.period}</ExperienceDate>
              </ExperienceItem>
            ))}
          </ExperienceGrid>
        </GridContainer>
      </ContentWrapper>
    </ExperienceContainer>
  );
};

export default ExperienceSection; 