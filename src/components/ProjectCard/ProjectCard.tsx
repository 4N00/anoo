'use client';

import React, { useState } from 'react';
import {
  ProjectCardWrapper,
  ProjectImageWrapper,
  ProjectImage,
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
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <ProjectCardWrapper 
      data-testid="project-card"
      $featured={project.featured}
    >
      <ProjectImageWrapper>
        <ProjectImage
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className={imageLoaded ? 'loaded' : ''}
          onLoad={() => setImageLoaded(true)}
        />
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
