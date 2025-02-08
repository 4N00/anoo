'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ProfileContainer, 
  ProfileContent, 
  ProfileTitle, 
  ProfileText,
  BackgroundText 
} from './styles';

const ProfileSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ProfileContainer>
      <BackgroundText>ABOUT ME.</BackgroundText>
      <ProfileContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProfileTitle>{t('about.title')}</ProfileTitle>
        <ProfileText>{t('about.description')}</ProfileText>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfileSection;