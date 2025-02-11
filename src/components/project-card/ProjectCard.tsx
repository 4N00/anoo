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
  ProjectImage,
} from './styles';
import { ProjectUI } from '@/types/project';
import AnimateOnScroll from '../ui/animate-on-scroll/AnimateOnScroll';

interface ProjectCardProps {
  project: ProjectUI;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  return (
    <AnimateOnScroll delay={index * 0.1}>
      <ProjectCardWrapper 
        data-testid="project-item"
        data-cy="project-card"
        $featured={project.featured}
      >
        <ProjectImageWrapper>
          <ProjectImage 
            src={project.imageUrl} 
            alt={project.title}
            loading="lazy"
          />
        </ProjectImageWrapper>
        <ProjectInfo>
          <ProjectHeader>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectCategory>{project.tags.slice(0, 2).join(' / ')}</ProjectCategory>
          </ProjectHeader>
          <ProjectDescription>{project.description}</ProjectDescription>
        </ProjectInfo>
      </ProjectCardWrapper>
    </AnimateOnScroll>
  );
};

export default ProjectCard;
