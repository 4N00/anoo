'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { supabase } from '@/lib/supabase';

interface ProjectsContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

interface ProjectsProviderProps {
  children: React.ReactNode;
}

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();

    // Set up real-time subscription
    const subscription = supabase
      .channel('projects_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
        },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};