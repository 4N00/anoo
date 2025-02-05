import React from 'react';
import { Variants } from 'framer-motion';
import {
  SectionContainer,
  Title,
  GroupContainer,
  Grid,
  SkillContainer,
  SkillName,
  SkillNameText,
  ProgressContainer,
  ProgressBar,
  SkillLevel,
} from '@/styles/AboutStyles';

interface Skill {
  name: string;
  level: number;
}

interface SkillsSectionProps {
  variants?: Variants;
  skills: Skill[];
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ variants = defaultVariants, skills }) => {
  const chunkedSkills = skills.reduce((resultArray: Skill[][], item: Skill, index: number) => {
    const chunkIndex = Math.floor(index / 5);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <SectionContainer
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <Title>Skills</Title>
      <div>
        {chunkedSkills.map((skillGroup, groupIndex) => (
          <GroupContainer key={groupIndex}>
            <Grid>
              {skillGroup.map((skill) => (
                <SkillContainer key={skill.name}>
                  <SkillName>
                    <SkillNameText>{skill.name}</SkillNameText>
                  </SkillName>
                  <ProgressContainer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <ProgressBar
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </ProgressContainer>
                  <SkillLevel>{(skill.level / 10).toFixed(2)} / 10</SkillLevel>
                </SkillContainer>
              ))}
            </Grid>
          </GroupContainer>
        ))}
      </div>
    </SectionContainer>
  );
};

export default SkillsSection;
