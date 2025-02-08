'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProfileSection from '../components/about/ProfileSection';
import SkillsSection from '../components/about/SkillsSection';
import { PageContainer, ContentWrapper } from '../styles/AboutStyles';

const About = () => {
  const { t } = useLanguage();

  const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
    { name: 'Sass/Scss', level: 80 },
    { name: 'Animation (CSS/JS)', level: 75 },
    { name: 'C#', level: 70 },
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 85 },
    { name: 'UI/UX', level: 90 },
    { name: 'Adobe Photoshop', level: 85 },
    { name: 'Adobe Illustrator', level: 90 },
    { name: 'Adobe XD', level: 75 },
    { name: 'Wordpress', level: 80 },
    { name: 'Headless CMS', level: 70 },
    { name: 'Unity', level: 85 },
    { name: 'Three.js', level: 65 },
    { name: 'Humor', level: 95 },
  ];

  return (
    <PageContainer>
      <ContentWrapper>
        <h1>{t('about.title')}</h1>
        <p>{t('about.description')}</p>
        <ProfileSection />
        <SkillsSection skills={skills} />
      </ContentWrapper>
    </PageContainer>
  );
};

export default About;
