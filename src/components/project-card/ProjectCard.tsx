'use client';

import React, { useState } from 'react';
import {
  ProjectCardWrapper,
  ProjectImageWrapper,
  ProjectInfo,
  ProjectHeader,
  ProjectTitle,
  ProjectCategory,
  ProjectDescription,
  BlurImage,
} from './styles';
import { ProjectUI } from '@/types/project';
import AnimateOnScroll from '../animate-on-scroll/AnimateOnScroll';

interface ProjectCardProps {
  project: ProjectUI;
  index?: number;
  priority?: boolean;
  featured?: boolean;
}

const ProjectCard = ({ project, index = 0, priority = false, featured = false }: ProjectCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AnimateOnScroll delay={priority ? 0 : index * 0.1}>
      <ProjectCardWrapper 
        data-testid="project-item"
        data-cy="project-card"
        $featured={project.featured}
      >
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
            sizes={featured 
              ? "(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              : "(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            }
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
