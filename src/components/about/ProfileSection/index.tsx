'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ProfileContainer, ProfileContent, ProfileTitle, ProfileText } from './styles';

const ProfileSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ProfileContainer>
      <ProfileContent>
        <ProfileTitle>{t('about.title')}</ProfileTitle>
        <ProfileText>{t('about.description')}</ProfileText>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfileSection;