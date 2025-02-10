'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, ProjectUI, toProjectUI } from '@/types/project';
import { supabase } from '@/lib/supabase';

interface ProjectsContextType {
  projects: ProjectUI[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  refreshProjects: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

interface ProjectsProviderProps {
  children: React.ReactNode;
}

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider 
      value={{ 
        projects: projects.map(toProjectUI),
        setProjects,
        refreshProjects: fetchProjects
      }}
    >
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