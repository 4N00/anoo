'use client';

import React from 'react';
import {
  ProjectCardWrapper,
  ProjectImageWrapper,
  ProjectInfo,
  ProjectHeader,
  ProjectTitle,
  ProjectCategory,
  ProjectDescription,
} from './styles';
import ProjectImageEffect from './ProjectImageEffect';
import { ProjectUI } from '@/types/project';

interface ProjectCardProps {
  project: ProjectUI;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <ProjectCardWrapper 
      data-testid="project-card"
      $featured={project.featured}
    >
      <ProjectImageWrapper>
        <ProjectImageEffect imageUrl={project.imageUrl} />
      </ProjectImageWrapper>
      <ProjectInfo>
        <ProjectHeader>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectCategory>{project.tags.slice(0, 2).join(' / ')}</ProjectCategory>
        </ProjectHeader>
        <ProjectDescription>{project.description}</ProjectDescription>
      </ProjectInfo>
    </ProjectCardWrapper>
  );
};

export default ProjectCard;
