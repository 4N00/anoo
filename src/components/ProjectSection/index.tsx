'use client';

import React from 'react';
import { Project, ProjectUI, toProjectUI } from '@/types/project';
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
  // Convert database projects to UI format
  const uiProjects: ProjectUI[] = projects.map(toProjectUI);

  return (
    <SectionContainer>
      {title && <SectionTitle>{title}</SectionTitle>}
      <ProjectsGrid featured={featured}>
        {uiProjects.map((project) => (
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