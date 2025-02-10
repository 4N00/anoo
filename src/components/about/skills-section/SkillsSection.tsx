'use client';

import React from 'react';
import AnimateOnScroll from '../../ui/animate-on-scroll/AnimateOnScroll';
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
    <AnimateOnScroll>
      <SkillsContainer>
        <SkillsGrid>
          {skills.map((skill, index) => (
            <SkillItem 
              key={skill.name} 
              style={{ '--delay': `${0.2 + index * 0.1}s` } as React.CSSProperties}
            >
              <SkillName $level={skill.level}>{skill.name}</SkillName>
              <SkillBar>
                <SkillLevel 
                  $level={skill.level} 
                  style={{ '--delay': `${0.8 + index * 0.1}s` } as React.CSSProperties}
                />
              </SkillBar>
            </SkillItem>
          ))}
        </SkillsGrid>
      </SkillsContainer>
    </AnimateOnScroll>
  );
};

export default SkillsSection;
