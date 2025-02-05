'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectUI } from '@/types/project';
import FormInput from '../ui/FormInput';
import { StyledButton } from '../ui/StyledButton';
import { styled } from 'styled-components';
import { useToast } from '@/context/ToastContext';

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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

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
      console.log('Submitting data:', data); // Add logging
      const formattedData = {
        ...(project ? { id: project.id } : {}),
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        tags: data.tags,
        featured: data.featured,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
      };
      console.log('Formatted data:', formattedData); // Add logging

      const response = await fetch(project ? `/api/projects/${project.id}` : '/api/projects', {
        method: project ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData); // Add logging
        throw new Error(errorData.error || 'Failed to save project');
      }

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      const savedProject = await response.json();
      onSave(savedProject);
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
    <FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
      <InputGroup>
        <Label>Title</Label>
        <FormInput
          {...register('title')}
          placeholder="Project Title"
          error={errors.title?.message}
        />
      </InputGroup>

      <InputGroup>
        <Label>Description</Label>
        <FormInput
          {...register('description')}
          placeholder="Project Description"
          error={errors.description?.message}
        />
      </InputGroup>

      <InputGroup>
        <Label>Image URL</Label>
        <FormInput
          {...register('imageUrl')}
          placeholder="Image URL"
          error={errors.imageUrl?.message}
        />
      </InputGroup>

      <InputGroup>
        <Label>Tags</Label>
        <FormInput
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
        <FormInput
          {...register('githubUrl')}
          placeholder="GitHub URL (leave empty if none)"
          error={errors.githubUrl?.message}
        />
      </InputGroup>

      <InputGroup>
        <Label>Live URL (optional)</Label>
        <FormInput
          {...register('liveUrl')}
          placeholder="Live URL (leave empty if none)"
          error={errors.liveUrl?.message}
        />
      </InputGroup>

      <ButtonGroup>
        <StyledButton type="submit" disabled={isSubmitting} $variant="primary">
          {isSubmitting ? 'Saving...' : 'Save Project'}
        </StyledButton>
        <StyledButton type="button" onClick={onClose} $variant="secondary">
          Cancel
        </StyledButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default ProjectForm;