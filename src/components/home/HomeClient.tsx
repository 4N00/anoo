'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/hero/Hero';
import { useProjects } from '@/hooks/useProjects';
import { ProjectUI } from '@/types/project';
import { debounce } from '@/utils/helpers';
import { useBackground } from '@/context/BackgroundContext';
import { MainContainer } from '@/app/styles';
import { useTheme } from '@/styles/theme';
import Container from '../container/Container';
import Loading from '../loading/Loading';
import SectionWrapper from '../section-wrapper/SectionWrapper';

// Dynamically import non-critical components
const ProjectSection = dynamic(() => import('@/components/project-section/ProjectSection'), {
  loading: () => <Loading />,
  ssr: true
});

const ExperienceSection = dynamic(() => import('@/components/experience-section/ExperienceSection'), {
  loading: () => <Loading />,
  ssr: true
});

const PhilosophySection = dynamic(() => import('@/components/philosophy-section/PhilosophySection'), {
  loading: () => <Loading />,
  ssr: true
});

const Contact = dynamic(() => import('@/app/contact/page'), {
  loading: () => <Loading />,
  ssr: true
});

interface HomeClientProps {
  initialProjects: ProjectUI[];
}

const HomeClient: React.FC<HomeClientProps> = ({ initialProjects }) => {
  const projectsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<ProjectUI[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { setBackgroundColor } = useBackground();
  const { fetchMoreProjects } = useProjects();
  const { isDark } = useTheme();

  const { scrollYProgress } = useScroll({
    offset: ['start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Optimize scroll handlers with useCallback
  const handleScroll = React.useCallback(
    debounce(async () => {
      if (!hasMore || isLoading) return;

      const element = document.documentElement;
      const scrolledToBottom =
        window.innerHeight + window.pageYOffset >= element.scrollHeight - 1000;

      if (scrolledToBottom) {
        setIsLoading(true);
        try {
          const newProjects = await fetchMoreProjects(projects.length);
          if (newProjects.length === 0) {
            setHasMore(false);
          } else {
            setProjects((prev) => [...prev, ...newProjects]);
          }
        } catch (error) {
          console.error('Error fetching more projects:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }, 500),
    [hasMore, isLoading, projects.length, fetchMoreProjects]
  );

  const handleColorChange = React.useCallback(
    debounce(() => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollPosition + viewportHeight) / totalHeight;

      const newColor = isDark
        ? scrollPercentage < 0.3
          ? '#000000'
          : scrollPercentage < 0.6
          ? '#1a1a1a'
          : scrollPercentage < 0.9
          ? '#242424'
          : '#2d2d2d'
        : scrollPercentage < 0.3
        ? '#FFFFFF'
        : scrollPercentage < 0.6
        ? '#F2FCE2'
        : scrollPercentage < 0.9
        ? '#FEF7CD'
        : '#E5DEFF';

      setBackgroundColor(newColor);
    }, 100),
    [isDark, setBackgroundColor]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleColorChange);
    handleColorChange();
    return () => window.removeEventListener('scroll', handleColorChange);
  }, [handleColorChange]);

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);

    const id = setTimeout(() => {
      const hash = window.location.hash;
      if (hash === '#projects' && projectsRef.current) {
        projectsRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#experience' && experienceRef.current) {
        experienceRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#contact' && contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    setTimeoutId(id);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <SectionWrapper>
        <HeroSection />
      </SectionWrapper>
      <Container>
        <MainContainer>
          <motion.div style={{ opacity }} />
          <SectionWrapper ref={projectsRef} id="projects" data-cy="project-section">
            <Suspense fallback={<Loading />}>
              <ProjectSection projects={projects} />
            </Suspense>
          </SectionWrapper>
        </MainContainer>
      </Container>
      <SectionWrapper ref={experienceRef} id="experience" data-cy="experience-section">
        <Suspense fallback={<Loading />}>
          <ExperienceSection />
        </Suspense>
      </SectionWrapper>
      <SectionWrapper data-cy="philosophy-section">
        <Suspense fallback={<Loading />}>
          <PhilosophySection />
        </Suspense>
      </SectionWrapper>
      <SectionWrapper ref={contactRef} id="contact" data-cy="contact-section">
        <Suspense fallback={<Loading />}>
          <Contact />
        </Suspense>
      </SectionWrapper>
    </>
  );
};

export default HomeClient;
