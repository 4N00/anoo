import React, { createContext, useContext, useState, useEffect } from 'react';

interface Project {
  id: string;
  category: string;
  title?: string;
}

interface ProjectsContextType {
  projects: Project[];
}

const ProjectsContext = createContext<ProjectsContextType>({ projects: [] });

export const useProjects = () => useContext(ProjectsContext);

interface ProjectsProviderProps {
  children: React.ReactNode;
}

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // TODO: Implement project fetching logic
    setProjects([]);
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects }}>
      {children}
    </ProjectsContext.Provider>
  );
};