import React from 'react';
import { motion } from 'framer-motion';
import {
  ProfileContainer,
  ProfileContent,
  ProfileTitle,
  ProfileDescription,
  ProfileImage
} from './styles';

interface ProfileSectionProps {
  variants?: any;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ variants }) => {
  return (
    <ProfileContainer variants={variants}>
      <ProfileContent>
        <ProfileTitle>About Me</ProfileTitle>
        <ProfileDescription>
          I'm a creative developer and designer passionate about building digital experiences
          that combine aesthetic beauty with functional excellence. With expertise in both
          front-end development and design, I create solutions that not only look great but
          also provide exceptional user experiences.
        </ProfileDescription>
        <ProfileImage src="/profile.jpg" alt="Profile" />
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfileSection;