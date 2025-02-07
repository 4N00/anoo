'use client';

import React from 'react';
import { motion } from 'framer-motion';
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

interface ProjectCardProps {
  project: ProjectUI;
  onClick?: () => void;
  index?: number;
}

const cardVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      delay: index * 0.1,
    },
  }),
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index = 0 }) => {
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
      as={motion.div}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      custom={index}
      onClick={handleClick}
    >
      <ProjectImage
        as={motion.img}
        variants={imageVariants}
        src={project.imageUrl}
        alt={project.title}
      />
      <ProjectInfo>
        <ProjectHeader>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectCategory>
            {project.tags.slice(0, 2).join(' / ')}
          </ProjectCategory>
        </ProjectHeader>
        <ProjectDescription>{project.description}</ProjectDescription>
      </ProjectInfo>
    </ProjectCardWrapper>
  );
};

export default ProjectCard;