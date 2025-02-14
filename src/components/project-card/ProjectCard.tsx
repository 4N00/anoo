'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  ProjectCardWrapper,
  ProjectImageWrapper,
  ProjectTitle,
  BlurImage,
  ProjectCardContainer,
} from './styles';
import { ProjectUI } from '@/types/project';

interface ProjectCardProps {
  project: ProjectUI;
  priority?: boolean;
}

const ProjectCard = ({ project, priority = false }: ProjectCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setTitleVisible(true);
      }, 1000); // Delay title animation
      return () => clearTimeout(timer);
    } else {
      setTitleVisible(false);
    }
  }, [inView]);


  return (
    <ProjectCardContainer>
    <ProjectTitle className={titleVisible ? 'visible' : ''}>
      {project.title}
    </ProjectTitle>
    <ProjectCardWrapper
      ref={ref}
      data-testid="project-item"
      data-cy="project-card"
      style={{
        transform: `perspective(1000px) rotateX(${inView ? '0' : '30deg'}) translateY(${inView ? '0' : '100px'})`,
        opacity: inView ? 1 : 0,
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
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
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 800px"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
            onLoad={() => {
              setIsLoaded(true);
            } } />

        </ProjectImageWrapper>
{/* 
        <ProjectInfo>
          <ProjectDescription>{project.description}</ProjectDescription>
          <ProjectCategory>{project.tags.join(' / ')}</ProjectCategory>
        </ProjectInfo> */}
      </ProjectCardWrapper>
      </ProjectCardContainer>
  );
};

export default ProjectCard;
