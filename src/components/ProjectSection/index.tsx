import React from 'react';
import {
  SectionContainer,
  SectionHeader,
  SectionTitle,
  SectionNumber,
  ProjectsContainer,
  ProjectItem
} from './styles';

interface Project {
  id: string;
  title?: string;
  category: string;
  // Add other project properties as needed
}

interface ProjectSectionProps {
  sectionNumber: string;
  title?: string;
  featured?: boolean;
  projects: Project[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  sectionNumber,
  title,
  featured = false,
  projects
}) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionNumber>{sectionNumber}</SectionNumber>
        {title && <SectionTitle>{title}</SectionTitle>}
      </SectionHeader>
      <ProjectsContainer>
        {projects.map((project) => (
          <ProjectItem key={project.id} featured={featured}>
            {project.title}
          </ProjectItem>
        ))}
      </ProjectsContainer>
    </SectionContainer>
  );
};

export default ProjectSection;