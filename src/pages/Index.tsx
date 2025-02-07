'use client';

import React, { useEffect, useState, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import ProjectSection from '../components/ProjectSection';
import { MainContainer, Separator, ProjectGrid, Background } from '../styles/HomeStyles';
import { ProjectUI } from '@/types/project';

const COLORS = ['#FFFFFF', '#F2FCE2', '#FEF7CD', '#E5DEFF', '#FFDEE2'] as const;

interface IndexProps {
  initialProjects: ProjectUI[];
}

const Index: React.FC<IndexProps> = ({ initialProjects }) => {
  const [currentColor, setCurrentColor] = useState<(typeof COLORS)[number]>(COLORS[0]);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY + viewportHeight / 2;

      // Find which section is most visible
      let activeIndex = 0;
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          activeIndex = index;
        }
      });

      setCurrentColor(COLORS[activeIndex] || COLORS[0]);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects based on featured flag
  const featuredProjects = initialProjects.filter((p) => p.featured);
  const nonFeaturedProjects = initialProjects.filter((p) => !p.featured);

  // Split non-featured projects into groups
  const chunkSize = Math.ceil(nonFeaturedProjects.length / 4);
  const projectsSetOne = nonFeaturedProjects.slice(0, chunkSize);
  const projectsSetTwo = nonFeaturedProjects.slice(chunkSize, chunkSize * 2);
  const projectsSetThree = nonFeaturedProjects.slice(chunkSize * 2, chunkSize * 3);
  const projectsSetFour = nonFeaturedProjects.slice(chunkSize * 3);

  return (
    <>
      <Background $color={currentColor} />
      <MainContainer>
        <section
          ref={(el) => {
            if (el) sectionsRef.current[0] = el;
            return undefined;
          }}
        >
          <HeroSection />
        </section>
        <Separator />
        {featuredProjects.length > 0 && (
          <section
            ref={(el) => {
              if (el) sectionsRef.current[1] = el;
              return undefined;
            }}
          >
            <ProjectSection title="FEATURED" featured projects={featuredProjects} />
          </section>
        )}
        {(projectsSetOne.length > 0 || projectsSetTwo.length > 0) && (
          <section
            ref={(el) => {
              if (el) sectionsRef.current[2] = el;
              return undefined;
            }}
          >
            <ProjectGrid>
              {projectsSetOne.length > 0 && <ProjectSection projects={projectsSetOne} />}
              {projectsSetTwo.length > 0 && <ProjectSection projects={projectsSetTwo} />}
            </ProjectGrid>
          </section>
        )}
        {(projectsSetThree.length > 0 || projectsSetFour.length > 0) && (
          <section
            ref={(el) => {
              if (el) sectionsRef.current[3] = el;
              return undefined;
            }}
          >
            <ProjectGrid>
              {projectsSetThree.length > 0 && <ProjectSection projects={projectsSetThree} />}
              {projectsSetFour.length > 0 && <ProjectSection projects={projectsSetFour} />}
            </ProjectGrid>
          </section>
        )}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[4] = el;
            return undefined;
          }}
        ></section>
      </MainContainer>
    </>
  );
};

export default Index;
