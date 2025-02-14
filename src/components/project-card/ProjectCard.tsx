'use client';

import React, { useState } from 'react';
import {
  ProjectCardWrapper,
  ProjectImageWrapper,
  ProjectTitle,
  BlurImage,
  ProjectInfo,
  ProjectDescription,
  ProjectCategory,
} from './styles';
import { ProjectUI } from '@/types/project';
import AnimateOnScroll from '../animate-on-scroll/AnimateOnScroll';

interface ProjectCardProps {
  project: ProjectUI;
  index?: number;
  priority?: boolean;
}

const ProjectCard = ({ project, index = 0, priority = false }: ProjectCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AnimateOnScroll delay={priority ? 0 : index * 0.1}>
      <ProjectCardWrapper 
        data-testid="project-item"
        data-cy="project-card"
      >
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectImageWrapper>
          <div style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${project.imageUrl}?w=50&q=10)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            opacity: isLoaded ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }} />
          <BlurImage
            fill
            src={project.imageUrl}
            alt={project.title}
            quality={priority ? 90 : 75}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 800px"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
            onLoad={() => {
              setIsLoaded(true);
            }}
          />
        </ProjectImageWrapper>
        <ProjectInfo>
          <ProjectDescription>{project.description}</ProjectDescription>
          <ProjectCategory>{project.tags.join(' / ')}</ProjectCategory>
        </ProjectInfo>
      </ProjectCardWrapper>
    </AnimateOnScroll>
  );
};

export default ProjectCard;
