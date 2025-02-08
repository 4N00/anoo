'use client';

import React from 'react';
import AnimateOnScroll from '../../ui/AnimateOnScroll';
import { SkillsContainer, SkillsGrid, SkillItem, SkillName, SkillBar, SkillLevel } from './styles';

interface Skill {
  name: string;
  level: number;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <SkillsContainer>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <AnimateOnScroll key={skill.name} delay={index * 0.1}>
            <SkillItem>
              <SkillName $level={skill.level}>{skill.name}</SkillName>
              <SkillBar>
                <SkillLevel $level={skill.level} />
              </SkillBar>
            </SkillItem>
          </AnimateOnScroll>
        ))}
      </SkillsGrid>
    </SkillsContainer>
  );
};

export default SkillsSection;
