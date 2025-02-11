'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../project-card/ProjectCard';
import { ProjectContainer, ProjectGrid } from '../project-card/styles';
import { ProjectUI } from '@/types/project';
import { SectionTitle } from './styles';


interface ProjectSectionProps {
  projects: ProjectUI[];
  className?: string;
}

const ProjectSection = forwardRef<HTMLElement, ProjectSectionProps>(({ projects = [], className }, ref) => {
  const featuredProjects = projects.filter((project) => project.featured);
  const nonFeaturedProjects = projects.filter((project) => !project.featured);

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
      {featuredProjects.length > 0 && (
        <ProjectContainer $featured>
          <SectionTitle>
            FEATURED
          </SectionTitle>
          <ProjectGrid $featured>
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                priority={index === 0} 
              />
            ))}
          </ProjectGrid>
        </ProjectContainer>
      )}

      {nonFeaturedProjects.length > 0 && (
        <ProjectContainer>
          <SectionTitle>PROJECTS</SectionTitle>
          <ProjectGrid>
            {nonFeaturedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                priority={!featuredProjects.length && index === 0}
              />
            ))}
          </ProjectGrid>
        </ProjectContainer>
      )}
    </motion.section>
  );
});

ProjectSection.displayName = 'ProjectSection';

export default ProjectSection;
