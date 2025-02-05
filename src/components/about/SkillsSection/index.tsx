import React from 'react';
import {
  SkillsContainer,
  SkillsTitle,
  SkillsGrid,
  SkillItem,
  SkillName,
  SkillLevel,
  SkillPercentage
} from './styles';

interface Skill {
  name: string;
  level: number;
}

interface SkillsSectionProps {
  skills: Skill[];
  variants?: any;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, variants }) => {
  return (
    <SkillsContainer variants={variants}>
      <SkillsTitle>Skills</SkillsTitle>
      <SkillsGrid>
        {skills.map((skill) => (
          <SkillItem key={skill.name}>
            <SkillName>{skill.name}</SkillName>
            <SkillLevel level={skill.level}>
              <SkillPercentage>{skill.level}%</SkillPercentage>
            </SkillLevel>
          </SkillItem>
        ))}
      </SkillsGrid>
    </SkillsContainer>
  );
};

export default SkillsSection;