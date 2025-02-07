'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ProjectSection from '@/components/ProjectSection';
import { useProjects } from '@/hooks/useProjects';
import { ProjectUI } from '@/types/project';
import { MainContainer } from '@/styles/HomeStyles';
import { debounce } from '@/utils/helpers';

interface HomeClientProps {
  initialProjects: ProjectUI[];
}

const HomeClient: React.FC<HomeClientProps> = ({ initialProjects }) => {
  const projectsRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<ProjectUI[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { fetchMoreProjects } = useProjects();

  const { scrollYProgress } = useScroll({
    offset: ['start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = debounce(async () => {
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
    }, 500);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects.length, hasMore, isLoading, fetchMoreProjects]);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      const hash = window.location.hash;
      if (hash === '#projects' && projectsRef.current) {
        projectsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    setTimeoutId(id);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;

      // Calculate scroll percentage
      const scrollPercentage = (scrollPosition + viewportHeight) / totalHeight;

      // Change background color based on scroll position
      if (scrollPercentage < 0.3) {
        document.documentElement.style.backgroundColor = '#FFFFFF';
      } else if (scrollPercentage < 0.6) {
        document.documentElement.style.backgroundColor = '#F2FCE2';
      } else if (scrollPercentage < 0.9) {
        document.documentElement.style.backgroundColor = '#FEF7CD';
      } else {
        document.documentElement.style.backgroundColor = '#E5DEFF';
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.backgroundColor = ''; // Reset on unmount
    };
  }, []);

  return (
    <MainContainer>
      <motion.div style={{ opacity }}>
        <HeroSection />
      </motion.div>
      <ProjectSection ref={projectsRef} projects={projects} />
    </MainContainer>
  );
};

export default HomeClient;
