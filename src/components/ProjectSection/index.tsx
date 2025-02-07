'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../ProjectCard/ProjectCard';
import { ProjectContainer, ProjectGrid } from '../ProjectCard/styles';
import { HeaderText } from '@/styles/HomeStyles';
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
}

const ProjectSection = forwardRef<HTMLElement, ProjectSectionProps>(
  ({ projects }, ref) => {
    // Split projects into featured and non-featured
    const featuredProjects = projects.filter(p => p.featured);
    const nonFeaturedProjects = projects.filter(p => !p.featured);

    return (
      <motion.section
        ref={ref}
        initial="initial"
        animate="animate"
        variants={containerVariants}
        style={{ position: 'relative' }}
      >
        {featuredProjects.length > 0 && (
          <ProjectContainer $featured>
            <HeaderText>FEATURED</HeaderText>
            <ProjectGrid $featured>
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </ProjectGrid>
          </ProjectContainer>
        )}
        
        {nonFeaturedProjects.length > 0 && (
          <ProjectContainer>
            <HeaderText>PROJECTS</HeaderText>
            <ProjectGrid>
              {nonFeaturedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </ProjectGrid>
          </ProjectContainer>
        )}
      </motion.section>
    );
  }
);

ProjectSection.displayName = 'ProjectSection';

export default ProjectSection;
