import React from 'react';
import PageFooter from "../components/PageFooter";
import ProfileSection from "../components/about/ProfileSection";
import LanguagesSection from "../components/about/LanguagesSection";
import SkillsSection from "../components/about/SkillsSection";
import { PageContainer, ContentWrapper } from "../styles/AboutStyles";

const About: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const skills = [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "Sass/Scss", level: 80 },
    { name: "Animation (CSS/JS)", level: 75 },
    { name: "C#", level: 70 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 85 },
    { name: "UI/UX", level: 90 },
    { name: "Adobe Photoshop", level: 85 },
    { name: "Adobe Illustrator", level: 90 },
    { name: "Adobe XD", level: 75 },
    { name: "Wordpress", level: 80 },
    { name: "Headless CMS", level: 70 },
    { name: "Unity", level: 85 },
    { name: "Three.js", level: 65 },
    { name: "Humor", level: 95 },
  ];

  const languages = [
    { name: "Dutch", level: 100 },
    { name: "English", level: 85 },
  ];

  return (
    <PageContainer>
      <ContentWrapper
        variants={container}
        initial="hidden"
        animate="show"
      >
        <ProfileSection variants={item} />
        <LanguagesSection variants={item} languages={languages} />
        <SkillsSection variants={item} skills={skills} />
      </ContentWrapper>
      <PageFooter />
    </PageContainer>
  );
};

export default About;