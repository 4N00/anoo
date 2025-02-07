'use client';

import React from 'react';
import { ProfileContainer, ProfileContent, ProfileTitle, ProfileText } from './styles';

const ProfileSection: React.FC = () => {
  return (
    <ProfileContainer>
      <ProfileContent>
        <ProfileTitle>About Me</ProfileTitle>
        <ProfileText>
          I'm a creative developer and designer with a passion for building digital experiences
          that combine innovative technology with thoughtful design. With expertise in both
          frontend development and UI/UX design, I create solutions that are not only
          visually appealing but also highly functional and user-friendly.
        </ProfileText>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfileSection;