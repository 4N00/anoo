'use client';

import React from 'react';
import Image from 'next/image';
import {
  ProjectCardWrapper,
  ProjectImageWrapper,
  ProjectInfo,
  ProjectHeader,
  ProjectTitle,
  ProjectCategory,
  ProjectDescription,
} from './styles';
import { ProjectUI } from '@/types/project';
import AnimateOnScroll from '../ui/animate-on-scroll/AnimateOnScroll';

interface ProjectCardProps {
  project: ProjectUI;
  index?: number;
  priority?: boolean;
  featured?: boolean;
}

const ProjectCard = ({ project, index = 0, priority = false, featured = false }: ProjectCardProps) => {
  return (
    <AnimateOnScroll delay={priority ? 0 : index * 0.1}>
      <ProjectCardWrapper 
        data-testid="project-item"
        data-cy="project-card"
        $featured={project.featured}
      >
        <ProjectImageWrapper>
          <Image 
            src={project.imageUrl} 
            alt={project.title}
            fill
            quality={priority ? 90 : 75}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            sizes={featured 
              ? "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            }
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
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
