'use client';

import React from 'react';
import { Project } from '@/types/project';
import ProjectCard from '../ProjectCard/ProjectCard';
import { SectionContainer, SectionTitle, ProjectsGrid } from './styles';

interface ProjectSectionProps {
  title?: string;
  featured?: boolean;
  projects: Project[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  featured = false,
  projects,
}) => {
  return (
    <SectionContainer>
      {title && <SectionTitle>{title}</SectionTitle>}
      <ProjectsGrid featured={featured}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
          />
        ))}
      </ProjectsGrid>
    </SectionContainer>
  );
};

export default ProjectSection;