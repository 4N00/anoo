'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../project-card/ProjectCard';
import { ProjectContainer, ProjectGrid } from '../project-card/styles';
import { ProjectUI } from '@/types/project';

interface ProjectSectionProps {
  projects: ProjectUI[];
  className?: string;
}

const ProjectSection = forwardRef<HTMLElement, ProjectSectionProps>(({ projects = [], className }, ref) => {
  return (
    <motion.section
      ref={ref}
      className={className}
      initial="initial"
      animate="animate"
      style={{ position: 'relative' }}
      data-testid="motion-section"
      data-cy="project-section"
    >
      <ProjectContainer>
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              index={index}
              priority={index === 0}
            />
          ))}
        </ProjectGrid>
      </ProjectContainer>
    </motion.section>
  );
});

ProjectSection.displayName = 'ProjectSection';

export default ProjectSection;
