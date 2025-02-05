'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import ProjectCard from '../ProjectCard/ProjectCard';
import { ProjectContainer } from '../ProjectCard/styles';

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

const ProjectSection: React.FC = () => {
  const { projects } = useProjects();

  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      {featuredProjects.length > 0 && (
        <ProjectContainer featured>
          {featuredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              index={index}
            />
          ))}
        </ProjectContainer>
      )}

      {regularProjects.length > 0 && (
        <ProjectContainer>
          {regularProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              index={featuredProjects.length + index}
            />
          ))}
        </ProjectContainer>
      )}
    </motion.div>
  );
};

export default ProjectSection;