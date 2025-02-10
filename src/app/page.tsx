'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import HeroSection from '@/components/hero/Hero';
import ProjectCard from '@/components/project-card/ProjectCard';
import {
  MainContainer,
  Separator,
  ProjectGrid,
  Background,
  HeaderText,
  Section,
  Header,
  HeaderTitle,
  HeaderSubtitle,
} from '@/styles/HomeStyles';
import { ProjectUI } from '@/types/project';
import { motion } from 'framer-motion';

const COLORS = ['#FFFFFF', '#F2FCE2', '#FEF7CD', '#E5DEFF'] as const;

export default function Home() {
  const { t } = useLanguage();
  const [currentColor, setCurrentColor] = useState<(typeof COLORS)[number]>(COLORS[0]);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [projects, setProjects] = useState<ProjectUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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

  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);
  
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
            <HeaderText>{t('projects.featured.label')}</HeaderText>
            <HeaderTitle>
              <motion.span>{t('projects.featured.title')}</motion.span>
            </HeaderTitle>
            <HeaderSubtitle>
              {t('projects.featured.subtitle')}
            </HeaderSubtitle>
          </Header>
          <ProjectGrid>
            {loading ? (
              <div>Loading...</div>
            ) : featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ProjectGrid>
        </Section>
        <Separator />
        <Section
          ref={(el) => {
            if (el) sectionsRef.current[2] = el;
            return undefined;
          }}
        >
          <Header>
            <HeaderText>{t('projects.all.label')}</HeaderText>
            <HeaderTitle>
              <motion.span>{t('projects.all.title')}</motion.span>
            </HeaderTitle>
            <HeaderSubtitle>
              {t('projects.all.subtitle')}
            </HeaderSubtitle>
          </Header>
          <ProjectGrid>
            {loading ? (
              <div>Loading...</div>
            ) : regularProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ProjectGrid>
        </Section>
      </MainContainer>
    </>
  );
}
