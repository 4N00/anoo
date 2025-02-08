'use client';

import React, { forwardRef, useState } from 'react';
import { ProjectUI } from '@/types/project';
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
import { useScroll, useTransform, motion } from 'framer-motion';

interface ProjectCardProps {
  project: ProjectUI;
  onClick?: () => void;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(({ project, onClick }, ref) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const scrollRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    } else if (project.githubUrl) {
      window.open(project.githubUrl, '_blank');
    }
  };

  return (
    <ProjectCardWrapper 
      ref={ref} 
      onClick={handleClick} 
      data-testid="project-card"
      $featured={project.featured}
    >
      <motion.div
        ref={scrollRef}
        style={{
          opacity,
          y,
          width: '100%',
          height: '100%',
        }}
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
      </motion.div>
    </ProjectCardWrapper>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
