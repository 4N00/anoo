'use client';

import React, { useEffect, useState, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import {
  MainContainer,
  Separator,
  ProjectGrid,
  Background,
  HeaderText,
  ProjectTitle,
  ProjectDescription,
  ProjectNumber,
  Section,
  ProjectCard,
  ProjectCardWrapper,
  FeaturedGrid,
} from '../styles/HomeStyles';
import { ProjectUI } from '@/types/project';

const COLORS = ['#FFFFFF', '#F2FCE2', '#FEF7CD', '#E5DEFF'] as const;

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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Sort projects in reverse order to match admin panel
  const sortedProjects = [...initialProjects].reverse();
  const featuredProjects = sortedProjects.filter((p) => {
    return p.featured;
  });
  const nonFeaturedProjects = sortedProjects.filter((p) => !p.featured);

  return (
    <>
      <Background $color={currentColor} />
      <MainContainer>
        <Section
          ref={(el) => {
            if (el) sectionsRef.current[0] = el;
            return undefined;
          }}
        >
          <HeroSection />
        </Section>
        <Separator />
        {featuredProjects.length > 0 && (
          <Section
            ref={(el) => {
              if (el) sectionsRef.current[1] = el;
              return undefined;
            }}
          >
            <HeaderText>FEATURED</HeaderText>
            <FeaturedGrid>
              {featuredProjects.map((project, index) => (
                <ProjectCardWrapper key={project.id}>
                  <ProjectCard $isFeatured>
                    <ProjectNumber>F/{String(index + 1).padStart(2, '0')}</ProjectNumber>
                    <img src={project.imageUrl} alt={project.title} />
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>
                  </ProjectCard>
                </ProjectCardWrapper>
              ))}
            </FeaturedGrid>
          </Section>
        )}
        <Separator />
        <Section
          ref={(el) => {
            if (el) sectionsRef.current[2] = el;
            return undefined;
          }}
        >
          <HeaderText>PROJECTS</HeaderText>
          <ProjectGrid>
            {nonFeaturedProjects.map((project, index) => (
              <ProjectCardWrapper key={project.id}>
                <ProjectCard>
                  <ProjectNumber>P/{String(index + 1).padStart(2, '0')}</ProjectNumber>
                  <img src={project.imageUrl} alt={project.title} />
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                </ProjectCard>
              </ProjectCardWrapper>
            ))}
          </ProjectGrid>
        </Section>
      </MainContainer>
    </>
  );
};

export default Index;
