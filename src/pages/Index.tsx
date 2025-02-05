'use client';

import { useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import ProjectSection from '../components/ProjectSection';
import PageFooter from '../components/PageFooter';
import { useProjects } from '../context/ProjectsContext';
import { MainContainer, Separator, ProjectGrid } from '../styles/HomeStyles';

const COLORS = ['#FFFFFF', '#F2FCE2', '#FEF7CD', '#E5DEFF', '#FFDEE2'] as const;
type BackgroundColor = typeof COLORS[number];

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const sections = useRef<HTMLElement[]>([]);
  const { projects } = useProjects();

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

  const featuredProjects = projects.filter(p => p.category === "F/01");
  const projectsSetOne = projects.filter(p => p.category === "P/01");
  const projectsSetTwo = projects.filter(p => p.category === "P/02");
  const projectsSetThree = projects.filter(p => p.category === "P/03");
  const projectsSetFour = projects.filter(p => p.category === "P/04");

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