'use client';

import React, { forwardRef } from 'react';
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

const ProjectSection = forwardRef<HTMLElement, ProjectSectionProps>(
  ({ projects, title, featured = false }, ref) => {
    return (
      <motion.section
        ref={ref}
        initial="initial"
        animate="animate"
        variants={containerVariants}
        style={{ position: 'relative' }}
      >
        {title && <h2>{title}</h2>}
        <ProjectContainer $featured={featured}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </ProjectContainer>
      </motion.section>
    );
  }
);

ProjectSection.displayName = 'ProjectSection';

export default ProjectSection;
