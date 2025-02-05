'use client';

import { useState, useEffect } from 'react';
import {
  ProjectUI,
  ProjectFormData,
  ProjectError,
  toProjectUI,
  toProjectDB,
} from '@/types/project';
import { supabase } from '@/lib/supabase';

interface UseProjectsHookReturn {
  projects: ProjectUI[];
  isLoading: boolean;
  error: ProjectError | null;
  createProject: (data: ProjectFormData) => Promise<void>;
  updateProject: (id: string, data: Partial<ProjectFormData>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjects = (): UseProjectsHookReturn => {
  const [projects, setProjects] = useState<ProjectUI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ProjectError | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data, error: supabaseError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;

      // Convert database response to UI format
      const uiProjects = (data || []).map(toProjectUI);
      setProjects(uiProjects);
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
      const { error: supabaseError } = await supabase.from('projects').insert([
        {
          ...toProjectDB(data),
          version: 1,
        },
      ]);

      if (supabaseError) throw supabaseError;

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
      const { error: supabaseError } = await supabase
        .from('projects')
        .update({
          ...toProjectDB(data as ProjectFormData), // Type assertion since we know partial data will be handled correctly
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (supabaseError) throw supabaseError;

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
      const { error: supabaseError } = await supabase.from('projects').delete().eq('id', id);

      if (supabaseError) throw supabaseError;

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

  return {
    projects,
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
  };
};
