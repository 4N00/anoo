'use client';

import React, { useEffect, useState, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import {
  MainContainer,
  Separator,
  ProjectGrid,
  Background,
  HeaderText,
  Section,
  FeaturedGrid,
  Header,
  HeaderTitle,
  HeaderSubtitle,
} from '../styles/HomeStyles';
import { ProjectUI } from '@/types/project';
import { motion } from 'framer-motion';
import { featuredProjects as importedFeatured, projects as importedProjects } from '@/data/projects';

const COLORS = ['#FFFFFF', '#F2FCE2', '#FEF7CD', '#E5DEFF'] as const;

const Index = () => {
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
        <Section
          ref={(el) => {
            if (el) sectionsRef.current[1] = el;
            return undefined;
          }}
        >
          <Header>
            <HeaderText>Featured Projects</HeaderText>
            <HeaderTitle>
              <motion.span>Selected Works</motion.span>
            </HeaderTitle>
            <HeaderSubtitle>
              A curated selection of my favorite projects that showcase my skills and interests.
            </HeaderSubtitle>
          </Header>
          <FeaturedGrid>
            {importedFeatured.map((project: ProjectUI) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </FeaturedGrid>
        </Section>
        <Separator />
        <Section
          ref={(el) => {
            if (el) sectionsRef.current[2] = el;
            return undefined;
          }}
        >
          <Header>
            <HeaderText>All Projects</HeaderText>
            <HeaderTitle>
              <motion.span>Project Archive</motion.span>
            </HeaderTitle>
            <HeaderSubtitle>
              A comprehensive collection of my work, including personal projects, experiments, and contributions.
            </HeaderSubtitle>
          </Header>
          <ProjectGrid>
            {importedProjects.map((project: ProjectUI) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ProjectGrid>
        </Section>
      </MainContainer>
    </>
  );
};

export default Index;
