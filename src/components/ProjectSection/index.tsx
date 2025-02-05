'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../ProjectCard/ProjectCard';
import { ProjectContainer } from '../ProjectCard/styles';
import { ProjectUI } from '@/types/project';

const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

interface ProjectSectionProps {
  projects: ProjectUI[];
  title?: string;
  featured?: boolean;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ 
  projects,
  title,
  featured = false 
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      {title && <h2>{title}</h2>}
      <ProjectContainer featured={featured}>
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project}
            index={index}
          />
        ))}
      </ProjectContainer>
    </motion.div>
  );
};

export default ProjectSection;