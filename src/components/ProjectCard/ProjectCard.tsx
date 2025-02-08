'use client';

import React, { forwardRef } from 'react';
import { ProjectUI } from '@/types/project';
import {
  ProjectCardWrapper,
  ProjectImage,
  ProjectInfo,
  ProjectHeader,
  ProjectTitle,
  ProjectCategory,
  ProjectDescription,
} from './styles';
import { useScroll, useTransform, motion } from 'framer-motion';

interface ProjectCardProps {
  project: ProjectUI;
  onClick?: () => void;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(({ project, onClick }, ref) => {
  const scrollRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  });

  const blur = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']
  );

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
    <ProjectCardWrapper ref={ref} onClick={handleClick}>
      <motion.div
        ref={scrollRef}
        style={{
          filter: blur,
          opacity,
          y,
        }}
      >
        <ProjectImage
          variants={imageVariants}
          whileHover="hover"
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
        />
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

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
