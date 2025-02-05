import React, { useEffect, useRef, CSSProperties } from 'react';
import HeroSection from '../components/HeroSection';
import ProjectSection from '../components/ProjectSection';
import PageFooter from '../components/PageFooter';
import { useProjects } from '../context/ProjectsContext';
import { MainContainer, Separator, ProjectGrid } from '../styles/HomeStyles';

const SECTION_COLORS = ['#FFFFFF', '#F2FCE2', '#FEF7CD', '#E5DEFF', '#FFDEE2'] as const;
type SectionColor = (typeof SECTION_COLORS)[number];

const Index: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const sections = useRef<HTMLElement[]>([]);
  const { projects } = useProjects();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
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
        const colorIndex = Math.min(mostVisibleSection, SECTION_COLORS.length - 1);
        const style: CSSProperties = {
          backgroundColor: SECTION_COLORS[colorIndex]
        };
        Object.assign(mainRef.current.style, style);
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
          sectionNumber="F/01"
          title="FEATURED"
          featured
          projects={featuredProjects}
        />
      )}
      {(projectsSetOne.length > 0 || projectsSetTwo.length > 0) && (
        <ProjectGrid>
          {projectsSetOne.length > 0 && (
            <ProjectSection
              sectionNumber="P/01"
              projects={projectsSetOne}
            />
          )}
          {projectsSetTwo.length > 0 && (
            <ProjectSection
              sectionNumber="P/02"
              projects={projectsSetTwo}
            />
          )}
        </ProjectGrid>
      )}
      {(projectsSetThree.length > 0 || projectsSetFour.length > 0) && (
        <ProjectGrid>
          {projectsSetThree.length > 0 && (
            <ProjectSection
              sectionNumber="P/03"
              projects={projectsSetThree}
            />
          )}
          {projectsSetFour.length > 0 && (
            <ProjectSection
              sectionNumber="P/04"
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