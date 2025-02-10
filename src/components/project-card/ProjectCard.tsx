import React from 'react';
import { ProjectUI } from '@/types/project';
import {
  ProjectCardWrapper,
  ProjectImage,
  ProjectInfo,
  ProjectTitle,
  TagsContainer,
  Description,
  LinksContainer,
  LinkButton
} from './styles';

export interface ProjectCardProps {
  project: ProjectUI;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <ProjectCardWrapper>
      <ProjectImage src={project.imageUrl} alt={project.title} />
      <ProjectInfo>
        <ProjectTitle>{project.title}</ProjectTitle>
        <TagsContainer>{project.tags.join(' • ')}</TagsContainer>
        <Description>{project.description}</Description>
        <LinksContainer>
          {project.githubUrl && (
            <LinkButton href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </LinkButton>
          )}
          {project.liveUrl && (
            <LinkButton href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live Demo
            </LinkButton>
          )}
        </LinksContainer>
      </ProjectInfo>
    </ProjectCardWrapper>
  );
};

export default ProjectCard; 