'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectFormData } from '@/types/project';
import FormInput from '../ui/FormInput';
import { StyledButton } from '../ui/StyledButton';

const projectValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  tags: z.array(z.string()),
  featured: z.boolean(),
  category: z.string().min(1, 'Category is required'),
  githubUrl: z.string().url('Must be a valid URL').nullable(),
  liveUrl: z.string().url('Must be a valid URL').nullable(),
});

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => Promise<void>;
  initialData?: Partial<ProjectFormData>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectValidationSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      imageUrl: initialData?.imageUrl || '',
      tags: initialData?.tags || [],
      featured: initialData?.featured || false,
      category: initialData?.category || '',
      githubUrl: initialData?.githubUrl || '',
      liveUrl: initialData?.liveUrl || '',
    },
  });

  const handleFormSubmit = async (data: ProjectFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormInput
        {...register('title')}
        placeholder="Project Title"
        error={errors.title?.message}
      />
      <FormInput
        {...register('description')}
        placeholder="Project Description"
        error={errors.description?.message}
      />
      <FormInput
        {...register('imageUrl')}
        placeholder="Image URL"
        error={errors.imageUrl?.message}
      />
      <FormInput
        {...register('category')}
        placeholder="Category (e.g., F/01, P/01)"
        error={errors.category?.message}
      />
      <FormInput
        {...register('tags')}
        placeholder="Tags (comma separated)"
        error={errors.tags?.message}
      />
      <label className="flex items-center space-x-2">
        <input type="checkbox" {...register('featured')} />
        <span>Featured Project</span>
      </label>
      <FormInput
        {...register('githubUrl')}
        placeholder="GitHub URL (optional)"
        error={errors.githubUrl?.message}
      />
      <FormInput
        {...register('liveUrl')}
        placeholder="Live URL (optional)"
        error={errors.liveUrl?.message}
      />
      <StyledButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Project'}
      </StyledButton>
    </form>
  );
};

export default ProjectForm;