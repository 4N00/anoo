import React from 'react';
import { ProjectContainer, ProjectGrid } from './styles';

export interface ProjectCardProps {
  featured?: boolean;
  children: React.ReactNode;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ featured, children, className }) => {
  return (
    <ProjectContainer className={className}>
      <ProjectGrid $featured={featured}>
        {children}
      </ProjectGrid>
    </ProjectContainer>
  );
};

export default ProjectCard; 