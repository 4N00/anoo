'use client';

import { useState, useEffect } from 'react';
import { Project, ProjectFormData, ProjectError } from '@/types/project';

interface UseProjectsHookReturn {
  projects: Project[];
  isLoading: boolean;
  error: ProjectError | null;
  createProject: (data: ProjectFormData) => Promise<void>;
  updateProject: (id: string, data: Partial<ProjectFormData>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjects = (): UseProjectsHookReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ProjectError | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (data: ProjectFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      await fetchProjects();
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'An error occurred',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (id: string, data: Partial<ProjectFormData>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      await fetchProjects();
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'An error occurred',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      await fetchProjects();
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'An error occurred',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
  };
};