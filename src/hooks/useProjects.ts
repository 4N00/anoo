import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type {
  Project,
  ProjectListItem,
  ProjectError,
  CreateProjectInput,
  UpdateProjectInput,
  UseProjectsReturn,
  UseProjectMutationReturn,
  ProjectDetails
} from '@/types/project';

interface UseProjectsOptions {
  featured?: boolean;
}

// Re-export the Project type
export type { Project };

type UseProjectsHookReturn = Omit<UseProjectsReturn, 'loading'> & 
  Omit<UseProjectMutationReturn, 'loading'> & 
  { isLoading: boolean };

export function useProjects(options: UseProjectsOptions = {}): UseProjectsHookReturn {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ProjectError | null>(null);
  const [filters] = useState({ featured: options.featured });
  const [pagination] = useState({ page: 1, limit: 10, total: 0, hasMore: false });

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', filters.featured || false);
      
      const formattedProjects: ProjectListItem[] = (data ?? []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        imageUrl: item.image_url,
        tags: item.tags,
        featured: item.featured,
        createdAt: item.created_at
      }));
      
      setProjects(formattedProjects);
    } catch (err) {
      setError({ message: err instanceof Error ? err.message : 'Failed to fetch projects' });
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (data: CreateProjectInput): Promise<ProjectDetails> => {
    try {
      const { data: newProject, error: createError } = await supabase
        .from('projects')
        .insert([{
          title: data.title,
          description: data.description,
          image_url: data.imageUrl,
          tags: data.tags,
          featured: data.featured,
          github_url: data.githubUrl,
          live_url: data.liveUrl
        }])
        .select()
        .single();

      if (createError) throw createError;
      if (!newProject) throw new Error('Failed to create project');

      const formattedProject: ProjectDetails = {
        id: newProject.id,
        title: newProject.title,
        description: newProject.description,
        imageUrl: newProject.image_url,
        tags: newProject.tags,
        featured: newProject.featured,
        githubUrl: newProject.github_url,
        liveUrl: newProject.live_url,
        createdAt: newProject.created_at,
        updatedAt: newProject.updated_at,
        authorId: newProject.author_id,
        version: newProject.version,
        author: {
          id: newProject.author_id,
          email: '' // This would come from a join query in a real app
        }
      };

      setProjects(prev => [...prev, formattedProject]);
      return formattedProject;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create project');
    }
  };

  const updateProject = async (id: string, data: UpdateProjectInput): Promise<ProjectDetails> => {
    try {
      const { data: updatedProject, error: updateError } = await supabase
        .from('projects')
        .update({
          title: data.title,
          description: data.description,
          image_url: data.imageUrl,
          tags: data.tags,
          featured: data.featured,
          github_url: data.githubUrl,
          live_url: data.liveUrl
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      if (!updatedProject) throw new Error('Failed to update project');

      const formattedProject: ProjectDetails = {
        id: updatedProject.id,
        title: updatedProject.title,
        description: updatedProject.description,
        imageUrl: updatedProject.image_url,
        tags: updatedProject.tags,
        featured: updatedProject.featured,
        githubUrl: updatedProject.github_url,
        liveUrl: updatedProject.live_url,
        createdAt: updatedProject.created_at,
        updatedAt: updatedProject.updated_at,
        authorId: updatedProject.author_id,
        version: updatedProject.version,
        author: {
          id: updatedProject.author_id,
          email: '' // This would come from a join query in a real app
        }
      };

      setProjects(prev => prev.map(p => p.id === id ? formattedProject : p));
      return formattedProject;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update project');
    }
  };

  const deleteProject = async (id: string): Promise<void> => {
    try {
      const { error: deleteError } = await supabase.from('projects').delete().eq('id', id);
      if (deleteError) throw deleteError;
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete project');
    }
  };

  const setFilters = () => {
    // Not implemented yet
  };

  const setPage = () => {
    // Not implemented yet
  };

  const refetch = () => fetchProjects();

  useEffect(() => {
    void fetchProjects();
  }, [filters.featured]);

  return {
    projects,
    isLoading,
    error,
    filters,
    pagination,
    setFilters,
    setPage,
    refetch,
    createProject,
    updateProject,
    deleteProject
  };
}