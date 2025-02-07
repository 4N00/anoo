'use client';

import React, { useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import ProjectSection from '../components/ProjectSection';
import PageFooter from '../components/PageFooter';
import { MainContainer, Separator, ProjectGrid } from '../styles/HomeStyles';
import { ProjectUI } from '@/types/project';

const COLORS = ['#FFFFFF', '#F2FCE2', '#FEF7CD', '#E5DEFF', '#FFDEE2'] as const;
type BackgroundColor = typeof COLORS[number];

interface IndexProps {
  initialProjects: ProjectUI[];
}

const Index: React.FC<IndexProps> = ({ initialProjects }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const sections = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      let mostVisibleSection = 0;
      let maxVisibleArea = 0;

      sections.current.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(windowHeight, Math.max(0,
          Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
        ));
        
        const visiblePercentage = visibleHeight / section.offsetHeight;
        
        if (visiblePercentage > maxVisibleArea) {
          maxVisibleArea = visiblePercentage;
          mostVisibleSection = index;
        }
      });

      if (mainRef.current) {
        const color: BackgroundColor = COLORS[mostVisibleSection] || COLORS[0];
        mainRef.current.style.backgroundColor = color;
      }
    };

    if (mainRef.current) {
      sections.current = Array.from(mainRef.current.getElementsByTagName('section'));
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects based on featured flag
  const featuredProjects = initialProjects.filter(p => p.featured);
  const nonFeaturedProjects = initialProjects.filter(p => !p.featured);

  // Split non-featured projects into groups
  const chunkSize = Math.ceil(nonFeaturedProjects.length / 4);
  const projectsSetOne = nonFeaturedProjects.slice(0, chunkSize);
  const projectsSetTwo = nonFeaturedProjects.slice(chunkSize, chunkSize * 2);
  const projectsSetThree = nonFeaturedProjects.slice(chunkSize * 2, chunkSize * 3);
  const projectsSetFour = nonFeaturedProjects.slice(chunkSize * 3);

  return (
    <MainContainer ref={mainRef}>
      <HeroSection />
      <Separator />
      {featuredProjects.length > 0 && (
        <ProjectSection
          title="FEATURED"
          featured
          projects={featuredProjects}
        />
      )}
      {(projectsSetOne.length > 0 || projectsSetTwo.length > 0) && (
        <ProjectGrid>
          {projectsSetOne.length > 0 && (
            <ProjectSection
              projects={projectsSetOne}
            />
          )}
          {projectsSetTwo.length > 0 && (
            <ProjectSection
              projects={projectsSetTwo}
            />
          )}
        </ProjectGrid>
      )}
      {(projectsSetThree.length > 0 || projectsSetFour.length > 0) && (
        <ProjectGrid>
          {projectsSetThree.length > 0 && (
            <ProjectSection
              projects={projectsSetThree}
            />
          )}
          {projectsSetFour.length > 0 && (
            <ProjectSection
              projects={projectsSetFour}
            />
          )}
        </ProjectGrid>
      )}
      <PageFooter />
    </MainContainer>
  );
};

export default Index;