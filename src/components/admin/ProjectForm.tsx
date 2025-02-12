'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectUI, toProjectUI } from '@/types/project';
import { Input, Button } from '@/components/ui';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase';
import {
  FormContainer,
  FormHeader,
  FormTitle,
  InputGroup,
  Label,
  CheckboxContainer,
  ButtonContainer
} from './styles';

// Form input type with tags as string
type ProjectFormInput = {
  title: string;
  description: string;
  imageUrl: string;
  tags: string;
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
};

const projectValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  tags: z.string().min(1, 'At least one tag is required'),
  featured: z.boolean(),
  githubUrl: z.string()
    .transform(str => str.trim())
    .refine(str => str === '' || /^https?:\/\//.test(str), 'Must be a valid URL if provided'),
  liveUrl: z.string()
    .transform(str => str.trim())
    .refine(str => str === '' || /^https?:\/\//.test(str), 'Must be a valid URL if provided'),
});

interface ProjectFormProps {
  project: ProjectUI | null;
  onSave: (project: ProjectUI) => void;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onClose }) => {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectValidationSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      tags: '',
      featured: false,
      githubUrl: '',
      liveUrl: '',
    },
  });

  // Reset form when project changes
  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        tags: project.tags.join(', '),
        featured: project.featured,
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
      });
    } else {
      reset({
        title: '',
        description: '',
        imageUrl: '',
        tags: '',
        featured: false,
        githubUrl: '',
        liveUrl: '',
      });
    }
  }, [project, reset]);

  const handleFormSubmit = async (data: ProjectFormInput) => {
    try {
      const formattedTags = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const formattedData = {
        ...(project ? { id: project.id } : {}),
        title: data.title,
        description: data.description,
        image_url: data.imageUrl,
        tags: formattedTags,
        featured: data.featured,
        github_url: data.githubUrl || null,
        live_url: data.liveUrl || null,
        version: 1,
      };

      let response;
      if (project) {
        response = await supabase
          .from('projects')
          .update(formattedData)
          .eq('id', project.id)
          .select()
          .single();
      } else {
        response = await supabase
          .from('projects')
          .insert([formattedData])
          .select()
          .single();
      }

      if (response.error) {
        throw response.error;
      }

      if (!response.data) {
        throw new Error('No data returned from server');
      }

      onSave(toProjectUI(response.data));
      showToast('Project saved successfully', 'success');
    } catch (error) {
      console.error('Form submission error:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to save project',
        'error'
      );
    }
  };

  return (
    <>
      <FormHeader>
        <FormTitle>{project ? 'Edit Project' : 'New Project'}</FormTitle>
      </FormHeader>
      <FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
        <InputGroup>
          <Label>Title</Label>
          <Input
            {...register('title')}
            placeholder="Project Title"
            error={errors.title?.message}
          />
        </InputGroup>

        <InputGroup>
          <Label>Description</Label>
          <Input
            {...register('description')}
            placeholder="Project Description"
            error={errors.description?.message}
          />
        </InputGroup>

        <InputGroup>
          <Label>Image URL</Label>
          <Input
            {...register('imageUrl')}
            placeholder="Image URL"
            error={errors.imageUrl?.message}
          />
        </InputGroup>

        <InputGroup>
          <Label>Tags</Label>
          <Input
            {...register('tags')}
            placeholder="Tags (comma separated, e.g., React, TypeScript, Next.js)"
            error={errors.tags?.message}
          />
        </InputGroup>

        <CheckboxContainer>
          <input type="checkbox" {...register('featured')} id="featured" />
          <Label htmlFor="featured">Featured Project</Label>
        </CheckboxContainer>

        <InputGroup>
          <Label>GitHub URL (optional)</Label>
          <Input
            {...register('githubUrl')}
            placeholder="GitHub URL (leave empty if none)"
            error={errors.githubUrl?.message}
          />
        </InputGroup>

        <InputGroup>
          <Label>Live URL (optional)</Label>
          <Input
            {...register('liveUrl')}
            placeholder="Live URL (leave empty if none)"
            error={errors.liveUrl?.message}
          />
        </InputGroup>

        <ButtonContainer>
          <Button $variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Project'}
          </Button>
        </ButtonContainer>
      </FormContainer>
    </>
  );
};

export default ProjectForm;